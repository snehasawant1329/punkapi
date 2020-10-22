import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./DataItems.css";

function DataItems() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBeer, setFilteredBeer] = useState([]);
  const [fav, setFav] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.punkapi.com/v2/beers")
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredBeer(
      data.filter((data) => {
        return data.name.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, data]);

  return (
    <div>
      <div className="container">
        <label className="search-label" htmlFor="search-input">
          <input
            type="text"
            id="search-input"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="fa fa-search search-icon" />
        </label>
      </div>
      {filteredBeer.map((datas) => (
        <div className="cont" style={{ display: "inline-block" }}>
          <Card
            style={{
              width: "20rem",
              border:" 2px solid black",
              borderRadius:"20px",
              height: "16rem",
              background: "white",
              margin: "20px 24px",
              boxShadow: "3px 3px 3px #333333",
              marginLeft: "50%"
            }}
          >
            
          
            <Card.Img
              class="img1"
              variant="top"
              src={datas.image_url}
              height="150px"
            />

            <Card.Body>
              <Card.Title
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  textTransform: "uppercase",
                }}
              >
                {datas.name}
              </Card.Title>
              <Card.Text style={{ textAlign: "justify", fontSize: "15px" ,fontFamily:"sansserif",textAlign:"center"}}>
                {datas.tagline}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default DataItems;
