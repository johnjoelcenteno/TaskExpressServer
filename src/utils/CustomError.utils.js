class CustomErr extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? 'Failed' : 'Internal Server Error';
        this.errors = [];

        Error.captureStackTrace(this, this.constructor);
    }

    addNewError(field, message) {
        this.errors.push({ field, message });
    }

    static validateFields(object, rules) {
        const errorInstance = new CustomErr('Validation error', 422);

        for (const [key, validators] of Object.entries(rules)) {
            const value = object[key];

            for (const validator of validators) {
                const error = validator(key, value);
                if (error) {
                    errorInstance.addNewError(key, error);
                }
            }
        }

        if (errorInstance.errors.length > 0) {
            throw errorInstance;
        }
    }
}

module.exports = CustomErr;
