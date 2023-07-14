export const priceFormat = (value) => {
    const formattedValue = Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumSignificantDigits: 1,
    }).format(value);
    return formattedValue;
};
