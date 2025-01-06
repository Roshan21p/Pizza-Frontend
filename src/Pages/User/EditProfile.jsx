import { useDispatch } from 'react-redux';
import EditProfilePresentation from './EditProfilePresentation';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { isValidMobNumber } from '../../Helpers/regexMatcher';
import { getUserData, updateProfile } from '../../Redux/Slices/AuthSlice';

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    previewImage: undefined,
    avatar: undefined,
    address: {
      flat: '',
      area: '',
      landmark: '',
      pincode: '',
      city: '',
      state: ''
    }
  });
  const userData = useLocation().state;

  useEffect(() => {
    setData({
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      mobileNumber: userData?.mobileNumber,
      email: userData?.email,
      previewImage: userData?.avatar,
      address: userData?.address
    });
  }, [userData]);

  function handleImageUpload(e) {
    e.preventDefault();

    const uploadImage = e.target.files[0];

    // if the image exists then getting the url link of it
    if (uploadImage) {
      console.log('uploadImage', uploadImage);

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);

      fileReader.addEventListener('load', function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadImage
        });
      });
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value
      },
      [name]: value
    }));
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!data.firstName && !data.lastName && !data.mobileNumber && !data.avatar) {
      toast.error('Please fill atleast one of the fields');
    }

    if (data.firstName && (data.firstName.length < 5 || data.firstName.length > 15)) {
      toast.error('First name should be atleast 5 characters long and maximum 20 characters long ');
      return;
    }

    if (data.lastName && (data.lastName.length < 5 || data.lastName.length > 15)) {
      toast.error('Last name should be atleast 5 characters long and maximum 20 characters long ');
      return;
    }

    if (data.mobileNumber && !isValidMobNumber(data.mobileNumber)) {
      toast.error('Please enter a valid Indian mobile number (10 digits).');
      return;
    }

    if (data.address.pincode && !data.address.pincode.match(/^[1-9][0-9]{5}$/)) {
      toast.error('Invalid pincode. Enter a 6-digit number starting from 1-9.');
      return;
    }

    if (
      !data.address.flat ||
      !data.address.area ||
      !data.address.landmark ||
      !data.address.city ||
      !data.address.state
    ) {
      toast.error('Please fill all the address fields');
      return;
    }

    const formData = new FormData();
    formData.append('firstName', data?.firstName);
    formData.append('lastName', data?.lastName);
    formData.append('mobileNumber', data?.mobileNumber);
    if (data?.avatar) {
      formData.append('avatar', data?.avatar);
    }
    // Flatten the address object and append each field individually
    Object.keys(data.address).forEach((key) => {
      // Append each address property with a name like 'address[flat]', 'address[area]', etc.
      formData.append(`address[${key}]`, data.address[key]);
    });

    const res = await dispatch(updateProfile(formData));
    console.log('res', res);

    const apiResponse = await dispatch(getUserData());
    if (apiResponse?.payload?.success) {
      navigate('/user/profile');

      setData({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        previewImage: '',
        avatar: '',
        address: {
          flat: '',
          area: '',
          landmark: '',
          pincode: '',
          city: '',
          state: ''
        }
      });
    }
  }
  return (
    <EditProfilePresentation
      handleInputChange={handleInputChange}
      handleImageUpload={handleImageUpload}
      onFormSubmit={onFormSubmit}
      data={data}
    />
  );
}

export default EditProfile;
