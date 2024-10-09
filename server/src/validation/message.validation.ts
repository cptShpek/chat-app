import { object, string, TypeOf } from "zod";

export const createMessageSchema = object({
  body: object({
    text: string({ required_error: "Text is required" }),
    fromEmail: string({ required_error: "Email is required" }).email(
      "Invalid email format"
    ),
  }),
});

export type createMessageInput = TypeOf<typeof createMessageSchema>["body"];
