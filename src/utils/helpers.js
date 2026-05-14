export const WHATSAPP_NUMBER = '918143863355';
export const CALL_NUMBER = '+918143863355';
export const INSTAGRAM_ID = 'sct_bats';

export function formatPrice(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getFinalPrice(mrp, discountPercent) {
  return Math.round(mrp * (1 - discountPercent / 100));
}

export function getWhatsAppUrl(bat) {
  const msg = encodeURIComponent(
    `Hi SCT! I'm interested in the *${bat.edition}* (${bat.grade} - ${bat.willow}). Can you share availability and details?`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

export function getCallUrl() {
  return `tel:${CALL_NUMBER}`;
}
