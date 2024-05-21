"use client";
import styles from "./page.module.css";
import {
  Backdrop,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useState,useEffect } from "react";
import { gapi } from 'gapi-script'
import GoogleLogin from "react-google-login";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { createUser } from "@/redux/states/user.state";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const clientID = '224231159731-oeg6o8hqcqu0kdg6cfoe5e7jj6uddser.apps.googleusercontent.com';

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      })
    }
    gapi.load("client:auth2",start)
  },[]);

  const [states, setStates] = useState({
    open: false,
  });

  const onSuccess = (response) => {
    const userNew = {
      givenName: response.profileObj.givenName,
      imageUrl: response.profileObj.imageUrl,
    };
    dispatch(createUser(userNew));
    router.push("/listadoPost");
  };

  const onFailure = () => {
    console.log("ERROR");
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={states.open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <h1 className={styles.h1}>Bienvenido a PostFig</h1>
      </div>
      <Card sx={{ maxWidth: 600, background: "#FEDD63" }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className={styles.text1}
          >
            Iniciar Sesión
          </Typography>
          <GoogleLogin 
            clientId={clientID}
            onSuccess={onSuccess}
            onFailure={onFailure}
          />
        </CardContent>
      </Card>
    </>
  );
}
