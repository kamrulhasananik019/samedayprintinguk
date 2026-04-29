export const siteName = 'Samedayprintinguk';

export const siteSeoDescription =
  'Samedayprintinguk is a UK-based printing company serving customers across the entire country. We deliver to every city, town and postcode in the UK — from London, Manchester and Birmingham to Glasgow, Cardiff, Edinburgh, Liverpool, Leeds, Bristol, Newcastle, Sheffield, Nottingham and beyond. Wherever you are in the UK, Samedayprintinguk can reach you with fast, reliable delivery.';

function normalizeSiteUrl(value: string): string {
  const normalizedUrl = new URL(value);

  if (normalizedUrl.hostname.startsWith('www.')) {
    normalizedUrl.hostname = normalizedUrl.hostname.slice(4);
  }

  return normalizedUrl.toString().replace(/\/$/, '');
}

/** Canonical site origin (no trailing slash). Override with NEXT_PUBLIC_SITE_URL in production. */
export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://samedayprintinguk.co.uk'
);

export const siteAddress = {
  streetAddress: '14 Bygrove Street',
  addressLocality: 'London',
  postalCode: 'E14 6DN',
  addressCountry: 'GB',
} as const;

export const siteAddressLabel = `${siteAddress.streetAddress}, ${siteAddress.addressLocality} ${siteAddress.postalCode}`;

export const siteGoogleMapsPlaceUrl =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteName)}%20${encodeURIComponent(siteAddressLabel)}`;

const siteGoogleMapsEmbedQuery = encodeURIComponent(siteName);
const siteGoogleMapsEmbedCoordinates = '51.512527,-0.0181969';

export const siteGoogleMapsEmbedUrl =
  `https://www.google.com/maps?q=${siteGoogleMapsEmbedQuery}&ll=${siteGoogleMapsEmbedCoordinates}&z=16&ie=UTF8&output=embed`;
