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
    loadTickets();
  }, []);

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
        <h1 className="text-2xl font-bold mb-6">My Tickets</h1>

        <form onSubmit={handleSubmit} className="mb-8 border p-4 rounded-base">
            <h2 className="text-xl font-semibold mb-4">Submit a Ticket</h2>

            <input
            type="text"
            placeholder="Ticket title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 mb-3 rounded-base"
            />

            <textarea
            placeholder="Describe your issue"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-3 mb-3 rounded-base min-h-[140px]"
            />

            <button
            type="submit"
            disabled={creating}
            className="border rounded-base px-4 py-2"
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
            {tickets.map((ticket) => (
                <a
                key={ticket.id}
                href={`/profile/tickets/${ticket.id}`}
                className="block border p-4 rounded-base"
                >
                <div className="flex justify-between gap-4">
                    <h3 className="font-semibold">{ticket.title}</h3>
                    <span className="text-sm">{ticket.status}</span>
                </div>
                <p className="mt-2 text-sm opacity-80">{ticket.content}</p>
                </a>
            ))}
            </div>
        )}
        </div>
    </div>
  );
}