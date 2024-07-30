// react redux
import { useSelector } from "react-redux";

// firebase imports
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

// react toast
import toast from "react-hot-toast";

// components
import NavLinks from "./NavLinks";

// rrd imports
import { Link } from "react-router-dom";

//logo
import logo from "../img/logo.jpg"

function Navbar() {
  const handleOut = async () => {
    try {
      await signOut(auth);
      toast.success(
        <div>
          <h4>Come again</h4>
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
    } catch (error) {
      toast.error(error.message);
    }
  };
  const { user } = useSelector((state) => state.user);
  return (
    <header>
      <nav className="navbar site-container flex items-center">
        <div className="navbar-start">
          <Link to="/">
              <img
                className="rounded-full w-24"
                src={logo}
                alt="Logo"
                width={50}
                height={50}
              />
          </Link>
        </div>
        <div className="navbar-center">
          <ul className="menu menu-horizontal flex gap-5 items-center">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          <div className="italic mr-3 font-bold flex items-center">
            {user && <p className="mr-3 ">{user.displayName}</p>}{" "}
            {user && <p className="mr-3 ">{user.email}</p>}
          </div>
          <div className="dropdown dropdown-end flex mt-3 gap-3">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost w-16 h-16 btn-circle avatar"
            >
              <div className="w- rounded-full">
                <img
                  src={
                    user.photoURL
                      ? user.photoURL
                      : `https://api.dicebear.com/9.x/initials/svg?seed=${user.displayName}`
                  }
                  alt={`${user.displayName ?? "user"} image`}
                />
              </div>
              
            </div>
            <button
                  className="btn"
                  onClick={() => {
                    handleOut();
                  }}
                >
                  Logout
                </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
