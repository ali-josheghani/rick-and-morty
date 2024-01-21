import React, { useState } from "react";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { Charcter } from "./CharcterList";

const Navbar = ({ children }) => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">logo</div>
      {children}
    </nav>
  );
};

export default Navbar;

export const FindCharacters = ({ numOfCharacters }) => {
  return <div className="navbar__result">Find {numOfCharacters} charcters</div>;
};

export const Search = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="text-field"
      placeholder="search"
    />
  );
};

export const Favourites = ({ favourites, onDeleteFavourite }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal onOpen={setIsOpen} open={isOpen} title="List Of Favourite">
        {favourites.map((item) => (
          <Charcter key={item.id} item={item}>
            <button
              className="icon red"
              onClick={() => onDeleteFavourite(item.id)}
            >
              <TrashIcon />
            </button>
          </Charcter>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen((is) => !is)}>
        <HeartIcon className="icon" />
        <span className="badge">{favourites.length}</span>
      </button>
    </>
  );
};
