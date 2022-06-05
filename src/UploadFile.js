import React, {useEffect, useState} from "react"
import SearchIcon from '@mui/icons-material/Search';
import {Box, Container, Grid, IconButton, Snackbar, TextField} from "@material-ui/core";
import Drawer from '@mui/material/Drawer';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import AppsIcon from '@mui/icons-material/Apps';
import Collapse from '@mui/material/Collapse';
import { styled, alpha } from '@mui/material/styles';
import {BrowserRouter as Router, Link, Route, useNavigate} from 'react-router-dom'
import InputBase from '@mui/material/InputBase';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  ButtonGroup, Button
} from "@material-ui/core";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import axios from "axios";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CloseIcon from "@mui/icons-material/Close";
import {Alert} from "@mui/material";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {BASE_URL} from "./Constants";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import HomeIcon from '@mui/icons-material/Home';
import ReviewsIcon from "@mui/icons-material/Reviews";


const drawerWidth = 240;
const useStyles=makeStyles({
  drawer:{
    width: drawerWidth,
    borderColor:"slateblue",
  },
  drawerPaper:{

    width: drawerWidth,
    boxSizing: 'border-box',
    borderColor:"slateblue",

  },
  field: {
    marginTop: 50,
    marginBottom: 10,
    left: 160,
    top: 12,
    width: 300,
    height: 1,
    position: "relative",
    fontFamily: "serif",
    display: "block",
    fontStyle: "inherit",


  },
  button:{
    position:"relative",
    top:90,
    left:118,
    maxHeight: 80,
    width:200,
    fontFamily:"serif",
  },
  active:{
    background:"slateblue",
  },
  title:{
    fontFamily:"serif",
  },
  uptoolbar:{
    height:10,
    width:-300

  },
  application:{
    right:-237,
    top:-0,
    position:"relative"

  },
  search:{
    left: 980,
  },

  searchmain:{
    border:"solid 2px",
    borderColor:"slateblue",
    left:550,
    top:180,
    position:"absolute",
    maxWidth:550,
  },

  font:{
    fontFamily:"serif",
    color:"slateblue",
  },
  card:{
    position:"relative",
    left:250,
    top:300,
  },
  app:{
    right:-240,
    position:"relative",
    top:100
  },
  media:{
    position:"relative",
    color: "slateblue",
    fontFamily:"serif",
    display: "block",
    whiteSpace:"unset",
    width:100,
    overflow:"hidden",
    //textOverflow:"clip",
    border:1,
  },
  mediaImage:{
    position:"relative",
    color: "slateblue",
    fontFamily:"sans-serif",
    left:50,
    top:-45,
  },
  bar:{
    height:60,
    position:"relative",
    top:10
  },
  bartitle:{
    height: 46,
    position:"relative",
    left:-10,
    fontFamily:"serif",

  },
  titile:
      { overflow:"hidden",
        left:650,
        top:160,
        position:"absolute",
        fontFamily:"serif",
        fontSize:54
      },
  listFont:{
    fontSize:14,
  },
  bottom:{
    position:"absolute",
    top:657,
    left:-1,
  },
  label:{
    fontFamily:"serif",
    width:300,
    fontSize:24,
    color:"slateblue",
    top:120,
    position:"absolute"
  },
  errorColor:{
    backgroundColor:"red",
    color:"red",
  },
  success:{
    position:"relative",
    width:300,
    left:650,
    bottom:300
  },
  failure:{
    position:"relative",
    width:300,
    left:650,
    bottom:300
  },
  barTwo:{
    position:"absolute",
    top:280,
    width:500
  },
  icon:{
    position:"absolute",
    right:120
  },
  username:{
    position:"relative",
    fontFamily:"serif",
    left:1160
  }

})

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
function UploadFile()
{  const classes=useStyles();
  const[file,setFile]=useState();
  const [open, setOpen] = React.useState(false);
  const [data,setData]=useState({});
  const [openSnackBAr, setOpenSnackBAR] = useState(false);
  const [success,setSuccess]=useState(false);
  const [user,setUser]=useState({});
  const [upload,setUpload]=useState(null)
  let history = useNavigate();
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const logoutHandler = () => {
    localStorage.setItem("current_user", "");
    history("/login");
  };
  const action = (
      <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => setOpenSnackBAR(false)}
          // onClick={() => setSuccess(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
  );

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


  console.log("This is the useEffect of dynamic Function: ");




  // useEffect(() => {
  //
  //   axios({
  //     url: `https://finalproject-helpmesell.herokuapp.com/api/price/`,
  //     method: "GET",
  //   })
  //       .then(({ price }) => {
  //         console.log("this is the data of a single product: ", { price });
  //         setPrice(price);
  //       })
  //       .catch((err) => {
  //         console.log("this is the error: ", { err });
  //       });
  // }, []);



  async function Submit(){
    console.warn(file)
    const formdata=new FormData();
    console.log(file)
    formdata.append(" ls_product_file",file)
    formdata.append(" user",JSON.parse(localStorage.getItem('current_user')).id)
    formdata.append(" file_state",1)

    let item = {  ls_product_file: file, user: JSON.parse(localStorage.getItem('current_user')).id, file_state: 1 };
    axios({
      url: BASE_URL+"/api/LSUploadedData/", onUploadProgress: (data)=>{
    setUpload(Math.round((data.loaded/data.total)*100));
      },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: formdata,
    })
        .then(({ data }) => {
          console.log("this is the data of a single product: ", { data });
          setData(data);
          setSuccess(true);
        })
        .catch((err) => {
          console.log("this is the error: ", { err });
          const { response } = err || {};
          const { data } = response || {};
          const { message } = data || {};
          setOpenSnackBAR(true);
        });

  }

  useEffect(() => {
    // console.log("This is the useEffect of dynamic Function: ", {product_name});
    setUser(JSON.parse(localStorage.getItem('current_user')))
  }, []);
  function handleClick() {
    setOpen(!open)
  }


  return(

      <div>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flexGrow: 5 }}>
            <AppBar position="static" className={classes.application}>
              <Toolbar>
                <AccountCircleIcon fontSize={"large"}className={classes.icon}></AccountCircleIcon>
                <Typography variant={"h6"} className={classes.username}>{user.username}</Typography>
              </Toolbar>
            </AppBar>
          </Box>
          <Drawer
              className={classes.drawer}
              variant="permanent"
              anchor="left"
              classes={{ paper: classes.drawerPaper }}
          >
            <AppBar position="static">
              <Toolbar className={classes.uptoolbar}>
                <Typography variant="h6" className={classes.title}>
                  HelpMeSell
                </Typography>
              </Toolbar>
            </AppBar>
            <List
                sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader
                      component="div"
                      id="nested-list-subheader"
                  ></ListSubheader>
                }
            >
              <ListItemButton component={Link} to="/homepage">
                <ListItemIcon>
                  <HomeIcon color={"primary"} />
                </ListItemIcon>
                <ListItemText primary="Home"/>
              </ListItemButton>
              {
                  parseInt(user.state)==1 &&
                  <ListItemButton component={Link} to="/adminmain">
                    <ListItemIcon>
                      <EqualizerIcon color={"primary"} />
                    </ListItemIcon>
                    <ListItemText primary=" Scrape Website Data" />
                  </ListItemButton>
              }
              {parseInt(user.state)==1 &&
                  <ListItemButton component={Link} to="/scrapereviews">
                    <ListItemIcon>
                      <ReviewsIcon color={"primary"} />
                    </ListItemIcon>
                    <ListItemText primary=" Scrape Reviews" />
                  </ListItemButton>
              }
              <ListItemButton component={Link} to="/pricecomparison">
                <ListItemIcon>
                  <SearchIcon color={"primary"} />
                </ListItemIcon>
                <ListItemText primary="Survey Product" />
              </ListItemButton>
              <ListItemButton
                  onClick={handleClick}
                  component={Link}
                  to="/uploadfile"
              >
                <ListItemIcon>
                  <AppsIcon color={"primary"} />
                </ListItemIcon>
                <ListItemText primary="Category" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton  component={Link}  to="/smartphones" sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <SubscriptionsIcon color={"primary"}/>
                    </ListItemIcon>
                    <ListItemText  primary="Smartphones" />
                  </ListItemButton>
                  <ListItemButton  component={Link}  to="/laptops" sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <LaptopMacIcon color={"primary"} />
                    </ListItemIcon>
                    <ListItemText   primary="Laptops" />
                  </ListItemButton>
                </List>
              </Collapse>
              {
                  parseInt(user.state) == 2 &&
                  <ListItemButton component={Link} to="/payment">
                    <ListItemIcon>
                      <SubscriptionsIcon color={"primary"}/>
                    </ListItemIcon>
                    <ListItemText primary="Subscribe" />
                  </ListItemButton>
              }
              <ListItemButton component={Link} to="/">
                <ListItemIcon>
                  <LogoutIcon color={"primary"} />
                </ListItemIcon>
                <ListItemText primary="Logout" onClick={logoutHandler} />
              </ListItemButton>
            </List>
          </Drawer>
        </Box>
        <form>
          <Box
              sx={{
                width: 500,
                height: 300,
                p:1,
                border:'2px solid',
                borderColor:'#89a0cc',
                left:550,
                top:100,
                position:'relative',
                borderRadius:4,
                bgcolor:"",

              }}
          >
            <AppBar className={classes.bar} position="static">

              <Toolbar>
                <Typography className={classes.bartitle} variant="h5"  >
                  Local Seller
                </Typography>
              </Toolbar>
            </AppBar>
            <Container>
              <Grid container direction={"column"} spacing={1}  >
              </Grid>
              <Typography  style={{top:127}} className={classes.label} >
                Choose File :
              </Typography>
              <TextField className={classes.field} type={"file"} required  onChange={(e)=>setFile(e.target.files[0])} id="outlined-basic"  variant="outlined" size="small" Password/>
              <Button  className={classes.button} onClick={Submit}  variant="contained" color="primary">
                Upload File
              </Button>
            </Container>
            <Box sx={{ width: '100%' }} className={classes.barTwo}>
              <LinearProgress variant="determinate" value={upload}   />
            </Box>
          </Box>
          <AppBar  className={classes.bottom} position="static" color="primary">
            <Container maxWidth="md">
              <Toolbar>
                <Typography className={classes.writebottom} variant="body1" color="inherit" >

                </Typography>
              </Toolbar>
            </Container>
          </AppBar>
          {success && <Alert action={close} className={classes.success} severity="success">File Uploaded Successfully!</Alert>}
        </form>




        {/*<TableContainer component={Paper}>*!/*/}
        {/*  <Table className={classes.list} aria-label="simple table">*/}
        {/*    <TableHead>*/}
        {/*      <TableRow>*/}
        {/*        <TableCell className={classes.tableheading} align="left">Store</TableCell>*/}
        {/*        <TableCell className={classes.tableheading} align="right">Price (Rs)</TableCell>*/}
        {/*      </TableRow>*/}
        {/*    </TableHead>*/}
        {/*    <TableBody>*/}
        {/*      {price.map((row) => (*/}
        {/*          <TableRow key={row.id} >*/}
        {/*            <TableCell align="left">jhkj</TableCell>*/}
        {/*            <TableCell align="right">jhuh</TableCell>*/}
        {/*          </TableRow>*/}
        {/*      ))}*/}

        {/*    </TableBody>*/}
        {/*  </Table>*/}
        {/*</TableContainer>*/}
        <Snackbar
            open={openSnackBAr}
            autoHideDuration={3000}
            message={"Invalid File"}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            action={action}
        />


      </div>
  );

}
export default UploadFile;