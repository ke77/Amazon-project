export function formatCurrency(priceCents) {
    return (Math.round(priceCents) / 100).toFixed(2);
}


export default formatCurrency; // used when exporting just one thing from a file(when importing in other files, '{}' can be omitted)