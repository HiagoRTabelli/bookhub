import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

function BookDetails() {
    const { id } = useParams()

    const [book, setBook] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchBook() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/books/${id}`)
                setBook(response.data)
            } catch (error) {
                setError("Livro não encontrado.")
            } finally {
                setLoading(false)
            }
        }

        fetchBook()
    }, [id])

    if (loading) {
        return (
            <main className="max-w-6xl mx-auto px-6 py-20">
                <p className="text-zinc-400">Carregando livro...</p>
            </main>
        )
    }

    if (error) {
        return (
            <main className="max-w-6xl mx-auto px-6 py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">
                    Livro não encontrado
                </h1>

                <p className="text-zinc-400">
                    {error}
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
                </div>

            </div>
        </main>
    )
}

export default BookDetails