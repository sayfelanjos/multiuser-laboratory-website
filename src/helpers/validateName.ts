export default function validateName(name: string): boolean {
  const trimmed = name.trim();

  if (trimmed.length < 2) return false;

  // Permite letras (com acentos) e espaços simples entre nomes
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

  return regex.test(trimmed);
}