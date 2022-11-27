import { Slider, Typography } from "@mui/material";
import React from "react";
import Cypher from "../../../../assets/valorant/cypher.png";

// import * as ranks from "../../../../assets/valorant/ranks/";

function ThirdStep({ game, nextStep }) {

  return (
    <section className="rank-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${Cypher})`,
        }}
      />
      <div className="rank-related">
        <Typography variant="h5">Select your rank</Typography>
        <div className="ranks">
          <RankRange/>
        </div>
      </div>
    </section>
  );
}

export default ThirdStep;

function RankRange(){
  return(
    <div className="rank-range">
    <Slider
    style={{width:"400px"}}
    value={[10,40]}
    ></Slider>
    </div>
  )
}