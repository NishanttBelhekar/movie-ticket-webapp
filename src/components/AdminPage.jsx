import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const AdminPage = () => {
  const [movieName, setMovieName] = useState("");
  const [movieId, setMovieId] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "movies"), {
        movieName,
        movieId,
        posterUrl,
        description,
      });
      console.log("Document written with ID: ", docRef.id);
     
      setMovieName("");
      setMovieId("");
      setPosterUrl("");
      setDescription("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Add Movie</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Movie Name:</label>
            <input
              type="text"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Movie ID:</label>
            <input
              type="text"
              value={movieId}
              onChange={(e) => setMovieId(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Poster URL:</label>
            <input
              type="text"
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
