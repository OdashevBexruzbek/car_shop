// firebase imports
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

// slices
import { login } from "../features/userSlice";

//  react redux
import { useDispatch } from "react-redux";

// react toast
import toast from "react-hot-toast";

// react imports
import { useState } from "react";

const useRegister = () => {
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const registerWithEmail = async (email, displayName, password, photoURL) => {
    setIsPending(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      const user = userCredential.user;
      dispatch(login(user));
      toast.success(
        <div>
          <h4>Register succesfully</h4>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      setIsPending(false);
    } catch (error) {
      setIsPending(false);
    }
  };

  return { registerWithEmail, isPending };
};

export { useRegister };
