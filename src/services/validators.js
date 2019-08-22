const login_constraints = {
  user_name: {
    presence: true,
    length: {
      minimum: 1,
      message: "^Please fill this field"
    }
  },
  password: {
    presence: true,
    length: {
      minimum: 1,
      message: "^Please fill this field"
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
    presence: true,
    length: {
      minimum: 1,
      message: "must be at least 1 character"
    }
  },
  last_name: {
    presence: true,
    length: {
      minimum: 1,
      message: "must be at least 1 character"
    }
  },
  password: {
    presence: true,
    length: {
      minimum: 4,
      message: "must be at least 6 characters long"
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
