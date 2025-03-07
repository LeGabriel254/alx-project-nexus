import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { signInWithGitHub, signOut, user } = useAuth();
  const displayName = user?.user_metadata?.user_name || user?.email;
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-mono text-xl font-bold text-white">
            forum<span className="text-purple-500">.app</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {["/", "/create", "/communities", "/community/create"].map((path, index) => (
              <Link key={index} to={path} className="text-gray-300 hover:text-white transition-colors">
                {path === "/" ? "Home" : path.split("/").pop()?.replace("-", " ")}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                {user.user_metadata?.avatar_url && (
                  <img src={user.user_metadata.avatar_url} alt="User Avatar" className="w-8 h-8 rounded-full" />
                )}
                <span className="text-gray-300">{displayName}</span>
                <button onClick={signOut} className="bg-red-500 px-3 py-1 rounded cursor-pointer">
                  Sign Out
                </button>
              </div>
            ) : (
              <button onClick={signInWithGitHub} className="bg-blue-500 px-3 py-1 rounded cursor-pointer">
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-gray-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div ref={menuRef} className="md:hidden bg-[rgba(10,10,10,0.9)]">
          <div className="px-4 pt-2 pb-3 space-y-2">
            {["/", "/create", "/communities", "/community/create"].map((path, index) => (
              <Link
                key={index}
                to={path}
                className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                {path === "/" ? "Home" : path.split("/").pop()?.replace("-", " ")}
              </Link>
            ))}

            {/* Mobile Auth */}
            <div className="border-t border-gray-700 mt-3 pt-3">
              {user ? (
                <div className="flex items-center space-x-3">
                  {user.user_metadata?.avatar_url && (
                    <img src={user.user_metadata.avatar_url} alt="User Avatar" className="w-6 h-6 rounded-full" />
                  )}
                  <span className="text-gray-300">{displayName}</span>
                  <button onClick={signOut} className="bg-red-500 px-2 py-1 text-sm rounded">
                    Sign Out
                  </button>
                </div>
              ) : (
                <button onClick={signInWithGitHub} className="bg-blue-500 px-2 py-1 text-sm rounded w-full text-center">
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
