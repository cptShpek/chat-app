import { object, string, TypeOf, date } from "zod";

export const registerUserSchema = object({
  body: object({
    name: string({ required_error: "Should have name" })
      .min(1, { message: "name should have at least 1 character" })
      .max(20, { message: "First name should have at most 20 characters" }),
    email: string({ required_error: "Should have email" }).email({
      message: "Invalid email address",
    }),
    password: string({ required_error: "Should have password" }).min(6, {
      message: "Password should have at least 6 characters",
    }),
    confirmPassword: string({
      required_error: "Should have confirm password",
    }).min(6, { message: "confirmPassword should have at least 6 characters" }),
    phoneNumber: string({ required_error: "Should have phone number" }).min(1, {
      message: "Phone number should have at least 1 character",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),
});

export const activateUserSchema = object({
  body: object({
    email: string({ required_error: "Should have email" }).email({
      message: "Invalid email address",
    }),
    OTPCode: string({ required_error: "Should have OTPCode" }),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({ required_error: "Should have email" }).email({
      message: "Invalid email address",
    }),
  }),
});

export const resetPasswordSchema = object({
  body: object({
    email: string({ required_error: "Should have email" }).email({
      message: "Invalid email address",
    }),
    password: string({ required_error: "Should have password" }).min(6, {
      message: "Password should have at least 6 characters",
    }),
    passwordResetCode: string({
      required_error: "Should have Password Reset Code",
    }),
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: "Should have email" }).email({
      message: "Invalid email address",
    }),
    password: string({ required_error: "Should have password" }).min(6, {
      message: "Password should have at least 6 characters",
    }),
  }),
});

export const logoutUserSchema = object({
  body: object({
    _id: string({ required_error: "Should have id" }),
  }),
});

export const changeOldPasswordSchema = object({
  body: object({
    oldPassword: string({ required_error: "Should have old password" }).min(6, {
      message: "Password should have at least 6 characters",
    }),
    newPassword: string({ required_error: "Should have new password" }).min(6, {
      message: "Password should have at least 6 characters",
    }),
  }),
});

export type registerUserInput = TypeOf<typeof registerUserSchema>["body"];
export type activateUserInput = TypeOf<typeof activateUserSchema>["body"];
export type forgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];
export type resetPasswordInput = TypeOf<typeof resetPasswordSchema>["body"];
export type loginUserInput = TypeOf<typeof loginUserSchema>["body"];
export type logoutUserInput = TypeOf<typeof logoutUserSchema>["body"];
export type changeOldPasswordInput = TypeOf<
  typeof changeOldPasswordSchema
>["body"];
