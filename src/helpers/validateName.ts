export default function validateName(name: string): boolean {
    const trimmed = name.trim();

    if (trimmed.length === 0) return false;

    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

    return regex.test(trimmed);
  }