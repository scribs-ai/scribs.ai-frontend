const calculatePasswordStrength = (password: string): number => {
  let isSecuredPassword: number = 0;

  const checkLowercase: RegExp = /^(?=.*[a-z])/;
  const checkUppercase: RegExp = /^(?=.*[A-Z])/;
  const checkDigit: RegExp = /^(?=.*\d)/;
  const checkSpecialChar: RegExp = /^(?=.*[!@#$%^&*])/;

  if (password.length >= 8) {
    isSecuredPassword += 20;
  }

  if (checkLowercase.test(password)) {
    isSecuredPassword += 20;
  }

  if (checkUppercase.test(password)) {
    isSecuredPassword += 20;
  }

  if (checkDigit.test(password)) {
    isSecuredPassword += 20;
  }

  if (checkSpecialChar.test(password)) {
    isSecuredPassword += 20;
  }

  return isSecuredPassword;
};

export default calculatePasswordStrength;
