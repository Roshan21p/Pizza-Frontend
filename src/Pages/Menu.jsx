import { useDispatch, useSelector } from 'react-redux';
import Layout from '../Layouts/Layout';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../Redux/Slices/ProductSlice';
import { useEffect, useState } from 'react';
import { categories } from '../Constants/categories';

function Menu() {
  const dispatch = useDispatch();
  const { productsData } = useSelector((state) => state.product);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    (async () => {
      await dispatch(getAllProducts());
    })();
    setSelectedCategory('all');
  }, []);

  const filteredProduct =
    selectedCategory === 'all'
      ? productsData
      : productsData?.filter((item) => item.category === selectedCategory);

  return (
    <Layout>
      <div className="mx-auto min-h-screen bg-gradient-to-r from-amber-50 to-orange-300">
        <div className="container  mx-auto px-4 py-8">
          {/* Category buttons */}
          <div className="flex flex-wrap justify-center space-x-4 sm:space-x-10 mb-9">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-1 py-1 sm:px-3 sm:py-2  font-semibold rounded-md transition duration-200 ease-in-out ${
                  selectedCategory === category.value
                    ? 'bg-orange-400 text-white'
                    : 'bg-[#FFD700] text-white hover:bg-orange-400'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          {/* Adjust the grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProduct?.map((item) => {
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
                        <p className="mb-3 text-sm text-gray-700 leading-relaxed overflow-hidden line-clamp-3">
                          {item?.description}
                        </p>
                        <p className="text-lg font-medium text-gray-900">₹{item?.price}</p>
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
