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
    const [cover, setCover] = useState(null)
    const [preview, setPreview] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchBook() {
            axios.get(`${import.meta.env.VITE_API_URL}/api/books/${id}`)

            setTitle(response.data.title)
            setCategory(response.data.category)
            setDescription(response.data.description)
            setRating(response.data.rating)
            setPreview(response.data.cover)
        }

        fetchBook()
    }, [id])

    function handleImageChange(event) {
        const file = event.target.files[0]

        if (file) {
            setCover(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    async function handleSubmit(event) {
        event.preventDefault()

        setLoading(true)

        try {
            const token = localStorage.getItem("token")

            const formData = new FormData()

            formData.append("title", title)
            formData.append("category", category)
            formData.append("description", description)
            formData.append("rating", rating)

            if (cover) {
                formData.append("cover", cover)
            }

            axios.put(
                `${import.meta.env.VITE_API_URL}/api/books/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
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
                Atualize os dados do livro.
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

                <label className="bg-zinc-800 border-2 border-dashed border-zinc-700 rounded-2xl p-6 cursor-pointer hover:border-blue-400 duration-300 text-center flex flex-col items-center justify-center gap-4">
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview da capa"
                            className="w-48 h-64 object-cover rounded-xl shadow-lg"
                        />
                    )}

                    <span className="font-semibold text-blue-400">
                        Trocar capa
                    </span>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </label>

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