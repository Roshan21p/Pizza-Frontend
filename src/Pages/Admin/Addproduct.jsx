import { useState } from 'react';
import AddProductPresentation from './AddProductPresentation';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addNewProduct } from '../../Redux/Slices/ProductSlice';

function AddProduct() {
  const dispatch = useDispatch();

  const [productDetails, setProductDetails] = useState({
    productName: '',
    description: '',
    price: '',
    quantity: '',
    category: 'veg',
    productImage: ''
  });

  function handleInput(e) {
    const { name, type, value, files } = e.target;

    if (type === 'file') {
      setProductDetails({
        ...productDetails,
        [name]: files[0]
      });
    } else {
      setProductDetails((state) => ({
        ...state,
        [name]: value
      }));
    }
    console.log(productDetails);
  }

  async function handleFormSubmit(e) {
    e.preventDefault(); // prevent the form reloading the page

    // Add validations for the form input
    if (
      !productDetails.productName ||
      !productDetails.description ||
      !productDetails.price ||
      !productDetails.quantity ||
      !productDetails.productImage
    ) {
      toast.error('Missing values from the form');
      return;
    }

    const formData = new FormData();
    formData.append('productName', productDetails.productName);
    formData.append('description', productDetails.description);
    formData.append('price', productDetails.price);
    formData.append('quantity', productDetails.quantity);
    formData.append('category', productDetails.category);
    formData.append('productImage', productDetails.productImage); // Append the image file

    const apiResponse = await dispatch(addNewProduct(formData));
    console.log('API Response of Product ', apiResponse);
  }

  return <AddProductPresentation handleInput={handleInput} handleFormSubmit={handleFormSubmit} />;
}

export default AddProduct;
