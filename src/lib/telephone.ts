export const validNumber = (number: string) => {
  if (number.length != 20) return false;

  return number !== "";
};

export const telephoneMask = (value: string) => {
  const phone = value.replace(/\D/g, "");

  if (phone.length === 12) {
    return phone
      .replace(/(\d{2})(\d)/, "+$1 ($2")
      .replace(/(\d{2})(\d)/, "$1) $2")
      .replace(/(\d{4})(\d{4})$/, "$1-$2");
  } else {
    return phone
      .replace(/(\d{2})(\d)/, "+$1 ($2")
      .replace(/(\d{2})(\d)/, "$1) $2")
      .replace(/(\d{1})(\d{4})(\d{4})$/, "$1 $2-$3");
  }
};

export const removeTelephoneMask = (value: string) => {
  return value.replace(/\+|\-|\(|\)|\ /g, "");
};
