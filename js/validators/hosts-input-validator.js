export function isValidHostsInput(hostsInputValue) {
  if (hostsInputValue.trim() === "") {
    return {
      isValid: false,
      errors: ["El campo hosts no puede estar vacío"],
    };
  }

  const parts = hostsInputValue.trim().split("\n");

  if (parts.length == 0) {
    return {
      isValid: false,
      errors: ["La cantidad de subredes debe ser de al menos 1"],
    };
  }

  for (const part of parts) {
    const subparts = part.trim().split(",");

    if (subparts.length !== 2) {
      return {
        isValid: false,
        errors: [
          "Cada subred debe tener el nombre y cantidad de hosts",
          "Debe tener el formato: nombre,1050",
        ],
      };
    }

    const num = Number(subparts[1]);

    if (!Number.isInteger(num) || num <= 0) {
      return {
        isValid: false,
        errors: ["La cantidad de hosts debe ser un número entero mayor a cero"],
      };
    }
  }

  return {
    isValid: true,
    errors: [],
  };
}
