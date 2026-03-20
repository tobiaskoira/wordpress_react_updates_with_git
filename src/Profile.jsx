import React, { useEffect, useState } from "react";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Получаем токен из localStorage
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login"; // редирект если нет токена
      return;
    }

    async function fetchUser() {
      try {
        const res = await fetch("/wp-json/wp/v2/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUserData(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [token]);

  if (loading) return <div>Loading profile...</div>;
  if (!userData) return <div>Failed to load user data</div>;

  return (
    <div className="flex">
      {/* Сайдбар */}
      <aside className="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0 bg-neutral-primary-soft border-e border-default p-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <li>
            <a href="/profile" className="flex items-center px-2 py-1.5 hover:bg-neutral-tertiary rounded-base">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/profile/posts" className="flex items-center px-2 py-1.5 hover:bg-neutral-tertiary rounded-base">
              My Posts
            </a>
          </li>
          <li>
            <a href="/profile/settings" className="flex items-center px-2 py-1.5 hover:bg-neutral-tertiary rounded-base">
              Settings
            </a>
          </li>
        </ul>
      </aside>

      {/* Контент */}
      <div className="p-4 sm:ml-64 flex-1">
        <h1 className="text-2xl font-bold mb-4">Welcome, {userData.name}</h1>
        <p>Email: {userData.email}</p>
        {/* Можно сюда рендерить отдельные компоненты для постов, заказов и т.д. */}
      </div>
    </div>
  );
}