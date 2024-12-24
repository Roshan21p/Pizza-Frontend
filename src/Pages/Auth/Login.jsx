import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Slices/AuthSlice";
import LoginPresentation from "./LoginPresentation";
import { useNavigate } from "react-router-dom";

function Login(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    function handleUserInput(e) {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        })
    }


    async function handleFormSubmit(e){
        e.preventDefault();  // prevent the form reloading the page        

        // Add validations for the form input
        if(!loginData.email  || !loginData.password){
            toast.error("Missing values from the form");
            return;
        }


        const apiResponse = await dispatch(login(loginData));
        console.log("API Response of Login ", apiResponse);
        if(apiResponse?.payload?.data?.success){
            navigate('/')
            setLoginData({
                email: '',
                password: '',
            })
            return;
        } 
    }
    return(
        <LoginPresentation 
        handleFormSubmit={handleFormSubmit} 
        handleUserInput={handleUserInput} 
        loginData={loginData}
        />
    )

}

export default Login;