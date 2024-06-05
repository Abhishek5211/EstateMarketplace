import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice.ts';

import { RootState } from "../redux/store.ts";
import OAuth from "../components/OAuth/oauth.tsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Bounce, toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {user} = useSelector((state:RootState )=> state.user);
  const {currentUser,loading}=user;
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
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        toast.error(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });

      } else {
        dispatch(signInSuccess(data));
        //navigate("/signin");
        toast.success(data.username + ' Welcome!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }
    } catch (error) {
      dispatch(signInFailure(error));
      dispatch(signInFailure(error));
        toast.error('Horrible Error', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
    }
  };
  return (
    <div className="mx-auto max-w-lg p-3">
         <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      <h1 className="font-semibold text-2xl text-center my-6 ">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          className="border p-3 rounded-lg"
          name="email"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          name="password"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="  sm:mt-2 border p-3 rounded-lg text-white bg-slate-700 uppercase hover:opacity-95 disabled:opacity-75"
        >
          { loading ? "Loading..." : "Sign In"}
        </button>
      <OAuth/>
      </form>
      <div className="flex gap-3 mt-3">
        <p>Don't have an account?</p>
        <Link to="/signup" className="text-blue-700">
          Sign Up
        </Link>
      </div>
      
    </div>
  );
}
