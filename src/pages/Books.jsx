import { useEffect, useState } from "react"
import axios from "axios"

import BookCard from "../components/BookCard"

function Books() {
    const [books, setBooks] = useState([])
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("Todos")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/books`)

                setBooks(response.data)
                setLoading(false)
            } catch (error) {
                setError("Erro ao carregar livros")
                setLoading(false)
            }
        }

        fetchBooks()
    }, [])

    const filteredBooks = books.filter((book) => {
        const matchSearch = book.title
            .toLowerCase()
            .includes(search.toLowerCase())

        const matchCategory =
            category === "Todos" ||
            book.category === category

        return matchSearch && matchCategory
    })

    return (
        <main className="max-w-7xl mx-auto px-6 py-16">

            <div className="flex flex-col lg:flex-row justify-between gap-5 mb-10">

                <div>
                    <h1 className="text-5xl font-bold mb-3">
                        Biblioteca
                    </h1>

                    <p className="text-zinc-400">
                        Livros carregados diretamente do MongoDB.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-3">

                    <input
                        type="text"
                        placeholder="Pesquisar livro..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                    />

                    <select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                    >
                        <option>Todos</option>
                        <option>Fantasy</option>
                        <option>Fiction</option>
                        <option>Horror</option>
                        <option>Romance</option>
                    </select>

                </div>

            </div>

            {loading && (
                <p className="text-zinc-400">
                    Carregando livros...
                </p>
            )}

            {error && (
                <p className="text-red-400">
                    {error}
                </p>
            )}

            {!loading && !error && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {filteredBooks.map((book) => (
                        <BookCard
                            key={book._id}
                            id={book._id}
                            title={book.title}
                            category={book.category}
                            rating={book.rating}
                            cover={book.cover}
                            description={book.description}
                        />
                    ))}

                </div>
            )}

        </main>
    )
}

export default Books