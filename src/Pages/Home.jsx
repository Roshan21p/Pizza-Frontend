import IconArrowRight from "../Components/Icons/ArrowRight";
import PizzaImage from "../assets/Images/pizza2.png"
import CookingImage from "../assets/Images/cooking1.png"
import OrderFood from "../assets/Images/orderFood.png"
import Pickup from "../assets/Images/pickup.png"
import Enjoy from "../assets/Images/enjoy.png"
import IconPatchCheck from "../Components/Icons/IconPatchCheck";
import Layout from "../Layouts/Layout";
import { useNavigate } from "react-router-dom";



function Home(){

    const navigate = useNavigate();

    return (
        <Layout>
            <div>
                {/* Hero Section */}
                <section 
                    className="flex flex-col-reverse items-center justify-center py-5 md:flex-row md:gap-7 bg-gradient-to-r from-amber-50 to-orange-300"
                
                >
                    <div className="w-4/6 ml-4 text-center md:w-2/6 md:text-left">

                        <div className="flex justify-center text-4xl md:justify-normal">

                            <h1 className="pb-5 font-bold text-transparent bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text">
                                Enjoy the slice {' '}
                            </h1>
                            <h1>
                                😋
                            </h1>

                        </div>

                        <p className="pb-4 text-[#687280] ">
                            The Pizza App lets you order favorite pizza from the comfort of your home. 
                            Enjoy the best pizza in town with just a few click.
                        </p>

                        <button onClick={() => navigate('/menu')} className="flex items-center px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 group">
                            Order Now

                            <span className="inline-block ml-3 transition-transform ease-in-out group-hover:translate-x-2">
                                <IconArrowRight />
                            </span>

                        </button>


                    </div>

                    <div>
                        <img 
                            src={PizzaImage}
                            alt="Pizza"
                            width={550}
                            height={550}
                        />
                    </div>


                </section>


                {/* Services section */}
                <section
                    className="py-4 mt-6 bg-gradient-to-r from-amber-50 to-orange-300"
                >
                    <div className="container flex flex-col md:flex-row">
                        <div className="flex flex-col items-center justify-center rounded-lg lg:w-1/2">
                            <img 
                                src={CookingImage}
                                width={500}
                                className="rounded-lg"
                                alt="Cooking" 
                            />
                        </div>

                        <div className="flex flex-col flex-wrap text-center lg:py-6 lg:w-1/2 lg:pl-12 lg:text-left">

                            <div className="flex flex-col items-center lg:items-start ">
                                <div>
                                    <h2 className="mb-2 text-5xl font-extrabold text-transparent title-font bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text">
                                        Cooked by the best <br/> chefs in the world.
                                    </h2>
                                    <p className="text-base leading-relaxed text-[#6B7280]">
                                        There are many benefits regarding to that but the main ones are:
                                    </p>
                                </div>
                            </div>

                            <div className="w-full p-1">
                                <div className="flex items-center h-full p-2 text-2xl rounded">
                                    <IconPatchCheck className="text-[#F38339] wd-10 h-10 mr-4" />
                                    <span className="font-bold title-font">Perfect taste</span>

                                </div>
                            </div>

                            <div className="w-full p-1">
                                <div className="flex items-center h-full p-2 text-2xl rounded">
                                    <IconPatchCheck className="text-[#F38339] wd-10 h-10 mr-4" />
                                    <span className="font-bold title-font">Prepared quickly</span>

                                </div>
                            </div>

                            <div className="w-full p-1">
                                <div className="flex items-center h-full p-2 text-2xl rounded">
                                    <IconPatchCheck className="text-[#F38339] wd-10 h-10 mr-4" />
                                    <span className="font-bold title-font">Food hygeine guaranteed</span>

                                </div>
                            </div>

                            <div className="px-5 py-4 mx-auto">
                                <div className="flex justify-center py-4">
                                    <div className="inline-flex w-16 h-1 bg-yellow-400 rounded-full"> </div>
                                </div>

                                <div className="flex flex-wrap space-y-6 md:space-y-0">

                                    <div className="flex flex-col items-center text-center p-4 md:w-1/3">
                                        <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-5 bg-yellow-100 rounded-full">
                                            <img src={OrderFood} alt="OrderFood" />
                                        </div>

                                        <div className="flex-grow">
                                            <h2 className="mb-3 text-lg font-bold text-gray-900 title-font">
                                                Order Food
                                            </h2>
                                            <p className="text-base leading-relaxed">
                                                As easy 1, 2, 3, Just select your favorite pizza and place your order.
                                            </p>
                                        </div>

                                    </div>

                                    
                                    <div className="flex flex-col items-center text-center p-4 md:w-1/3">
                                        <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-5 bg-yellow-100 rounded-full">
                                            <img src={Pickup} alt="Pickup" />
                                        </div>

                                        <div className="flex-grow">
                                            <h2 className="mb-3 text-lg font-bold text-gray-900 title-font">
                                                Pickup Food
                                            </h2>
                                            <p className="text-base leading-relaxed">
                                                Pickup up yuor order from the nearest store or get it delivered to your doorstep.
                                            </p>
                                        </div>

                                    </div>

                                    
                                    <div className="flex flex-col items-center text-center p-4 md:w-1/3">
                                        <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-5 bg-yellow-100 rounded-full">
                                            <img src={Enjoy} alt="Enjoy" />
                                        </div>

                                        <div className="flex-grow">
                                            <h2 className="mb-3 text-lg font-bold text-gray-900 title-font">
                                                Enjoy Food
                                            </h2>
                                            <p className="text-base leading-relaxed">
                                                As soon as you get you order, enjoy the delicious pizza with your loved ones.
                                            </p>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>


                    </div>

                    
                </section>

            </div>
        </Layout>
    );
}

export default Home;