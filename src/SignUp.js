import React from "react";
import { useState } from "react";
import { Snackbar, Typography, IconButton } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Container, Grid } from "@material-ui/core";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, Toolbar, ButtonGroup, Button, AppBar } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import { Wave } from "react-animated-text";
import axios from "axios";
import {BASE_URL} from "./Constants";
import {Alert} from "@mui/material";

const useStyles = makeStyles({
    field: {
        marginTop: 40,
        marginBottom: 15,
        left: 1,
        top: -10,
        width: 180,
        height: 3,
        position: "relative",
        fontFamily: "serif",
        display: "block",
    },
    cont: { marginTop: 5, marginLeft: 24, fontSize: 30 },
    button: {
        position: "absolute",
        bottom: 40,
        left: 325,
        maxHeight: 80,
        maxWidth: 100,
        fontFamily: "serif",
    },
    contain: {
        backgroundColor: "yellow",
    },
    mainTitle: {
        position: "relative",
        color: "slateblue",
        top: 240,
        left: 30,
        fontFamily: "serif",
        fontSize: 80,
    },
    login: {
        position: "relative",
        left: 770,
        fontSize: 12,
        backgroundColor: "white",
        border: "blue",
        fontFamily: "serif",
    },
    bottom: {
        position: "absolute",
        bottom: -40,
    },
    writeBottom: {
        position: "relative",
        left: 340,
        fontFamily: "serif",
    },

    textLogo: {
        position: "relative",
        right: -90,
        top: 250,
        fontSize: 40,
        maxWidth: 530,
        fontWeight: 400,
        fontFamily: "serif",
        color: "slateblue",
    },
    mainHandler: {
        position: "relative",
        left: 850,
        top: -20,
        fontFamily: "serif",
    },
    title: {
        fontFamily: "serif",
    },
    uptoolbar: {
        height: 10,
    },
    success:{
        position:"relative",
        left:20,
        fontSize:10,
        top:19,
        color:"red"
    },
    error:{
        position:"relative",
        left:20,
        fontSize:10,
        top:119,
        color:"red"
    },
    successTwo:{
        position:"relative",
        width:300,
        left:500,
        top:-560
    },
});

function SignUp() {
    const classes = useStyles();
    const [firstName, setFirstName] = useState("");
    const [fNameErr, setFNameErr] = useState(false);
    const [lastName, setLastName] = useState("");
    const [lNameErr, setLNameErr] = useState(false);
    const [username, setUsername] = useState("");
    const [uNameErr, setUNameErr] = useState(false);
    const [repeatUserError, setRepeatUserError] = useState(false);
    const [UserAlreadyErr, setUserAlreadyErr] = useState(false);
    const [email, setEmail] = useState("");
    const [repeatEmailError, setRepeatEmailError] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [contactNo, setContactNo] = useState("");
    const [contactNoErr, setContactNoErr] = useState("");
    const [dob, setDob] = useState("");
    const [dobErr,setDOBErr]=useState(false);
    const [password, setPassword] = useState("");
    const[passwordErr,setPasswordErr] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const[cPasswordErr,setCPasswordErr] = useState(false);
    const [openSnackBAr, setOpenSnackBAR] = useState(false);
    const [snackMessage, setSnackMesaage] = useState('')



    const history = useNavigate();

    async function Submit() {

        let item = {
            first_name: firstName,
            last_name: lastName,
            username: username,
            email: email,
            contact_no: contactNo,
            dob: dob,
            password: password,
            state:3,
        };
        if(username === username)
        {
            setRepeatUserError(true)
            // setOpenSnackBAR(true)

        }
        else {
            setRepeatUserError(false)
            // setOpenSnackBAR(false)
        }
        if(email === email)
        {
            // setRepeatEmailError(true)
            setOpenSnackBAR(true)

        }
        else {
            // setRepeatEmailError(false)
            setOpenSnackBAR(false)
        }

        console.log("In the submit function: ", item);
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(item),
        };
        try {
            const response = await axios({
                url: BASE_URL+"/users/",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                data: item,
            });

            const { data } = response || {};
            if (data.username) {
                history("/login");
            }
        } catch (error) {
            console.log("error", { error });
            const { response } = error;
            const { data } = response;
            const { message } = data;
            setSnackMesaage(message || error.message || 'Sign Up Failed')
            setOpenSnackBAR(true);
          }
    } 
    const closeTwo = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setRepeatUserError(false)}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );
    const closeThree = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setRepeatEmailError(false)}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    function FirstNameHandler(e)
    {
        setFirstName(e.target.value)
        let FName=e.target.value;
        if(FName.length < 1)
        {
            setFNameErr(true)
        }
        else
        {
            setFNameErr(false)
        }
    }

    function LastNameHandler(e)
    {
        setLastName(e.target.value)
        let LName=e.target.value;
        if(LName.length < 1)
        {
            setLNameErr(true)
        }
        else
        {
            setLNameErr(false)
        }
    }

    function UserNameHandler(e)
    {
        setUsername(e.target.value)
        let UName=e.target.value;
        if(UName.length < 3)
        {
            setUNameErr(true)
        }
        else
        {
            setUNameErr(false)
        }
        if(UName == username)
        {
            setUserAlreadyErr(true)
        }
        else
        {
            setUserAlreadyErr(false)
        }
    }
    const validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    function EmailHandler(e)
    {
        setEmail(e.target.value)
        let email=e.target.value;
        if (!validateEmail(email)) {
            setEmailErr(true);
        }
        else {
            setEmailErr(false);
        }
    }

    function ContactNoHandler(e)
    {
        setContactNo(e.target.value)
        let contactNo=e.target.value;
        if( !(contactNo.match('[0-9]{10}')) ){
            setContactNoErr(true)
        }else{
            setContactNoErr(false)
        }
    }
    function DateValidator(e)
    {
        setDob(e.target.value)
        let date=e.target.value;
        if(date.match(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/))
        {
            setDOBErr(false)
        }
        else {
            setDOBErr(true)
        }
    }

    function PasswordHandler(e)
    {
        setPassword(e.target.value)
        let password=e.target.value;
        if(password.length<8)
        {
            setPasswordErr(true)
        }
        else
        {
            setPasswordErr(false)
        }
    }

    function ConfirmPasswordHandler(e)
    {
        setConfirmPassword(e.target.value)
        let CPassword=e.target.value;
        if(CPassword !== password)
        {
            setCPasswordErr(true)
        }
        else
        {
            setCPasswordErr(false)
        }
    }


    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setOpenSnackBAR(false)}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <div>
            <AppBar position="static">
                <Toolbar className={classes.uptoolbar}>
                    <Typography variant="h6" className={classes.title}>
                        HelpMeSell
                    </Typography>
                    <Typography className={classes.mainTitle}>HelpMeSell</Typography>
                    <ButtonGroup>
                    </ButtonGroup>
                </Toolbar>
            </AppBar>

            <Typography className={classes.textLogo}>
                <Wave
                    text="Make Your Buying Decisions        SMARTER!"
                    effect="stretch"
                    effectChange={1.2}
                />{" "}
            </Typography>

            <form>
                <Box
                    className={classes.mainHandler}
                    sx={{
                        width: 430,
                        height: 440,
                        p: 1,
                        border: "2px solid",
                        borderColor: "#89a0cc",
                        position: "relative",
                        borderRadius: 4,
                        bgcolor: "",
                    }}
                >
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h5" className={classes.title}>
                                SignUp
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Container>
                        <Grid container direction={"row"} spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    className={classes.field}
                                    required
                                    value={firstName}
                                    onChange={FirstNameHandler}
                                    id="outlined-basic"
                                    label="First Name"
                                    variant="outlined"
                                    size="small"
                                    First
                                    Name
                                />
                                {fNameErr?<Typography className={classes.success} >Field is empty!</Typography>:null}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className={classes.field}
                                    required
                                    value={lastName}
                                    onChange={LastNameHandler}
                                    id="outlined-basic"
                                    label="Last Name"
                                    variant="outlined"
                                    size="small"
                                />
                                {lNameErr?<Typography className={classes.success} >Field is empty!</Typography>:null}
                            </Grid>
                        </Grid>

                        <Grid container direction={"row"} spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    className={classes.field}
                                    required
                                    value={username}
                                    onChange={UserNameHandler}
                                    id="outlined-basic"
                                    label="Username"
                                    variant="outlined"
                                    size="small"
                                    Username
                                />
                                {uNameErr?<Typography className={classes.success} >At least 5 alphabets long!</Typography>:null}

                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className={classes.field}
                                    type={"email"}
                                    required
                                    value={email}
                                    onChange={EmailHandler}
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    size="small"
                                    Email
                                />
                                {emailErr?<Typography className={classes.success} >Enter a valid Email!</Typography>:null}
                            </Grid>
                        </Grid>

                        <Grid container direction={"row"} spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    className={classes.field}
                                    type={"number"}
                                    required
                                    value={contactNo}
                                    onChange={ContactNoHandler}
                                    id="outlined-basic"
                                    label="Contact No"
                                    variant="outlined"
                                    size="small"
                                    Contact
                                    No
                                />
                                {contactNoErr?<Typography className={classes.success} >Enter a valid Contact Number!</Typography>:null}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className={classes.field}
                                    required
                                    value={dob}
                                    label={"DD/MM/YYYY"}
                                    onChange={DateValidator}
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    views={['day']}
                                    Dob
                                />
                                {dobErr?<Typography className={classes.success} >Enter a valid Date!</Typography>:null}
                            </Grid>
                        </Grid>

                        <Grid container direction={"row"} spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    className={classes.field}
                                    type={"password"}
                                    required
                                    value={password}
                                    onChange={PasswordHandler}
                                    id="outlined-basic"
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    Password
                                />
                                {passwordErr?<Typography className={classes.success} >Password is too weak!</Typography>:null}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className={classes.field}
                                    type={"password"}
                                    required
                                    value={confirmPassword}
                                    onChange={ConfirmPasswordHandler}
                                    id="outlined-basic"
                                    label="Confirm Password"
                                    variant="outlined"
                                    size="small"

                                />
                                {cPasswordErr?<Typography className={classes.success} >Password does not match</Typography>:null}
                            </Grid>
                        </Grid>

                        <Button
                            className={classes.button}
                            onClick={Submit}
                            variant="contained"
                            color="primary"
                        >
                            Signup
                        </Button>
                        <Link to={"/signuplocalseller/"}>
                            <Typography style={{position:"absolute",top:390}}>Signup as a local seller</Typography> </Link>
                        <Typography style={{position:"absolute",top:390,left:210}}>Or</Typography>
                        <Link to={"/login"} > <Typography style={{position:"absolute",top:390,left:240}}>Login</Typography> </Link>

                    </Container>
                </Box>
            </form>
            {repeatUserError?<Alert action={closeTwo} className={classes.successTwo} severity="error">Username Already Exists!</Alert>:null}
            <br/>
            {/*{repeatEmailError?<Alert action={closeThree} className={classes.successTwo} severity="error">Email Already Exists!</Alert>:null}*/}
            <AppBar className={classes.bottom} position="static" color="primary">
                <Container maxWidth="md">
                    <Toolbar>
                        <Typography
                            className={classes.writeBottom}
                            variant="body1"
                            color="inherit"
                        >
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            {
                <Snackbar
                    open={openSnackBAr}
                    autoHideDuration={6000}
                    message={"Signup Unsuccessful!"}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    action={action}
                />
            }
        </div>
    );
}
export default SignUp;