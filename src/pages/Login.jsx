import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()

        const user = {
            name: "Hiago",
            email: email,
            isAdmin: true
        }

        localStorage.setItem("user", JSON.stringify(user))

        alert("Login realizado com sucesso!")

        navigate("/")
    }

    return (
        <main className="min-h-[80vh] flex items-center justify-center px-6">

            <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 w-full max-w-md">

                <h2 className="text-3xl font-bold mb-2">
                    Entrar na conta
                </h2>

                <p className="text-zinc-400 mb-8">
                    Acesse sua biblioteca virtual.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block mb-2 text-sm text-zinc-300">
                            E-mail
                        </label>

                        <input
                            type="email"
                            placeholder="seuemail@email.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm text-zinc-300">
                            Senha
                        </label>

                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 duration-300 rounded-xl py-3 font-semibold"
                    >
                        Entrar
                    </button>

                </form>

            </div>

        </main>
    )
}

export default Login