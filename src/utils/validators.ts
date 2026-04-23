export const validators = {
  auth: {
    passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
    isStrongPassword(password: string): boolean {
      return this.passwordRegex.test(password);
    }
  }
};
