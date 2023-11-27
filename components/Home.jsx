import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import Movie from "./Movie";
import "antd/dist/antd.css";
import { Popover, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [likedMovies, updateList] = useState([]);
  const [movieList, updateMovies] = useState([]);
  const updateLikedMovies = (movieTitle) => {
    if (likedMovies.find((movie) => movie === movieTitle)) {
      updateList(likedMovies.filter((el) => el !== movieTitle));
    } else updateList([...likedMovies, movieTitle]);
  };

  let popoverMovies = likedMovies.map((movie, i) => {
    return (
      <li key={i}>
        {movie}
        <FontAwesomeIcon
          icon={faCircleXmark}
          onClick={() => updateLikedMovies(movie)}
          className={styles.crossIcon}
        />
      </li>
    );
  });

  const funk = async function () {
    const req = await fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=99a959537352a345ae214a14d1a4c48c"
    );
    const res = await req.json();
    const data = updateMovies(Object.entries(res.results));
  };

  useEffect(() => {
    funk();
  }, []);

  const movie = movieList.map((info, i) => {
    const isLiked = likedMovies.find((mov) => mov === info[1].title);
    return (
      <Movie
        key={i}
        className={styles.movieCard}
        {...info[1]}
        poster={`https://image.tmdb.org/t/p/w500${info[1].poster_path}`}
        updateLikedMovies={
          updateLikedMovies
        }
        isLiked={isLiked}
      />
    );
  });

  let popoverContent = (
    <div className={styles.popoverContent}>{popoverMovies}</div>
  );

  let el = likedMovies.length > 0 ? ` ♥ ${likedMovies.length} movie(s)` : "";

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logocontainer}>
          {/* <img src="logo.png" alt="Logo" /> */}
          <img className={styles.logo} src="logoletter.png" alt="Letter logo" />
        </div>
        <Popover
          title="Liked movies"
          content={popoverContent}
          className={styles.popover}
          trigger="click"
        >
          <Button>{el}</Button>
        </Popover>
      </div>
      <div className={styles.title}>LATEST RELEASES</div>
      <div className={styles.moviesContainer}>{movie}</div>
    </div>
  );
}

export default Home;
