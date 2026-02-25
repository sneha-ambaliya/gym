import { useEffect, useState } from "react";
import api from "../utils/api";

const NotesSection = () => {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    api.get("/users/profile").then((res) => setNotes(res.data.notes));
  }, []);

  const add = async () => {
    const { data } = await api.post("/users/notes", { text });
    setNotes(data);
    setText("");
  };

  const remove = async (id) => {
    const { data } = await api.delete(`/users/notes/${id}`);
    setNotes(data);
  };

  return (
    <div className="bg-[#1E1E1E] p-6 rounded-2xl">
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 bg-black"
        />
        <button onClick={add} className="bg-[#FF6A00] px-4">Add</button>
      </div>

      <ul className="mt-4 space-y-2">
        {notes.map((n) => (
          <li key={n._id} className="bg-black p-2 flex justify-between">
            {n.text}
            <button onClick={() => remove(n._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesSection;
