import { object, string, TypeOf } from "zod";

export const chatRequestSchema = object({
  body: object({
    from: string({ required_error: "Should have From email" }),
    to: string({ required_error: "Should have To email" }),
  }),
});

export const getChatRequestsSchema = object({
  body: object({
    email: string({ required_error: "Should have id" }),
  }),
});

export type chatRequestInput = TypeOf<typeof chatRequestSchema>["body"];
export type getChatRequestsInput = TypeOf<typeof getChatRequestsSchema>["body"];
