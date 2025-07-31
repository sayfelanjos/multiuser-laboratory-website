export default function validatePhoneNumber(value: string): boolean {
    const onlyDigits = /^[0-9]{10,11}$/;
    return onlyDigits.test(value);
}