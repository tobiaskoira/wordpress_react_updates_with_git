import React, { useEffect, useState } from "react";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);

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
git
  useEffect(() => {
    if (!userData?.id) return;

    async function fetchUserPosts() {
      try {
        const res = await fetch(`/wp-json/wp/v2/posts?author=${userData.id}&per_page=100&_embed=1`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUserPosts(data);
      } catch (e) {
        console.error(e);
      } finally {
        setPostsLoading(false);
      }
    }

    fetchUserPosts();
  }, [userData, token]);

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
            <a href="/profile/settings" className="flex items-center px-2 py-1.5 hover:bg-neutral-tertiary rounded-base">
              Settings
            </a>
          </li>
        </ul>
      </aside>

      {/* Контент */}
      <div className="p-4 flex-1">
        <h1 className="text-2xl font-bold mb-4">Welcome, {userData.name}</h1>
        <p>Email: {userData.email}</p>
        <p>Username: {userData.slug}</p>
        <p>Registration Date: {userData.registered_date}</p>

        <h2 className="text-xl font-bold mt-8 mb-4">My Posts ({userPosts.length})</h2>

        {postsLoading ? (
          <div>Loading posts...</div>
        ) : userPosts.length === 0 ? (
          <div>No posts found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {userPosts.map((post) => (
              <div
                key={post.id}
                className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs"
              >
                <h5
                  className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <p
                  className="text-body mb-6"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <a
                  href={post.link}
                  className="inline-flex items-center text-black border rounded-base text-sm px-4 py-2.5"
                >
                  Read more →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}