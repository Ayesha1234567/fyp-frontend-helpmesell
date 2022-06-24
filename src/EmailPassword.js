import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {
    AppBar,
    Button,
    Container,
    Grid,
    Box,
    makeStyles,
    TextField,
    Toolbar,
    Typography,
    IconButton,
    Snackbar,
} from "@material-ui/core";
import { Wave } from "react-animated-text";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import {BASE_URL} from "./Constants";
import {Alert} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TableRow from "@mui/material/TableRow";
// import SignUp from "./SignUp";
// import {Password} from "@mui/icons-material";

const useStyles = makeStyles({
    field: {
        marginTop: 50,
        marginBottom: 10,
        left: 40,
        top: 0,
        width: 180,
        height: 1,
        position: "relative",
        fontFamily: "serif",
        display: "block",
        fontStyle: "inherit",
    },
    login: {
        position: "relative",
        left: -540,
        fontSize: 12,
        backgroundColor: "white",
        border: "white",
        top: 200,
    },
    button: {
        position: "relative",
        top: 145,
        left: 210,
        maxHeight: 80,
        maxWidth: 200,
        fontFamily: "serif",
    },
    success:{
        position:"relative",
        width:300,
        left:650,
        bottom:300
    },
    cont: { marginTop: 5, marginLeft: 24, fontSize: 30 },
    bar: {
        height: 50,
    },
    bartitle: {
        height: 46,
        position: "relative",
        left: -10,
        fontFamily: "serif",
    },
    bottom: {
        position: "relative",
        bottom: -593,
        left: -1,
    },

    mainHandler: {
        position: "relative",
        fontFamily: "serif",
    },
    title: {
        fontFamily: "serif",
    },
    textLogo: {
        position: "relative",
        left: 340,
        top: 240,
        fontSize: 30,
        maxWidth: 500,
        fontWeight: 400,
        fontFamily: "serif",
        color: "slateblue",
    },
    mainTitle: {
        position: "absolute",
        color: "slateblue",
        top: 230,
        left: 440,
        fontFamily: "serif",
        fontSize: 60,
    },
    loginAdmin: {
        position: "absolute",
        left: 1310,
        fontSize: 12,
        backgroundColor: "white",
        border: "blue",
        top: -10,
        fontFamily: "serif",
    },
    card:{
        position:"absolute",
        top:200,
        width:400,
        height:210,
        left:500,

    }
});


function EmailPassword() {
    const classes = useStyles();
    const history = useNavigate();
    function Submit()
    {
        history("/login")
    }
    return(
        <div>
            <Box sx={{ flexGrow: 5 }}>

                <AppBar position="static" className={classes.app}>

                    <Toolbar>
                    </Toolbar>
                </AppBar>
            </Box>
            <Card
                className={classes.card}
                sx={{ minWidth: 250, boxShadow: 2, padding: 2, margin: 1 }}
            >
                <CardContent>
                    <Typography  style={{  fontSize:20,top: 20, fontWeight:"bold",fontFamily:"serif",color: "#474bad", position: "absolute", width:350 }}>
                        Hello User,
                    </Typography>
                    <Typography style={{   top: 50,fontSize:20,fontFamily:"serif",color: "#474bad", position: "absolute", width:350 }} >
                       A recovery email has been sent to your email.<br/> Kindly check your email and click on the link to Reset your password
                    </Typography>
                </CardContent>
                <Button
                    className={classes.button}
                    onClick={Submit}
                    variant="contained"
                    color="primary"
                >
                  Back to Login
                </Button>

            </Card>

            <AppBar className={classes.bottom} position="static" color="primary">
                <Container maxWidth="md">
                    <Toolbar>
                        <Typography className={classes.writebottom} variant="body1" color="inherit" >

                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}
export default EmailPassword;