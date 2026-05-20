import { Link, useLocation, useNavigate } from "react-router-dom"

function Sidebar({ darkMode, setDarkMode }) {
    const location = useLocation()
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("user"))

    function isActive(path) {
        return location.pathname === path
    }

    function handleLogout() {
        localStorage.removeItem("user")
        navigate("/login")
    }

    const linkClass = (path) =>
        `rounded-xl px-4 py-3 duration-300 ${
            isActive(path)
                ? "bg-blue-500 text-white"
                : "bg-zinc-900 hover:bg-zinc-800 text-white"
        }`

    return (
        <>
            {/* MENU MOBILE */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-20 bg-zinc-950 border-b border-zinc-800 z-50 px-4 flex items-center justify-between">

                <h1 className="text-2xl font-bold text-blue-400">
                    BookHub
                </h1>

                <nav className="flex gap-2 text-sm overflow-x-auto">
                    
                    <Link to="/" className={linkClass("/")}>
                        🏠
                    </Link>

                    <Link to="/books" className={linkClass("/books")}>
                         📚
                    </Link>

                    <Link to="/favorites" className={linkClass("/favorites")}>
                        ❤️
                    </Link>

                        {user?.isAdmin && (
                    <Link to="/admin" className={linkClass("/admin")}>
                        ⚙️
                    </Link>
                        )}
                </nav>

            </header>

            {/* SIDEBAR DESKTOP */}
            <aside className="hidden lg:flex w-64 bg-zinc-950 border-r border-zinc-800 min-h-screen p-6 fixed left-0 top-0 flex-col justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-blue-400 mb-10">
                        BookHub
                    </h1>

                    <nav className="flex flex-col gap-3">
                        <Link to="/" className={linkClass("/")}>
                            🏠 Home
                        </Link>

                        <Link to="/books" className={linkClass("/books")}>
                            📚 Biblioteca
                        </Link>

                        <Link to="/favorites" className={linkClass("/favorites")}>
                            ❤️ Favoritos
                        </Link>

                        {user?.isAdmin && (
                            <Link to="/admin" className={linkClass("/admin")}>
                                ⚙️ Admin
                            </Link>
                        )}
                    </nav>
                </div>

                <div>
                   
                    {user ? (
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center font-bold text-lg text-white">
                                    {user.name[0]}
                                </div>

                                <div>
                                    <h2 className="font-bold text-white">
                                        {user.name}
                                    </h2>

                                    <p className="text-zinc-400 text-sm">
                                        {user.isAdmin ? "Administrador" : "Usuário"}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="w-full bg-red-500 hover:bg-red-600 duration-300 rounded-xl py-3 font-semibold text-white"
                            >
                                Sair
                            </button>
                        </div>
                    ) : (
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
                            <p className="text-zinc-400 mb-4">
                                Nenhum usuário logado
                            </p>

                            <button
                                onClick={() => navigate("/login")}
                                className="w-full bg-blue-500 hover:bg-blue-600 duration-300 rounded-xl py-3 font-semibold text-white"
                            >
                                Fazer Login
                            </button>
                        </div>
                    )}
                </div>

            </aside>
        </>
    )
}

export default Sidebar