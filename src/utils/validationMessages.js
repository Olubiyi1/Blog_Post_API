const validationMessages = {
  // User validation messages
  firstName: {
    "any.required": "Please enter firstname",
    "string.empty": "Firstname cannot be empty",
    "string.min": "Firstname must be at least 3 characters long",
    "string.max": "Firstname cannot exceed 50 characters",
  },
  lastName: {
    "any.required": "Please enter surname",
    "string.empty": "Surname cannot be empty",
    "string.min": "Surname must be at least 3 characters long",
    "string.max": "Surname cannot exceed 50 characters",
  },
  email: {
    "any.required": "Please enter email",
    "string.empty": "Email cannot be empty",
    "string.email": "Please enter a valid email address",
  },
  password: {
    "any.required": "Please enter a password",
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 8 characters long",
    "string.max": "Password cannot exceed 30 characters",
    "string.pattern.base": "Password must include uppercase, lowercase, number, and special character",
  },

  // Blog validation messages
  blog: {
    title: {
      "any.required": "Please enter a title",
      "string.empty": "Title cannot be empty",
      "string.min": "Title must be at least 3 characters long",
      "string.max": "Title cannot exceed 200 characters",
    },
    description: {
      "any.required": "Please enter a description",
      "string.empty": "Description cannot be empty",
      "string.min": "Description must be at least 10 characters long",
      "string.max": "Description cannot exceed 500 characters",
    },
    body: {
      "any.required": "Please enter blog content",
      "string.empty": "Blog content cannot be empty",
      "string.min": "Blog content must be at least 50 characters long",
    },
    tags: {
      "array.max": "Cannot have more than 10 tags",
      "array.base": "Tags must be an array",
    },
    state: {
      "any.required": "Please specify blog state",
      "any.only": "State must be either 'draft' or 'published'",
      "string.empty": "State cannot be empty",
    },
  }
};

export default validationMessages;