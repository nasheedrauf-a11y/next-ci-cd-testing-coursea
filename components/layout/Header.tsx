"use client"

import { ROUTES } from "@/lib/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href={ROUTES.HOME} className="font-bold text-xl">
          My App
        </Link>
        <div className="flex gap-4">
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
        </div>
      </nav>
    </header>
  )
}
