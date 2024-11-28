module.exports = {
    isRequired: (key, value) => {
        if (!value || value.trim() === '') {
            return `${key} is required`;
        }
        return null;
    },
    isDate: (key, value) => {
        if (!value || value.trim() === '') {
            return `${key} is required`;
        }

        if (isNaN(Date.parse(value))) {
            return `${key} must be a valid date`;
        }

        return null; // No errors
    },
    isMinLength: (key, value, minLength) => {
        if (value && value.length < minLength) {
            return `${key} must be at least ${minLength} characters long`;
        }
        return null;
    },
    isNumber: (key, value) => {
        if (isNaN(value)) {
            return `${key} must be a number`;
        }
        return null;
    }
};
