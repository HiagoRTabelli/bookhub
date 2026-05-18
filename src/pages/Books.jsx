import { useState } from "react"
import BookCard from "../components/BookCard"
import books from "../data/books"

function Books() {
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("Todos")

    // Pega os livros adicionados pelo admin
    const customBooks = JSON.parse(localStorage.getItem("customBooks")) || []

    // Junta os livros fixos com os livros adicionados
    const allBooks = [...books, ...customBooks]

    const filteredBooks = allBooks.filter((book) => {
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
                        Explore livros incríveis.
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
                        <option>Fantasia</option>
                        <option>Ficção Científica</option>
                        <option>Terror</option>
                        <option>Romance</option>
                        <option>Aventura</option>
                    </select>

                </div>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {filteredBooks.map((book) => (
                    <BookCard
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        category={book.category}
                        rating={book.rating}
                        cover={book.cover}
                        description={book.description}
                    />
                ))}

            </div>

        </main>
    )
}

export default Books