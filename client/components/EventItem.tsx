import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from  './EventItem.module.scss'
import { RootState } from "../store/Index";


export const EventItem = () => {
    const { id } = useParams();
    const { events} = useSelector((state: RootState) => state.search
      );
      
    const event = events.find((e) => e.id.toString() === id);

    if (!event) {
      return <div>Событие не найдено</div>;
    }
  
    return (
        <>
          <div className={styles.eventItem}>
          <h2 className={styles.eventTitle}>{event.title}</h2>
          <img className={styles.eventImage} src={`${event.imageUrl}`}  alt={event.title} />

          <div className={styles.eventColumns}> 

          <div className={styles.eventColumn}> profile

          </div>
          <div className={styles.eventColumn}>

          <div className={styles.eventDescription}>{event.description}</div>
          <div className={styles.eventCity}>{event.city}</div>
          
                  <div className={styles.eventButtonContainer}>
                        <button className={styles.eventButton}>Задать вопрос</button>
                        <button className={styles.eventButton}>Я готов</button>
                        <button className={styles.eventButton}>Участники</button>
                   </div>
          </div>
          
          </div>

          </div>
        </>
      );
    }


           
    
          
   

  
     
   
     
    

      
        
     
    