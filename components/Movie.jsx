import React, { useState } from 'react'
import styles from "@/styles/Movie.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faVideo, faHeart } from '@fortawesome/free-solid-svg-icons';


function Movie(props) {
    const [personalNote, setNote] = useState(0);
    const [watchCount, setCount] = useState(0);
    const stars = [];
    const {poster,  title, overview, vote_average, vote_count, updateLikedMovies, isLiked} = props 
    for (let i = 0; i < 10; i++) {
      let style = {}
      if(i < vote_average - 1 ){
        style = {color: "#f1c40f"}
      }
      stars.push(<FontAwesomeIcon key={i} icon={faStar} style={style}/>);
    }
    
    const handleClick = (a, b)=>{
      setNote(b + 1)
      console.log(b);
    }
    
    const starmie = [];
    for (let i = 0; i < 10; i++) {
      let style = {}
      if(i < personalNote){
        style = {color: "#2196f3"}
        }
        starmie.push(<FontAwesomeIcon className={styles.icon} onClick={(event)=>handleClick(event, i)} key={i} icon={faStar} style={style}/>);
      }
      const viewClick = () => {
        setCount(watchCount + 1)
        
    };

    
    
    
    let heartStyle = { cursor: 'pointer' };
    const likeClick = () => {
      // shiftLike(!like)
      updateLikedMovies(title)
      console.log(title);
      // console.log(updateLikedMovies(title));
    };
    if (isLiked) {
      heartStyle = { color: 'red', cursor: 'pointer' };
    }
    
    return (
      <div className={styles.card}>
        <img className={styles.image} src={poster} alt={title} />
        <div className={styles.textContainer}>
          <span className={styles.name}>{title}</span>
          <p className={styles.descriptions}>{overview}</p>
        </div>
          <span className={styles.vote}>{stars} {vote_count}</span>
          <span className={styles.vote}>{starmie} {personalNote}</span>
          <span><FontAwesomeIcon className={styles.icon} onClick={() => viewClick()} icon={faVideo} style={{color: watchCount > 0 ? "#e74c3c" : "black"}}/>    {watchCount>0? watchCount:""}</span>
          <span><FontAwesomeIcon className={styles.icon} onClick={()=> likeClick()} icon={faHeart} style={heartStyle}/></span>
      </div>
    );
  }
  
  export default Movie;
  
