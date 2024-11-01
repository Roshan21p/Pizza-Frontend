import { useState } from "react";
import toast from "react-hot-toast";
import SignUpPresentation from "./SignupPresentation";
import { useDispatch } from "react-redux";
import { createAccount } from "../../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";


// Container for the Signup page
function Signup(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [signUpState, setSignUpState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        password: '',
    });

    function handleUserInput(e) {
        const {name, value} = e.target;
        setSignUpState({
            ...signUpState,
            [name]: value,
        })
    }

   async function handleFormSubmit(e){
        e.preventDefault();  // prevent the form reloading the page

        // Add validations for the form input
        if(!signUpState.email || !signUpState.mobileNumber || !signUpState.password || !signUpState.firstName || !signUpState.lastName){
            toast.error("Missing values from the form");
           // alert('Please fill all the fields');
            return;
        }

        if(signUpState.firstName.length < 5 || signUpState.firstName.length > 20){
            toast.error("First name should be atleast 5 characters long and maximum 20 characters long ");
            return;
        }

        // check email
        if(!signUpState.email.includes('@') || !signUpState.email.includes('.')){
            toast.error("Invalid email address");
            return;
        }

        // Check mobile number length should be between 10-12
        if(signUpState.mobileNumber.length < 10 || signUpState.mobileNumber.length > 12){
            toast.error("Mobile number should be between 10-12 characters");
            return;
        }

        const apiResponse = await dispatch(createAccount(signUpState));
        console.log("API Response is ", apiResponse);
        if(apiResponse.payload.data.success){
            navigate('/auth/login');
        }
        

    }

    return(
        <SignUpPresentation 
            handleFormSubmit={handleFormSubmit} 
            handleUserInput={handleUserInput} 
        />
    )


}

export default Signup;