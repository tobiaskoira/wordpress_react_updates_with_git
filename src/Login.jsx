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
        alert("Вы вошли!"); // можно потом сделать красивее
      } else if (data.message) {
        setError(data.message);
      }
    } catch (err) {
      setError("Ошибка соединения");
    }
  }

  return (
    <div className="p-4 border rounded-base max-w-sm bg-neutral-primary-soft">
      {token ? (
        <p>Вы вошли!</p>
      ) : (
        <form onSubmit={handleLogin} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-3 py-2 border rounded-base"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 border rounded-base"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-base"
          >
            Log In
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      )}
    </div>
  );
}