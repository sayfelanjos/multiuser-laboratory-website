export function validateCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g, ""); // Remove all non-numbers

  // Check if CNPJ is of correct size and if it's not a sequence of equal numbers
  if (cnpj.length != 14 || /^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  // Calculate first CNPJ checksum digit
  let t = 9;
  let d = 0;
  for (let i = 0; i < 12; i++) {
    d += parseInt(cnpj.charAt(i)) * ((t % 8) + 2);
    if (--t < 2) t = 9;
  }
  if (parseInt(cnpj.charAt(12)) != (d % 11 < 2 ? 0 : 11 - (d % 11))) {
    return false;
  }

  // Calculate second CNPJ checksum digit
  t = 9;
  d = 0;
  for (let i = 0; i < 13; i++) {
    d += parseInt(cnpj.charAt(i)) * ((t % 8) + 2);
    if (--t < 2) t = 9;
  }
  if (parseInt(cnpj.charAt(13)) != (d % 11 < 2 ? 0 : 11 - (d % 11))) {
    return false;
  }

  return true;
}
