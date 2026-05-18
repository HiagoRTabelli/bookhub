import { useState } from "react"
import BookCard from "../components/BookCard"
import books from "../data/books"


const customBooks =
    JSON.parse(localStorage.getItem("customBooks")) || []

const allBooks = [...books, ...customBooks]

function Home() {
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("Todos")

    

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
        <main className="max-w-7xl mx-auto px-6 py-20">

            {/* HERO */}
            <section className="mb-16">

                <p className="text-blue-400 font-semibold mb-3">
                    Sua biblioteca digital
                </p>

                <h1 className="text-6xl font-bold max-w-4xl leading-tight mb-6">
                    Organize seus livros favoritos em uma plataforma moderna.
                </h1>

                <p className="text-zinc-400 text-lg max-w-2xl">
                    Sistema full stack com login, avaliações, favoritos,
                    categorias e dashboard administrativo.
                </p>

            </section>

            {/* LIVROS POPULARES */}
            <section>

                <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">

                    <h2 className="text-4xl font-bold">
                        Livros populares
                    </h2>

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

            </section>

        </main>
    )
}

export default Home