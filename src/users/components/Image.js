import React from "react";

function Image({ url, photo, id, styling }) {
  
  return <img src={`${process.env.REACT_APP_API_URL}/user/${url}/${id}`} alt={url} className={styling} onError={i => i.target.src = `${photo}`} />;
}

export default Image;
