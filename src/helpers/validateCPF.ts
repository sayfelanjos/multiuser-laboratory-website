export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let s = 0;
  let r: number;

  for (let i = 1; i <= 9; i++)
    s = s + parseInt(cpf.substring(i - 1, i)) * (11 - i);

  r = (s * 10) % 11;

  if (r === 10 || r === 11) r = 0;

  if (r !== parseInt(cpf.substring(9, 10))) return false;

  s = 0;
  for (let i = 1; i <= 10; i++)
    s = s + parseInt(cpf.substring(i - 1, i)) * (12 - i);

  r = (s * 10) % 11;

  if (r === 10 || r === 11) r = 0;

  if (r !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}
