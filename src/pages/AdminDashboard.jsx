import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

function AdminDashboard() {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)

    async function fetchBooks() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/books`)
            setBooks(response.data)
        } catch (error) {
            console.log("Erro ao buscar livros:", error)
            alert("Erro ao carregar livros do dashboard")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    async function deleteBook(id) {
        const token = localStorage.getItem("token")

        axios.delete(`${import.meta.env.VITE_API_URL}/api/books/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        fetchBooks()
    }

    if (loading) {
        return (
            <main className="max-w-7xl mx-auto px-6 py-16">
                <p className="text-zinc-400">
                    Carregando dashboard...
                </p>
            </main>
        )
    }

    return (
        <main className="max-w-7xl mx-auto px-6 py-16">
            <h1 className="text-5xl font-bold mb-3">
                Dashboard Admin
            </h1>

            <p className="text-zinc-400 mb-6">
                Gerencie os livros salvos no MongoDB.
            </p>

            <Link
                to="/admin/add-book"
                className="inline-block bg-blue-500 hover:bg-blue-600 duration-300 px-6 py-3 rounded-xl font-semibold mb-10"
            >
                + Adicionar livro
            </Link>

            <section className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6">
                    <p className="text-zinc-400 mb-2">
                        Total de livros
                    </p>

                    <h2 className="text-4xl font-bold">
                        {books.length}
                    </h2>
                </div>

                <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6">
                    <p className="text-zinc-400 mb-2">
                        Fonte
                    </p>

                    <h2 className="text-2xl font-bold">
                        MongoDB
                    </h2>
                </div>

                <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6">
                    <p className="text-zinc-400 mb-2">
                        API
                    </p>

                    <h2 className="text-2xl font-bold">
                        Express
                    </h2>
                </div>
            </section>

            <section className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6">
                <h2 className="text-3xl font-bold mb-6">
                    Livros cadastrados
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-zinc-400 border-b border-zinc-700">
                            <tr>
                                <th className="py-3">Título</th>
                                <th className="py-3">Categoria</th>
                                <th className="py-3">Avaliação</th>
                                <th className="py-3">Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {books.map((book) => (
                                <tr
                                    key={book._id}
                                    className="border-b border-zinc-700"
                                >
                                    <td className="py-4">
                                        {book.title}
                                    </td>

                                    <td className="py-4">
                                        {book.category}
                                    </td>

                                    <td className="py-4 text-yellow-400">
                                        ⭐ {book.rating}
                                    </td>

                                    <td className="py-4">
                                        <div className="flex gap-3">
                                            <Link
                                                to={`/admin/edit-book/${book._id}`}
                                                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                                            >
                                                Editar
                                            </Link>

                                            <button
                                                onClick={() => deleteBook(book._id)}
                                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}

export default AdminDashboard