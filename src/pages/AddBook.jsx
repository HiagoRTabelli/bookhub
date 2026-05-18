import { useState } from "react"
import { useNavigate } from "react-router-dom"

function AddBook() {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [cover, setCover] = useState("")
    const [description, setDescription] = useState("")

    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()

        const savedBooks = JSON.parse(localStorage.getItem("customBooks")) || []

        const newBook = {
            id: Date.now(),
            title,
            category,
            rating: "0.0",
            cover,
            description
        }

        localStorage.setItem("customBooks", JSON.stringify([...savedBooks, newBook]))

        alert("Livro adicionado com sucesso!")
        navigate("/books")
    }

    return (
        <main className="max-w-3xl mx-auto px-6 py-16">
            <h1 className="text-5xl font-bold mb-3">
                Adicionar livro
            </h1>

            <p className="text-zinc-400 mb-10">
                Cadastre um novo livro na biblioteca.
            </p>

            <form onSubmit={handleSubmit} className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 space-y-5">

                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                />

                <input
                    type="text"
                    placeholder="Categoria"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                />

                <input
                    type="text"
                    placeholder="URL da capa"
                    value={cover}
                    onChange={(event) => setCover(event.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                />

                <textarea
                    placeholder="Descrição"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-400 min-h-32"
                />

                <button className="w-full bg-blue-500 hover:bg-blue-600 duration-300 rounded-xl py-3 font-semibold">
                    Salvar livro
                </button>

            </form>
        </main>
    )
}

export default AddBook