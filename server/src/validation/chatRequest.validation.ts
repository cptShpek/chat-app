import { boolean, object, string, TypeOf } from "zod";

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

export const chatRequestStatusSchema = object({
  body: object({
    _id: string({ required_error: "Should have id" }),
    status: boolean({ required_error: "Should have status" }),
  }),
});

export type chatRequestInput = TypeOf<typeof chatRequestSchema>["body"];
export type getChatRequestsInput = TypeOf<typeof getChatRequestsSchema>["body"];
export type chatRequestStatusInput = TypeOf<
  typeof chatRequestStatusSchema
>["body"];
