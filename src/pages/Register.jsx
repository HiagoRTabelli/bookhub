import { useState } from "react"

function Register() {
    // Aqui guardamos os dados digitados no formulário
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Essa função roda quando o usuário clica em "Criar conta"
    function handleSubmit(event) {
        // Impede a página de recarregar
        event.preventDefault()

        // Por enquanto vamos apenas mostrar os dados no console
        console.log("Nome:", name)
        console.log("Email:", email)
        console.log("Senha:", password)

        alert("Cadastro capturado! Veja o console.")
    }

    return (
        <main className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 w-full max-w-md">

                <h2 className="text-3xl font-bold mb-2">
                    Criar conta
                </h2>

                <p className="text-zinc-400 mb-8">
                    Cadastre-se no BookHub.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block mb-2 text-sm text-zinc-300">
                            Nome
                        </label>

                        <input
                            type="text"
                            placeholder="Seu nome"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                        />
                    </div>

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
                            placeholder="Digite uma senha"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 duration-300 rounded-xl py-3 font-semibold"
                    >
                        Criar conta
                    </button>

                </form>

            </div>
        </main>
    )
}

export default Register