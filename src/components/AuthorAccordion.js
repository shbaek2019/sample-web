import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

export default function AuthorAccordion(props) {
  const { email, name, phoneNumber, companyAddress } = props.author;
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <CardActions>
            <Button size="small">About Author</Button>
          </CardActions>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "0 24px 24px 24px" }}>
          <Typography>{name}</Typography>
          <Typography>{email}</Typography>
          <Typography>{phoneNumber}</Typography>
          <Typography>{companyAddress}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
