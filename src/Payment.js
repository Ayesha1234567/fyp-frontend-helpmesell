import React, {useEffect, useState} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {useHistory} from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import {
    CardElement,
    Elements,
    useElements,
    useStripe
} from "@stripe/react-stripe-js";
import {AppBar, Container, List, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography} from "@material-ui/core";
import Drawer from "@mui/material/Drawer";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import {Link, useNavigate} from "react-router-dom";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import AppsIcon from "@mui/icons-material/Apps";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import LogoutIcon from "@mui/icons-material/Logout";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import {Box, Button, CardActions, CardMedia} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
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
    app:{

        position:"absolute"
    },
    search:{
        left: 1000,
    },

    searchmain:{
        border:"solid 2px",
        borderColor:"slateblue",
        left:550,
        top:180,
        position:"absolute",
        maxWidth:550,
    },
    bottom: {
        position: "absolute",
        top:658
    },

    font:{
        fontFamily:"serif",
        color:"slateblue",
    },
    card:{
        position:"absolute",
        left:280,
        top:150,
        width:250,
        height:360
    },
    cardTwo:{
        position:"absolute",
        left:700,
        top:150,
        width:250,
        height:360
    },
    cardThree:{
        position:"absolute",
        left:1100,
        top:150,
        width:250,
        height:360
    },
    button:{
        position: "absolute",
        top: 280,
        left:50

    },
    media:{
        position:"relative",
        color: "slateblue",
        fontFamily:"serif",
        display: "block",
        whiteSpace:"unset",
        width:100,
        overflow:"hidden",
        border:1,
    },
    mediaImage:{
        position:"relative",
        color: "slateblue",
        fontFamily:"sans-serif",
        left:50,
        top:-20,
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
    searchbar:{
        position:"absolute",
        top:250,
        left:550,
        width:550,
        height:200,
        borderColor:"slateblue",
        borderRadius:5
    },
    paginate: {
        color: "slateblue",
        fontFamily: "sans-serif",
        position:"relative",
        top:400,
        right:500
    },
    first:{
        position:"absolute",
        right:90,
        fontWeight:"28",
        fontFamily: "serif",
        color: "slateblue",
        top:10,
        fontSize:45,
    },
    second:{
        position:"absolute",
        right:57,
        fontFamily: "serif",
        color: "#4d7eb0",
        top:79,
        fontStyle:"italic",
        // fontSize:"21"
    },
    rs:{
        position:"absolute",
        right:160,
        fontSize:20,
        fontFamily:"serif",
        top:128,
        color:"#9ea3a8"
    },
    price:{
        position:"absolute",
        right:130,
        fontSize:65,
        fontFamily:"serif",
        top:128,
        color:"slateblue",
    },
    month:{
        position:"absolute",
        right:70,
        fontSize:20,
        fontFamily:"serif",
        top:188,
        color:"#9ea3a8"
    },
    details:{
        position:"absolute",
        right:59,
        fontSize:17,
        fontFamily:"serif",
        top:240,
        color:"slateblue",
        fontWeight:"bold",
    },
    offer:{
        position:"absolute",
        right:95,
        fontSize:14,
        fontFamily:"serif",
        top:270,
        color:"#4d7eb0",
    },
    offerTwo:{
        position:"absolute",
        right:90,
        fontSize:14,
        fontFamily:"serif",
        top:290,
        color:"#4d7eb0",
    },

    offer2:{
        position:"absolute",
        right:90,
        fontSize:14,
        fontFamily:"serif",
        top:310,
        color:"#4d7eb0",
    },

    offer3:{
        position:"absolute",
        right:80,
        fontSize:14,
        fontFamily:"serif",
        top:310,
        color:"#4d7eb0",
    },

    rsTwo:{
        position:"absolute",
        right:190,
        fontSize:20,
        fontFamily:"serif",
        top:128,
        color:"#9ea3a8"
    },

    priceTwo:{
        position:"absolute",
        right:90,
        fontSize:65,
        fontFamily:"serif",
        top:128,
        color:"slateblue",
    },

    monthTwo:{
        position:"absolute",
        right:50,
        fontSize:20,
        fontFamily:"serif",
        top:200,
        color:"#9ea3a8"
    },

    rsThree:{
        position:"absolute",
        right:190,
        fontSize:20,
        fontFamily:"serif",
        top:128,
        color:"#9ea3a8"
    },

    priceThree:{
        position:"absolute",
        right:70,
        fontSize:65,
        fontFamily:"serif",
        top:128,
        color:"slateblue",
    },

    monthThree:{
        position:"absolute",
        right:50,
        fontSize:20,
        fontFamily:"serif",
        top:200,
        color:"#9ea3a8"
    },

});

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
    </Box>
);
function Payment()
{  const classes=useStyles();
    const history = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [user,setUser]=useState({});
    // let item = {
    //     username: name,
    //     price: priceId,
    //     product:packageId,
    // };
    useEffect(async()=>{
        setUser(JSON.parse(localStorage.getItem("current_user")))
    },[])

    const [product, setProduct]=useState({
        // name:user.first_name+user.last_name,
        name:"Ayesha",
        price : 0,
        // productBy: "HelpMeSell",
        packageId:"prod_Ld41FbP0ws0ytC",
        priceId:"price_1KvntgFVG2XMVBbYF9GP2cqJ",

    });
    const [secondaryProduct, setSecondaryProduct]=useState({
        name:"Ayesha",
        price : 700,
        // productBy: "HelpMeSell",
        packageId:"prod_Ld41so8Y14AYVS",
        priceId:"price_1Kvnt3FVG2XMVBbYQcqT5iWH"


    });
    const [tertiaryProduct, setTertiaryProduct]=useState({
        name:"Ayesha",
        price : 1200,
        // productBy: "HelpMeSell",
        packageId:"prod_Ld40YnBLY7Bdak",
        priceId:"price_1KvnsYFVG2XMVBbY4b3Kio3b"

    });
    function handleClick() {
        setOpen(!open);
    }

    const logoutHandler = () => {
        localStorage.setItem("current_user", "");
        history("/login");
    };
    const makePayment= token => {
        const body ={
            token,
            product,

        }
        const headers={
            "Content-Type": "application/json"
        }
        return fetch(BASE_URL+'/api/Payment/',{
            method:"POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log("RESPONSE",response)
            const {status}=response;
            console.log("STATUS", status)
        }).catch(error => console.log(error));
    }

    const makePaymentSecond= token => {
        const body ={
            token,
            secondaryProduct
        }
        const headers={
            "Content-Type": "application/json"
        }
        return fetch(BASE_URL+'/api/Payment/',{
            method:"POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log("RESPONSE",response)
            const {status}=response;
            console.log("STATUS", status)
        }).catch(error => console.log(error));
    }
    const makePaymentThird= token => {
        const body ={
            token,
            tertiaryProduct
        }
        const headers={
            "Content-Type": "application/json"
        }
        return fetch(BASE_URL+'/api/Payment/',{
            method:"POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log("RESPONSE",response)
            const {status}=response;
            console.log("STATUS", status)
        }).catch(error => console.log(error));
    }
    return(
        <div>
            <AppBar position="static" className={classes.app}>
                <Toolbar>
                </Toolbar>
            </AppBar>

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

            <Card  className={classes.card}
                   sx={{ minWidth: 250, boxShadow: 2, padding: 2, margin: 1, top:200 }}>
                <CardContent>
                    <Typography   className={classes.first}>
                        Basic
                    </Typography>
                    <Typography variant={"h6"} className={classes.second}>
                        Upto 15 keywords
                    </Typography>
                    <Typography className={classes.rs}>Rs</Typography>
                    <Typography className={classes.price}> 0 </Typography>
                    <Typography className={classes.month}>/month</Typography>
                    <Typography className={classes.details}>Subscription Includes</Typography>
                    <Typography className={classes.offer}> Price Comparison</Typography>
                    <Typography className={classes.offerTwo}> Sentiment Analysis</Typography>
                    <Typography className={classes.offer2}> Upto 15 Keywords</Typography>
                </CardContent>
                <CardActions>
                    <Button variant={"outlined"} color={"primary"} size="medium" className={classes.button}>
                        <StripeCheckout
                            stripeKey="pk_test_51Ko90cFVG2XMVBbYRIsd05IYwLiephIfD4pYR5fuM2nnhjWbJaygr3K14dUjx5I7IVBksntJRd1TI4u29lDhrzow005UFElHAk"
                            token={makePayment}
                            name={user.first_name+user.last_name}
                        >
                        </StripeCheckout>
                    </Button>
                </CardActions>
            </Card>




            <Card  className={classes.cardTwo}
                   sx={{ minWidth: 250, boxShadow: 2, padding: 2, margin: 1, top:200 }}>
                <CardContent>
                    <Typography   className={classes.first}>
                        Standard
                    </Typography>
                    <Typography variant={"h6"} className={classes.second}>
                        Upto 700 keywords
                    </Typography>
                    <Typography className={classes.rsTwo}>Rs</Typography>
                    <Typography className={classes.priceTwo}> 700 </Typography>
                    <Typography className={classes.monthTwo}>/month</Typography>
                    <Typography className={classes.details}>Subscription Includes</Typography>
                    <Typography className={classes.offer}>Price Comparison</Typography>
                    <Typography className={classes.offerTwo}>Sentiment Analysis</Typography>
                    <Typography className={classes.offer3}> Upto 700 Keywords</Typography>
                </CardContent>
                <CardActions>
                    <Button variant={"outlined"} color={"primary"} size="medium" className={classes.button}>
                        <StripeCheckout
                            stripeKey="pk_test_51Ko90cFVG2XMVBbYRIsd05IYwLiephIfD4pYR5fuM2nnhjWbJaygr3K14dUjx5I7IVBksntJRd1TI4u29lDhrzow005UFElHAk"
                            token={makePaymentSecond}
                            name={user.first_name+user.last_name}>
                        </StripeCheckout>
                    </Button>
                </CardActions>
            </Card>


            <Card  className={classes.cardThree}
                   sx={{ minWidth: 250, boxShadow: 2, padding: 2, margin: 1, top:200 }}>
                <CardContent>
                    <Typography   className={classes.first}>
                        Premium
                    </Typography>
                    <Typography variant={"h6"} className={classes.second}>
                        Upto 1500 keywords
                    </Typography>
                    <Typography className={classes.rsThree}>Rs</Typography>
                    <Typography className={classes.priceThree}> 1200 </Typography>
                    <Typography  className={classes.monthThree}>/month</Typography>
                    <Typography className={classes.details}>Subscription Includes</Typography>
                    <Typography className={classes.offer}> Price Comparison</Typography>
                    <Typography className={classes.offerTwo}> Sentiment Analysis</Typography>
                    <Typography  className={classes.offer3}> Upto 1200 Keywords</Typography>

                </CardContent>
                <CardActions>
                    <Button variant={"outlined"} color={"primary"} size="medium" className={classes.button}>
                        <StripeCheckout
                            stripeKey="pk_test_51Ko90cFVG2XMVBbYRIsd05IYwLiephIfD4pYR5fuM2nnhjWbJaygr3K14dUjx5I7IVBksntJRd1TI4u29lDhrzow005UFElHAk"
                            token={makePaymentThird}
                            name={user.first_name+user.last_name}>
                        </StripeCheckout>
                    </Button>
                </CardActions>
            </Card>

            <AppBar  className={classes.bottom} position="static" color="primary">
                <Container maxWidth="md">
                    <Toolbar>
                        <Typography className={classes.writebottom} variant="body1" color="inherit" >

                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>

        </div>

    );
}
export default Payment;