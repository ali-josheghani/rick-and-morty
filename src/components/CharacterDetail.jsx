import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { LoaderIcon } from "react-hot-toast";

const CharacterDetail = ({ selectId, onAddFavourite, isAddToFavourute }) => {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setCharacter(null);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectId}`
        );
        setCharacter(data);
        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setEpisodes([episodeData].flat().slice(0, 5));
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    if (selectId) fetchData();
  }, [selectId]);

  if (isLoading)
    return (
      <h3 style={{ flex: 1 }} className="name">
        <LoaderIcon />
      </h3>
    );

  if (!character || !selectId)
    return (
      <h3 style={{ flex: 1 }} className="name">
        please select a character
      </h3>
    );
  return (
    <div style={{ flex: 1 }}>
      <CharacterSubInfo
        onAddFavourite={onAddFavourite}
        character={character}
        isAddToFavourute={isAddToFavourute}
      />
      <EpisodeList episodes={episodes} />
    </div>
  );
};

export default CharacterDetail;

const CharacterSubInfo = ({ onAddFavourite, character, isAddToFavourute }) => {
  return (
    <div className="character-detail">
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img"
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender == "Male" ? "👨" : "👩‍🦰"}</span>
          <span>&nbsp;{character.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${character.status == "Dead" ? "red" : ""}`}
          ></span>
          <span> {character.status} </span>
          <span> - {character.species}</span>
        </div>
        <div className="location">
          <p>last know location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          {isAddToFavourute ? (
            <p>Already Added to Favourites ✔️</p>
          ) : (
            <button
              onClick={() => onAddFavourite(character)}
              className="btn btn--primary"
            >
              Add to Favourite
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const EpisodeList = ({ episodes }) => {
  const [sortBy, setSortBy] = useState(true);
  let sortedEpisodes;
  sortBy
    ? (sortedEpisodes = [...episodes].sort(
        (a, b) => new Date(a.created) - new Date(b.created)
      ))
    : (sortedEpisodes = [...episodes].sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      ));

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>Last od Episodes</h2>
        <button onClick={() => setSortBy((is) => !is)}>
          <ArrowUpCircleIcon className="icon" style={{rotate:sortBy?'0deg':'180deg'}} />
        </button>
      </div>
      <ul>
        {sortedEpisodes.map((item, i) => (
          <li key={item.id}>
            <div>
              {String(i + 1).padStart(2, "0")} {item.episode} :{" "}
              <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
