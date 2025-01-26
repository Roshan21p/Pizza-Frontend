import AdminLayout from '../../Layouts/AdminLayout';
import { BsTrash } from 'react-icons/bs';
import { MdOutlineModeEdit } from 'react-icons/md';
import { deleteProduct, getAllProducts } from '../../Redux/Slices/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AllProducts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productsData } = useSelector((state) => state.product);

  useEffect(() => {
    (async () => {
      await dispatch(getAllProducts());
    })();
  }, []);

  async function handleProductDelete(id) {
    if (window.confirm('Are you sure you want the delete the product.')) {
      const response = await dispatch(deleteProduct(id));

      if (response?.payload?.data?.success) {
        await dispatch(getAllProducts());
      }
    }
  }

  return (
    <AdminLayout>
      <div className=" mx-auto p-4 sm:w-[90%] lg:w-[80%] flex flex-col items-center justify-center gap-10 mt-10">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-center mx-auto text-sm sm:text-2xl font-bold sm:font-semibold text-[#6B7280] hover:text-[#FF9110]">
            Product Overview
          </h1>

          {/* Add product button */}
          <button
            onClick={() => {
              navigate('/admin/add-product', {
                state: {
                  initialProductData: {
                    newProduct: true,
                    productName: '',
                    description: '',
                    price: '',
                    quantity: '',
                    category: '',
                    productImage: undefined
                  }
                }
              });
            }}
            className="text-[#6B7280] mx-auto bg-amber-400  transition-all ease-in-out duration-300 rounded py-2 px-4 sm:font-semibold font-bold text-sm sm:text-2xl cursor-pointer"
          >
            Create New Product
          </button>
        </div>

        <div className="w-full overflow-x-auto rounded-md">
          <table className=" w-full border-collapse border border-gray-300 text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2">S No.</th>
                <th className="border border-gray-300 p-2">Product</th>
                <th className="border border-gray-300 p-2">Description</th>
                <th className="border border-gray-300 p-2">Category</th>
                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-[#FFFFCC]">
              {productsData?.map((item, index) => (
                <tr key={item?._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    <textarea
                      readOnly
                      className="w-full h-auto bg-transparent resize-none overflow-hidden"
                      value={item?.productName}
                    ></textarea>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <textarea
                      readOnly
                      className="w-full h-auto bg-transparent resize-none overflow-hidden"
                      value={item?.description}
                    ></textarea>
                  </td>
                  <td className="border border-gray-300 p-2">{item?.category}</td>
                  <td className="border border-gray-300 p-2">{item?.quantity}</td>
                  <td className="border border-gray-300 p-2">{item?.price}</td>
                  <td className="border border-gray-300 p-2 flex items-center justify-center gap-4">
                    {/* Edit button */}
                    <button
                      onClick={() =>
                        navigate('/admin/edit', {
                          state: {
                            initialProductData: {
                              newProduct: false,
                              ...item
                            }
                          }
                        })
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                    >
                      <MdOutlineModeEdit />
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => handleProductDelete(item?._id)}
                      className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                    >
                      <BsTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AllProducts;
