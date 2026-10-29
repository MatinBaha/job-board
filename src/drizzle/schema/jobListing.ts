import { boolean, index, integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { OrganizationTable } from "./organization";
import { relations } from "drizzle-orm";
import { JobListingApplicationTable } from "./jobListingApplication";

export const wageIntervals = ["hourly", "yearly"] as const
export type WageInterval = typeof wageIntervals[number]
export const wageIntervalEnum = pgEnum("job_listing_wage_interval", wageIntervals)

export const locationRequirements = ["in-office", "hybrid", "remote"] as const
export type LocationRequirement = typeof locationRequirements[number]
export const locationRequirementsEnum = pgEnum("location_rquirement", locationRequirements)

export const experienceLevels = ["in-office", "hybrid", "remote"] as const
export type ExperienceLevels = typeof experienceLevels[number]
export const experienceLevelsEnum = pgEnum("experience_level", experienceLevels)

export const jobListingStatus = ["draft", "published", "delisted"] as const
export type JobListingStatus = typeof jobListingStatus[number]
export const jobListingStatusEnum = pgEnum("job_listing_status", jobListingStatus)

export const jobListingTypes = ["internship", "part-time", "full-time"] as const
export type JobListingTypes = typeof jobListingTypes[number]
export const jobListingTypesEnum = pgEnum("job_listing_type", jobListingTypes)

export const JobListingTable = pgTable("job_listing", {
  id,
  organizationId: varchar().references(() => OrganizationTable.id, { onDelete: "cascade" }).notNull(),
  title: varchar().notNull(),
  description: text().notNull(),
  wage: integer(),
  wageInterval: wageIntervalEnum(),
  stateAbbreviation: varchar(),
  city: varchar(),
  isFeatured: boolean().notNull().default(false),
  locationRequirement: locationRequirementsEnum().notNull(),
  experienceLevel: experienceLevelsEnum().notNull(),
  jobListingStatu: jobListingStatusEnum().notNull(),
  jobListingType: jobListingTypesEnum().notNull(),
  postedAt: timestamp({withTimezone: true}),
  createdAt, 
  updatedAt
},
table => [index().on(table.stateAbbreviation)]
)

export const jobListingRelations = relations(JobListingTable, ({ one, many }) => ({
  organization: one(OrganizationTable, {
    fields: [JobListingTable.organizationId],
    references: [OrganizationTable.id]
  }),
  application: many(JobListingApplicationTable)
}))