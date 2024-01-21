import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const CharcterList = ({ characters, isLoading, onSelectId, selectId }) => {
  if (isLoading)
    return (
      <div className="characters-list">
        <h3 className="name">Data is Loading...</h3>
      </div>
    );

  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Charcter key={item.id} item={item}>
          <button className="icon red" onClick={() => onSelectId(item.id)}>
            {selectId == item.id ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </Charcter>
      ))}
    </div>
  );
};

export default CharcterList;

export const Charcter = ({ item, children }) => {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <h3 className="name">
        <span>{item.gender == "Male" ? "👨" : "👩‍🦰"}</span>
        <span>{item.name}</span>
      </h3>
      <div className="list-item__info info">
        <span className={`status ${item.status == "Dead" ? "red" : ""}`}></span>
        <span> {item.status} </span>
        <span> - {item.species}</span>
      </div>
      {children}
    </div>
  );
};
