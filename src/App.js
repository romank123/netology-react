import React from "react";
import Card from "./components/Card/Card";
import "./App.css";

const cards = [
  {
    img: "logo512.png",
    text: `Some quick example text to build on the card title and make up the bulk of thr card's content`,
  },
  {
    title: "Special title treatment",
    text: "With supporting text below as a natural lead-in to additional content",
  },
];

function App() {
  return (
    <React.Fragment>
      {cards.map((o, index) => (
        <Card img={o.img} key={index}>
          {<h5 className='card-title'>{o.title || "Card title"}</h5>}
          {o.text && <p className='card-text'>{o.text}</p>}
          {
            <a href={o.btnhref || "#"} className='btn btn-primary'>
              {o.btnText || "Go somewere"}
            </a>
          }
        </Card>
      ))}
    </React.Fragment>
  );
}

export default App;
