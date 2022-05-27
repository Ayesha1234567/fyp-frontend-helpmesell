import React, {useEffect, useState} from "react";
import {
    AppBar,
    Box, Button, Container,
    List,
    ListItemIcon,
    ListItemText,
    makeStyles,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core';
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import Drawer from "@mui/material/Drawer";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import {Link, useHistory, useNavigate} from "react-router-dom";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import AppsIcon from "@mui/icons-material/Apps";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import LogoutIcon from "@mui/icons-material/Logout";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TablePagination from "@mui/material/TablePagination";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
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
        right:-240,
        position:"relative"
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
        position: "relative",
        bottom: -490,
        left: 200,
        width:1319,
    },

    font:{
        fontFamily:"serif",
        color:"slateblue",
    },
    card:{
        position:"relative",
        left:250,
        top:300,
        height:330
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

function PriceComparison()
{
    const classes=useStyles();
    const [open, setOpen] = React.useState(false)
    const [data,setData]=useState([]);
    const history = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [user,setUser]=useState({});
    const logoutHandler = () => {
        localStorage.setItem("current_user", "");
        history("/login");
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    function handleClick() {
        setOpen(!open)
    }

    function passValues()
    {

        history.push('/products/')
    }
    const fetch_products = async () => {

        let result = await fetch(BASE_URL+"/api/products/")
        result = await result.json();
        setData(result);
    }

    useEffect(() => {
        fetch_products()
    }, []);
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('current_user')))
    }, []);
    async function search(key)
    { if (key.length>3)
    {
        setData(data.filter(d => d.product_name.toLowerCase().includes(key.toLowerCase())));
    }

        else if(key.length===0)
        {
            let result=await fetch('https://finalproject-helpmesell.herokuapp.com/api/products/');
            result=await result.json();
            setData(result)

        }
        // let result = await fetch("https://finalproject-helpmesell.herokuapp.com/product/"+key)
        // result = await result.json();
        // setData(result)
        // console.warn(key)
    }
    return(
        <div>
            <Box sx={{ display: 'flex' }}>
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
            </Box>

            <Typography style={{fontSize:56,fontFamily:"serif",left:670,top:160, color:"slateblue",position:"absolute"}}>Survey Product</Typography>
            <TextField className={classes.searchbar}  onChange={(e)=>search(e.target.value)} id="outlined-basic" label="name" variant="outlined" size="small" Last Name/>

            <SearchIconWrapper>
                <SearchIcon style={{color:"slateblue",left:580, width:100, height:100, top:85,position:"absolute"}}/>
            </SearchIconWrapper>
            {/*<Button variant="contained" color={"primary"} style={{left:1120, top:185}} onClick={Search}>Search</Button>*/}
            {<Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    p: 1,
                    m: 1,
                    alignContent: 'flex-end',
                    borderRadius: 1,
                    flexWrap: 'wrap',
                    maxWidth: 1400,
                }}>


                { data.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage).map((row) => {
                    return (

                        <Card className={classes.card}
                              sx={{minWidth: 250, boxShadow: 2, padding: 2, margin: 1}}>
                            <CardContent>
                                <TableRow
                                    key={row.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <Link to={"/products/" + row.id}>
                                        <Typography align="left" style={{
                                            width: 220,
                                            overflow: "hidden",
                                            fontFamily: "sans-serif",
                                            fontSize: 13,
                                            fontWeight: "bold",
                                            position: "relative",
                                            top: 232,
                                            left: 20
                                        }} className={classes.media}
                                                    onClick={passValues}> {row.product_name}</Typography>
                                    </Link>

                                    {/*{<Typography align="left" style={{*/}
                                    {/*    width: 200,*/}
                                    {/*    overflow: "hidden",*/}
                                    {/*    fontFamily: "sans-serif",*/}
                                    {/*    fontSize: 10,*/}
                                    {/*    position: "relative",*/}
                                    {/*    top: 172,*/}
                                    {/*    left: 80*/}
                                    {/*}} className={classes.media}> {row.product_description}</Typography>}*/}
                                    {<Typography align="left"
                                                 className={classes.media}>{row.Username}</Typography>}
                                    <Typography align="left" className={classes.mediaImage}>{<img
                                        style={{width: 140}} src={row.product_image}/>}</Typography>

                                </TableRow>
                            </CardContent>
                            <CardActions>
                                <Button style={{position: "absolute", top: 600}} color={"primary"}
                                        variant={"contained"} size="large">Reviews</Button>

                            </CardActions>
                        </Card>


                    );
                })
                }


            </Box>
            }
            <TablePagination
                className={classes.paginate}
                component="div"
                count={100}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <AppBar  className={classes.bottom} position="static" color="primary">
                <Container maxWidth="md">
                    <Toolbar>
                        <Typography className={classes.writebottom} variant="body1" color="inherit" >

                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}
export default PriceComparison;