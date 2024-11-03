import { useNavigate } from "react-router-dom";
import Layout from "../../Layouts/Layout";
import OrderSuccessImage from "../../assets/Images/ordered-success.png"

function OrderSuccess(){

    const navigate = useNavigate();

    return(
        <Layout>
            <div className="flex flex-col justify-center items-center py-28">

                <img 
                    width={400}
                    height={400}
                    src={OrderSuccessImage} 
                    alt="OrderSuccessImage" 
                />

                <p className="text-lg font-semibold">
                    Your order has been placed successfully
                </p>

                <button
                    onClick={() => navigate('/')} 
                    className="text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-700 rounded text-lg"
                >
                    Go Back Home
                </button>
            </div>
        </Layout>
    )
}

export default OrderSuccess;