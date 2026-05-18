import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function BookCard(props) {
    const [isFavorite, setIsFavorite] = useState(false)

    // Quando o componente aparece na tela, verifica se esse livro já está salvo como favorito
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || []

        const bookIsFavorite = favorites.includes(props.id)

        setIsFavorite(bookIsFavorite)
    }, [props.id])

    // Adiciona ou remove o livro dos favoritos
    function handleFavorite() {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || []

        let updatedFavorites

        if (favorites.includes(props.id)) {
            updatedFavorites = favorites.filter((id) => id !== props.id)
            setIsFavorite(false)
        } else {
            updatedFavorites = [...favorites, props.id]
            setIsFavorite(true)
        }

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
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