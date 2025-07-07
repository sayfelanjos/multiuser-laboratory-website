export const validateEmail = (email: string): string => {
  let error: string;
  if (!email) {
    error = "Email é obrigatório";
    return error;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    error = "Email inválido";
    return error;
  }
  return "Ok!";
};
