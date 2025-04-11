import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-100 fixed w-full top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="size-8 rounded-lg bg-indigo-100 flex items-center justify-center">
            <span className="text-lg font-bold text-indigo-600">CS</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">ConnectSphere</h1>
        </Link>

        <div className="flex items-center gap-3">
          {authUser ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <User className="size-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;