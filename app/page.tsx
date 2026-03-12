import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-6 text-4xl font-bold">
          Welcome to My Next.js App
        </h1>
        <p className="mb-8 text-xl text-gray-600">
          A well-structured Next.js application following best practices
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Get Started
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg border border-gray-300 px-6 py-3 font-medium transition-colors hover:bg-gray-100"
          >
            View Dashboard
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-5xl">
        <h2 className="mb-8 text-center text-2xl font-semibold">
          Key Features
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 font-semibold">Modular Structure</h3>
            <p className="text-sm text-gray-600">
              Organize components, hooks, and utilities for maintainability
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 font-semibold">TypeScript</h3>
            <p className="text-sm text-gray-600">
              Type-safe development with full TypeScript support
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 font-semibold">App Router</h3>
            <p className="text-sm text-gray-600">
              Modern routing with layouts, route groups, and API routes
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
