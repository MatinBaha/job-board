import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { UserNotificationSettingsTable } from "./userNotificationSettings";
import { UserResumeTable } from "./userResume";
import { JobListingApplicationTable } from "./jobListingApplication";
import { OrganizationUserSettingsTable } from "./organizationUserSettings";

export const UserTable = pgTable("users", {
  id: varchar().primaryKey(),
  name: varchar().notNull(),
  imageUrl: varchar(),
  email: varchar().notNull().unique(),
  createdAt,
  updatedAt
})

export const userRelations = relations(UserTable, ({ one, many }) => ({
  userNotificationSettings: one(UserNotificationSettingsTable),
  userResume: one(UserResumeTable),
  jobListingApplications: many(JobListingApplicationTable),
  organizationUserSettings: many(OrganizationUserSettingsTable),
}));