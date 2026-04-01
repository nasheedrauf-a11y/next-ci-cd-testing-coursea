"use client"

import { ROUTES } from "@/lib/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "My App"

export default function Header() {
  const pathname = usePathname()
  const { data: session, status } = useSession()

  return (
    <header className="border-b">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href={ROUTES.HOME} className="font-bold text-xl">
          {APP_NAME}
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href={ROUTES.HOME}
            className={`text-sm ${
              pathname === ROUTES.HOME
                ? "font-medium text-blue-600"
                : "hover:underline"
            }`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`text-sm ${
              pathname.startsWith("/products")
                ? "font-medium text-blue-600"
                : "hover:underline"
            }`}
          >
            Products
          </Link>
          <Link href={ROUTES.DASHBOARD} className="text-sm hover:underline">
            Dashboard
          </Link>
          {status === "loading" ? (
            <span className="text-sm text-gray-400">...</span>
          ) : session?.user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                {session.user.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-md bg-gray-100 px-3 py-1.5 text-sm hover:bg-gray-200"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
