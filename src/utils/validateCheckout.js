// Funzione di validazione per il form di checkout
const validateCheckout = (billing, shipping, card) => {
    const errors = {};

    // Validazione billing
    if (!billing.firstName.trim()) errors.firstName = "First name is required";
    else if (!/^[a-zA-ZÀ-ÿ\s]{2,}$/.test(billing.firstName)) errors.firstName = "First name must contain only letters";

    if (!billing.lastName.trim()) errors.lastName = "Last name is required";
    else if (!/^[a-zA-ZÀ-ÿ\s]{2,}$/.test(billing.lastName)) errors.lastName = "Last name must contain only letters";

    if (!billing.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billing.email)) errors.email = "Invalid email format";

    if (!billing.address.trim()) errors.billingAddress = "Address is required";
    if (!billing.house_number.trim()) errors.billingHouseNumber = "House number is required";
    else if (!/^\d+$/.test(billing.house_number)) errors.billingHouseNumber = "House number must contain only numbers";

    if (!billing.city.trim()) errors.billingCity = "City is required";
    else if (!/^[a-zA-ZÀ-ÿ\s]{2,}$/.test(billing.city)) errors.billingCity = "City must contain only letters";

    if (!billing.postalCode.trim()) errors.billingPostalCode = "Postal code is required";
    else if (!/^\d{4,10}$/.test(billing.postalCode)) errors.billingPostalCode = "Postal code must contain only numbers";

    if (!billing.country.trim()) errors.billingCountry = "Country is required";
    else if (!/^[a-zA-ZÀ-ÿ\s]{2,}$/.test(billing.country)) errors.billingCountry = "Country must contain only letters";

    if (!billing.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^\+?[\d\s]{7,15}$/.test(billing.phone)) errors.phone = "Invalid phone number";

    // Validazione shipping
    if (!shipping.address.trim()) errors.shippingAddress = "Address is required";
    if (!shipping.house_number.trim()) errors.shippingHouseNumber = "House number is required";
    else if (!/^\d+$/.test(shipping.house_number)) errors.shippingHouseNumber = "House number must contain only numbers";

    if (!shipping.city.trim()) errors.shippingCity = "City is required";
    else if (!/^[a-zA-ZÀ-ÿ\s]{2,}$/.test(shipping.city)) errors.shippingCity = "City must contain only letters";

    if (!shipping.postalCode.trim()) errors.shippingPostalCode = "Postal code is required";
    else if (!/^\d{4,10}$/.test(shipping.postalCode)) errors.shippingPostalCode = "Postal code must contain only numbers";

    if (!shipping.country.trim()) errors.shippingCountry = "Country is required";
    else if (!/^[a-zA-ZÀ-ÿ\s]{2,}$/.test(shipping.country)) errors.shippingCountry = "Country must contain only letters";

    // Validazione carta
    const cleanNumber = card.number.replace(/\s/g, "");
    if (!cleanNumber) errors.cardNumber = "Card number is required";
    else if (cleanNumber.length !== 16) errors.cardNumber = "Card number must be 16 digits";
    else if (!/^\d+$/.test(cleanNumber)) errors.cardNumber = "Card number must contain only numbers";

    if (!card.expiry.trim()) errors.expiry = "Expiry date is required";
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) errors.expiry = "Invalid format (MM/YY)";

    if (!card.cvv.trim()) errors.cvv = "CVV is required";
    else if (!/^\d{3}$/.test(card.cvv)) errors.cvv = "CVV must be 3 digits";

    return errors;
};

export default validateCheckout;