import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

function EditBook() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [rating, setRating] = useState("")
    const [cover, setCover] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchBook() {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/books/${id}`
            )

            setTitle(response.data.title)
            setCategory(response.data.category)
            setDescription(response.data.description)
            setRating(response.data.rating)
            setCover(response.data.cover)
        }

        fetchBook()
    }, [id])

    async function handleSubmit(event) {
        event.preventDefault()

        setLoading(true)

        try {
            const token = localStorage.getItem("token")

            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/books/${id}`,
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

            navigate("/admin")

        } catch (error) {
            console.log(error)
            alert("Erro ao editar livro")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="max-w-3xl mx-auto px-6 py-16">
            <h1 className="text-5xl font-bold mb-3">
                Editar Livro
            </h1>

            <p className="text-zinc-400 mb-10">
                Atualize os dados do livro usando uma URL de capa.
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

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 duration-300 rounded-xl py-4 font-bold text-lg"
                >
                    {loading ? "Salvando..." : "Salvar alterações"}
                </button>
            </form>
        </main>
    )
}

export default EditBook