import { useState } from "react"
import { Link } from "react-router-dom"
import { Loader2, MessageSquare } from "lucide-react"

import { useAuthStore } from "../stores/useAuthStore"
import SignupPoster from "../components/SignupPoster"

const LoginPage = () => {
  const [name, setName] = useState("")
  const { login, isLoggingIn } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    login(name)
  }

  return (
    <div className="h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">name</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="RGB"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                                    Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
                            Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <SignupPoster
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </div>
  )
}

export default LoginPage