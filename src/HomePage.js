import React, { useEffect, useState } from "react";
import {Box, Container} from "@material-ui/core";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LaptopIcon from '@mui/icons-material/Laptop';
import Drawer from "@mui/material/Drawer";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import TablePagination from '@mui/material/TablePagination';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AppsIcon from "@mui/icons-material/Apps";
import Collapse from "@mui/material/Collapse";
import { styled, alpha } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import LogoutIcon from "@mui/icons-material/Logout";
import TableRow from "@mui/material/TableRow";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'material-ui-image'
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FilterListIcon from '@mui/icons-material/FilterList';
import DevicesIcon from '@mui/icons-material/Devices';
import {
  makeStyles,
  List,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import {BASE_URL} from "./Constants";
import {CardActionArea, CardMedia} from "@mui/material";




const drawerWidth = 240;
const drawerHeight= -100;
const useStyles = makeStyles({
  icon:{
    position:"absolute",
    right:120
  },
  drawer: {
    width: drawerWidth,
    height: drawerHeight,
    borderColor: "slateblue",
  },
  drawerPaper: {
    width: drawerWidth,
    height:drawerHeight,
    boxSizing: "border-box",
    borderColor: "slateblue",
  },
  active: {
    background: "slateblue",
  },
  title: {
    fontFamily: "serif",
    position:"absolute",

  },
  uptoolbar: {
    height: 10,
    width: -300,
  },
  app: {
    right: -240,
    position: "relative",
  },
  search: {
    left: 1000,
  },
  bottom: {
    position: "absolute",
    bottom: -635,
    left: 95,
  },
  font: {
    fontFamily: "serif",
    color: "slateblue",
  },
  card: {
    position: "relative",
    left: 250,
    top: 300,
    height:300

  },
  media: {
    position: "relative",
    color: "slateblue",
    fontFamily: "serif",
    display: "block",
    whiteSpace: "unset",
    width: 200,
    overflow: "hidden",
    //textOverflow:"clip",
    border: 1,
  },
  mediaImage: {
    position: "relative",
    color: "slateblue",
    fontFamily: "sans-serif",
    left: 50,
    top: -20,
  },
  paginate: {
    color: "slateblue",
    fontFamily: "sans-serif",
    position:"relative",
    top:480,
    right:500
  },
  titile: {
    overflow: "hidden",
    left: 300,
    top: 200,
    position: "absolute",
    fontFamily: "serif",
    fontSize: 54,
  },
  listFont: {
    fontSize: 14,
  },
  filter:{
    position:"relative",
    top:8,
    left:10,
    color:"slateblue"
  },
  filterTwo:{
    position:"relative",
    top:20,
    left:10,
    color:"slateblue"
  },
  filterButton:{
    position:"absolute",
    top:320,
    left:1360,
    color:"slateblue",
  },
  dialogue:{
    position:"relative",
    color:"slateblue",
    bottom:-50
  },
  closeButton:{
    position:"absolute",
    left:30,
  },
  openButton:{
    color:"slateblue",
  },
  buttonIcon:{
    position:"relative",
    color:"slateblue",
    left:10
  },
  cardMain:{
    position:"absolute",
    left:240,
    width:1279,
    height:400
  },
  username:{
    position:"relative",
    fontFamily:"serif",
    left:1150
  }
});

function valuetext(value: number) {
  return `${value}°C`;
}
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function HomePage({ children }) {
  const classes = useStyles();
  const history = useNavigate();
  const browserHistory = require("react-router").browserHistory;
  const [open, setOpen] = React.useState(false);
  const [openTwo, setOpenTwo] = React.useState(false);
  const [data, setData] = useState([]);
  const [user,setUser]=useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openFilter, setOpenFilter] = React.useState(false);

  const handleClickOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpenFilter(false);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const fetch_products = async () => {
    let result = await fetch(BASE_URL+"/api/products/")
    result = await result.json();
    setData(result);
  }
  function valuetext(value: number) {
    return `${value}°C`;
  }
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('current_user')))
  }, []);

  useEffect(() => {
    fetch_products()
  }, []);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('current_user')))
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const theme = useTheme();
  const bull = (
      <Box
          component="span"
          sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
      ></Box>
  );
  function Submit() {
    history.push("/uploadfile/");
  }
  // useEffect(async () => {
  //   // axios;


  //   setData(result);
  //   setUser(JSON.parse(localStorage.getItem('current_user')))
  // }, []);

  function passValues() {
    console.log("thats the click handler");
    //     {data.map((row) => (
    //         localStorage.setItem('data',row.id),
    //       alert(row.id)
    // ))}
    // history.push("/products/");
  }

  console.warn("result", data);
  function handleClick() {
    setOpen(!open);
  }

  function handleClickTwo() {
    setOpenTwo(!openTwo);
  }

  const logoutHandler = () => {
    localStorage.setItem("current_user", "");
    history("/login");
  };

  return (
      <div>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 5 }}>
            <AppBar position="static" className={classes.app}>
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
              {parseInt(user.state) == 2 &&
                  <ListItemButton component={Link} to="/uploadfile">
                    <ListItemIcon>
                      <FileUploadIcon color={"primary"}></FileUploadIcon>
                    </ListItemIcon>
                    <ListItemText primary="User Data"/>
                  </ListItemButton>
              }
              {parseInt(user.state)==1 &&
                  <ListItemButton component={Link} to="/adminmain">
                    <ListItemIcon>
                      <EqualizerIcon color={"primary"} />
                    </ListItemIcon>
                    <ListItemText primary=" Scrape Website Data" />
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
                  to="/homepage"
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
                      <PhoneIphoneIcon color={"primary"} />
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
              {parseInt(user.state) == 2 || parseInt(user.state) ==1 &&
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
        {/*<Typography*/}
        {/*    className={classes.titile}*/}
        {/*    variant={"body2"}*/}
        {/*    color={"primary"}*/}
        {/*>Recently Added :*/}
        {/*</Typography>*/}
        {/*<PhoneAndroidIcon style={{color:"#4044a8",left:910, width:200, height:50, top:180,position:"absolute"}}/>*/}
          <PhoneIphoneIcon style={{color:"#474bad",left:850, width:200, height:65, top:145,position:"absolute"}}/>
          <LaptopMacIcon style={{color:"#474bad",left:730, width:200, height:100, top:120,position:"absolute"}}/>
          <LaptopIcon style={{color:"#474bad",left:635, width:200, height:80, top:135,position:"absolute"}}/>
          <PhoneAndroidIcon style={{color:"#4044a8",left:805, width:200, height:80, top:130,position:"absolute"}}/>
        <Typography style={{fontSize:56,fontFamily:"serif",left:650,top:200, color:'#474bad',position:"absolute"}}>HELP ME SELL</Typography>
        <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              p: 1,
              m: 1,
              alignContent: "flex-end",
              borderRadius: 1,
              flexWrap: "wrap",
              maxWidth: 1400,
              position:"relative"
            }}
        >
          {/* <Router> */}

          { data.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage).map((row) => {
            return (
                <Card
                    className={classes.card}
                    sx={{ minWidth: 250, boxShadow: 2, padding: 2, margin: 1 }}
                >
                  <CardContent>
                    <TableRow
                        key={row.id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <Link to={"/products/" + row.id}>
                        <Typography
                            align="left"
                            style={{
                              width: 220,
                              overflow: "hidden",
                              fontFamily: "sans-serif",
                              fontSize: 13,
                              fontWeight: "bold",
                              position: "absolute",
                              top: 232,
                              left: 20,
                            }}
                            className={classes.media}
                            onClick={passValues}
                        >
                          {" "}
                          {row.product_name}
                        </Typography>{" "}
                      </Link>

                      {
                        // <Typography
                        //   align="left"
                        //   style={{
                        //     width: 200,
                        //     overflow: "hidden",
                        //     fontFamily: "sans-serif",
                        //     fontSize: 10,
                        //     position: "relative",
                        //     top: 172,
                        //     left: 80,
                        //   }}
                        //   className={classes.media}
                        // >
                        //   {" "}
                        //   {row.product_description}
                        // </Typography>
                      }
                      {
                        <Typography align="left" className={classes.media}>
                          {row.Username}
                        </Typography>
                      }
                      <Typography align="left" className={classes.mediaImage}>
                        {<img style={{ width: 140 }} src={row.product_image} />}
                      </Typography>
                    </TableRow>
                  </CardContent>
                  {/*<CardActions>*/}
                  {/*  <Button*/}
                  {/*    style={{ position: "absolute", top: 600 }}*/}
                  {/*    color={"primary"}*/}
                  {/*    variant={"contained"}*/}
                  {/*    size="large"*/}
                  {/*  >*/}
                  {/*    Reviews*/}
                  {/*  </Button>*/}
                  {/*</CardActions>*/}
                </Card>

            );
          })}

          <AppBar  className={classes.bottom} position="static" color="primary">
            <Container maxWidth="md">
              <Toolbar>
                <Typography className={classes.writebottom} variant="body1" color="inherit" >

                </Typography>
              </Toolbar>
            </Container>
          </AppBar>
        </Box>
        <TablePagination
            className={classes.paginate}
            component="div"
            count={400}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Button variant={"outlined"} className={classes.filterButton} onClick={handleClickOpenFilter}> Filters</Button>
        <Dialog className={classes.dialogue} disableEscapeKeyDown open={openFilter} onClose={handleCloseFilter}>
          <DialogTitle>Choose Options </DialogTitle>
          <DialogContent>

            <Box component="form"  className={classes.filter}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Brand
                </InputLabel>
                <NativeSelect
                    defaultValue={30}
                    inputProps={{
                      name: 'brand',
                      id: 'uncontrolled-native',
                    }}
                >
                  <option value={10}>Apple</option>
                  <option value={20}>Samsung</option>
                  <option value={30}>Xiaomi</option>
                  <option value={40}>Oppo</option>
                  <option value={50}>Dell</option>
                  <option value={60}>Hp</option>
                  <option value={70}>Asus</option>
                  <option value={80}>Acer</option>

                </NativeSelect>
              </FormControl>
            </Box>
            <Box className={classes.filterTwo}>
              <FormControl fullWidth>
                <InputLabel  variant="standard" htmlFor="uncontrolled-native">
                  Price Range
                </InputLabel>
                <NativeSelect
                    defaultValue={30}
                    inputProps={{
                      name: 'brand',
                      id: 'uncontrolled-native',
                    }}
                >
                  <option value={0}>Under Rs 50,000</option>
                  <option value={10}>Rs 50,000 - 100,000</option>
                  <option value={20}>Rs 110,000 - 200,000</option>
                  <option value={30}>Rs 210,000 - 300,000</option>
                  <option value={40}>Rs 310,000 - 400,000</option>
                  <option value={50}>Rs 410,000 - 500,000</option>
                  <option value={60}>Rs 510,000 - 600,000</option>
                  <option value={70}>Rs 610,000 - 700,000</option>

                </NativeSelect>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button className={classes.closeButton} onClick={handleCloseFilter}>Cancel</Button>
            <Button className={classes.openButton} onClick={handleCloseFilter}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>


  );

}

export default HomePage;