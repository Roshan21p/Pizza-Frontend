import Layout from '../../Layouts/Layout';
import Food from '../../assets/Images/food.svg';

function AddProductPresentation({ handleInput, handleFormSubmit }) {
  return (
    <Layout>
      <section className="py-4 min-h-[90vh] bg-gradient-to-r from-amber-50 to-orange-300">
        <div className="flex items-center justify-center px-5  ">
          <div className="hidden p-0 lg:w-2/6 md:w-2/6 md:pr-16 lg:pr-0 md:block">
            <img src={Food} alt="Food" />
          </div>
          <div className="max-w-md md:w-4/6 mx-auto mt-8 bg-gray-100 rounded-lg p-4">
            <h2 className="mb-4 text-2xl font-semibold">Add Product</h2>

            <form>
              {/* Product Name */}
              <div className="mb-4">
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                  Product name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  onChange={handleInput}
                  required
                  minLength={5}
                  maxLength={60}
                  name="productName"
                  id="productName"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* description */}
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  onChange={handleInput}
                  required
                  minLength={5}
                  maxLength={500}
                  name="description"
                  id="description"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Price */}
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Product price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  onChange={handleInput}
                  required
                  name="price"
                  id="price"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Product quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  onChange={handleInput}
                  required
                  name="quantity"
                  id="quantity"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Category */}
              <div className="mb-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Select Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  id="category"
                  onChange={handleInput}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="veg">Vegetarian</option>
                  <option value="non-veg">Non-Vegetarian</option>
                  <option value="drinks">Soft drinks</option>
                  <option value="sides">Sides</option>
                </select>
              </div>

              {/* image */}
              <div className="mb-4">
                <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">
                  Product image <span className="text-red-600">(.jpg, .png, .jpeg )</span>
                </label>
                <input
                  type="file"
                  onChange={handleInput}
                  required
                  name="productImage"
                  id="productImage"
                  accept=".jpg, .jpeg, .png"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <button
                onClick={handleFormSubmit}
                type="submit"
                className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              >
                Add product
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default AddProductPresentation;
