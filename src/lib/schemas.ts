import * as z from "zod";

export const signUpFormSchema = z
  .object({
    first_name: z
      .string()
      .min(2, {
        message: "First name must be at least 2 characters.",
      })
      .max(15, {
        message: "First name must not be longer than 15 characters.",
      }),
    last_name: z
      .string()
      .min(2, {
        message: "Last name must be at least 2 characters.",
      })
      .max(15, {
        message: "Last name must not be longer than 15 characters.",
      }),
    email: z.string().email("Invalid email format."),
    password: z
      .string()
      .min(1, "Password is required")
      .refine(
        (password) => /^(?=.*[a-z])/.test(password),
        "Password must contain at least one lowercase letter."
      )
      .refine(
        (password) => /^(?=.*[A-Z])/.test(password),
        "Password must contain at least one uppercase letter."
      )
      .refine(
        (password) => /^(?=.*\d)/.test(password),
        "Password must contain at least one digit."
      )
      .refine(
        (password) => /^(?=.*[!@#$%^&*])/.test(password),
        "Password must contain at least one special character."
      )
      .refine(
        (password) => password.length >= 8,
        "Password must have 8 characters"
      ),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export const signInFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have 8 characters"),
});

export const twoFactorAuthFormSchema = z.object({
  otp: z.string().min(1, "Enter otp").min(6, "opt should be of 6-digit"),
});

export const forgetPasswordFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
});

export const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export const integrationFormSchema = z.object({
  file: z.any().refine((file) => file?.length == 1, "File is required."),
});

export const languageFormSchema = z.object({
  language: z.string({
    required_error: "Please select an language to display.",
  }),
});

export const securityFormSchema = z.object({
  two_factor: z.boolean(),
});

export const profileFormSchema = z.object({
  profile_picture: z
    .any()
    .refine((file) => file?.length !== 0, "File is required"),
  first_name: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(15, {
      message: "First name must not be longer than 15 characters.",
    }),
  last_name: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .max(15, {
      message: "Last name must not be longer than 15 characters.",
    }),
  email: z
    .string({
      required_error: "Please write an valid email address.",
    })
    .email(),
});
