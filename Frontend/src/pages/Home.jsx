import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const addNote = (e) => {
    e.preventDefault();
    if (!title || !desc) return;
    const newNote = { id: Date.now(), title, desc };
    setNotes([newNote, ...notes]);
    setTitle("");
    setDesc("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const startEdit = (note) => {
    setEditId(note.id);
    setEditTitle(note.title);
    setEditDesc(note.desc);
  };

  const saveEdit = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, title: editTitle, desc: editDesc } : note
      )
    );
    setEditId(null);
    setEditTitle("");
    setEditDesc("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      {/* Top bar with Logout */}
      {/* Top bar with Branding + Logout */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between", // left + right
    alignItems: "center",
    marginBottom: "2rem",
  }}
>
  {/* Left side brand text */}
  <h1
    style={{
      margin: 0,
      color: "white",
      fontSize: "1.5rem",
      fontWeight: "bold",
      letterSpacing: "1px",
    }}
  >
    Notes <span style={{ color: "#ffd700" }}>Academy</span>
  </h1>

  {/* Right side logout */}
  <button
    onClick={handleLogout}
    style={{
      padding: "10px 16px",
      background: "#ff4d4d",
      border: "none",
      borderRadius: "8px",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    Logout
  </button>
</div>


      {/* Note Input Form */}
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          maxWidth: "600px",
          margin: "0 auto 2rem auto",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "1rem", color: "#333" }}>Add a Note</h2>
        <form
          onSubmit={addNote}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "1rem",
            }}
          />
          <textarea
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows="4"
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "1rem",
              resize: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              background: "#2575fc",
              color: "white",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Add Note
          </button>
        </form>
      </div>

      {/* Notes Container */}
      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // smaller min size
    gap: "0.8rem", // reduced gap
    maxWidth: "800px", // overall narrower grid
    margin: "0 auto",
  }}
>

        {notes.map((note) => (
          <div
  key={note.id}
  style={{
    background: "white",
    padding: "0.8rem", // less padding
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)", // softer shadow
    minHeight: "140px", // smaller height
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }}
>

            {editId === note.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    marginBottom: "6px",
                  }}
                />
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  rows="3"
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    marginBottom: "6px",
                    resize: "none",
                  }}
                />
                <button
                  onClick={() => saveEdit(note.id)}
                  style={{
                    padding: "8px",
                    border: "none",
                    borderRadius: "8px",
                    background: "green",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                {/* Title and Description with reduced margin */}
                <div>
                  <h3
                    style={{
                      margin: "0 0 4px 0",
                      color: "#333",
                      fontSize: "1.1rem",
                    }}
                  >
                    {note.title}
                  </h3>
                  <p style={{ margin: "0", color: "#555", fontSize: "0.95rem" }}>
                    {note.desc}
                  </p>
                </div>

                {/* Action buttons */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <button
                    onClick={() => startEdit(note)}
                    style={{
                      flex: 1,
                      padding: "8px",
                      marginRight: "5px",
                      border: "none",
                      borderRadius: "8px",
                      background: "#2575fc",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    style={{
                      flex: 1,
                      padding: "8px",
                      marginLeft: "5px",
                      border: "none",
                      borderRadius: "8px",
                      background: "red",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}