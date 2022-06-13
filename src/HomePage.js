import React, { useEffect, useState } from "react";
import { Box, Container } from "@material-ui/core";
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
import ReviewsIcon from '@mui/icons-material/Reviews';
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
import { BASE_URL } from "./Constants";
import { CardActionArea, CardMedia } from "@mui/material";




const drawerWidth = 240;
const drawerHeight = -100;
const useStyles = makeStyles({
  icon: {
    position: "absolute",
    right: 120
  },
  drawer: {
    width: drawerWidth,
    height: drawerHeight,
    borderColor: "slateblue",
  },
  drawerPaper: {
    width: drawerWidth,
    height: drawerHeight,
    boxSizing: "border-box",
    borderColor: "slateblue",
  },
  active: {
    background: "slateblue",
  },
  title: {
    fontFamily: "serif",
    position: "absolute",

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
    top: 340,
    height: 300

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
    position: "relative",
    top: 480,
    right: 500
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
  filter: {
    position: "relative",
    top: 8,
    left: 10,
    color: "slateblue"
  },
  filterTwo: {
    position: "absolute",
    top: 330,
    left: 1180,
    color: "slateblue",
  },
  clear: {
    position: "absolute",
    top: 340,
    left: 850,
    color: "slateblue",
  },
  filterThree: {
    position: "absolute",
    top: 330,
    left: 1320,
    color: "slateblue",
  },
  filterButton: {
    position: "absolute",
    top: 330,
    left: 1030,
    color: "slateblue",
  },
  dialogue: {
    position: "relative",
    color: "slateblue",
    bottom: -50
  },
  closeButton: {
    position: "absolute",
    left: 30,
  },
  openButton: {
    color: "slateblue",
  },
  buttonIcon: {
    position: "relative",
    color: "slateblue",
    left: 10
  },
  cardMain: {
    position: "absolute",
    left: 240,
    width: 1279,
    height: 400
  },
  username: {
    position: "relative",
    fontFamily: "serif",
    left: 1150
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
  const [user, setUser] = useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [brand, setBrand] = React.useState('all');
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(0);
  const [dataFilter, setDataFilter] = useState([]);
  const [maxDataFilter, setMaxDataFilter] = useState([]);
  const [minDataFilter, setMinDataFilter] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setBrand(event.target.value);


    if(event.target.value != 'all' ){
      setDataFilter(data.filter( (d) => d.product_name.toUpperCase().includes(event.target.value.toUpperCase())))
    }else{
      setDataFilter(data)
    }
  }


  const clear_filter = () => {
    setBrand('all')
    setMinPrice(0)
    setMaxPrice(0)
    setDataFilter(data)
  }

  const handleChangeMinPrice = (event: SelectChangeEvent) => {
    if (event.target.value > maxPrice){
      alert('Min price can not be grater then max price')
      clear_filter()
    }else{
      setMinPrice(event.target.value);
      if(event.target.value != 0 ){
        setDataFilter(data.filter( (data) => parseInt(data.price) >  (event.target.value)))
      }else{
        setDataFilter(data)
      }
    }
  }

  const handleChangeMaxPrice = (event: SelectChangeEvent) => {
    if (minPrice == 0){
      setMaxPrice(event.target.value);
      if(event.target.value != 0 ){
        setDataFilter(data.filter( (data) => parseInt(data.price) <  (event.target.value)))
      }else{
        setDataFilter(data)
      }
    }else{
      if (event.target.value < minPrice){
        alert('Maximun price can not be less then min price')
        clear_filter()
      }
      setDataFilter(data.filter( (data) => parseInt(data.price) >  minPrice && parseInt(data.price) <  (event.target.value)))
    }
  }

  const fetch_products = async () => {
    let result = await fetch(BASE_URL + "/api/products/")
    result = await result.json();
    setData(result);
    setDataFilter(result);
    setMaxDataFilter(result);
    setMinDataFilter(result)
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
  function passValues() {
    console.log("thats the click handler");
  }

  console.warn("result", data);
  function handleClick() {
    setOpen(!open);
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
                <AccountCircleIcon fontSize={"large"} className={classes.icon}></AccountCircleIcon>
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
              <ListItemButton component={Link} to={"/myprofile/"+ user.id}>
                <ListItemIcon>
                  <AccountCircleIcon color={"primary"}></AccountCircleIcon>
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItemButton>

              {parseInt(user.state) == 2 &&
                  <ListItemButton component={Link} to="/uploadfile">
                    <ListItemIcon>
                      <FileUploadIcon color={"primary"}></FileUploadIcon>
                    </ListItemIcon>
                    <ListItemText primary="User Data" />
                  </ListItemButton>
              }
              {parseInt(user.state) == 1 &&
                  <ListItemButton component={Link} to="/adminmain">
                    <ListItemIcon>
                      <EqualizerIcon color={"primary"} />
                    </ListItemIcon>
                    <ListItemText primary=" Scrape Website Data" />
                  </ListItemButton>
              }
              {parseInt(user.state) == 1 &&
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
                  <ListItemButton component={Link} to="/smartphones" sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PhoneIphoneIcon color={"primary"} />
                    </ListItemIcon>
                    <ListItemText primary="Smartphones" />
                  </ListItemButton>
                  <ListItemButton component={Link} to="/laptops" sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <LaptopMacIcon color={"primary"} />
                    </ListItemIcon>
                    <ListItemText primary="Laptops" />
                  </ListItemButton>
                </List>
              </Collapse>
              {parseInt(user.state) == 2 &&
                  <ListItemButton component={Link} to="/payment">
                    <ListItemIcon>
                      <SubscriptionsIcon color={"primary"} />
                    </ListItemIcon>
                    <ListItemText primary="Subscribe" />
                  </ListItemButton>
              }
              {parseInt(user.state) == 3 &&
                  <ListItemButton component={Link} to="/payment">
                    <ListItemIcon>
                      <SubscriptionsIcon color={"primary"} />
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
        <PhoneIphoneIcon style={{ color: "#474bad", left: 850, width: 200, height: 65, top: 145, position: "absolute" }} />
        <LaptopMacIcon style={{ color: "#474bad", left: 730, width: 200, height: 100, top: 120, position: "absolute" }} />
        <LaptopIcon style={{ color: "#474bad", left: 635, width: 200, height: 80, top: 135, position: "absolute" }} />
        <PhoneAndroidIcon style={{ color: "#4044a8", left: 805, width: 200, height: 80, top: 130, position: "absolute" }} />
        <Typography style={{ fontSize: 56, fontFamily: "serif", left: 650, top: 200, color: '#474bad', position: "absolute" }}>HELP ME SELL {user.state}</Typography>
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
              position: "relative"
            }}
        >
          {/* <Router> */}

          {dataFilter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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

          <AppBar className={classes.bottom} position="static" color="primary">
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
            count={500}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />



        {/*<Box component="form" className={classes.filterButton}>*/}
        {/*  <FormControl fullWidth>*/}
        {/*    <InputLabel id="demo-simple-select-label">Brand</InputLabel>*/}
        {/*    <Select*/}
        {/*        labelId="demo-simple-select-label"*/}
        {/*        id="demo-simple-select"*/}
        {/*        value={brand}*/}
        {/*        label="Brand"*/}
        {/*        // defaultValue={'oppo'}*/}
        {/*        onChange={handleChange}*/}
        {/*    >*/}
        {/*      <MenuItem value={''}>All</MenuItem>*/}
        {/*      <MenuItem value={'apple'}>Apple</MenuItem>*/}
        {/*      <MenuItem value={'samsung'}>Samsung</MenuItem>*/}
        {/*      <MenuItem value={'xiaomi'}>Xiaomi</MenuItem>*/}
        {/*      <MenuItem value={'oppo'}>Oppo</MenuItem>*/}
        {/*      <MenuItem value={'dell'}>Dell</MenuItem>*/}
        {/*      <MenuItem value={'hp'}>Hp</MenuItem>*/}
        {/*      <MenuItem value={'asus'}>Asus</MenuItem>*/}
        {/*      <MenuItem value={'acer'}>Acer</MenuItem>*/}
        {/*    </Select>*/}
        {/*  </FormControl>*/}
        {/*</Box>*/}

        <Box className={classes.clear}>
          <Button variant="contained" onClick={clear_filter} >Clear Filter</Button>
        </Box>

        <Box className={classes.filterButton}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Brand
            </InputLabel>
            <NativeSelect
                value={brand}
                onChange={handleChange}
                inputProps={{
                  name:'brand',
                  id: 'uncontrolled-native',
                }}
            >
              <option value={'apple'}>Apple</option>
              <option value={'samsung'}>Samsung</option>
              <option value={'xiaomi'}>Xiaomi</option>
              <option value={'oppo'}>Oppo</option>
              <option value={'dell' }>Dell</option>
              <option value={'hp'}>Hp</option>
              <option value={'asus'}>Asus</option>
              <option value={'acer'}>Acer</option>
              <option value={'all'}>All</option>
            </NativeSelect>
          </FormControl>
        </Box>
        <Box className={classes.filterTwo}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Minimum Range
            </InputLabel>
            <NativeSelect
                value={minPrice}
                onChange={handleChangeMinPrice}
                inputProps={{
                  name: 'minimum Price',
                  id: 'uncontrolled-native',
                }}
            >
              <option value={15000}>Rs 15,000 </option>
              <option value={20000}>Rs 20,000 </option>
              <option value={30000}>Rs 30,000 </option>
              <option value={50000}>Rs 50,000 </option>
              <option value={60000 }>Rs 60,000 </option>
              <option value={70000 }>Rs 70,000 </option>
              <option value={100000}>Rs 100,000 </option>
              <option value={150000}>Rs 150,000 </option>
              <option value={200000}>Rs 200,000 </option>
              <option value={0}>All</option>

            </NativeSelect>
          </FormControl>
        </Box>


        <Box className={classes.filterThree}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Maximum Range
            </InputLabel>
            <NativeSelect
                value={maxPrice}
                onChange={handleChangeMaxPrice}
                inputProps={{
                  name: 'maximum price',
                  id: 'uncontrolled-native',
                }}
            >
              <option value={15000}>Rs 15,000 </option>
              <option value={20000}>Rs 20,000 </option>
              <option value={30000}>Rs 30,000 </option>
              <option value={50000}>Rs 50,000 </option>
              <option value={60000 }>Rs 60,000 </option>
              <option value={70000 }>Rs 70,000 </option>
              <option value={100000}>Rs 100,000 </option>
              <option value={150000}>Rs 150,000 </option>
              <option value={200000}>Rs 200,000 </option>
              <option value={350000}>Rs 350,000 </option>
              <option value={0}>All</option>

            </NativeSelect>
          </FormControl>
        </Box>
      </div>


  );

}

export default HomePage;