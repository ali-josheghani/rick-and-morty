import React, { useEffect, useState } from "react";

import "./App.css";
import Navbar, {
  Favourites,
  FindCharacters,
  Search,
} from "./components/Navbar";
import CharcterList from "./components/CharcterList";
import CharacterDetail from "./components/CharacterDetail";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Modal from "./components/Modal";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectId, setSelectId] = useState(null);
  const [favourites, setFavourites] = useState( JSON.parse(localStorage.getItem("FAVOURITE")) || []);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`,
          { signal }
        );
        setCharacters(data.results.slice(0, 4));
      } catch ({ response }) {
        setCharacters([]);
        toast.error(response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    // if (query.length < 3) {
    //   setCharacters([]);
    //   return;
    // }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [query]);
  useEffect(()=>{
    localStorage.setItem("FAVOURITE",JSON.stringify(favourites))
  },[favourites])
  // useEffect(() => {
  //     async function fetchData() {
  //       try {
  //         setIsLoading(true);
  //         const res = await fetch("https://rickandmortyapi.com/api/character");
  //         console.log(res);
  //         if(!res.ok) throw new Error("Somthing Wrong!!");
  //         const data = await res.json();
  //         setCharacters(data.results.slice(0, 4));
  //       }catch (err) {
  //         console.log(err.message)
  //         toast.error(err.message)
  //       }finally{
  //         setIsLoading(false)
  //       }
  //     }
  //     fetchData();

  // }, []);
  const selectIdHandler = (id) => {
    setSelectId((prevId) => (prevId == id ? null : id));
  };
  const addFavouriteHandler = (char) => {
    setFavourites((prevFav) => [...prevFav, char]);
  };
  const deleteFavouriteHandler = (id) => {
    setFavourites((prevFav) => prevFav.filter((fav) => fav.id != id));
  };

  const isAddToFavourute = favourites.map((fav) => fav.id).includes(selectId);
  return (
    <div className="app">
      {/* <Modal open={true} title="head">sdetails</Modal> */}
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <FindCharacters numOfCharacters={characters.length} />
        <Favourites favourites={favourites} onDeleteFavourite={deleteFavouriteHandler} />
      </Navbar>
      <div className="main">
        <CharcterList
          characters={characters}
          selectId={selectId}
          isLoading={isLoading}
          onSelectId={selectIdHandler}
        />
        <CharacterDetail
          selectId={selectId}
          onAddFavourite={addFavouriteHandler}
          isAddToFavourute={isAddToFavourute}
        />
        <Toaster />
      </div>
    </div>
  );
};

export default App;
