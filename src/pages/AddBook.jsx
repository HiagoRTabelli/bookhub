import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function AddBook() {
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [rating, setRating] = useState("")
    const [cover, setCover] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    async function handleSubmit(event) {
        event.preventDefault()

        setLoading(true)
        setMessage("")
        setError("")

        try {
            const token = localStorage.getItem("token")

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/books`,
                {
                    title,
                    category,
                    description,
                    rating,
                    cover,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            setMessage("Livro adicionado com sucesso!")

            setTimeout(() => {
                navigate("/admin")
            }, 1200)

        } catch (error) {
            console.log(error)

            setError(
                "Erro ao adicionar livro. Verifique os campos e tente novamente."
            )

        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="max-w-3xl mx-auto px-6 py-16">
            <h1 className="text-5xl font-bold mb-3">
                Adicionar Livro
            </h1>

            <p className="text-zinc-400 mb-10">
                Cadastre um livro usando a URL da capa.
            </p>

            <form
                onSubmit={handleSubmit}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col gap-6"
            >
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                />

                <input
                    type="text"
                    placeholder="Categoria"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                />

                <input
                    type="number"
                    placeholder="Avaliação"
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                    className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                />

                <input
                    type="text"
                    placeholder="URL da capa"
                    value={cover}
                    onChange={(event) => setCover(event.target.value)}
                    className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                />

                {cover && (
                    <img
                        src={cover}
                        alt="Preview da capa"
                        className="w-48 h-64 object-cover rounded-xl shadow-lg mx-auto"
                    />
                )}

                <textarea
                    placeholder="Descrição"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    rows="6"
                    className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-400 resize-none"
                />

                {message && (
                    <p className="bg-green-500/20 border border-green-500 text-green-300 p-3 rounded-xl">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-xl">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 duration-300 rounded-xl py-4 font-bold text-lg"
                >
                    {loading ? "Salvando..." : "Adicionar Livro"}
                </button>
            </form>
        </main>
    )
}

export default AddBook