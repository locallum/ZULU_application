/**
 * The Home screen displays saved graphs for a signed-in user.
 */
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './Home.css';
import React from 'react';
import { useState } from "react";

const tables = [
  {
    caption: "Most Populated LGAs",
    data: [
      ["1", "Blacktown", "455740"],
      ["2", "Canterbury-Bankstown", "387605"],
      ["3", "Central Coast NSW", "387605"],
      ["4", "Parramatta", "277173"],
      ["5", "Liverpool", "268916"]
    ]
  },
  {
    caption: "Least Populated LGAs",
    data: [
      ["1", "Brewarrina", "2066"],
      ["2", "Central Darling", "2159"],
      ["3", "Balranald", "2284"],
      ["4", "Bourke", "2391"],
      ["5", "Bogan", "2502"]
    ]
  },
  {
    caption: "Fastest Growing LGAs",
    data: [
      ["1", "Warren", "2979"],
      ["2", "Walcha", "3146"],
      ["3", "Balranald", "2284"],
      ["4", "Gilgandra", "3563"],
      ["5", "Weddin", "3594"]
    ]
  },
  {
    caption: "Slowest Growing LGAs",
    data: [
      ["1", "Central Darling", "2159"],
      ["2", "Hay", "2866"],
      ["3", "Narrandera", "5901"],
      ["4", "Brewarrina", "2065"],
      ["5", "Lachlan", "6106"]
    ]
  }
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tables.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + tables.length) % tables.length);
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     nextSlide();
  //   }, 10000); // change slide every 10 seconds
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="background">
      {/* top of landing page */}
      <div className="title-container" style={{marginLeft: "10%", marginTop: "8%"}}>
        <h1 className="home-title" style={{color: "white"}}>Urban Metrics</h1>
        <h4 className="home-slogan" style={{color: "white", marginBottom: "30px"}}>Plan smarter. Live better.</h4>
        <Button variant="contained" style={{marginBottom: "13%"}} component={Link} to="/explorer">Plan Now</Button>
      </div>
      {/* What we do section */}
      <div className="services-container">
        <h2>What We Do</h2>
        <div className="box">
          <img src="data-gathering.png"/>
          <h4 className="blurb-title">Data Collection</h4>
          <p>We collect data from credible and recent sources including Transport NSW to bring you reliable and relevant data.</p>
        </div>
        <div className="box">
          <img src="retrieval.png"/>
          <h4 className="blurb-title">Data Retrieval</h4>
          <p>Our retrieval service lets you query the specific data you want from our extensive databases.</p>
        </div>
        <div className="box">
          <img src="data.png"/>
          <h4 className="blurb-title">Data Visualisation</h4>
          <p>We transform data into easy to analyse graphical reports that you can store in your account or download.</p>
        </div>
      </div>
      {/* Our data insights section */}
      <div className="data-container">
        <h2 className="data-title">Our Data Insights</h2>
        <div className="data-box">
          <img src="fleet.png"/>
          <h4 className="blurb-title">Traffic Volumes</h4>
          <p>We collect data from Transport NSW to deliver daily traffic volumes starting from 2006.</p>
        </div>
        <div className="data-box">
          <img src="continuous.png"/>
          <h4 className="blurb-title">Population Trends</h4>
          <p>We provide population projections of LGAs across NSW starting from 2021 until 2066.</p>
        </div>
        <div className="data-box">
          <img src="personality.png"/>
          <h4 className="blurb-title">Demographic Insights</h4>
          <p>We use census data to provide you insight into household demographics and behaviours.</p>
        </div>
      </div>
      {/* Trending statistics section with slideshow */}
      <div className="slideshow-container">
        <h2 className="stat-container">
          Trending Statistics
        </h2>
        {/* slideshow of statistics */}
        {tables.map((table, index) => (
          <div
            key={index}
            className={`mySlides ${index === currentIndex ? " active" : ""}`}
            style={{ display: index === currentIndex ? "block" : "none" }}
          >
            <h3 style={{ textAlign: "center", marginBottom: "10px", color: "black" }}>{table.caption}</h3>
            <table style={{marginBottom: "15px"}}>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>LGA Name</th>
                  <th>Population Estimate (2025)</th>
                </tr>
              </thead>
              <tbody>
                {table.data.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        {/* Side buttons to move forwards or backwards on a slide */}
        <a className="prev" onClick={prevSlide}>❮</a>
        <a className="next" onClick={nextSlide}>❯</a>
        {/* Dotted buttons to select slide */}
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          {tables.map((_, idx) => (
            <span
              key={idx}
              className={`dot${idx === currentIndex ? " active" : ""}`}
              onClick={() => setCurrentIndex(idx)}
            ></span>
          ))}
        </div>
      </div>
      {/* About us section */}
      <div className="about-container">
        <h3 className="about-title">About Us</h3>
        <p className="about-body" >Zulu Urban Metrics is your centralised urban planning data platform. We offer government agencies, property developers, retail operators and small businesses with insights to boost their decision making. Our statistics are sourced from transport NSW providing you with accurate, up-to-date and extensive data.</p>
      </div>
    </div>
  );
};

export default Home;
