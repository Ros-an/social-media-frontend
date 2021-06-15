import React, { useState } from "react";
import "./About.css";

function About({ aboutInfo }) {
  const [show, setShow] = useState(false);
  return (
    <section className="about">
      <h4 className="heading">About</h4>
      <p className="about-yourself">
        {aboutInfo
          ? show
            ? `${aboutInfo}`
            : `${aboutInfo.substring(0, 80)}...`
          : `write something about yourself...`}
      </p>
      {aboutInfo && (
        <button className="show-btn" onClick={() => setShow(!show)}>
          {show ? "show less" : "show more"}
        </button>
      )}
    </section>
  );
}

export default About;
