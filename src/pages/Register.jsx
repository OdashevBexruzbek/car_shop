// rrd imports
import { Form, Link, useActionData } from "react-router-dom";

// custom hooks
import { useRegister } from "../hooks/useRegister";

// react imports
import { useEffect } from "react";

// components
import { FormInput } from "../components";

// react icons
import { MdEmail } from "react-icons/md";
import { FaImage, FaKey } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

// Action function
export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let displayName = formData.get("displayName");
  let password = formData.get("password");
  let photoURL = formData.get("photoURL");

  return { email, password, photoURL, displayName };
};

function Register() {
  const userData = useActionData();
  const { isPending, registerWithEmail } = useRegister();

  useEffect(() => {
    if (userData) {
      registerWithEmail(
        userData.email,
        userData.displayName,
        userData.password,
        userData.photoURL
      );
    }
  }, [userData]);

  return (
    <div className="auth-container">
      <div className="auth-left"></div>
      <div className="auth-right">
        <Form
          method="post"
          className="flex flex-col items-center gap-5 card bg-base-100 w-96 shadow-xl p-5"
        >
          <h1 className="text-4xl font-bold italic">Register</h1>
          <div className="w-full">
            <div>
              <MdEmail
                style={{ position: "absolute", top: "133px", left: "32px" }}
              />
              <FormInput
                type="email"
                name="email"
                label="Write your email..."
              />
            </div>
            <div>
              <FaUser
                style={{ position: "absolute", top: "216.5px", left: "32px" }}
              />
              <FormInput
                type="text"
                name="displayName"
                label="Write your first name..."
              />
            </div>
            <div>
              <FaKey
                style={{ position: "absolute", top: "300px", left: "32px" }}
              />
              <FormInput
                type="password"
                name="password"
                label="Write your password..."
              />
            </div>
            <div>
              <FaImage
                style={{ position: "absolute", top: "385.2px", left: "32px" }}
              />
              <FormInput
                type="url"
                name="photoURL"
                label="Put your image url..."
              />
            </div>
          </div>
          <div className="w-full p-5">
            {!isPending && (
              <button className="btn btn-primary btn-block">Register</button>
            )}
            {isPending && (
              <button disabled className="btn btn-primary btn-block">
                Loading...
              </button>
            )}
          </div>
          <div className="text-center">
            Already registered ?{" "}
            <Link className="link link-primary pl-2" to="/login">
              Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
