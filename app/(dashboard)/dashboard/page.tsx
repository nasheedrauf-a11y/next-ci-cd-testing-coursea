export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-600">
        Welcome to your dashboard. This is the protected route group.
      </p>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">Revenue</h3>
          <p className="text-2xl font-bold">$12,345</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">Active Projects</h3>
          <p className="text-2xl font-bold">45</p>
        </div>
      </div>
    </div>
  )
}
