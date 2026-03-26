import React, { useEffect, useState } from "react";

export default function AuthButton() {
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));


  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("jwtToken"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      localStorage.removeItem("jwtToken");
      setToken(null);
      window.dispatchEvent(new Event("jwtTokenUpdated"));
      window.location.href = window.location.origin + "/"; // Force homepage root redirect
    }
  };

  const openLoginModal = () => {
    const modal = document.getElementById("authentication-modal");
    if (!modal) return;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  };

  if (token) {

    return (
     
         <button

            onClick={handleLogout}
            className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
            Log out
        </button>
    );
  } else {
    return (
      <button
        onClick={openLoginModal}
        className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
        Log in
      </button>
    );
  }
}