import React, {useEffect, useState} from 'react';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import {Button, Grid, IconButton, makeStyles, Snackbar, TextField} from "@material-ui/core";
import axios from "axios";
import {BASE_URL} from "./Constants";
import CloseIcon from "@mui/icons-material/Close";
import {Alert} from "@mui/material";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({
    success:{
        position:"relative",
        width:300,
        left:650,
        bottom:300
    },
    field: {
        marginTop: 35,
        marginBottom: 10,
        left: 10,
        top: -15,
        width: 410,
        height: 0,
        position: "relative",
        fontFamily: "serif",
        display: "block",
    },
    fieldTwo: {
        marginTop: 40,
        marginBottom: 50,
        left: 14,
        top: -15,
        width: 320,
        height: 39,
        position: "relative",
        fontFamily: "serif",
        display: "block",
    },
    button: {
        position: "relative",
        marginBottom:40,
        top: 80,
        right:86,
        maxHeight: 40,
        width:100,
        maxWidth: 100,
        fontFamily: "serif",
    },
});
function PaymentInputs(props) {
    const classes = useStyles()
    const[name,setName]= useState("");
    const[email,setEmail]= useState("");
    const [data, setData] = useState([]);
    const [user,setUser]=useState({});
    const [cardNumber,setCardNumber] =useState("")
    const [expiryDate,setExpiryDate]=useState("")
    const [cvc,setCVC]=useState("");
    const [openSnackBAr, setOpenSnackBAR] = useState(false);
    const [openTwo, setOpenTwo] = React.useState(false);
    const [success,setSuccess]=useState(false);
    const[subscribed,setSubscribed]=useState(false)
    const history = useNavigate();
    const handleCardNumberChange = (event) => {
        setCardNumber(event.target.value)
    }
    const handleExpiryDateChange = (event) => {
        setExpiryDate(event.target.value)
    }
    const handleCVCChange = (event) => {
        setCVC(event.target.value)
    }
    const handleClose = () => {
        setOpenTwo(false);
    };

    console.log(props.paymentId)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('current_user')))
    }, []);
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

    const {
        wrapperProps,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps
    } = usePaymentInputs();

    async function Submit() {
        let item = {
            name: name,
            email: email,
            number: cardNumber,
            exp_date: expiryDate,
            cvc: cvc,
            user_id: user.id,
            price: 'price_1KvnsYFVG2XMVBbY4b3Kio3b'
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
                url: BASE_URL+"/api/Payment/",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                data: item,
            });
            if (response.status==200||response.status==201)
            {
                user.is_subscribed = true
                localStorage.setItem('current_user', JSON.stringify(user))
                setSubscribed(true)
                history("/paymentsuccess")
                console.log("in response 200")
            }
            console.log("this is the response: ", { response });
        } catch (error) {
            console.log("error", error);

            const { response } = error || {};
            const { data } = response || {};
            const { message } = data || {};
            setOpenSnackBAR(true);


        }
        // const requestOptions = {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Accept: "application/json",
        //     },
        //     body: JSON.stringify(item),
        // };
        // try {
        //     const response = await axios({
        //         url: BASE_URL+"/api/Payment/",
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //             Accept: "application/json",
        //         },
        //         data: item,
        //     });
        //
        //     const { data } = response || {};
        //
        // } catch (error) {
        //     console.log("error", { error });
        //     const { response } = error;
        //     const { data } = response;
        //     const { message } = data;
        //     setOpenSnackBAR(true);
        // }

    }
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
            <form>
                <Grid container direction={"row"} spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.field}
                            required
                            value={user.username}
                            type={"name"}
                            onChange={(e) => setName(e.target.value)}
                            id="outlined-basic"
                            label=" Name"
                            variant="outlined"
                            size="small"
                            First
                            Name
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            className={classes.field}
                            required
                            type={"email"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="outlined-basic"
                            label=" Email"
                            variant="outlined"
                            size="small"
                            Email
                        />
                    </Grid>

                    <PaymentInputsWrapper {...wrapperProps} className={classes.fieldTwo}>
                        <svg {...getCardImageProps({ images })} />
                        <input {...getCardNumberProps({ onChange: handleCardNumberChange })} value={cardNumber}/>
                        <input {...getExpiryDateProps({ onChange: handleExpiryDateChange})}  value={expiryDate}/>
                        <input {...getCVCProps({ onChange: handleCVCChange})} value={cvc}/>
                    </PaymentInputsWrapper>
                    <Button
                        className={classes.button}
                        onClick={Submit}
                        variant="contained"
                        color="primary"
                    >
                        Subscribe

                    </Button>

                    <Snackbar
                        open={openSnackBAr}
                        autoHideDuration={6000}
                        message={"Payment Failed"}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        action={action}
                    />
                    {success && <Alert  action={close}  className={classes.success} severity="success">File Uploaded Successfully</Alert>}
                </Grid>
            </form>

        </div>
    );

}
export default PaymentInputs