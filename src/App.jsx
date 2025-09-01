import * as React from "react"
import { Link } from "react-router-dom"

export default function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Habit Tracker | Membangun Kebiasaan Positif</h1>
      <Link
        to="/dashboard"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Go to Dashboard
      </Link>

      
      <div className="mt-6">
        <h2 className="text-lg font-semibold">List Habits</h2>
      
      </div>
    </div>
  )
}
