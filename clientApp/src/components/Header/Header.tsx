import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const { currentUser } = user;
  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-slate-300 border-gray-200 px-4 lg:px-6 py-2.5 flex justify-even items-center">
        <div>
          <Link to="/" className="flex items-center px-4 lg:px-6">
            <h1 className="font-bold text-sm sm:text-2xl flex flex-wrap">
              <span className="text-slate-500">Rajesh</span>
              <span className="text-slate-700">Estate</span>
            </h1>
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-between mx-auto max-w-screen-xl">
          <div className="flex flex-wrap gap-8">
            <form className="bg-slate-100 rounded-lg flex items-center p-3">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent focus:outline-none w-24 sm:w-64"
              />
              <FaSearch className="text-slate-400 hover:cursor-pointer"></FaSearch>
            </form>
            <ul className="flex flex-wrap gap-4 items-center">
              <Link to={"/home"}>
                <li className="hidden sm:inline text-slate-700 hover:font-bold">
                  Home
                </li>
              </Link>
              <Link to={"/about"}>
                <li className="hidden sm:inline text-slate-700 hover:font-bold">
                  About
                </li>
              </Link>
              {currentUser ? (
                <Link to={"/profile"}>
                  <li>
                    <img
                      src={currentUser.avatar}
                      className="w-7 h-7 rounded-full object-cover"
                      alt="profile"
                      onClick={() => navigate("/profile")}
                    />
                  </li>
                </Link>
              ) : (
                <Link to={"/signin"}>
                  <li className="hidden sm:inline text-slate-700 hover:font-bold">
                    Sign In
                  </li>
                </Link>
              )}
              <Link to={"/signup"}>
                {!currentUser && (
                  <li className="hidden sm:inline text-slate-700 hover:font-bold">
                    Sign Up
                  </li>
                )}
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
