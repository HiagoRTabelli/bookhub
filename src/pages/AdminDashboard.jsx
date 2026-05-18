import { Link } from "react-router-dom"
import { useState } from "react"
import books from "../data/books"

function AdminDashboard() {
    const [customBooks, setCustomBooks] = useState(
        JSON.parse(localStorage.getItem("customBooks")) || []
    )

    const allBooks = [...books, ...customBooks]

    function deleteCustomBook(id) {
        const updatedBooks = customBooks.filter((book) => book.id !== id)

        localStorage.setItem("customBooks", JSON.stringify(updatedBooks))

        setCustomBooks(updatedBooks)

        alert("Livro excluído com sucesso!")
    }

    return (
        <main className="max-w-7xl mx-auto px-6 py-16">

            <h1 className="text-5xl font-bold mb-3">
                Dashboard Admin
            </h1>

            <p className="text-zinc-400 mb-6">
                Visão geral do sistema BookHub.
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
                        {allBooks.length}
                    </h2>
                </div>

                <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6">
                    <p className="text-zinc-400 mb-2">
                        Livros fixos
                    </p>

                    <h2 className="text-4xl font-bold">
                        {books.length}
                    </h2>
                </div>

                <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6">
                    <p className="text-zinc-400 mb-2">
                        Livros adicionados
                    </p>

                    <h2 className="text-4xl font-bold">
                        {customBooks.length}
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
                                <th className="py-3">Tipo</th>
                                <th className="py-3">Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {allBooks.map((book) => {
                                const isCustom = customBooks.some(
                                    (customBook) => customBook.id === book.id
                                )

                                return (
                                    <tr key={book.id} className="border-b border-zinc-700">
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
                                            {isCustom ? "Adicionado" : "Fixo"}
                                        </td>

                                        <td className="py-4">
                                            {isCustom ? (
                                                <button
                                                    onClick={() => deleteCustomBook(book.id)}
                                                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                                                >
                                                    Excluir
                                                </button>
                                            ) : (
                                                <span className="text-zinc-500">
                                                    Não editável
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>
                </div>

            </section>

        </main>
    )
}

export default AdminDashboard