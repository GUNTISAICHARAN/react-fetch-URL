
import './App.css';
import { MovieList } from './components/movielist/MovieList';
import { ListDetail } from './components/MovieDetail/ListDetail';
import { GridDetails } from './components/MovieDetail/GridDetails';
import { Route, Routes } from 'react-router-dom';




function App() {
  return (
    <Routes>
      <Route path="/" element={<MovieList/>} />
      <Route path="/listDetails" element={<ListDetail/>} />
      <Route path="/gridDetails" element={<GridDetails/>}/>

    </Routes>
  );
    }

export default App;
