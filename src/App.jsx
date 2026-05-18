import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"

import Sidebar from "./components/Sidebar"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Books from "./pages/Books"
import Favorites from "./pages/Favorites"
import BookDetails from "./pages/BookDetails"
import AdminDashboard from "./pages/AdminDashboard"
import AddBook from "./pages/AddBook"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode")

    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <div
      className={
        darkMode
          ? "bg-zinc-900 min-h-screen text-white"
          : "bg-zinc-100 min-h-screen text-black"
      }
    >
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="lg:ml-64 pt-20 lg:pt-0 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add-book"
            element={
              <ProtectedRoute>
                <AddBook />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App