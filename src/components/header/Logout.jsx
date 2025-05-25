import React from "react";
import auth from "../../Services/auth";
import { logout } from "../../features/authSlice";
import { useDispatch } from "react-redux";

function Logout() {
  const dispatch = useDispatch();

  const handler = () => {
    // clearing session from aw
    auth
      .logOut()
      .then(() => {
        // removing user state
        dispatch(logout());
      })
      .catch((error) => console.log(error));
  };
  return (
    <button
      className="inline-block px-6 py-2 rounded bg-[#a364ff] hover:bg-[#6c35de]"
      onClick={handler}
    >
      Log Out
    </button>
  );
}

export default Logout;
