import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { collection, getFirestore, query, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const db = getFirestore();
      const moviesCollection = collection(db, "movies");
      const q = query(moviesCollection);

      try {
        const querySnapshot = await getDocs(q);
        const moviesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Movies</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {movies.map((movie) => (
            <NavLink
              key={movie.id}
              to={`/movies/${movie.id}`} // Navigate to SingleMovie with movie ID
              className="group"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  alt={movie.imageAlt}
                  src={movie.posterUrl}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{movie.movieName}</h3>
              
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesList;
