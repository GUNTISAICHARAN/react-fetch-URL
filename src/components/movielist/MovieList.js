import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './MovieList.css';
import { useNavigate } from 'react-router-dom';



export const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();



    // redirecting to the new page

    function listDetails(selectedMovie){

      navigate(`/listDetails`, { state: { selectedMovie } });
    };


    function gridDetails (selectedMovie){
      navigate(`/gridDetails`, { state: { selectedMovie } });
    };
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data is already stored in localStorage
        const storedData = localStorage.getItem('movieData');
        if (storedData) {
          setMovies(JSON.parse(storedData));
          setLoading(false);
        } else {
          const response = await fetch('https://rss.app/feeds/v1.1/tB0EFXcJcYYuOSDc.json');
          const data = await response.json();
          setMovies(data.items);
          localStorage.setItem('movieData', JSON.stringify(data.items));
          setLoading(false);
          const storedViewMode = localStorage.getItem('viewMode');
          setViewMode(storedViewMode || 'list');
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };


    fetchData()
  }, []); // Empty dependency array ensures useEffect runs only once (on mount)


  const toggleViewMode = () => {
    setViewMode((prevMode) => {
      const newMode = prevMode === 'list' ? 'grid' : 'list';
      // Store the updated view mode in local storage
      localStorage.setItem('viewMode', newMode);
      return newMode;
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (


    <div className='container'>
    <button onClick={toggleViewMode} className='button-15'>
      {viewMode === 'list' ? 'Switch to Grid View' : 'Switch to List View'}
    </button>

    {viewMode === 'list' ? (

      <div className='list-container'>
        {movies.map((movie, index) => (
          <div className='list-item' key={index}  onClick={() =>  listDetails(movie)} >
            <img src={movie.image} alt={movie.title} style={{ width: '100px', height: '100px' }} />
            <div className='list-item-data'>
            <b>Title:</b>{movie.title}<br></br>
            <b>Content:</b>{movie.content_text}<br></br>
            <b>date_published</b>{movie.date_published}<br></br>
            <a href={movie.url}> Click here to get more details</a>
            </div>
            </div>
        
        ))}
        </div>
    
    ) : (
      <div className='grid-container'>
        {movies.map((movie, index) => (
          <div key={index} className='grid-item' onClick={() =>  gridDetails(movie)} >
            <img src={movie.image} alt={movie.title} style={{ width: '150px', height: '150px' }} />
            <div className='movie-details'>
            Title:<h3 className='title'>{movie.title}</h3>
            <span><a href={movie.url}>Click for more details</a></span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  );
};

export default MovieList;