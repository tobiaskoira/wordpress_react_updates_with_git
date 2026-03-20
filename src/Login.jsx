import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/wp-json/jwt-auth/v1/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        console.log("JWT Token:", data.token);
        alert("Welcome! You are logged in.");
        localStorage.setItem("jwtToken", data.token);
        window.location.href = "/profile"; // Redirect to profile page after login
      } else if (data.message) {
        setError(data.message);
      }
    } catch (err) {
      setError("Error connecting to server");
    }
  }

  return (
    <div className="p-4 border rounded-base max-w-sm bg-neutral-primary-soft">
      {token ? (
        <p>Вы вошли!</p>
      ) : (


    <form onSubmit={handleLogin} class="max-w-sm mx-auto">
    <div class="mb-5">
        <label for="email" class="block mb-2.5 text-sm font-medium text-heading">Your email</label>
        <input type="text" id="text" 
        class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" 
        placeholder="Username" 
        required value={username}
        onChange={(e) => setUsername(e.target.value)}/>
    </div>
    <div class="mb-5">
        <label for="password" class="block mb-2.5 text-sm font-medium text-heading">Your password</label>
        <input type="password" 
        id="password" 
        class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" 
        placeholder="••••••••" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required />
    </div>

    <button type="submit" class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Log in</button>
    </form>

      )}
    </div>
  );
}