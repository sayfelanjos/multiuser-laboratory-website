export const userRolesList = [
  "admin",
  "technician",
  "manager",
  "user",
] as const;
export const userPersonList = [
  "unset",
  "individual",
  "company",
  "student",
] as const;

export type UserRoleTypes = (typeof userRolesList)[number];
export type UserPersonTypes = (typeof userPersonList)[number];
