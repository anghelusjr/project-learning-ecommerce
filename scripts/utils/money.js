export function formatCurrency(priceCents){
  return((Math.round(priceCents) / 100).toLocaleString('fil-PH', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}));
}