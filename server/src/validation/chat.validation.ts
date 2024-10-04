import { object, string, TypeOf } from "zod";

export const chatRequestSchema = object({
  body: object({
    from: string({ required_error: "Should have From Id" }),
    to: string({ required_error: "Should have To Id" }),
  }),
});

export type chatRequestInput = TypeOf<typeof chatRequestSchema>["body"];
