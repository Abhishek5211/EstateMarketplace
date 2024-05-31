import { Link, useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import { useState } from "react";

import { CustomError } from "../types/types";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState<CustomError | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        console.dir(data);
        setError(data);
      } else {
        setLoading(false);
        setError(null);
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="font-semibold text-2xl text-center my-6 ">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          name="username"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          placeholder="Email"
          className="border p-3 rounded-lg"
          name="email"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          name="password"
          onChange={handleChange}
        ></input>
        <button
          type="submit"
          className="  sm:mt-2 border p-3 rounded-lg text-white bg-slate-700 uppercase hover:opacity-95 disabled:opacity-75"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-3 mt-3">
        <p>Have an account?</p>
        <Link to="/signin" element={<SignIn />} className="text-blue-700">
          Sign In
        </Link>
        {error && <p className="text-red-500 mt-5">{error.message}</p>}
      </div>
    </div>
  );
}
