export const nameInputProps = {
    inputId: "name",
    inputType: "text",
    inputName: "name",
    inputLabel: "Name *",
    validationRules: {
        required: {
            value: true,
            message: "Name is required."
        },
        minLength: {
            value: 2,
            message: "Name must be at least 2 characters long."
        },
        maxLength: {
            value: 20,
            message: "Name must be at most 20 characters long."
        }
    }
}

export const emailInputProps = {
    inputId: "email-field",
    inputType: "text",
    inputName: "email",
    inputLabel: "Email *",
    validationRules: {
        required: {
            value: true,
            message: "Email is required!"
        },
        maxLength: {
            value: 100,
            message: "Email must not exceed 100 characters."
        },
        validate: (value) => value.includes('@') || "This is not an email address.",
    }
}

export const passwordInputProps = {
    inputId: "password-field",
    inputType: "password",
    inputName: "password",
    inputLabel: "Password *",
    validationRules: {
        required: {
            value: true,
            message: "Password is required!"
        },
        minLength: {
            value: 10,
            message: "Password must be at least 10 characters long."
        },
        maxLength: {
            value: 100,
            message: "Password must not exceed 100 characters."
        }
    }
}

export const countryInputProps = {
    inputId: "country",
    inputType: "select",
    inputName: "countryCode",
    inputLabel: "Country *",
    inputOptions: [
        {value: "BE", label: "Belgium"},
        {value: "DE", label: "Germany"},
        {value: "NL", label: "Netherlands"},
    ],
    validationRules: {
        required: {
            value: true,
            message: "Country is required."
        }
    }
};

export const cityInputProps = {
    inputId: "city",
    inputType: "text",
    inputName: "city",
    inputLabel: "City *",
    validationRules: {
        required: {
            value: true,
            message: "City is required."
        },
        minLength: {
            value: 2,
            message: "City must be at least 2 characters long."
        },
        maxLength: {
            value: 20,
            message: "City must be at most 20 characters long."
        }
    }
}

export const streetInputProps = {
    inputId: "street",
    inputType: "text",
    inputName: "street",
    inputLabel: "Street *",
    validationRules: {
        required: {
            value: true,
            message: "Street is required."
        },
        minLength: {
            value: 2,
            message: "Street must be at least 2 characters long."
        },
        maxLength: {
            value: 30,
            message: "Street must be at most 30 characters long."
        }
    }
}

export const houseNumberInputProps = {
    inputId: "houseNumber",
    inputType: "text",
    inputName: "houseNumber",
    inputLabel: "House number *",
    validationRules: {
        required: {
            value: true,
            message: "House number is required."
        },
        maxLength: {
            value: 10,
            message: "House number must be at most 10 characters long."
        }
    }
}