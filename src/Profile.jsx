import React, { useEffect, useState } from "react";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Получаем токен из localStorage
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
 

    async function fetchUser() {
      try {
        const res = await fetch("/wp-json/mytheme/v1/user-data", {
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
      <aside className=" w-64  bg-neutral-primary-soft border-e border-default p-4 overflow-y-auto">
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
            <a href="/profile/tickets" className="flex items-center px-2 py-1.5 hover:bg-neutral-tertiary rounded-base">
              My Tickets
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
        <p>Username: {userData.slug}</p>
        <p>Registration Date: {userData.registered_date}</p>
      
      </div>
    </div>
  );
}