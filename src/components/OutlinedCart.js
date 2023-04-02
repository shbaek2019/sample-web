import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AuthorAccordion from "./AuthorAccordion";
import { useRouter } from "next/router";

export default function OutlinedCard(props) {
  const router = useRouter();
  //
  const { author, title, contents, category, publicYn, createdAt, id } = props.contents;

  const goToModifyPage = () => {
    router.push(`/article/modify/${id}`);
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              category : {category}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ cursor: "pointer", color: "#1C2536", marginBottom: "4px" }}
              onClick={goToModifyPage}
            >
              {title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {createdAt}
            </Typography>
            <Typography variant="body2" sx={{ minHeight: 80 }}>
              {contents}
            </Typography>
          </CardContent>
          <AuthorAccordion author={author} />
        </React.Fragment>
      </Card>
    </Box>
  );
}
