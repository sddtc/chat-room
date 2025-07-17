import { Link } from "react-router-dom"
import { LogOut, MessageSquare, Settings, User } from "lucide-react"

import { useAuthStore } from "../stores/useAuthStore"

const Navbar = () => {
  const { logout, authUser } = useAuthStore()

  return (
    <header className="navbar-header">
      <div className="navbar-header-container">
        <div className="navbar-header-container-box">
          <div className="navbar-header-container-box-left">
            <Link to="/" className="navbar-header-logo-link">
              <div className="navbar-header-logo-link-icon">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="navbar-header-logo-link-text">sddtc&apos;s chat room</h1>
            </Link>
          </div>

          <div className="navbar-header-container-box-right">
            <Link to={"/settings"} className="navbar-header-link-settings">
              <Settings className="w-4 h-4" />
              <span className="navbar-header-link-text">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className="navbar-header-link-profile">
                  <User className="size-5" />
                  <span className="navbar-header-link-text">{authUser.name}&apos;s Profile</span>
                </Link>

                <button className="navbar-header-btn-logout" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="navbar-header-link-text">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header >
  )
}

export default Navbar