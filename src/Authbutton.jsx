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
      window.location.href = "/"; // Redirect to homepage after logout
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
        id="react-auth-button"
        onClick={handleLogout}
        className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-base px-5 py-3 focus:outline-none"
      >
        Log out
      </button>
    );
  } else {
    return (
      <button
        onClick={openLoginModal}
        className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-base px-5 py-3 focus:outline-none"
      >
        Log in
      </button>
    );
  }
}