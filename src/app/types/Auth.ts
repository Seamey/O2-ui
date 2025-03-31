export type RegisterFormType = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type NewPasswordType = {
  new_password: string;
  new_password_confirmation: string;
};

export type LoginType = {
  email: string;
  password: string;
};
