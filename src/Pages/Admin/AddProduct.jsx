import { useEffect, useState } from 'react';
import AddProductPresentation from './AddProductPresentation';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addNewProduct, updateProduct } from '../../Redux/Slices/ProductSlice';
import { useLocation, useNavigate } from 'react-router-dom';

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { initialProductData } = useLocation().state;

  console.log("initialProductData",initialProductData);
  

  const [productDetails, setProductDetails] = useState({
    productName: '',
    description: '',
    price: '',
    quantity: '',
    category: 'veg',
    productImage: null,
  });

  useEffect(() => {
    if(initialProductData && !initialProductData?.newProduct){
      setProductDetails({
        productName: initialProductData?.productName || '',
        description: initialProductData?.description || '',
        price:  initialProductData?.price || '',
        quantity: initialProductData?.quantity || '',
        category: initialProductData?.category || 'veg',
        productImage: null,
      });
    }
  }, [initialProductData])

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
      !productDetails?.productName ||
      !productDetails?.description ||
      !productDetails?.price ||
      !productDetails?.quantity ||
      !productDetails?.productImage && initialProductData?.newProduct
    ) {
      toast.error('Missing values from the form');
      return;
    }

    const formData = new FormData();
    formData.append('productName', productDetails?.productName);
    formData.append('description', productDetails?.description);
    formData.append('price', productDetails?.price);
    formData.append('quantity', productDetails?.quantity);
    formData.append('category', productDetails?.category);

    if(productDetails?.productImage){
      formData.append('productImage', productDetails?.productImage); // Append the image file
    }

    let apiResponse;
    if(initialProductData?.newProduct){
       apiResponse = await dispatch(addNewProduct(formData));
    } else {
      const productId = initialProductData?._id;
        apiResponse = await dispatch(updateProduct({ productId, formData }));
    }
    console.log('API Response of Product ', apiResponse);
    if(apiResponse?.payload?.data?.success){
      setProductDetails({
        productName: '',
        description: '',
        price: '',
        quantity: '',
        category: 'veg',
        productImage: undefined,
      });

      navigate('/menu');
    }
   
  }

  return (
  <AddProductPresentation 
  handleInput={handleInput} 
  handleFormSubmit={handleFormSubmit} 
  productDetails={productDetails}
  />
  );
}

export default AddProduct;
