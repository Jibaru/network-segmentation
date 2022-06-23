export function isValidIPInput(ipInputValue) {
  if (ipInputValue.trim() === "") {
    return {
      isValid: false,
      errors: ["El campo ip no puede estar vacío"],
    };
  }

  const parts = ipInputValue.trim().split(".");

  if (parts.length != 4) {
    return {
      isValid: false,
      errors: [
        "La IP debe contener 4 números naturales separados por un punto (.)",
      ],
    };
  }

  for (const part of parts) {
    const num = Number(part);

    if (!Number.isInteger(num) || num < 0 || num > 255) {
      return {
        isValid: false,
        errors: ["La IP debe contener números naturales entre 0 hasta 255"],
      };
    }
  }

  return {
    isValid: true,
    errors: [],
  };
}
