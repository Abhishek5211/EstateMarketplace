import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-slate-300 border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap items-center justify-around mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-500">Rajesh</span>
              <span className="text-slate-700">Estate</span>
            </h1>
          </Link>
          <form className="bg-slate-100 rounded-lg flex items-center p-3">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64"
            />
            <FaSearch className="text-slate-400 hover:cursor-pointer"></FaSearch>
          </form>
          <div>
            <ul className="flex flex-wrap gap-4">
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
              <Link to={"/signin"}>
                <li className="hidden sm:inline text-slate-700 hover:font-bold">
                  Sign In
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
