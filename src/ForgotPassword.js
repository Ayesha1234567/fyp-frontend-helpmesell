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
        top: 55,
        left: 90,
        maxHeight: 80,
        maxWidth: 100,
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
        bottom: -285,
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
});
function Login() {
    const history = useNavigate();
    const [email, setEmail] = useState("");
    const [openSnackBAr, setOpenSnackBAR] = useState(false);
    const [user,setUser]=useState({});
    const[subscribed,setSubscribed]=useState(false)
    const [success,setSuccess]=useState(false);
    const close = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"

            onClick={() => setSuccess(false)}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );
    /*const history=useHistory();
      useEffect(()=>{
          if(localStorage.getItem('user-info',JSON.stringify(u)))
          { history.push("/homepage") }
      },[] )*/
    async function Submit() {
        let item = { email: email };
        console.log(item);

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
                url: BASE_URL+"/api/ForgetPassword/",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                data: item,
            });

            console.log("this is the response: ", { response });
            //   const { data } = response;
            if (response.data.token) {
                const { token, first_name, username, state, id, is_subscribed,email} = response.data || {};

                let userObj = {
                    token,
                    first_name,
                    username,
                    state,
                    id,
                    is_subscribed,
                    email
                };
                localStorage.setItem("current_user", JSON.stringify(userObj));
                history("/homepage");
            }
            if (response.status==200||response.status==201)
            {
                localStorage.setItem('current_user', JSON.stringify(user))
                setSubscribed(true)
                console.log("in response 200")
            }
            // const response = await fetch('https://finalproject-helpmesell.herokuapp.com/userslogin/', requestOptions);
            // const data = await response.json();
            // this.setState({ postId: data.id });
            // let auth = await response.json()
            // if( response.status === 200 )
            //     history.push('/homepage')
            // else{
            // }
        } catch (error) {
            console.log("error", error);

            const { response } = error || {};
            const { data } = response || {};
            const { message } = data || {};
            setOpenSnackBAR(true);
        }
    }
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('current_user')))
    }, []);
    function AdminSubmit() {
        history.push("/adminlogin");
    }
    const classes = useStyles();

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
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        HelpMeSell
                    </Typography>
                </Toolbar>
            </AppBar>
            <Typography className={classes.mainTitle}>HelpMeSell</Typography>
            <Typography className={classes.textLogo}>
                <Wave
                    text="Make Your Buying Decisions                       SMARTER!"
                    effect="stretch"
                    effectChange={1.2}
                />{" "}
            </Typography>
            <form>
                <Box
                    sx={{
                        width: 300,
                        height: 200,
                        p: 1,
                        border: "2px solid",
                        borderColor: "#89a0cc",
                        left: 750,
                        top:50,
                        position: "relative",
                        borderRadius: 4,
                        bgcolor: "",
                    }}
                >
                    <AppBar className={classes.bar} position="static">
                        <Toolbar>
                            <Typography className={classes.bartitle} variant="h5">
                               Reset Password
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Container>
                        <Grid container direction={"column"} spacing={2}>
                            <TextField
                                className={classes.field}
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="outlined-basic"
                                label="abc@gmail.com"
                                variant="outlined"
                                size="small"

                            />

                        </Grid>

                        <Button
                            className={classes.button}
                            onClick={Submit}
                            variant="contained"
                            color="primary"
                        >
                            Reset
                        </Button>
                    </Container>

                </Box>
                <AppBar className={classes.bottom} position="static" color="primary">
                    <Container maxWidth="md">
                        <Toolbar>
                            <Typography
                                className={classes.writebottom}
                                variant="body1"
                                color="inherit"
                            >

                            </Typography>
                        </Toolbar>
                    </Container>
                </AppBar>
            </form>
            {success && <Alert  action={close}  className={classes.success} severity="success">File Uploaded Successfully</Alert>}

            <Snackbar
                open={openSnackBAr}
                autoHideDuration={6000}
                message={"Invalid Email"}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                action={action}
            />
        </div>
    );
}
export default Login;