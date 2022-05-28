import React, { useEffect, useState } from "react";
import {BASE_URL} from './Constants';
import {Box, Container, Grid, IconButton, Snackbar, TextField} from "@material-ui/core";
import Drawer from "@mui/material/Drawer";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AppsIcon from "@mui/icons-material/Apps";
import Collapse from "@mui/material/Collapse";
import { styled, alpha } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
// import {History} from "@material-ui/icons";
// import { browserHistory } from "react-router";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import LogoutIcon from "@mui/icons-material/Logout";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// import DynamicPage from "./DynamicPages";
// import  { Redirect } from 'react-router-dom'
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
import CloseIcon from "@mui/icons-material/Close";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import LinearProgress from "@mui/material/LinearProgress";
// import router from "react-router-dom/es/Router";

const drawerWidth = 240;
const useStyles = makeStyles({
    drawer: {
        width: drawerWidth,
        borderColor: "slateblue",
    },
    drawerPaper: {
        width: drawerWidth,
        boxSizing: "border-box",
        borderColor: "slateblue",
    },
    active: {
        background: "slateblue",
    },
    title: {
        fontFamily: "serif",
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

    searchmain: {
        border: "solid 2px",
        borderColor: "slateblue",
        left: 550,
        top: 180,
        position: "absolute",
        maxWidth: 550,
    },

    font: {
        fontFamily: "serif",
        color: "slateblue",
    },
    card: {
        position: "relative",
        left: 250,
        top: 300,
    },
    field: {
        marginTop: 50,
        marginBottom: 10,
        left: 160,
        top: 9,
        width: 1900,
        height: 1,
        position: "relative",
        fontFamily: "serif",
        display: "block",
        fontStyle: "inherit",
    },
    button:{
        position:"relative",
        top:130,
        left:118,
        maxHeight: 80,
        width:200,
        fontFamily:"serif",
    },
    media: {
        position: "relative",
        color: "slateblue",
        fontFamily: "serif",
        display: "block",
        whiteSpace: "unset",
        width: 100,
        overflow: "hidden",
        //textOverflow:"clip",
        border: 1,
    },
    mediaImage: {
        position: "relative",
        color: "slateblue",
        fontFamily: "sans-serif",
        left: 50,
        top: -45,
    },
    titile: {
        overflow: "hidden",
        left: 650,
        top: 160,
        position: "absolute",
        fontFamily: "serif",
        fontSize: 54,
    },
    listFont: {
        fontSize: 14,
    },
    label:{
        position:"absolute",
        left:400,
        top:400
    },
    dropdown:{
        position:"absolute",
        width:480,
        top:115,
        left:18,
        height:10,
    },
    barTwo:{
        position:"absolute",
        top:280,
        width:500,
        left:10
    },
    success:{
        position:"absolute",
        width:400,
        left:40,
        bottom:350,

    },

});

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


function AdminMain({ children }) {
    const classes = useStyles();
    const history = useNavigate();
    const browserHistory = require("react-router").browserHistory;
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [user,setUser]=useState({});
    const [link,setLink]=useState({});
    const [website, setWebsite] = React.useState('');
    const [openSnackBAr, setOpenSnackBAR] = useState(false);
    const [upload,setUpload]=useState(null);
    const [success,setSuccess]=useState(false)


    const handleChange = (event: SelectChangeEvent) => {
        setWebsite(event.target.value);
    };
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


    const theme = useTheme();
    const bull = (
        <Box
            component="span"
            sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
        ></Box>
    );
    // function Submit() {
    //     history.push("/uploadfile/");
    // }
    useEffect(async () => {

        // axios;
        let result = await fetch(
            BASE_URL+"/api/products/"
        );
        result = await result.json();
        setData(result);
        setUser(JSON.parse(localStorage.getItem('current_user')))
    }, []);

    function passValues() {
        console.log("thats the click handler");
        //     {data.map((row) => (
        //         localStorage.setItem('data',row.id),
        //       alert(row.id)
        // ))}
        // history.push("/products/");
    }

    async function Submit() {
        let item = {
            website: website
        };

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
                url:  BASE_URL +"/api/Scrapers/",onUploadProgress: (data)=>{
                    setUpload(Math.round((data.loaded/data.total)*100));
                },
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                data: item,
            });
            if (response.status==200||response.status==201)
            {
                setSuccess(true);
                console.log("in response 200")
            }
        }

        catch (error) {
            console.log("error", { error });
            const { response } = error;
            const { data } = response;
            const { message } = data;
            setOpenSnackBAR(true);
        }

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
                        {parseInt(user.state)==2 &&
                            <ListItemButton component={Link} to="/uploadfile">
                                <ListItemIcon>
                                    <EqualizerIcon color={"primary"} />
                                </ListItemIcon>
                                <ListItemText primary="User Data" />
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
                        <ListItemButton component={Link} to="/marketsurvey">
                            <ListItemIcon>
                                <EqualizerIcon color={"primary"} />
                            </ListItemIcon>
                            <ListItemText primary="Market Survey" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/pricecomparison">
                            <ListItemIcon>
                                <PaidRoundedIcon color={"primary"} />
                            </ListItemIcon>
                            <ListItemText primary="Price Comparison" />
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
                        <ListItemButton component={Link} to="/">
                            <ListItemIcon>
                                <LogoutIcon color={"primary"} />
                            </ListItemIcon>
                            <ListItemText primary="Logout" onClick={logoutHandler} />
                        </ListItemButton>
                    </List>
                </Drawer>
            </Box>
            {/*<Container>*/}
            {/*    <Grid container direction={"column"} spacing={1}  >*/}
            {/*    </Grid>*/}
            {/*    <Typography  style={{top:127}} className={classes.label} >*/}
            {/*        Choose File :*/}
            {/*    </Typography>*/}
            {/*   <Button  className={classes.label} onClick={Submit}  variant="contained" color="primary">*/}
            {/*        Upload File*/}
            {/*    </Button>*/}

            {/*</Container>*/}
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
                {success && <Alert  action={close} className={classes.success} severity="success">Data Scrapping : Initiated-Products will show soon</Alert>}
                <Container>

                    {/*<Typography style={{left:19,top:134,position:"absolute", fontSize:26,fontFamily:"serif", color:"slateblue"}}>Scrape website:</Typography>*/}
                    {/*                    <TextField*/}
                    {/*                        className={classes.field}*/}
                    {/*                        type={"text"}*/}
                    {/*                        required*/}
                    {/*                        value={""}*/}
                    {/*                        onChange={(e) => setLink(e.target.value)}*/}
                    {/*                        id="outlined-basic"*/}
                    {/*                        label="URl"*/}
                    {/*                        variant="outlined"*/}
                    {/*                        size="small"*/}

                    {/*                    />*/}
                    <Box  className={classes.dropdown} sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Website Name</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={website}
                                label="Website"
                                onChange={handleChange}
                            >
                                <MenuItem value="https://www.shophive.com/prices/mobile-phones/samsung">Shophive-Samsung</MenuItem>
                                <MenuItem value="https://www.shophive.com/prices/mobile-phones/xiaomi-mi">Shophive-Xiaomi</MenuItem>
                                <MenuItem value="https://www.shophive.com/prices/mobile-phones/realme">Shophive-Realme</MenuItem>
                                <MenuItem value="https://www.shophive.com/prices/mobile-phones/oppo">Shophive-Oppo</MenuItem>
                                <MenuItem value="https://www.shophive.com/apple/iphone">Shophive-IPhone</MenuItem>
                                <MenuItem value="https://pakistanistores.com/prices/laptops-and-pc/laptops/hp">PakistaniStores-HP Laptops</MenuItem>
                                <MenuItem value="https://pakistanistores.com/prices/laptops-and-pc/laptops/dell">PakistaniStores-Dell Laptops</MenuItem>
                                <MenuItem value="https://pakistanistores.com/prices/laptops-and-pc/laptops/acer">PakistaniStores-Acer Laptops</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Button  className={classes.button} onClick={Submit}  variant="contained" color="primary">
                        Start Scrapper
                    </Button>
                    <Box sx={{ width: '100%' }} className={classes.barTwo}>
                        <LinearProgress variant="determinate" value={upload}   />
                    </Box>
                </Container>
            </Box>
            <Snackbar
                open={openSnackBAr}
                autoHideDuration={6000}
                message={"Data Has Failed to Scrape"}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                action={action}
            />
        </div>
    );
}

export default AdminMain;