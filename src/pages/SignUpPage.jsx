import { useState } from 'react'
import toast from 'react-hot-toast'
import { Loader2, MessageSquare, User } from "lucide-react"
import { Link } from "react-router-dom"

import { useAuthStore } from '../stores/useAuthStore'
import SignupPoster from "../components/SignupPoster"

const SignUpPage = () => {
  const [name, setName] = useState("")
  const { signup, isSigningUp } = useAuthStore()

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("name is required!")
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      signup(name)
    }
  }

  return (
    <div className="signup-page-grid-2">
      <div className="signup-container-left">
        <div className="signup-container-form-box">
          <div className="signup-container-form-header">
            <div className="flex flex-col items-center gap-2 group">
              <div className="singup-form-logo">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="RGB"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <SignupPoster
        title="Join sddtc&apos;s chat room"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  )
}

export default SignUpPage