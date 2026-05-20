import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

function BookCard(props) {
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
      async function checkFavorite() {
    try {
        const token = localStorage.getItem("token")
        const user = localStorage.getItem("user")

        if (!token || !user) {
            setIsFavorite(false)
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

        const favoriteExists = response.data.some(
            (book) => book._id === props.id
        )

        setIsFavorite(favoriteExists)

    } catch (error) {
        console.log(error)
    }
}

        checkFavorite()
    }, [props.id])

    async function handleFavorite() {
    try {
        const token = localStorage.getItem("token")
        const user = localStorage.getItem("user")

        if (!token || !user) {
            alert("Você precisa fazer login para favoritar.")
            return
        }

        await axios.post(
            `${import.meta.env.VITE_API_URL}/api/favorites`,
            {
                bookId: props.id,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        setIsFavorite(!isFavorite)

    } catch (error) {
        console.log(error)
        alert("Erro ao favoritar livro.")
    }
}

    return (
        <div className="bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700 hover:scale-105 duration-300">
            <div className="h-72 bg-zinc-700">
                <img
                    src={props.cover}
                    alt={props.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-5">
                <div className="flex justify-between gap-3">
                    <h3 className="text-2xl font-bold mb-2">
                        {props.title}
                    </h3>

                    <button
                        onClick={handleFavorite}
                        className="text-2xl hover:scale-125 duration-300"
                    >
                        {isFavorite ? "♥" : "♡"}
                    </button>
                </div>

                <p className="text-zinc-400 mb-3">
                    {props.category}
                </p>

                <p className="text-zinc-300 text-sm mb-4">
                    {props.description}
                </p>

                <div className="flex justify-between items-center">
                    <span className="text-yellow-400">
                        ⭐ {props.rating}
                    </span>

                    <Link
                        to={`/books/${props.id}`}
                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold duration-300"
                    >
                        Ver mais
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BookCard