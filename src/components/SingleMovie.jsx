import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useUser } from "../contexts/UserContext"; 

const SingleMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setMovie } = useUser(); 
  const [movie, setLocalMovie] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) {
        setError("Movie ID is undefined or null.");
        setLoading(false);
        return;
      }

      const firestore = getFirestore();
      const movieRef = doc(firestore, "movies", id);

      try {
        const docSnap = await getDoc(movieRef);
        if (docSnap.exists()) {
          const movieData = docSnap.data();
          setLocalMovie(movieData); 
          setMovie(movieData); 
        } else {
          setError("No such movie document!");
        }
      } catch (error) {
        setError("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, setMovie]);

  const handleProceed = () => {
    navigate(`/seat`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>No movie data found.</div>;
  }

  return (
    <div className="bg-white h-screen overflow-y-scroll w-full">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 py-8 sm:py-16">
        <div className="grid grid-cols-1 gap-y-10 sm:gap-y-16 sm:grid-cols-2">
          <div className="aspect-w-16 aspect-h-9 sm:aspect-w-3 sm:aspect-h-4 lg:aspect-w-4 lg:aspect-h-5 w-full overflow-hidden rounded-lg bg-gray-200">
            <img
              src={movie.posterUrl}
              alt={movie.imageAlt}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="sm:text-left text-center mt-6 sm:mt-0">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {movie.movieName}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-700">
              {movie.description}
            </p>
           
            <button
              className="mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-lg shadow-md"
              onClick={handleProceed}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;
