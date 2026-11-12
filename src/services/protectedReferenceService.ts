/**
 * Digifox Portfolio Protection Layer
 * 
 * Mandate:
 * Never expose original reference website URLs in frontend source code,
 * HTML attributes (href, src, data-*), JavaScript bundles, or public API responses.
 * 
 * All external reference websites are mapped to encrypted, opaque tokens.
 * Plaintext URLs are never embedded into the DOM or bundled as cleartext strings.
 */

const CIPHER_SALT = 'DF_REF_SEC_V5_SALT_98472';

// Opaque Reference Token Registry with Encrypted Payloads
// None of these ciphers contain plaintext domain names or protocols.
const PROTECTED_REGISTRY: Record<string, string> = {
  ref_spatial_apparels: 'LDIrIjZ8cHw2Mz4iXD4_MiUgOkoWV1gdGzU2JiA1cCA1Iis_VDN-My09MxZRWlNXPGg3Jigq',
  ref_aurelle_jewelry: 'LDIrIjZ8cHwhKjg_UzArbCYxKFxURk5BMCktN2swOiEmJjN4VC8jbg',
  ref_agency_coaches: 'LDIrIjZ8cHwhKjg_UzArbCgxMlYVQRlEITQ8NyloPiM1bA',
  ref_online_store_3d: 'LDIrIjZ8cHwhKjg_UzArdCg7MVVRWlIcMiMtMSAqcTI1M3A',
  ref_backend_fullstack: 'LDIrIjZ8cHwhKjg_UzArbD8gMEtdUFJfK2s4Iyw3cSUgMTwzWXEyMTx7',
  ref_3d_portfolio: 'LDIrIjZ8cHwhKjg_UzArbDw7LV9XWF5dajA6ICYjM30kMy95',
  ref_3d_onlinestore: 'LDIrIjZ8cHwhKjg_UzArbCM6M1BWUURGKzQ6fDMjLTAgL3E3RS98',
  ref_samarth_cactus: 'LDIrIjZ8cHwyNCh4Rj4-ID4gN1pZV0NHNygqIDYjLSprIDA7Gg',
  ref_lotus_gold: 'LDIrIjZ8cHwyNCh4WTAnND8zMFVcGl5caw',
  ref_property_realestate: 'LDIrIjZ8cHw3OSt4USg4byEtPVVNUV9dNzJxPyBpKDYnMDYiUABmIi5iPFwPVxg',
  ref_ninety_degree: 'LDIrIjZ8cHwyNCh4WzY9JDgtO1xfRlJXaiUwP2o',
  ref_abacus_master: 'LDIrIjZ8cHwyNCh4VD0yIjknMlhLQFJAJycxMyEncTAqLnA',
  ref_digifox_world: 'LDIrIjZ8cHwyNCh4UTY0KCo7JxdPW0VeIGk',
  ref_rukmi_jewellery: 'LDIrIjZ8cHwyNCh4Ryo4LCV6NlcX',
};

/**
 * Decrypts an encrypted token cipher into its destination in memory only.
 * The destination URL is never written into HTML attributes or the DOM tree.
 */
function decryptCipher(cipher: string): string {
  try {
    let base64 = cipher.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    const decoded = atob(base64);
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i) ^ CIPHER_SALT.charCodeAt(i % CIPHER_SALT.length);
      result += String.fromCharCode(charCode);
    }
    return result;
  } catch {
    return '/';
  }
}

/**
 * Resolves an opaque token or showcase path to its in-memory destination.
 * Returns null if not a protected token.
 */
export function resolveProtectedUrl(tokenOrPath: string): string {
  if (!tokenOrPath) return '/';

  // If it's a local template, keep as local safe relative path
  if (tokenOrPath.startsWith('/templates/') || tokenOrPath.startsWith('/')) {
    // If it's a /showcase/token path, extract token
    if (tokenOrPath.startsWith('/showcase/')) {
      const token = tokenOrPath.replace('/showcase/', '').trim();
      const cipher = PROTECTED_REGISTRY[token];
      if (cipher) {
        return decryptCipher(cipher);
      }
    }
    return tokenOrPath;
  }

  // Check direct token
  if (PROTECTED_REGISTRY[tokenOrPath]) {
    return decryptCipher(PROTECTED_REGISTRY[tokenOrPath]);
  }

  // If already encrypted token
  try {
    return decryptCipher(tokenOrPath);
  } catch {
    return '/';
  }
}

/**
 * Returns a human-friendly, protected display label for any portfolio item.
 * NEVER prints original domain names, TLDs, or technical reference URLs.
 */
export function maskReferenceUrl(urlOrToken?: string): string {
  if (!urlOrToken) return '🔒 Live Client Deployment';

  if (urlOrToken.includes('/templates/biska')) return '🔒 Live Fashion Storefront';
  if (urlOrToken.includes('/templates/blacklane')) return '🔒 Live Chauffeur Portal';
  if (urlOrToken.includes('/templates/intikburgers')) return '🔒 Live Dining Experience';
  if (urlOrToken.includes('/templates/cars')) return '🔒 Live Fleet Showcase';
  if (urlOrToken.includes('/templates/studiofashion')) return '🔒 Live E-Commerce Store';
  if (urlOrToken.includes('/templates/shoes')) return '🔒 Live 3D WebGL Model';
  if (urlOrToken.includes('/templates/digpro')) return '🔒 Live Design Portfolio';
  if (urlOrToken.includes('/templates/gsap')) return '🔒 Live Kinetic Studio';
  if (urlOrToken.includes('/templates/lesa')) return '🔒 Live Mobile Web App';
  if (urlOrToken.includes('spatial_apparels')) return '🔒 Live Spatial Fashion Apparel';

  return '🔒 Verified Production Client';
}

/**
 * Safely opens a protected client reference in a new tab without
 * ever rendering the destination URL into an HTML attribute (href, src).
 */
export function launchProtectedReference(tokenOrPath: string): void {
  const targetUrl = resolveProtectedUrl(tokenOrPath);
  if (!targetUrl || targetUrl === '/') return;

  // Open via ephemeral memory context with noopener/noreferrer
  const newWin = window.open('about:blank', '_blank', 'noopener,noreferrer');
  if (newWin) {
    newWin.opener = null;
    newWin.location.href = targetUrl;
  } else {
    // Fallback if popup blocked
    window.location.href = targetUrl;
  }
}

/**
 * Resolves an iframe embed URL for running in-window.
 * Local templates run directly from /templates/...
 * Protected reference sites run through the /api/embed-frame proxy
 * which strips X-Frame-Options/CSP restrictions and injects <base>.
 */
export function getEmbedUrl(urlOrToken: string): string {
  if (!urlOrToken) return '/';
  if (urlOrToken.startsWith('/templates/') || urlOrToken.endsWith('.html')) {
    return urlOrToken;
  }
  let token = urlOrToken;
  if (token.startsWith('/showcase/')) {
    token = token.replace('/showcase/', '').trim();
  }
  if (PROTECTED_REGISTRY[token]) {
    return `/api/embed-frame?token=${encodeURIComponent(token)}`;
  }
  return urlOrToken;
}

/**
 * Check if a reference item can be embedded in an in-window iframe
 */
export function canEmbedInWindow(urlOrToken: string): boolean {
  if (!urlOrToken) return false;
  if (urlOrToken.startsWith('/templates/') || urlOrToken.endsWith('.html')) return true;
  let token = urlOrToken;
  if (token.startsWith('/showcase/')) {
    token = token.replace('/showcase/', '').trim();
  }
  return !!PROTECTED_REGISTRY[token];
}
