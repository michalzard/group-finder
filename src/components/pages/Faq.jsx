import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import "../pages/Faq.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

function Faq() {
  const navigate = useNavigate();
  const fakeData = new Array(5).fill(true);
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <main className="faq">
      <Typography
        variant={isMobile ? "h5" : "h4"}
        color="lightgray"
        gutterBottom
      >
        Frequently asked questions
      </Typography>
      {fakeData.map((b, i) => {
        return <QuestionAndAnswer key={i} />;
      })}
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/")}
      >
        Back to main page
      </Button>
    </main>
  );
}

export default Faq;

function QuestionAndAnswer({question,answer}) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography> Question ?</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
