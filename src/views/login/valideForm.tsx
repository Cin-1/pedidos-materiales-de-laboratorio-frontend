export const validateForm = (formData: any) => {
  if (!formData.email || !formData.password) {
    return "Todos los campos son obligatorios.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return "El email no tiene un formato válido.";
  }
  if (formData.password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }
  return null;
};
