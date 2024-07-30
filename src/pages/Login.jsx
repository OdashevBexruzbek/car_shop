// rrd imports
import { Form, Link, useActionData } from "react-router-dom";

// firebase
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

// components
import { FormInput } from "../components";

// custom hooks
import useLogin from "../hooks/useLogin";

// react imports
import { useEffect, useState } from "react";

// react icons
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";

// toast
import toast from "react-hot-toast";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");

  return { email, password };
};

function Login() {
  const [forgetPassword, setForgetPassword] = useState(true);
  const userData = useActionData();
  const { signInWithEmail, isPending } = useLogin();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userData) {
      if (userData?.email.trim() && userData.password?.trim()) {
        signInWithEmail(userData.email, userData.password);
      }
      if (!userData.email.trim()) {
        setErrors((prev) => {
          return { ...prev, email: "input-error" };
        });
      }
      if (!userData.password?.trim()) {
        setErrors((prev) => {
          return { ...prev, password: "input-error" };
        });
      }
      if (!forgetPassword && userData) {
        sendPasswordResetEmail(auth, userData.email.trim())
          .then(() => {
            toast.success("Sended a link to your email");
            setForgetPassword(!forgetPassword);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    }
  }, [userData]);

  return (
    <div className="auth-container">
      <div className="auth-left"></div>
      <div className="bg-[url('https://i.dailymail.co.uk/1s/2019/09/18/11/18619048-0-image-a-47_1568804037184.jpg')] bg-center bg-no-repeat bg-cover lg:bg-none grid place-items-center min-h-screen">
        <Form
          method="post"
          className="flex flex-col items-center gap-5 card bg-base-100 w-96 shadow-xl p-5"
        >
          <h1 className="text-4xl font-bold italic">Login</h1>

          <MdEmail
            style={{ position: "absolute", top: "133px", left: "30px" }}
          />
          <FormInput
            type="email"
            name="email"
            label="Write your email..."
            status={errors.email}
          />

          {forgetPassword && (
            <FaKey
              style={{ position: "absolute", top: "235.3px", left: "30px" }}
            />
          )}
          {forgetPassword && (
            <FormInput
              type="password"
              name="password"
              label="Write your password..."
              status={errors.password}
            />
          )}
          <div className="w-full p-5">
            {!isPending && (
              <button className="btn btn-primary btn-block">
                {forgetPassword ? "Login" : "Send link"}
              </button>
            )}
            {isPending && (
              <button disabled className="btn btn-primary btn-block">
                Logining...
              </button>
            )}
          </div>
          <div className="text-center ">
            Is it your first login ?
            <Link className="link link-primary pl-2" to="/register">
              Register
            </Link>
          </div>
          <div className="text-center">
            <p>
              Forgot password ?{" "}
              <button
                onClick={() => setForgetPassword(!forgetPassword)}
                className="link link-info"
              >
                Change password{" "}
              </button>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
