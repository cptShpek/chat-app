import { object, string, TypeOf } from "zod";

export const getUserChatsSchema = object({
  body: object({
    id: string({ required_error: "Should have Id" }),
  }),
});

export type getUserChatsInput = TypeOf<typeof getUserChatsSchema>["body"];
