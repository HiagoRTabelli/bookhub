import { useEffect, useState } from "react"
import axios from "axios"

import BookCard from "../components/BookCard"

function Favorites() {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchFavorites() {
            try {
                const token = localStorage.getItem("token")

                if (!token) {
                    setBooks([])
                    return
                }

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/favorites`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                setBooks(response.data)

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchFavorites()
    }, [])

    if (loading) {
        return (
            <main className="max-w-7xl mx-auto px-6 py-16">
                <p className="text-zinc-400">
                    Carregando favoritos...
                </p>
            </main>
        )
    }

    return (
        <main className="max-w-7xl mx-auto px-6 py-16">
            <div className="mb-10">
                <h1 className="text-5xl font-bold mb-3">
                    Favoritos
                </h1>

                <p className="text-zinc-400">
                    Seus livros favoritos salvos no MongoDB.
                </p>
            </div>

            {books.length === 0 ? (
                <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-10 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Nenhum favorito ainda
                    </h2>

                    <p className="text-zinc-400">
                        Favorite algum livro na biblioteca.
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {books.map((book) => (
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

export default Favorites