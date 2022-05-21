import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    marginBottom: 10,
    left: 25,
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
    top: 60,
    left: 100,
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
    bottom: -120,
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
});
function Login() {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [openSnackBAr, setOpenSnackBAR] = useState(false);

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
        const { token, first_name, username,state,id} = response.data || {};

        let userObj = {
          token,
          first_name,
          username,
          state,
          id,
          // is_subscribed
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
                height: 260,
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
                    onChange={(e) => setUsername(e.target.value)}
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    size="small"
                    Username
                />

                <TextField
                    className={classes.field}
                    type={"password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    size="small"
                    Password
                />
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
            message={"Sign In Failed"}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            action={action}
        />
      </div>
  );
}
export default Login;