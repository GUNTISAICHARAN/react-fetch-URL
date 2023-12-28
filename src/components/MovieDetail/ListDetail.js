import React from 'react'
import { useLocation } from 'react-router-dom';
import './ListDetails.css';



export const ListDetail = () => {

    const location = useLocation();
    const selectedMovie = location.state && location.state.selectedMovie;

  
    if (!selectedMovie) {
      // Handle the case where the selected movie is not available
      return <p>No movie selected</p>;
    }
  
    // Render details using the selectedMovie data



  return (
    <div>
      <img src={selectedMovie.image} alt={selectedMovie.title} style={{ width: '100%', height: '100%' }} />
            <div className="content-title"><b>Title:</b> {selectedMovie.title}</div><br />
            <div className="content-text"><b>Content:</b> {selectedMovie.content_text}</div><br />
            <div className="date-published"><b>Date Published:</b> {selectedMovie.date_published}</div><br />
            <a href={selectedMovie.url} className="details-link">Click here to get more details</a>
      {/* Display other movie details as needed */}
    </div>
  );
};

export default ListDetail;
