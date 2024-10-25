import { useState } from "react";
import toast from "react-hot-toast";
import SignUpPresentation from "./SignupPresentation";


// Container for the Signup page
function Signup(){

    const [signUpState, setSignUpState] = useState({
        firstName: '',
        surname: '',
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

    function handleFormSubmit(e){
        e.preventDefault();  // prevent the form reloading the page
        console.log(signUpState);

        // Add validations for the form input
        if(!signUpState.email || !signUpState.mobileNumber || !signUpState.password || !signUpState.firstName || !signUpState.surname){
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

    }

    return(
        <SignUpPresentation 
            handleFormSubmit={handleFormSubmit} 
            handleUserInput={handleUserInput} 
        />
    )


}

export default Signup;