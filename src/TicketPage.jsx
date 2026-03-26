import React, { useEffect, useState } from "react";

export default function TicketPage() {
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loadingTicket, setLoadingTicket] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [sending, setSending] = useState(false);

  const token = localStorage.getItem("jwtToken");

  const params = new URLSearchParams(window.location.search);
  const ticketId = params.get("ticket_id");

  useEffect(() => {
    if (!ticketId) {
      setLoadingTicket(false);
      setLoadingMessages(false);
      return;
    }

    async function loadTicket() {
      try {
        const res = await fetch(`/wp-json/mytheme/v1/tickets/${ticketId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setTicket(data);
        } else {
          console.error(data.message || "Failed to load ticket");
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingTicket(false);
      }
    }

    async function loadMessages() {
      try {
        const res = await fetch(`/wp-json/mytheme/v1/tickets/${ticketId}/messages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setMessages(Array.isArray(data) ? data : []);
        } else {
          console.error(data.message || "Failed to load messages");
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingMessages(false);
      }
    }

    loadTicket();
    loadMessages();
  }, [ticketId, token]);

  async function handleSend(e) {
    e.preventDefault();

    if (!message.trim()) return;

    setSending(true);

    try {
      const res = await fetch(`/wp-json/mytheme/v1/tickets/${ticketId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [...prev, data]);
        setMessage("");
      } else {
        alert(data.message || "Failed to send message");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  }

  if (!ticketId) {
    return <div className="p-4">Ticket ID not found.</div>;
  }

  if (loadingTicket) {
    return <div className="p-4">Loading ticket...</div>;
  }

  if (!ticket) {
    return <div className="p-4">Ticket not found or access denied.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <a
        href="/profile/tickets"
        className="inline-block mb-4 border rounded-base px-4 py-2"
      >
        ← Back to tickets
      </a>

      <div className="border rounded-base p-6 mb-6">
        <div className="flex justify-between gap-4 mb-3">
          <h1 className="text-2xl font-bold">{ticket.title}</h1>
          <span className="border rounded-base px-3 py-1 text-sm">
            {ticket.status}
          </span>
        </div>

        <div className="text-sm opacity-70 mb-4">
          {ticket.date} · {ticket.author}
        </div>

        <div className="whitespace-pre-line">{ticket.content}</div>
      </div>

      <div className="border rounded-base p-6">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>

        {loadingMessages ? (
          <div>Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="mb-4">No messages yet.</div>
        ) : (
          <div className="space-y-4 mb-6">
            {messages.map((item) => {
              const isAdmin = item.author_role === "administrator" || item.is_admin || item.author === "admin";
              const messageClass = isAdmin
                ? "border rounded-base p-4 bg-blue-50 border-blue-200 text-blue-900"
                : "border rounded-base p-4 bg-neutral-50 border-neutral-200";

              return (
                <div key={item.id} className={messageClass}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold">{item.author}</div>
                    {isAdmin && (
                      <span className="text-xs font-semibold text-blue-700 uppercase">Admin</span>
                    )}
                  </div>
                  <div className="text-sm opacity-70 mb-2">{item.date}</div>
                  <div className="whitespace-pre-line">{item.content}</div>
                </div>
              );
            })}
          </div>
        )}

        <form onSubmit={handleSend}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a reply..."
            className="w-full border p-3 rounded-base min-h-[140px] mb-3"
          />

          <button
            type="submit"
            disabled={sending}
            className="border rounded-base px-4 py-2"
          >
            {sending ? "Sending..." : "Send message"}
          </button>
        </form>
      </div>
    </div>
  );
}