export const APP_NAME = "My Next.js App"
export const APP_DESCRIPTION = "A well-structured Next.js application"

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
} as const

export type RouteKey = keyof typeof ROUTES
