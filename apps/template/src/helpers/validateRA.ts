export function validateRA(ra: string): boolean {
  const regex = new RegExp("^[1-9][0-9]{5}$");
  return regex.test(ra);
}
