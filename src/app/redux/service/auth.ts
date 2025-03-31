import { o2API } from "../api";
export const authAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // register
    createRegister: builder.mutation<
      any,
      {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
      }
    >({
      query: ({ email, name, password, password_confirmation }) => ({
        url: `api/register`,
        method: "POST",
        body: { name, email, password, password_confirmation },
      }),
    }),

    // login
    createLogin: builder.mutation<
      any,
      {
        email: string;
        password: string;
      }
    >({
      query: ({ email, password }) => ({
        url: `api/login`,
        method: "POST",
        body: { email, password },
      }),
    }),

    // verify
    createVerify: builder.mutation<
      any,
      {
        email: string;
        verification_code: string;
      }
    >({
      query: ({ email, verification_code }) => ({
        url: `api/verify-email`,
        method: "POST",
        body: { email, verification_code },
      }),
    }),
    // re verify otp
    createReVerify: builder.mutation<
      any,
      {
        email: string;
      }
    >({
      query: ({ email }) => ({
        url: `api/resend-verification-code`,
        method: "POST",
        body: { email },
      }),
    }),
    // request-password-reset
    createRequestResetPassword: builder.mutation<
      any,
      {
        email: string;
      }
    >({
      query: ({ email }) => ({
        url: `api/request-password-reset`,
        method: "POST",
        body: { email },
      }),
    }),
    // reset-password
    createResetPassword: builder.mutation<
      any,
      {
        email: string;
        reset_code: string;
        new_password: string;
        new_password_confirmation: string;
      }
    >({
      query: ({
        email,
        reset_code,
        new_password,
        new_password_confirmation,
      }) => ({
        url: `api/reset-password`,
        method: "POST",
        body: { email, reset_code, new_password, new_password_confirmation },
      }),
    }),
  }),
});

export const {
  useCreateRegisterMutation,
  useCreateVerifyMutation,
  useCreateReVerifyMutation,
  useCreateRequestResetPasswordMutation,
  useCreateResetPasswordMutation,
  useCreateLoginMutation,

} = authAPI;
