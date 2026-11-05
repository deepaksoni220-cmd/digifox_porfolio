import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { city, country, industry, targetNoWebsiteOnly, apiKey: clientApiKey } = req.body;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY || process.env.VITE_GOOGLE_PLACES_API_KEY || clientApiKey;

  if (!apiKey) {
    return res.status(400).json({ error: 'Missing Google Places / Business API Key' });
  }

  const queryText = `${industry} in ${city}, ${country}`;

  try {
    // Call Google Places API (New Text Search)
    const placesUrl = 'https://places.googleapis.com/v1/places:searchText';
    const response = await fetch(placesUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey.trim(),
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.rating,places.userRatingCount,places.websiteUri,places.businessStatus'
      },
      body: JSON.stringify({
        textQuery: queryText,
        maxResultCount: 15
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      // Try legacy Google Places Text Search if Places v1 is not enabled on their key
      const legacyUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(queryText)}&key=${apiKey.trim()}`;
      const legacyRes = await fetch(legacyUrl);
      if (legacyRes.ok) {
        const legacyData = await legacyRes.json();
        const rawResults = legacyData.results || [];
        const mapped = rawResults.map((p: any) => ({
          id: p.place_id,
          displayName: { text: p.name },
          formattedAddress: p.formatted_address,
          nationalPhoneNumber: p.formatted_phone_number || '',
          rating: p.rating || 4.5,
          userRatingCount: p.user_ratings_total || 10,
          websiteUri: p.website || ''
        }));

        const filtered = targetNoWebsiteOnly
          ? mapped.filter((p: any) => !p.websiteUri || p.websiteUri.includes('business.site') || p.websiteUri.includes('wixsite'))
          : mapped;

        return res.status(200).json({ places: filtered, source: 'google_places_legacy' });
      }

      return res.status(response.status).json({
        error: `Google Places API returned ${response.status}: ${errText}`
      });
    }

    const data = await response.json();
    const rawPlaces = data.places || [];

    // Filter places without websites if requested
    const filteredPlaces = targetNoWebsiteOnly
      ? rawPlaces.filter((p: any) => !p.websiteUri || p.websiteUri.includes('business.site') || p.websiteUri.includes('wixsite'))
      : rawPlaces;

    return res.status(200).json({
      places: filteredPlaces,
      totalFound: rawPlaces.length,
      unbuiltWebsiteCount: filteredPlaces.length,
      source: 'google_places_v1'
    });
  } catch (err: any) {
    console.error('Error fetching Google Places:', err);
    return res.status(500).json({ error: err.message || 'Failed to scan Google Places' });
  }
}
