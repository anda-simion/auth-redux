const login_constraints = {
    user_name: {
      presence: true,
      length: {
        minimum: 4,
        message: "^must be at least 4 characters long"
      }
    },
    password: {
      presence: true,
      length: {
        minimum: 4,
        message: "^must be at least 4 characters long"
      }
    }
  };
  
  const register_constraints = {
    email: {
      email: {
        message: "doesn't look like a valid email"
      }
    },
    first_name: {
      presence: true
    },
    last_name: {
      presence: true
    },
    password: {
      presence: true,
      length: {
        minimum: 4,
        message: "^must be at least 4 characters long"
      }
    },
    repeat_password: {
      equality: "password"
    },
    agreement_checked: {
      inclusion: {
        within: [true],
        message: "You must agree with our terms and conditions!"
      }
    }
  };
  
  export { login_constraints, register_constraints };
  