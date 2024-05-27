import { Link } from "react-router-dom";
import SignIn from "./SignIn";

export default function SignUp() {
  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="font-semibold text-2xl text-center my-6 ">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Username" className="border p-3 rounded-lg" name="username"></input>
        <input type="text" placeholder="Email" className="border p-3 rounded-lg" name = "email"></input>
        <input type="password" placeholder="Password" className="border p-3 rounded-lg" name = "password"></input>
        <button type="submit" className="  sm:mt-2 border p-3 rounded-lg text-white bg-slate-700 uppercase hover:opacity-95 disabled:opacity-75" >Submit</button>
      </form>
      <div className="flex gap-3 mt-3">
        <p>Have an account?</p>
        <Link to='/signin' element={<SignIn/>} className="text-blue-700">
          Sign In
        </Link>
      </div>
    </div>
  ); 
}
