import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import React, { useEffect, useRef, useState } from "react";
import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutSuccess,
  signOutFailure,
  signOutStart,
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
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useSelector((state: RootState) => state.user);
  const { currentUser, loading, error } = user;
  const fileRef = useRef(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [userListings, setUserListings] = useState([]);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success == false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/user/signout/");
      const data = res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleShowListings( e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = res.json();
      console.log(data);

      if (data.success === false) {
        toast.error("Upload Error:" + data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      setUserListings(data);
    } catch (error) {
      toast.error("Upload Error:" + error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  async function handleSubmit(e: React.ChangeEvent<HTMLInputElement>) {
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFile(e.target.files![0])
          }
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
        <Link
          to={"/create-listing"}
          className="rounded-lg bg-green-700 uppercase text-center hover:opacity-95 text-white p-3 "
        >
          Create Listing
        </Link>
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

      <div className="flex justify-between p-5">
        <span
          className="text-red-700 cursor-pointer"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </span>
      </div>
      <button className="text-green-700 w-full" onClick={handleShowListings}>
        Show User Listings
      </button>
      {userListings && userListings.length > 0 && (
        <div>
          <h2 className="mt-7 font-bold">Your Listings</h2>
          {userListings.map((listing) => {
            return (
              <div
                key={listing._id}
                className="rounded-lg border p-3 flex space-between items-center gap-4"
              >
                <Link to={`./listings/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="Listing Cover"
                    className="h-20 w-20 object-contain"
                  ></img>
                </Link>
                <Link to={`./listings/${listing._id}`}>
                  <p className=" font-semibold hover:font-bold truncae">
                    {listing.name}
                  </p>
                </Link>
                <div className="flex gap-1">
                  <button className="text-green-700 uppercase rounded-lg">
                    Edit
                  </button>
                  <button className="text-red-700 uppercase rounded-lg">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
