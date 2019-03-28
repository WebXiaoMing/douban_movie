import React from 'react'
import './index.scss'

const MovieItem = (rowData:any, sectionID:number|string, rowID:number|string) => {

   return (
      <div className="movie-item" key={`${rowID}-${sectionID}`}>
         <div className="movie-content">
           <img className="movie-image" src={ rowData.image || require('./default.gif') } alt=""/>
           <div className="movie-info">
              <div className="info-name">{ rowData.title }<span className="year-text">({ rowData.year })</span></div>
              <div className="star-content">
                 { rowData.stars.map((item: string, index: number) => {
                    return <i className={item} key={ index }></i>
                 }) }
                 <span>{ rowData.rating }</span>
              </div>
              <p className="genres-text">{ rowData.genres }</p>
              <p className="genres-text">{ `${rowData.directors} ${rowData.actors}` }</p>
           </div>
         </div>
      </div>
   )
}

export default MovieItem