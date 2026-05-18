import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import books from "../data/books"

function BookDetails() {
    const { id } = useParams()

    const customBooks = JSON.parse(localStorage.getItem("customBooks")) || []
    const allBooks = [...books, ...customBooks]

    const book = allBooks.find((book) => book.id === Number(id))

    const [isFavorite, setIsFavorite] = useState(false)
    const [userRating, setUserRating] = useState(0)

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || []
        const ratings = JSON.parse(localStorage.getItem("ratings")) || {}

        if (book) {
            setIsFavorite(favorites.includes(book.id))
            setUserRating(ratings[book.id] || 0)
        }
    }, [book])

    function handleFavorite() {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || []

        let updatedFavorites

        if (favorites.includes(book.id)) {
            updatedFavorites = favorites.filter((favoriteId) => favoriteId !== book.id)
            setIsFavorite(false)
        } else {
            updatedFavorites = [...favorites, book.id]
            setIsFavorite(true)
        }

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    }

    function handleRating(rating) {
        const ratings = JSON.parse(localStorage.getItem("ratings")) || {}

        const updatedRatings = {
            ...ratings,
            [book.id]: rating
        }

        localStorage.setItem("ratings", JSON.stringify(updatedRatings))
        setUserRating(rating)
    }

    if (!book) {
        return (
            <main className="max-w-6xl mx-auto px-6 py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">
                    Livro não encontrado
                </h1>

                <p className="text-zinc-400">
                    Esse livro ainda não existe na biblioteca.
                </p>
            </main>
        )
    }

    return (
        <main className="max-w-6xl mx-auto px-6 py-20">

            <div className="grid md:grid-cols-2 gap-10">

                <div className="bg-zinc-800 rounded-2xl overflow-hidden">
                    <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div>
                    <p className="text-blue-400 mb-3">
                        {book.category}
                    </p>

                    <h1 className="text-5xl font-bold mb-6">
                        {book.title}
                    </h1>

                    <p className="text-yellow-400 text-xl mb-6">
                        ⭐ {book.rating}
                    </p>

                    <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                        {book.description}
                    </p>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-3">
                            Sua avaliação
                        </h2>

                        <div className="flex gap-2 text-3xl">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => handleRating(star)}
                                    className="hover:scale-125 duration-300"
                                >
                                    {star <= userRating ? "★" : "☆"}
                                </button>
                            ))}
                        </div>

                        {userRating > 0 && (
                            <p className="text-zinc-400 mt-3">
                                Você avaliou este livro com {userRating} estrela(s).
                            </p>
                        )}
                    </div>

                    <button
                        onClick={handleFavorite}
                        className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl font-semibold duration-300"
                    >
                        {isFavorite ? "Remover dos favoritos ♥" : "Adicionar aos favoritos ♡"}
                    </button>
                </div>

            </div>

        </main>
    )
}

export default BookDetails