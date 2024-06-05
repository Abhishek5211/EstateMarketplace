import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";
import { app } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleAuth = async () => {
    try {
      // Initialize Firebase (assuming 'app' is correctly set up)

      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();

      // Sign in with Google
      const result = await signInWithPopup(auth, provider);

      // Send user data to your server
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(signInSuccess(data));
        navigate("/");
      } else {
        console.error("Error during authentication:", response.statusText);
      }
    } catch (err) {
      console.error("Error during authentication:", err);
    }
  };

  return (
    <button
      onClick={handleGoogleAuth}
      type="button"
      className="p-3 bg-red-700 text-white rounded-lg uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
}
