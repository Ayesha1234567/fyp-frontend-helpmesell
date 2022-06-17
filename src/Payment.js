import React, {useEffect, useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import {loadStripe} from "@stripe/stripe-js";
import {useHistory} from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
import axios from "axios";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PaymentInputs from "./Checkout";
import HomeIcon from "@mui/icons-material/Home";
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
    active:{
        background:"slateblue",
    },
    title:{
        fontFamily:"serif",
    },
    head:{
        fontFamily:"serif",
        color:"#423294",
        fontWeight:"bold",
        position:"relative",
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
        color:'#474bad',
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
        top: 290,
        left:60

    },
    media:{
        position:"relative",
        color: '#474bad',
        fontFamily:"serif",
        display: "block",
        whiteSpace:"unset",
        width:100,
        overflow:"hidden",
        border:1,
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
    first:{
        position:"absolute",
        right:90,
        fontWeight:"28",
        fontFamily: "serif",
        color: '#474bad',
        top:10,
        fontSize:45,
    },
    second:{
        position:"absolute",
        right:57,
        fontFamily: "serif",
        color: '#474bad',
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
        color:'#474bad',
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
        color:'#474bad',
        fontWeight:"bold",
    },
    offer:{
        position:"absolute",
        right:95,
        fontSize:14,
        fontFamily:"serif",
        top:270,
        color:"#474bad",
    },
    offerTwo:{
        position:"absolute",
        right:90,
        fontSize:14,
        fontFamily:"serif",
        top:290,
        color:"#474bad",
    },

    offer2:{
        position:"absolute",
        right:90,
        fontSize:14,
        fontFamily:"serif",
        top:310,
        color:'#474bad',
    },

    offer3:{
        position:"absolute",
        right:80,
        fontSize:14,
        fontFamily:"serif",
        top:310,
        color:'#474bad',
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
        color:'#474bad',
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
        color:'#474bad',
    },

    monthThree:{
        position:"absolute",
        right:50,
        fontSize:20,
        fontFamily:"serif",
        top:200,
        color:"#9ea3a8"
    },
    dialog:{
        width:450,
        bottom:290,
        position:"absolute",
        right:200
    },
    heading:{
        position:"absolute",
        fontFamily:"serif",
        color:"#474bad",
        top:100,
        right:400
    },
    stPre:{
        position:"absolute",
        right:50,
        fontWeight:"28",
        fontFamily: "serif",
        color: '#474bad',
        top:10,
        fontSize:45,
    },
    icon:{
        position:"absolute",
        right:120
    },
    username:{
        position:"relative",
        fontFamily:"serif",
        left:1390
    }

});

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
    </Box>
);
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        width:450,

    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
    position:"absolute"
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};
function Payment()
{  const classes=useStyles();
    const history = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [user,setUser]=useState({});
    const [number,setNumber]=useState({});
    const [exp_month,setExp_Month]=useState({});
    const [exp_year,setExp_Year]=useState({});
    const [cvc,setCVC]=useState({});
    const [openTwo, setOpenTwo] = React.useState(false);
    const [currentPackageId, setCurrentPackageId] = useState('')


    const handleClickOpen = (id) => {
        setCurrentPackageId(id)
        setOpenTwo(true);
    };
    const handleClose = () => {
        setOpenTwo(false);
    };
    // let item = {
    //     username: name,
    //     price: priceId,
    //     product:packageId,
    // };
    function handleClick() {
        setOpen(!open);
    }
    useEffect(async()=>{
        setUser(JSON.parse(localStorage.getItem("current_user")))
    },[])

    const [product, setProduct]=useState({
        priceId:"price_1KvntgFVG2XMVBbYF9GP2cqJ",
    });
    const [secondaryProduct, setSecondaryProduct]=useState({

        priceId:"price_1Kvnt3FVG2XMVBbYQcqT5iWH",
    });
    const [tertiaryProduct, setTertiaryProduct]=useState({

        priceId:"price_1KvnsYFVG2XMVBbY4b3Kio3b",
    });
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
                    <AccountCircleIcon fontSize={"large"}className={classes.icon}></AccountCircleIcon>
                    <Typography variant={"h6"} className={classes.username}>{user.username}</Typography>
                </Toolbar>
            </AppBar>
            <Typography variant={"h3"} className={classes.heading} >Choose the Right Plan for You!</Typography>

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
                        to="/payment"
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
                    <Button token={makePayment} onClick={() => handleClickOpen(product)} variant={"outlined"} color={"primary"} size="medium" className={classes.button}>
                        Subscribe
                    </Button>
                </CardActions>
            </Card>




            <Card  className={classes.cardTwo}
                   sx={{ minWidth: 250, boxShadow: 2, padding: 2, margin: 1, top:200 }}>
                <CardContent>
                    <Typography   className={classes.stPre}>
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
                    <Button token={makePaymentSecond} onClick={() => handleClickOpen(secondaryProduct)} variant={"outlined"} color={"primary"} size="medium" className={classes.button}>
                        Subscribe
                    </Button>
                </CardActions>
            </Card>


            <Card  className={classes.cardThree}
                   sx={{ minWidth: 250, boxShadow: 2, padding: 2, margin: 1, top:200 }}>
                <CardContent>
                    <Typography   className={classes.stPre}>
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
                    <Button token={makePaymentThird} onClick={() => handleClickOpen(tertiaryProduct)} variant={"outlined"} color={"primary"} size="medium" className={classes.button}>
                        Subscribe
                    </Button>
                </CardActions>
            </Card>
                    
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={openTwo}
                className={classes.dialog}
            >
                <BootstrapDialogTitle  className={classes.head} id="customized-dialog-title" onClose={handleClose}>
                    Subscription Form
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {/* <PaymentInputs paymentId="price_1KvnsYFVG2XMVBbY4b3Kio3b" /> */}
                    <PaymentInputs paymentId={currentPackageId ? currentPackageId :'price_1KvnsYFVG2XMVBbY4b3Kio3b'}/>
                </DialogContent>
            </BootstrapDialog>
            );

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