import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layouts/Layout";
import { Link } from "react-router-dom";
import { getAllProducts } from "../Redux/Slices/ProductSlice";
import { useEffect } from "react";

function Menu() {
    const dispatch = useDispatch();
    const { productsData } = useSelector((state) => state.product);
    
    useEffect(() => {
        // This is called when the component mounts
        dispatch(getAllProducts());
    }, []);
  return (
    <Layout>
      <div className="mx-auto min-h-screen bg-gradient-to-r from-amber-50 to-orange-300">
        <div className="container mx-auto px-4 py-8">
          {/* Adjust the grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsData?.map((item) => {
              return (
                item?.inStock && (
                  <div
                    key={item._id}
                    className=" bg-white border rounded-lg overflow-hidden shadow-lg hover:shadow-orange-400 transition duration-300 ease-in-out"
                  >
                    <Link to={`/product/${item._id}`}>
                      <img
                        src={item?.productImage}
                        alt="Product"
                        className="obje object-fill w-full h-40 md:h-48 lg:h-52"
                      />
                      <div className="p-4 h-40 md:h-48">
                        <h2 className="text-xl text-[#FF9110] font-medium tracking-widest">
                          {item?.category}
                        </h2>
                        <h2 className="mb-2 text-lg font-medium text-gray-900">
                          {item?.productName}
                        </h2>
                        <p
                          className="mb-3 text-sm text-gray-700 leading-relaxed overflow-hidden line-clamp-3"
                        >
                          {item?.description}
                        </p>
                        <p className="text-lg font-medium text-gray-900">
                          ₹{item?.price}
                        </p>
                      </div>
                    </Link>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Menu;
