import React, { useEffect, useState } from 'react'
import styles from "@/styles/Home.module.css"
import Movie from './Movie'
import 'antd/dist/antd.css';
import { Popover, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [likedMovies, updateList] = useState([])
  const [movieList, updateMovies] = useState([])
  const updateLikedMovies = (movieTitle) => {
    if(likedMovies.find(movie => movie === movieTitle)){
      updateList(likedMovies.filter(el=> el !== movieTitle))
    } else updateList(([...likedMovies, movieTitle]))
    console.log(likedMovies);
  };
  
  // const infoMovie = [
  //   {poster: "forrestgump.jpg", title: "Forrest Gump", overview:"A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case.",averageRating:9.2, countRating:22_705},
  //   {poster: "thedarkknight.jpg", title: "The Dark Knight", overview:"Batman raises the stakes in his war on crime and sets out to dismantle the remaining criminal organizations that plague the streets.",averageRating:8.5, countRating:27_547},
  //   {poster: "yourname.jpg", title: "Your name", overview:"High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places.",averageRating:8.5, countRating:8_691},
  //   {poster: "ironman.jpg", title: "Iron Man", overview:"After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",averageRating:7.6, countRating:22_7726},
  //   {poster: "inception.jpg", title: "Inception", overview:"Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life.",averageRating:8.4, countRating:31_546},
  // ]
  
  
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


const funk = async function(){
  const req = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=99a959537352a345ae214a14d1a4c48c");
  const res = await req.json()
  const data = updateMovies(Object.entries(res.results))
  // return data
}

useEffect(() => {
  funk()
}, []);
  
  const movie = movieList.map((info, i) => {
    console.log(info[1]);
    // let overview = info[1].overview
    // if(overview.kength > 250) overview.slice(0, 250) + "..."
  const isLiked = likedMovies.find(mov => mov === info[1].title);
  return (<Movie key={i} className={styles.movieCard} {...info[1]} /*overview={overview}*/ poster= {`https://image.tmdb.org/t/p/w500${info[1].poster_path}`} /*poster={info[1].poster_path} title={info[1].original_title} overview={info[1].overview} averageRating={info[1].vote_average} countRating={info[1].vote_count}*/ updateLikedMovies={updateLikedMovies} isLiked={isLiked} />)
 })

// data.map((info, i) => {
//   console.log(info[1]);
//   const isLiked = likedMovies.find(mov => mov === info[1].title);
//   return (<Movie key={i}  {...info[1]} /*poster={info[1].poster_path} title={info[1].original_title} overview={info[1].overview} averageRating={info[1].vote_average} countRating={info[1].vote_count}*/ updateLikedMovies={updateLikedMovies} isLiked={isLiked} />)
//  })

  console.log(movie);

  let popoverContent = (
    <div className={styles.popoverContent}>{popoverMovies}</div>
  );
  // const movie = infoMovie.map((info, i) => {
  //   const isLiked = likedMovies.find(mov => mov === info.title);
  //   return <Movie key={i} {...info} updateLikedMovies={updateLikedMovies} isLiked={isLiked} /*poster={info.poster} title={info.title} overview={info.overview} averageRating={info.averageRating} countRating={info.countRating}*/ />
  // })

    let el =likedMovies.length > 0 ? ` ♥ ${likedMovies.length} movie(s)`: "";
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logocontainer}>
        {/* <img src="logo.png" alt="Logo" /> */}
          <img className={styles.logo} src="logoletter.png" alt="Letter logo" />
        </div>
        <Popover title="Liked movies" content={popoverContent} className={styles.popover} trigger="click">
          <Button>{el}</Button>
        </Popover>
      </div>
      <div className={styles.title}>LATEST RELEASES</div>
      <div className={styles.moviesContainer}>
        {movie}
      </div>
    </div>
  );
}

export default Home;
