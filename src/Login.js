import React, { useState } from "react";
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
// import SignUp from "./SignUp";
// import {Password} from "@mui/icons-material";

const useStyles = makeStyles({
  field: {
    marginTop: 50,
    marginBottom: 19,
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
    position: "absolute",
    bottom: 58,
    left: 126,
    maxHeight: 80,
    maxWidth: 100,
    fontFamily: "serif",
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
    bottom: -45,
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
    top: 200,
    fontSize: 30,
    maxWidth: 500,
    fontWeight: 400,
    fontFamily: "serif",
    color: "slateblue",
  },
  mainTitle: {
    position: "relative",
    color: "slateblue",
    top: 200,
    left: 440,
    fontFamily: "serif",
    fontSize: 60,
  },
  loginAdmin: {
    position: "relative",
    left: 1310,
    fontSize: 12,
    backgroundColor: "white",
    border: "blue",
    top: -230,
    fontFamily: "serif",
  },
  success:{
    position:"relative",
    left:50,
    fontSize:10,
    top:25,
    color:"red"
  },
});
function Login() {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [openSnackBAr, setOpenSnackBAR] = useState(false);
  function UserNameHandler(e)
  {
    setUsername(e.target.value)
    let UName=e.target.value;
    if(UName.length < 3)
    {
      setUsernameErr(true)
    }
    else
    {
      setUsernameErr(false)
    }
  }
  function PasswordHandler(e)
  {
    setPassword(e.target.value)
    let password=e.target.value;
    if(password.length < 1)
    {
      setPasswordErr(true)
    }
    else
    {
      setPasswordErr(false)
    }
  }

  /*const history=useHistory();
    useEffect(()=>{
        if(localStorage.getItem('user-info',JSON.stringify(u)))
        { history.push("/homepage") }
    },[] )*/
  async function Submit() {
    let item = { username: username, password: password };
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
        url: BASE_URL+"/userslogin/",
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
        const { token, first_name, username, state, id, is_subscribed} = response.data || {};

        let userObj = {
          token,
          first_name,
          username,
          state,
          id,
          is_subscribed
        };
        localStorage.setItem("current_user", JSON.stringify(userObj));
        history("/homepage");
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
                height: 330,
                p: 1,
                border: "2px solid",
                borderColor: "#89a0cc",
                left: 750,
                top: -50,
                position: "relative",
                borderRadius: 4,
                bgcolor: "",
              }}
          >
            <AppBar className={classes.bar} position="static">
              <Toolbar>
                <Typography className={classes.bartitle} variant="h5">
                  Login
                </Typography>
              </Toolbar>
            </AppBar>
            <Container>
              <Grid container direction={"column"} spacing={2}>
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
                {usernameErr?<Typography className={classes.success} >Field is empty!</Typography>:null}

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
                {passwordErr?<Typography className={classes.success} >Field is empty!</Typography>:null}

              </Grid>

              <Button
                  className={classes.button}
                  onClick={Submit}
                  variant="contained"
                  color="primary"
              >
                Login
              </Button>
            </Container>
            <Typography style={{   color:'#512ca8',fontFamily:"serif", left:70, height: 65, bottom:-27, position: "absolute" }}>Forgot Password?</Typography>
            <Link to={"/forgotpassword"} > <Typography style={{ color:'#512ca8',fontFamily:"serif", position:"absolute",bottom:13, left:190}}>Reset it!</Typography> </Link>

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

        <Snackbar
            open={openSnackBAr}
            autoHideDuration={6000}
            message={"Invalid Username or Password"}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            action={action}
        />
      </div>
  );
}
export default Login;