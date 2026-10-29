import { env } from "@/data/env/server";
import {
  clerkUserCreated,
  clerkUserDeleted,
  clerkUserUpdated,
  inngest,
} from "../client";
import { Webhook } from "svix";
import { NonRetriableError } from "inngest";
import { deleteUser, insertUser, updateUser } from "@/features/users/db/users";
import { insertUserNotificationsSettings } from "@/features/users/db/userNotificationSettings";

function verifyWebhook({raw, headers}: {raw: string, headers: Record<string, string>}) {
  return new Webhook(env.CLERK_WEBHOOK_SECRET).verify(raw, headers);
}

export const clerkCreateUser = inngest.createFunction(
  {
    id: "clerk/create-db-user",
    name: "Clerk - Create DB User",
    triggers: [clerkUserCreated],
  },
  async ({ event, step }) => {
    if(process.env.NODE_ENV !== "development") {
      await step.run("verification-webhook", async () => {
      try {
        verifyWebhook({ raw: event.data.raw, headers: event.data.headers });
      } catch {
        throw new NonRetriableError("Invalid Clerk webhook.");
      }
    });
    }

    const userId = await step.run("create-user", async () => {
      const userData = event.data.data;
      const email = userData.email_addresses.find(
        (address) => address.id === userData.primary_email_address_id
      );

      if (!email) {
        throw new NonRetriableError("Clerk user has no primary email.");
      }

      await insertUser({
        id: userData.id,
        name:
          [userData.first_name, userData.last_name].filter(Boolean).join(" ") ||
          email.email_address,
        imageUrl: userData.image_url,
        email: email.email_address,
        createdAt: new Date(userData.created_at),
        updatedAt: new Date(userData.updated_at),
      });

      return userData.id;
    });

    await step.run("create-user-notification-settings", async () => {
      await insertUserNotificationsSettings({ userId });
    });
  }
);

export const clerkUpdateUser = inngest.createFunction(
  {
    id: "clerk/update-db-user",
    name: "Clerk - Update DB User",
    triggers: [clerkUserUpdated],
  },
  async ({ event, step }) => {
    if (process.env.NODE_ENV !== "development") {
      await step.run("verification-webhook", async () => {
        try {
          verifyWebhook({ raw: event.data.raw, headers: event.data.headers });
        } catch {
          throw new NonRetriableError("Invalid Clerk webhook.");
        }
      });
    }

    await step.run("update-user", async () => {
      const userData = event.data.data;
      const email = userData.email_addresses.find(
        (address) => address.id === userData.primary_email_address_id
      );
      const name = [userData.first_name, userData.last_name]
        .filter(Boolean)
        .join(" ");
      const user: Parameters<typeof updateUser>[1] = {
        imageUrl: userData.image_url,
        updatedAt: new Date(userData.updated_at),
      };

      if (name) {
        user.name = name;
      } else if (email) {
        user.name = email.email_address;
      }

      if (email) {
        user.email = email.email_address;
      }

      await updateUser(userData.id, user);
    });
  }
);

export const clerkDeleteUser = inngest.createFunction(
  {
    id: "clerk/delete-db-user",
    name: "Clerk - Delete DB User",
    triggers: [clerkUserDeleted],
  },
  async ({ event, step }) => {
    if (process.env.NODE_ENV !== "development") {
      await step.run("verification-webhook", async () => {
        try {
          verifyWebhook({ raw: event.data.raw, headers: event.data.headers });
        } catch {
          throw new NonRetriableError("Invalid Clerk webhook.");
        }
      });
    }

    await step.run("delete-user", async () => {
      const userId = event.data.data.id;

      if (!userId) {
        throw new NonRetriableError("Clerk user deletion has no user ID.");
      }

      await deleteUser(userId);
    });
  }
);