import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { UserNotificationSettingsTable } from "@/drizzle/schema/userNotificationSettings";
import { UserResumeTable } from "@/drizzle/schema/userResume";
import { OrganizationUserSettingsTable } from "@/drizzle/schema/organizationUserSettings";

export async function insertUser(user: typeof UserTable.$inferInsert) {
  await db.insert(UserTable).values(user).onConflictDoNothing();
}

type UserUpdate = Partial<Omit<typeof UserTable.$inferInsert, "id">>;

export async function updateUser(userId: string, user: UserUpdate) {
  await db.update(UserTable).set(user).where(eq(UserTable.id, userId));
}

export async function deleteUser(userId: string) {
  await db.transaction(async (tx) => {
    await tx
      .delete(UserNotificationSettingsTable)
      .where(eq(UserNotificationSettingsTable.userId, userId));
    await tx.delete(UserResumeTable).where(eq(UserResumeTable.userId, userId));
    await tx
      .delete(OrganizationUserSettingsTable)
      .where(eq(OrganizationUserSettingsTable.userId, userId));
    await tx.delete(UserTable).where(eq(UserTable.id, userId));
  });
}