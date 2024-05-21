"use client";
import { NavBar } from "@/components";
import { serviceGetPost, serviceGetPostByTags } from "@/services/services";
import React, { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import { styled } from "@mui/material/styles";
import {
  Backdrop,
  CircularProgress,
  Box,
  TextField,
  Divider,
  IconButton,
  CardActions,
  Typography,
  CardContent,
  Card,
  Collapse,
  CardMedia,
  Avatar,
  CardHeader,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import { Stack } from "@mui/material";
import { Chip } from "@mui/material";
import { tags } from "@/utils/constans";
import { Accordion } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { AccordionDetails } from "@mui/material";
import { AccordionActions } from "@mui/material";
import { Button } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ListadoPost() {
  const [states, setStates] = useState({
    data: [],
    open: false,
    tags: tags,
    closeAc:false,
  });

  const [expanded, setExpanded] = useState(false);

  const [expanded2, setExpanded2] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
  };
  const loadData = async () => {
    const data = await serviceGetPost();
    if (data.data.data) {
      setStates({
        ...states,
        data: data.data.data,
      });
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("es-ES", options).format(
      date
    );
    return formattedDate;
  };
  const onClickTag = async(tag) => {
    const postNew = await serviceGetPostByTags(tag);
    setStates({
        ...states,
        data: postNew.data.data,
        closeAc:true
      });
  };


  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={states.open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <h1 className={styles.h1}>Listado de Post</h1>
      </div>
      <Accordion sx={{ margin: 5 }} onReset={states.closeAc}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Lista de tags
        </AccordionSummary>
        <AccordionActions>
          <div className={styles.flexcontainer}>
            {tags.map((tag2, i) => {
              return (
                <div key={i} className={styles.tags}>
                    <Stack
                      direction="row"
                      spacing={1}
                      borderColor={"#FDD100"}
                      sx={{ cursor: "pointer" }}
                    >
                  <Button onClick={()=> onClickTag(tag2)}>
                      <Chip label={tag2} />
                  </Button>
                    </Stack>
                </div>
              );
            })}
          </div>
        </AccordionActions>
      </Accordion>
      <div className={styles.flexcontainer}>
        {states.data &&
          states.data.map((post, index) => {
            return (
              <div key={index} className={styles.card}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ bgcolor: red[500] }}
                        aria-label="recipe"
                        src={post.owner.picture}
                      >
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={post.owner.firstName + " " + post.owner.lastName}
                    subheader={formatDate(post.publishDate)}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={post.image}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {post.text}
                    </Typography>
                    <CardContent sx={{ display: "flex" }}>
                      {post.tags.length > 0 &&
                        post.tags.map((tag, index) => {
                          return (
                            <Stack
                              direction="row"
                              spacing={1}
                              key={index}
                              borderColor={"#FDD100"}
                            >
                              <Chip label={tag} />
                            </Stack>
                          );
                        })}
                    </CardContent>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                      <Typography sx={{ fontSize: "13px" }}>
                        {post.likes}
                      </Typography>
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Comentarios:</Typography>
                      <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add
                        saffron and set aside for 10 minutes.
                      </Typography>
                      <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large,
                        deep skillet over medium-high heat. Add chicken, shrimp
                        and chorizo, and cook, stirring occasionally until
                        lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo
                        in the pan. Add pimentón, bay leaves, garlic, tomatoes,
                        onion, salt and pepper, and cook, stirring often until
                        thickened and fragrant, about 10 minutes. Add saffron
                        broth and remaining 4 1/2 cups chicken broth; bring to a
                        boil.
                      </Typography>
                      <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with
                        artichokes and peppers, and cook without stirring, until
                        most of the liquid is absorbed, 15 to 18 minutes. Reduce
                        heat to medium-low, add reserved shrimp and mussels,
                        tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just
                        tender, 5 to 7 minutes more. (Discard any mussels that
                        don&apos;t open.)
                      </Typography>
                      <Typography>
                        Set aside off of the heat to let rest for 10 minutes,
                        and then serve.
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </div>
            );
          })}
      </div>
    </>
  );
}
