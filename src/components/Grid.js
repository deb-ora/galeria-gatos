import React from "react";

export default function Grid({ images }) {
  return (
    <div className="grid">
      {images.map(image => (
        <figure className="gridItem">
          <img
            className="cat-image row"
            key={image.id}
            alt="cats filtered by categories"
            src={image.url}
          ></img>
        </figure>
      ))}
      
    </div>
  )
}
