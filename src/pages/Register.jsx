import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Register() {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function handleRegister(e) {
        e.preventDefault()

        try {
            axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                name,
                email,
                password
            })

            alert("Account created successfully!")
            navigate("/login")

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Register failed"
            )
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-6">
            <form
                onSubmit={handleRegister}
                className="bg-zinc-950 border border-zinc-800 rounded-3xl p-10 w-full max-w-md"
            >
                <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">
                    Create Account
                </h1>

                {error && (
                    <p className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-xl mb-6">
                        {error}
                    </p>
                )}

                <div className="flex flex-col gap-6">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 duration-300 rounded-xl py-3 font-bold"
                    >
                        Register
                    </button>
                </div>
            </form>
        </main>
    )
}

export default Register