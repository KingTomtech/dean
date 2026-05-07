export const validators = {
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Invalid email address';
  },

  phone: (value) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(value) ? null : 'Invalid phone number';
  },

  password: (value) => {
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Password must contain an uppercase letter';
    if (!/[0-9]/.test(value)) return 'Password must contain a number';
    return null;
  },

  required: (value) => {
    return value && value.trim() ? null : 'This field is required';
  },

  minLength: (length) => (value) => {
    return value && value.length >= length ? null : `Minimum length is ${length} characters`;
  },

  maxLength: (length) => (value) => {
    return value && value.length <= length ? null : `Maximum length is ${length} characters`;
  },

  url: (value) => {
    try {
      new URL(value);
      return null;
    } catch {
      return 'Invalid URL';
    }
  },
};

export const validateForm = (formData, rules) => {
  const errors = {};
  for (const [field, validators_array] of Object.entries(rules)) {
    const value = formData[field];
    for (const validator of validators_array) {
      const error = validator(value);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  }
  return errors;
};
