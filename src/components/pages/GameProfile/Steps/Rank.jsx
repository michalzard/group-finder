import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cypher from "../../../../assets/valorant/cypher.png";
import valoRanks from "../../../../assets/valorant/ranks/rankData";
import { setRank } from "../../../../redux/slices/profileCreation";

function ThirdStep({ game, nextStep }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(13);
  const dispatch = useDispatch();

  return (
    <section className="rank-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${Cypher})`,
        }}
      />
      <div className="rank-related">
        <Typography variant="h4" gutterBottom>
          Select your rank
        </Typography>
        <YourRank selected={selected} setSelected={setSelected} />
        <Button
          variant="contained"
          color="secondary"
          style={{
            alignSelf: "flex-end",
            marginTop: "5px",
          }}
          size="large"
          onClick={() => {
            dispatch(setRank(selected));
            navigate(`/creation/${game}/${nextStep}`);
          }}
        >
          Continue
        </Button>
      </div>
    </section>
  );
}

export default ThirdStep;

//onClick select numerical value that will represent rank and

function YourRank({ selected, setSelected }) {
  return (
    <div className="your_rank">
      {valoRanks.map((vRank, i) => (
        <RankButton
          key={i}
          imgSrc={vRank.src}
          selected={selected === vRank.value}
          onSelect={setSelected}
        />
      ))}
    </div>
  );
}

function RankButton({ imgSrc, name, selected, onSelect }) {
  return (
    <div
      className={`rank_button ${selected ? "rank_selected" : ""}`}
      onClick={() => {
        onSelect(name);
      }}
    >
      <img src={imgSrc} alt={name} />
    </div>
  );
}
