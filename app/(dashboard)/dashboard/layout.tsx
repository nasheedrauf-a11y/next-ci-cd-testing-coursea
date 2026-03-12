export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="w-64 border-r bg-white p-4">
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="#" className="block p-2 rounded hover:bg-gray-100">
                Overview
              </a>
            </li>
            <li>
              <a href="#" className="block p-2 rounded hover:bg-gray-100">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
