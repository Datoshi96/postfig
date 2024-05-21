"use client";
import { NavBar } from "@/components";
import { serviceGetPost } from "@/services/services";
import React, { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import { styled } from '@mui/material/styles';
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
import { red } from '@mui/material/colors';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export default function ListadoPost() {
  const [states, setStates] = useState({
    data: [],
    open: false,
  });
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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

  // const handleSearch = (e) => {
  //     setSearch(e.target.value);
  //     if (search.length > 1) {
  //       const filterValues = states.data.filter((row) => {
  //         const rowTitle = removeAccents(row.title.toLowerCase());
  //         const t = removeAccents(e.target.value.toLowerCase());
  //         if (rowTitle.includes(t)) {
  //           return true;
  //         }
  //         return false;
  //       });
  //       console.log(filterValues);
  //       setFilterData(filterValues);
  //     } else {
  //       setFilterData(states.data);
  //     }
  //   };
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
      <Box
        component="form"
        // sx={{
        //   "& > :not(style)": { m: 1, width: "60ch" },
        // }}
        noValidate
        autoComplete="off"
        className={styles.grid}
      >
        <TextField
          color="warning"
          value={search}
          // onChange={handleSearch}
          id="outlined-basic"
          label="Buscar"
          variant="outlined"
        />
      </Box>
      {states.data &&
        states.data.map((post, index) => {
          return (
            <div key={index}>
              <Divider></Divider>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title="Shrimp and Chorizo Paella"
                  subheader="September 14, 2016"
                />
                <CardMedia
                  component="img"
                  height="194"
                  image="/static/images/cards/paella.jpg"
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
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
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                      Heat 1/2 cup of the broth in a pot until simmering, add
                      saffron and set aside for 10 minutes.
                    </Typography>
                    <Typography paragraph>
                      Heat oil in a (14- to 16-inch) paella pan or a large, deep
                      skillet over medium-high heat. Add chicken, shrimp and
                      chorizo, and cook, stirring occasionally until lightly
                      browned, 6 to 8 minutes. Transfer shrimp to a large plate
                      and set aside, leaving chicken and chorizo in the pan. Add
                      pimentón, bay leaves, garlic, tomatoes, onion, salt and
                      pepper, and cook, stirring often until thickened and
                      fragrant, about 10 minutes. Add saffron broth and
                      remaining 4 1/2 cups chicken broth; bring to a boil.
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
                      Set aside off of the heat to let rest for 10 minutes, and
                      then serve.
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
              <Divider></Divider>
            </div>
          );
        })}
    </>
  );
}
