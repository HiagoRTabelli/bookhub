import BookCard from "../components/BookCard"
import books from "../data/books"

function Favorites() {
    const customBooks = JSON.parse(localStorage.getItem("customBooks")) || []
    const allBooks = [...books, ...customBooks]

    const favorites = JSON.parse(localStorage.getItem("favorites")) || []

    const favoriteBooks = allBooks.filter((book) =>
        favorites.includes(book.id)
    )

    return (
        <main className="max-w-7xl mx-auto px-6 py-16">

            <div className="mb-10">
                <h1 className="text-5xl font-bold mb-3">
                    Favoritos
                </h1>

                <p className="text-zinc-400">
                    Seus livros salvos.
                </p>
            </div>

            {favoriteBooks.length === 0 ? (
                <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-10 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Nenhum favorito ainda
                    </h2>

                    <p className="text-zinc-400">
                        Clique no coração dos livros para adicioná-los aqui.
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favoriteBooks.map((book) => (
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
            )}

        </main>
    )
}

export default Favorites