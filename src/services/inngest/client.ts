// src/inngest/client.ts
import type { UserJSON } from "@clerk/nextjs/types";
import type { UserWebhookEvent } from "@clerk/nextjs/server";
import { eventType, Inngest, staticSchema } from "inngest";

type ClerkWebhookData<T> = {
  data: T;
  raw: string;
  headers: Record<string, string>;
};

type UserDeletedJSON = Extract<
  UserWebhookEvent,
  { type: "user.deleted" }
>["data"];

export const clerkUserCreated = eventType("clerk/user.created", {
  schema: staticSchema<ClerkWebhookData<UserJSON>>(),
});

export const clerkUserUpdated = eventType("clerk/user.updated", {
  schema: staticSchema<ClerkWebhookData<UserJSON>>(),
});

export const clerkUserDeleted = eventType("clerk/user.deleted", {
  schema: staticSchema<ClerkWebhookData<UserDeletedJSON>>(),
});

export const inngest = new Inngest({ id: "job-board-matin" });