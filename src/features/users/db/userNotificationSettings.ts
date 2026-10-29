import { db } from "@/drizzle/db";
import { UserNotificationSettingsTable } from "@/drizzle/schema";

export async function insertUserNotificationsSettings(settings: typeof UserNotificationSettingsTable.$inferInsert) {
  await db.insert(UserNotificationSettingsTable).values(settings).onConflictDoNothing();
}