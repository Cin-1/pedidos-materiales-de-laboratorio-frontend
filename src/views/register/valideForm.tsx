export const validateForm = (formData: any) => {
  if (
    !formData.nombre ||
    !formData.apellido ||
    !formData.dni ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    return "Todos los campos son obligatorios.";
  }
  if (formData.password !== formData.confirmPassword) {
    return "Las contraseñas no coinciden.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return "El email no tiene un formato válido.";
  }
  if (isNaN(formData.dni)) {
    return "El DNI debe ser un número válido.";
  }
  if (formData.password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }
  return null;
};
