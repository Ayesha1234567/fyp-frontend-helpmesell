import React, { useEffect, useState } from "react";
import { Box, Container } from "@material-ui/core";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
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
import {Link, useParams} from "react-router-dom";
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
import Paper from '@mui/material/Paper';
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
import axios from "axios";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import HomeIcon from "@mui/icons-material/Home";




const drawerWidth = 240;
const drawerHeight = -100;
const useStyles = makeStyles({
    icon: {
        position: "absolute",
        left: 1130
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
        width: -200,
    },
    app: {
        right:-4,
        position: "absolute",
        width:1305

    },
    search: {
        left: 1000,
    },
    bottom: {
        position: "absolute",
        bottom: -680,
        left: 112,
    },
    font: {
        fontFamily: "serif",
        color: "slateblue",
    },
    card: {
        position: "absolute",
        left: 450,
        top: 40,
        height: 200,
        width:650,
        border:2,
        borderColor:"slateblue",
        boxShadow: 2, padding: 2, margin: 1, borderRadius: 1,

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
    },
    user: {
        position: "absolute",
        fontFamily: "serif",
        fontSize: 66,
        left: 550,
        top:500
    },

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

function AdminProfile({ children }) {
    const classes = useStyles();
    const history = useNavigate();
    const browserHistory = require("react-router").browserHistory;
    const [open, setOpen] = React.useState(false);
    const [openTwo, setOpenTwo] = React.useState(false);
    const [data, setData] = useState({});
    const [user, setUser] = useState({});
    const [userTwo, setUserTwo] = useState({});
    const [dataSecond, setDataSecond] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLocalSeller, setIsLocalSeller] = useState(false);
    const [isCustomer, setIsCustomer] = useState(false);




    let { id } = useParams();

    const fetch_products = async () => {
        axios({
            url: BASE_URL+`/user/${id}/`,
            method: "GET",
        })
            .then(({ data }) => {
                console.log("this is the data of a single user: ", { data });
                setData(data);
            })
            .catch((err) => {
                console.log("this is the error: ", { err });
            });
        axios({
            url: BASE_URL+`/api/ReportingStatistics`,
            method: "GET",
        })
            .then(({ data }) => {
                console.log("this is the data of a single user: ", { data});
                setDataSecond(data);
            })
            .catch((err) => {
                console.log("this is the error: ", { err });
            });
    }

    // const fetch_productsTwo = async () => {
    //     axios({
    //         url: BASE_URL+`/api/UserStats/${id}/`,
    //         method: "GET",
    //     })
    //         .then(({ dataSecond }) => {
    //             console.log("this is the data of a single user: ", { dataSecond });
    //             setDataSecond(dataSecond);
    //         })
    //         .catch((err) => {
    //             console.log("this is the error: ", { err });
    //         });
    // }


    useEffect(() => {
        fetch_products();
        // fetch_productsTwo()

    }, []);
    // useEffect(() => {
    //     fetch_productsTwo()
    // }, []);
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('current_user')))
        setUserTwo(JSON.parse(localStorage.getItem('current_user')))

    }, []);

    function UserState() {

        if (user.state === 1) {
            setIsAdmin(true)
        }
        else {
            setIsAdmin(false)
        }
        if (user.state === 2) {
            setIsLocalSeller(true)
        }
        else {
            setIsLocalSeller(false)
        }
        if (user.state === 3) {
            setIsCustomer(true)
        }
        else {
            setIsCustomer(false)
        }
    }


    console.warn("result", dataSecond);
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
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 158,
                            height: 180,
                            position:"absolute",
                            top:120,
                            left:500,
                            borderColor:"slateblue"

                        },
                    }}
                >

                    <Paper>
                        <Typography style={{fontFamily:"serif", fontSize:17, color: "#474bad", right:-60, width: 160, height:160, top: 19, position: "absolute" }}> Status  </Typography>
                        <Typography style={{fontFamily:"serif", fontSize:27, color: "#474bad", right:-42, width: 160, height:160, top: 41, position: "absolute" }}>Admin</Typography>
                        <Typography style={{fontFamily:"serif", fontSize:17, color: "#474bad", right: -45, width: 160, height:160, top: 95, position: "absolute" }}> Username  </Typography>
                        <Typography style={{fontFamily:"serif", fontSize:32, color: "#474bad", right: -34, width: 160, height:160, top: 114, position: "absolute" }}>{data.username}</Typography>
                    </Paper>

                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 158,
                            height: 180,
                            position:"absolute",
                            top:120,
                            left:750,
                            borderColor:"slateblue"

                        },
                    }}
                >

                    <Paper>
                        <Typography style={{fontFamily:"serif", fontSize:20, color: "#474bad", right:-40, width: 160, height:160, top: 19, position: "absolute" }}> Total Users  </Typography>
                        <Typography style={{fontFamily:"serif", fontSize:87, color: "#474bad", right:-46, width: 160, height:160, top: 41, position: "absolute" }}>{dataSecond.user_count}</Typography>
                    </Paper>

                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 158,
                            height: 180,
                            position:"absolute",
                            top:120,
                            left:1250,
                            borderColor:"slateblue"

                        },
                    }}
                >

                    <Paper>
                        <Typography style={{fontFamily:"serif", fontSize:14, color: "#474bad", right:-18, width: 160, height:160, top: 19, position: "absolute" }}> Most Bought Package </Typography>
                        <Typography style={{fontFamily:"serif", fontSize:87, color: "#474bad", right:-46, width: 160, height:160, top: 41, position: "absolute" }}>{dataSecond.MostBoughtPackage}</Typography>
                    </Paper>

                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 158,
                            height: 180,
                            position:"absolute",
                            top:380,
                            left:500,
                            borderColor:"slateblue"

                        },
                    }}
                >

                    <Paper>
                        <Typography style={{fontFamily:"serif", fontSize:17, color: "#474bad", right:-35, width: 160, height:160, top: 19, position: "absolute" }}> Total Phones  </Typography>
                        <Typography style={{fontFamily:"serif", fontSize:107, color: "#474bad", right:-29, width: 160, height:160, top: 20, position: "absolute" }}>{dataSecond.mobile_count}</Typography>

                    </Paper>

                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 158,
                            height: 180,
                            position:"absolute",
                            top:380,
                            left:750,
                            borderColor:"slateblue"

                        },
                    }}
                >

                    <Paper>
                        <Typography style={{fontFamily:"serif", fontSize:17, color: "#474bad", right:-35, width: 160, height:160, top: 19, position: "absolute" }}> Total Laptops  </Typography>
                        <Typography style={{fontFamily:"serif", fontSize:107, color: "#474bad", right:-30, width: 160, height:160, top: 20, position: "absolute" }}>{dataSecond.laptop_count}</Typography>
                    </Paper>

                </Box>


                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 158,
                            height: 180,
                            position:"absolute",
                            top:120,
                            left:1000,
                            borderColor:"slateblue"

                        },
                    }}
                >

                    <Paper>
                        <Typography style={{fontFamily:"serif", fontSize:14, color: "#474bad", right:-28, width: 160, height:160, top: 19, position: "absolute" }}> Total Subscriptions </Typography>
                        <Typography style={{fontFamily:"serif", fontSize:87, color: "#474bad", right:-46, width: 160, height:160, top: 41, position: "absolute" }}>{dataSecond.MostBoughtPackage}</Typography>
                    </Paper>
                </Box>




                    <Avatar  style={{ background:'#dad5e6', color: "#474bad", left: 270, width: 160, height:160, top: 120, position: "absolute" }}></Avatar>
                {/*<Typography style={{fontFamily:"serif", fontSize:26, color: "#474bad", right: 150, width: 160, height:160, top: 105, position: "absolute" }}> Username  </Typography>*/}
                {/*<Typography style={{fontFamily:"serif", fontSize:20, color: "#474bad", right: 260, width: 160, height:160, top: 125, position: "absolute" }}>{data.username}</Typography>*/}
                {/*<Typography style={{fontFamily:"serif", fontWeight:"bold", fontSize:16, color: "#474bad", left: 700, width: 160, height:160, top: 105, position: "absolute" }}> Status  </Typography>*/}
                {/*<Typography style={{fontFamily:"serif", fontSize:20, color: "#474bad", left: 700, width: 160, height:160, top: 125, position: "absolute" }}>Admin</Typography>*/}
                {/*<Typography style={{fontFamily:"serif", fontWeight:"bold", fontSize:16, color: "#474bad", left: 460, width: 160, height:160, top: 175, position: "absolute" }}> Date Of Birth  </Typography>*/}
                {/*<Typography style={{fontFamily:"serif", fontSize:20, color: "#474bad", left: 460, width: 160, height:160, top: 195, position: "absolute" }}>{data.dob}</Typography>*/}
                {/*<Typography style={{fontFamily:"serif", fontWeight:"bold", fontSize:16, color: "#474bad", left: 460, width: 160, height:160, top: 240, position: "absolute" }}>Contact No  </Typography>*/}
                {/*<Typography style={{fontFamily:"serif", fontSize:20, color: "#474bad", left: 460, width: 160, height:160, top: 260, position: "absolute" }}>{data.contact_no}</Typography>*/}
                {/*<Typography style={{fontFamily:"serif", fontWeight:"bold", fontSize:16, color: "#474bad", left: 460, width: 160, height:160, top: 300, position: "absolute" }}>Email  </Typography>*/}
                {/*<Typography style={{fontFamily:"serif", fontSize:20, color: "#474bad", left: 460, width: 160, height:160, top: 320, position: "absolute" }}>{data.email}</Typography>*/}
                {/*<Typography style={{fontFamily:"serif", fontWeight:"bold", fontSize:16, color: "#474bad", left: 460, width: 160, height:160, top: 175, position: "absolute" }}> Date Of Birth  </Typography>*/}
                {/*<Typography style={{fontFamily:"serif", fontSize:20, color: "#474bad", left: 460, width: 160, height:160, top: 195, position: "absolute" }}></Typography>*/}
                {/*<Typography style={{fontFamily:"serif", fontWeight:"bold", fontSize:16, color: "#474bad", left: 700, width: 160, height:160, top: 175, position: "absolute" }}> Package Name </Typography>*/}
                {/*<Typography style={{fontFamily:"serif", fontSize:20, color: "#474bad", left: 700, width: 700, height:160, top: 193, position: "absolute" }}>{dataSecond.package}</Typography>*/}
                {/*<Typography style={{fontFamily:"serif", fontWeight:"bold", fontSize:16, color: "#474bad", left: 700, width: 160, height:160, top: 240, position: "absolute" }}> Clicks Used  </Typography>*/}
                {/*<Typography style={{fontFamily:"serif", fontSize:20, color: "#474bad", left: 700, width: 700, height:160, top: 260, position: "absolute" }}>{dataSecond.consumed} / {dataSecond.total}</Typography>*/}
                {/*<Typography style={{fontFamily:"serif", fontWeight:"bold", fontSize:16, color: "#474bad", left: 700, width: 160, height:160, top: 105, position: "absolute" }}> Subscription Status : </Typography>*/}
                {/*<Typography style={{fontFamily:"serif", fontSize:20, color: "#474bad", left: 700, width: 700, height:160, top: 260, position: "absolute" }}>{dataSecond.is_subscribed}</Typography>*/}



                {/*<Typography style={{fontFamily:"serif", fontSize:28, color: "#474bad", left: 460, width: 160, height:160, top: 120, position: "absolute" }}>{dataTwo.contact_no}</Typography>*/}
                {/*<Typography style={{fontFamily:"serif", fontSize:28, color: "#474bad", left: 460, width: 160, height:160, top: 150, position: "absolute" }}>{dataTwo.dob}</Typography>*/}

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
                            to="/adminprofile/:id"
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

                <AppBar className={classes.bottom} position="static" color="primary">
                    <Container maxWidth="md">
                        <Toolbar>
                            <Typography className={classes.writebottom} variant="body1" color="inherit" >

                            </Typography>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        </div>


    );

}

export default AdminProfile;