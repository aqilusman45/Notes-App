import { useState, useEffect } from "react";
import axios from "axios";

const NotesPage = () => {
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });

  const [updateForm, setUpdateForm] = useState({
    title: "",
    body: "",
    _id: null,
  });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/notes");
        setNotes(response.data.notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;
    setCreateForm({ ...createForm, [name]: value });
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/notes", createForm);
      setNotes([...notes, res.data.note]);
      setCreateForm({ title: "", body: "" });
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const deleteNote = async (_id) => {
    try {
      await axios.delete(`http://localhost:3000/notes/${_id}`);
      const newNotes = notes.filter((note) => note._id !== _id);
      setNotes(newNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleUpdateFieldChange = (e) => {
    const { value, name } = e.target;
    setUpdateForm({ ...updateForm, [name]: value });
  };

  const toggleUpdate = (value) => {
    setUpdateForm({ title: value.title, body: value.body, _id: value._id });
  };

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      const { title, body } = updateForm;
      const res = await axios.put(
        `http://localhost:3000/notes/${updateForm._id}`,
        { title, body }
      );
      const newNotes = [...notes];
      const noteIndex = notes.findIndex((note) => note._id === updateForm._id);
      newNotes[noteIndex] = res.data.note;
      setNotes(newNotes);
      setUpdateForm({ _id: null, title: "", body: "" });
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-4xl font-bold">Notes</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {notes &&
          notes.map((value) => (
            <div
              key={value._id}
              className="p-4 bg-white shadow-lg rounded-md"
            >
              <h2 className="text-xl font-bold mb-2 ">{value.title}</h2>
              <p>{value.body}</p>
              <div className="flex justify-between mt-4 gap-3">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  onClick={() => deleteNote(value._id)}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => toggleUpdate(value)}
                >
                  Update
                </button>
              </div>
            </div>
          ))}
      </div>
      {updateForm._id && (
        <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-md">
          <h2 className="text-2xl font-bold mb-4">Update Note</h2>
          <form onSubmit={updateNote}>
            <input
              className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleUpdateFieldChange}
              value={updateForm.title}
              name="title"
              placeholder="Title"
            />
            <textarea
              className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleUpdateFieldChange}
              value={updateForm.body}
              name="body"
              placeholder="Body"
              rows={4}
            />
            <button
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              type="submit"
            >
              Update Note
            </button>
          </form>
        </div>
      )}
      <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-4">Create Note</h2>
        <form onSubmit={createNote}>
          <input
            className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={updateCreateFormField}
            value={createForm.title}
            name="title"
            placeholder="Title"
          />
          <textarea
            className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={updateCreateFormField}
            value={createForm.body}
            name="body"
            placeholder="Body"
            rows={4}
          />
          <button
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            type="submit"
          >
            Create Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotesPage;
