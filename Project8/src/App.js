import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // with promise
  function fetchMoviesHandler() {
    fetch('https://swapi.dev/api/films')
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data.results);
        const transformedMovies = data.json().results.map(movie => {
          return {
            id: movie.episode_id,
            title: movie.title,
            openingText: movie.opening_crawl,
            releaseDate: movie.release_date
          }
        });

        setMovies(transformedMovies);
      })
      .catch(err => {
        setError(err.message);
      });
  }

  // with async await
  const asyncFetchMoviesHandler = useCallback(async() => {
      setIsLoading(true);
      try {
        const response = await fetch('https://react-http-2cdd5-default-rtdb.firebaseio.com/movies.json');
        const data = await response.json();
        const loadedMovies = [];

        for (const key in data) {
          loadedMovies.push({
            id: key,
            title: data[key].title,
            openingText: data[key].openingText,
            releaseDate: data[key].releaseDate,
          })
        };

        // if (!data.ok) {
        //   throw new Error('Something went wrong!');
        // }

        // const transformedMovies = response.results.map(movie => {
        //   return {
        //     id: movie.episode_id,
        //     title: movie.title,
        //     openingText: movie.opening_crawl,
        //     releaseDate: movie.release_date
        //   }
        // });
        setMovies(loadedMovies);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
    }
  }, []);

  useEffect(() => {
    asyncFetchMoviesHandler();
  }, [asyncFetchMoviesHandler]);

  const addMovieHandler = async(movie) => {
    try {
      console.log('movie ', movie);
      setMovies((prevMovies) => [...prevMovies, movie]);
      const response = await fetch('https://react-http-2cdd5-default-rtdb.firebaseio.com/movies.json', {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log('data ', data);
    } catch (err) {
      setError(err.message);
    }  
  };

  let content = null;
  
  if (error) {
    content = <p style={{color: 'red', fontWeight: 'bold'}}>{error}</p>;;
  } 

  if ((isLoading || movies.length) && !error) {
    content = <p>Loading...</p>;
  } 
  
  if (!isLoading && movies.length && !error) {
    content = <MoviesList movies={movies} />;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={asyncFetchMoviesHandler}>Fetch Movies</button>
      </section>
      {content &&
        <section>{content}</section>
      } 
    </React.Fragment>
  );
}

export default App;
