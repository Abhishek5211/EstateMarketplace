import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice.ts';

import { RootState } from "../redux/store.ts";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state:RootState )=> state.user);
  const dispatch = useDispatch();
 
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
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        console.dir(data);
        dispatch(signInFailure(data.message));
      } else {
        dispatch(signInSuccess(data));
        navigate("/signin");
      }
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="font-semibold text-2xl text-center my-6 ">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
          { loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-3 mt-3">
        <p>Don't have an account?</p>
        <Link to="/signup" className="text-blue-700">
          Sign Up
        </Link>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
}
