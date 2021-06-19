import React, { useEffect, useRef } from "react";

function Image({ url, photo, id, hasImage, styling }) {
  const imageRef = useRef();
  useEffect(() => {
    imageRef.current.src = hasImage
      ? `${process.env.REACT_APP_API_URL}/user/${url}/${id}`
      : `${photo}`;
  }, [hasImage, url, id, photo]);
  return <img ref={imageRef} src={photo} alt={url} className={styling} />;
}

export default Image;
