import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useRef, useState } from "react";
import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
} from "../redux/user/userSlice.ts";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Profile() {
  const { user } = useSelector((state: RootState) => state.user);
  const { currentUser, loading, error } = user;
  const fileRef = useRef(null);
  const [file, setFile] = useState<File|undefined>(undefined);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  
  const handleDeleteAccount = async() => {
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,
        {
         method:'DELETE'
        }
      );

      const data = await res.json();
      if(data.success == false)
        {
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));

    }

    catch(error){
      dispatch(deleteUserFailure(error.message));
    }

  }
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(Math.round(progress));
        toast.update("File Upload", {
          render: `Uploading: ${uploadPercentage}%`,
          progress: uploadPercentage,
        });
      },
      (error) => {
        toast.error("Upload Error:" + error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setUploadError(true);
      },
      () => {
        toast.success("Upload Success!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  };

   function handleChange(e:React.ChangeEvent<HTMLInputElement>)
  {
    setFormData({...formData,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e:React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure("error.message"));
    }

  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files![0])}
        ></input>
        <img
          src={formData.avatar || currentUser.avatar}
          onClick={() => fileRef.current.click()}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover mt-2 cursor-pointer self-center"
        />
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          name="username"
          onChange={handleChange}
        ></input>
        <input
          type="email"
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
          disabled={loading}
          onClick={handleSubmit}
          className="  sm:mt-2 border p-3 rounded-lg text-white bg-slate-700 uppercase hover:opacity-95 disabled:opacity-75 hover:cursor-pointer"
        >
          {loading ? "Loading" : "Update"}
        </button>
        <p hidden>
          {error
            ? toast.error("Update Error " + error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              })
            : null}
        </p>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={handleDeleteAccount}>Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
