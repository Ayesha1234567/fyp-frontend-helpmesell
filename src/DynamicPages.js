import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import Drawer from "@mui/material/Drawer";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
import AppsIcon from "@mui/icons-material/Apps";
import Collapse from "@mui/material/Collapse";
import { styled, alpha } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
// import {History} from "@material-ui/icons";
// import { browserHistory } from "react-router";
// import { useHistory } from "react-router-dom";
// import SearchIcon from '@mui/icons-material/Search';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableRow from '@mui/material/TableRow';
import LogoutIcon from "@mui/icons-material/Logout";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
// import TableRow from '@mui/material/TableRow';
// import DynamicPage from "./DynamicPages";
// import  { Redirect } from 'react-router-dom'
import {
    makeStyles,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    AppBar,
    Toolbar,
    Typography,
    ButtonGroup,
    Button,
} from "@material-ui/core";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
// import router from "react-router-dom/es/Router";
import { useNavigate } from "react-router-dom";
// import withRouter from "react-router-dom/es/withRouter";
import axios from "axios";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import {BASE_URL} from "./Constants";

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
        // right:-237,
        top:-0,
        position:"absolute"

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
        position:"relative"
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
        position:"absolute",
        color: "slateblue",
        fontFamily:"sans-serif",
        top:20,
        left:-0,

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
    productname:{
        position:"relative",
        top:120,
        left:590,
        fontSize:31,
        fontFamily:"serif",
        color:"slateblue",
        display: "block",
        whiteSpace:"unset",
        width:700,
        overflow:"hidden",
        //textOverflow:"clip",
        border:1,
    },
    productdesc:{
        position:"relative",
        top:190,
        left:500,
        fontSize:20,
        fontFamily:"serif",
        color:"slateblue",
        display: "block",
        whiteSpace:"unset",
        width:500,
        overflow:"hidden",
        textOverflow:"clip",
        border:1,
    },
    imageCard:{
        position:"absolute",
        width:300,
        left:278,
        top:110,
        height:350,
    },
    list:{
        right:340,
        top:490,
        position:"absolute",
        width:660
    },
    tableheading:{
        color:"slateblue",
        fontSize:16,
        fontWeight:"bold"
    },
    tableheadingOne:{
        position:"relative",
        color:"slateblue",
        fontSize:18,
        fontWeight:"bold",
        left:-100,
        display: "block",
        whiteSpace:"unset",
        width:450,
        overflow:"hidden",

    },
    tableheadingTwo:{
        position:"relative",
        color:"slateblue",
        fontSize:16,
        fontWeight:"bold",
        left:10
    },
    tableheadingThree:{
        position:"relative",
        color:"slateblue",
        fontSize:16,
        fontWeight:"bold",
        left:200
    },
    tablecontentOne:{
        position:"relative",
        left:-100,
        top:38,
        display: "block",
        whiteSpace:"unset",
        width:450,
        overflow:"hidden",
    },
    tablecontentTwo:{
        position:"relative",
        left:10,
        top:20,
    },
    tablecontentThree:{
        position:"relative",
        left:200,
        top:20,
    },


})


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
function ProductDetails(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState({});
    const [price, setPrice] = useState([]);
    const [user,setUser]=useState({});
    const [relatedProducts,setRelatedProducts]=useState({});


    let { id } = useParams();
    let history = useNavigate();


    useEffect(() => {
        console.log("This is the useEffect of dynamic Function: ", { id });

        axios({
            url: BASE_URL+`/api/product/${id}/`,
            method: "GET",
        })
            .then(({ data }) => {
                console.log("this is the data of a single product: ", { data });
                setData(data);
            })
            .catch((err) => {
                console.log("this is the error: ", { err });
            });
        axios({
            url: BASE_URL+`/api/related_products/${id}/`,
            method: "GET",
        })
            .then(({ data }) => {
                console.log("this is the data of a single product: ", { data });
                setRelatedProducts(data);
            })
            .catch((err) => {
                console.log("this is the error: ", { err });
            });
        setUser(JSON.parse(localStorage.getItem('current_user')))
    }, []);

    useEffect(() => {
        // console.log("This is the useEffect of dynamic Function: ", {product_name});


        setUser(JSON.parse(localStorage.getItem('current_user')))
    }, []);
    useEffect(() => {

        axios({
            url: `https://finalproject-helpmesell.herokuapp.com/api/price/`,
            method: "GET",
        })
            .then(({ data }) => {
                console.log("this is the data of a single product: ", { data });
                setPrice(data.filter( d => d.product ==  id));
            })
            .catch((err) => {
                console.log("this is the error: ", { err });
            });
        setUser(JSON.parse(localStorage.getItem('current_user')))
    }, []);


    function handleClick() {
        setOpen(!open);
    }

    const logoutHandler = () => {
        localStorage.setItem("current_user", "");
        history("/login");
    };

    return (
        <div>

            {data !== {} ? (
                <>
                    <TableContainer component={Paper}>*/}
                        <Table className={classes.list} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableheadingOne} >Model</TableCell>
                                    <TableCell className={classes.tableheadingTwo} >Price(Rs)</TableCell>
                                    <TableCell className={classes.tableheadingThree} >Image</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {relatedProducts && relatedProducts.data && relatedProducts.data.map((row) => (

                                        <TableRow key={row.id} >
                                            <TableCell className={classes.tablecontentOne}>{row.product_name}</TableCell>
                                            <TableCell className={classes.tablecontentTwo}>{row.prices}</TableCell>
                                            <TableCell className={classes.tablecontentThree}> <Typography align="left">{<img style={{width: 50}} src={row.product_image}/>}</Typography></TableCell>
                                        </TableRow>

                                    )

                                )}

                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Typography className={classes.productname}>{data.data && data.data.product.product_name} </Typography>

                    <Card className={classes.imageCard}>
                        <CardContent>
                            <Typography align="left" className={classes.mediaImage}>{<img style={{width: 300}} src={data.data && data.data.product.product_image}/>}</Typography>
                        </CardContent>
                    </Card>


                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flexGrow: 5 }}>
                            <AppBar position="static" className={classes.application}>
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
                                            <FileUploadIcon color={"primary"}></FileUploadIcon>
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
                                    to="/products/:id"
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
                                {parseInt(user.state) == 2 &&
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

                </>
            ) : (
                <h5>Loading</h5>
            )}
        </div>
    );
}
export default ProductDetails;
// export default withRouter(ProductDetails);
