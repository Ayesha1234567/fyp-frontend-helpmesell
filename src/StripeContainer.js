import React from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {Payment} from "@mui/icons-material";

const PUBLIC_KEY="pk_test_51Ko90cFVG2XMVBbYRIsd05IYwLiephIfD4pYR5fuM2nnhjWbJaygr3K14dUjx5I7IVBksntJRd1TI4u29lDhrzow005UFElHAk";
const stripeTestPromise=loadStripe(PUBLIC_KEY)
function StripeContainer()
{
    return(
        <Elements stripe={stripeTestPromise} >
            <Payment />
        </Elements>
    );

}
export default StripeContainer;
