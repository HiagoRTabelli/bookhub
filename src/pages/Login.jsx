import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function handleLogin(event) {

        event.preventDefault()

        setError("")

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    email,
                    password,
                }
            )

            localStorage.setItem(
                "token",
                response.data.token
            )

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            )

            navigate("/")

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login failed"
            )

        }

    }

    return (

        <main className="min-h-screen flex items-center justify-center px-6">

            <form
                onSubmit={handleLogin}
                className="bg-zinc-950 border border-zinc-800 rounded-3xl p-10 w-full max-w-md"
            >

                <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">
                    Login
                </h1>

                {error && (
                    <p className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-xl mb-6">
                        {error}
                    </p>
                )}

                <div className="flex flex-col gap-6">

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />

                    <Link
                        to="/register"
                        className="text-center border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white duration-300 rounded-xl py-3 font-bold"
                    >
                        Create account
                    </Link>

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 duration-300 rounded-xl py-3 font-bold"
                    >
                        Login
                    </button>

                </div>

            </form>

        </main>

    )

}

export default Login