import React from "react";

import './Card.css';

function Card(props) {
  const classes = 'card ' + props.className;
  
  return <li className={classes}>{props.children}</li>
}

export default Card;