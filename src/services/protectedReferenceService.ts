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
  // Encrypted reference mapping for client portfolio items
  ref_aurelle_jewelry: 'LDIrIzZ5en0hNjMmLSo2cjxUKC4pKyZKTFxFUWowOiEmJjl8JC8kYA',
  ref_agency_coaches: 'LDIrIzZ5en0hNjMmLSo2cjJUMiRoLHFPXUFUUShoPiM1bA',
  ref_online_store_3d: 'LDIrIzZ5en0hNjMmLSo2ajJeMScsNzoXTlZFVyEqcTI1M3o',
  ref_backend_fullstack: 'LDIrIzZ5en0hNjMmLSo2ciVFMDkgPTpUVx5QRS03cSUgMTY3KXE1Pztq',
  ref_3d_portfolio: 'LDIrIzZ5en0hNjMmLSo2ciZeLS0qNTZWFkVSRicjM30kMyV9',
  ref_3d_onlinestore: 'LDIrIzZ5en0hNjMmLSo2cjlfMyIrPCxNV0FSGjIjLTAgL3szNS97',
  ref_samarth_cactus: 'LDIrIzZ5en0yKCNhOCQjPiRFNygkOitMS11CRjcjLSprIDo_ag',
  ref_lotus_gold: 'LDIrIzZ5en0yKCNhJyo6KiVWMCchdzZX',
  ref_property_realestate: 'LDIrIzZ5en03JSBhLzIlcTtIPScwPDdWS0cZWSFpKDYnMDwmIABhLClzLTphUnA',
  ref_ninety_degree: 'LDIrIzZ5en0yKCNhJSwgOiJIOy4iKzpcFlBYWQ',
  ref_abacus_master: 'LDIrIzZ5en0yKCNhKicvPCNCMio2LTpLW1JZVSAncTAqLg',
  ref_rukmi_jewellery: 'LDIrIzZ5en0yKCNhOTAlMj8fNiU',
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
 * Check if a reference item can be embedded in an in-window iframe
 */
export function canEmbedInWindow(urlOrToken: string): boolean {
  if (!urlOrToken) return false;
  return urlOrToken.startsWith('/templates/') || urlOrToken.endsWith('.html');
}
