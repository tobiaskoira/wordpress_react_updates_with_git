import React, { useEffect, useState } from "react";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const token = localStorage.getItem("jwtToken");

  async function loadTickets() {
    try {
      const res = await fetch("/wp-json/mytheme/v1/tickets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTickets(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let interval = null;

    const refresh = async () => {
      setLoading(true);
      await loadTickets();
    };

    // first load immediately
    loadTickets();

    // refresh every 10 seconds
    interval = setInterval(refresh, 10000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    setCreating(true);

    try {
      const res = await fetch("/wp-json/mytheme/v1/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();

      if (res.ok) {
        setTitle("");
        setContent("");
        setTickets((prev) => [data, ...prev]);
      } else {
        alert(data.message || "Failed to create ticket");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCreating(false);
    }
  }

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
        <div className="flex-1 p-4">
        <h1 className="text-4xl font-bold">My Tickets</h1>

        <form onSubmit={handleSubmit} className="grid gap-6 mb-6 justify-items-start">
            <h2 className="text-xl font-semibold mb-4text-3xl tracking-tight text-heading md:text-4xl">Submit a Ticket</h2>

            <input
            type="text"
            placeholder="Ticket title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            />

            <textarea
            placeholder="Describe your issue"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            />

            <button
            type="submit"
            disabled={creating}
            className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
            {creating ? "Submitting..." : "Submit Ticket"}
            </button>
        </form>

        {loading ? (
            <div>Loading tickets...</div>
        ) : tickets.length === 0 ? (
            <div>No tickets yet.</div>
        ) : (
            <div className="space-y-4">
            {tickets.map((ticket) => {
                const isAdmin = ticket.author_role === "administrator" || ticket.is_admin;
                const cardClasses = isAdmin
                  ? "block border border-blue-500 bg-blue-50 p-4 rounded-base"
                  : "block border border-neutral-200 bg-white p-4 rounded-base";

                return (
                  <a
                    key={ticket.id}
                    href={`/profile/ticket?ticket_id=${ticket.id}`}
                    className={cardClasses}
                  >
                    <div className="flex justify-between gap-4">
                      <h3 className="font-semibold">{ticket.title}</h3>
                      <span className="text-sm">{ticket.status}</span>
                    </div>
                    <p className="mt-2 text-sm opacity-80">{ticket.content}</p>
                    <p className="mt-2 text-xs text-neutral-500">{isAdmin ? "Admin response" : "User request"}</p>
                  </a>
                );
            })}
            </div>
        )}
        </div>
    </div>
  );
}