import React, { useState } from 'react';
import Layout from '../Layouts/Layout';
import toast from 'react-hot-toast';
import { isEmail } from '../Helpers/regexMatcher';

function Contact() {
  const [input, setInput] = useState({
    name: '',
    email: '',
    message: ''
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value
    });
  }

  function onFormSubmit(e) {
    e.preventDefault();

    if (!input.name || !input.email || !input.message) {
      toast.error('All fields are mandatory');
      return;
    }

    if (!isEmail(input.email)) {
      toast.error('Invalid email id');
      return;
    }
  }
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-r from-amber-50 to-orange-300 px-6 py-4">
        <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">Contact Us</h1>
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
          {/* Contact Form */}
          <form className="space-y-6" noValidate onSubmit={onFormSubmit}>
            <div>
              <label className="block text-gray-600 font-medium mb-2">Your Name</label>
              <input
                id="name"
                type="text"
                name="name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-orange-300"
                placeholder="Enter your name"
                value={input.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-orange-300"
                placeholder="Enter your email"
                value={input.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">Message</label>
              <textarea
                id="message"
                type="message"
                name="message"
                className="w-full border border-gray-300 rounded-lg p-3 resize-none  focus:outline-none focus:ring focus:ring-orange-300"
                rows="4"
                placeholder="Write your message"
                value={input.message}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600"
            >
              Submit
            </button>
          </form>

          {/* Contact Details */}
          <div className="mt-10 text-center">
            <p className="text-gray-700">
              📧 Email: <span className="text-orange-600">support@pizzaapp.com</span>
            </p>
            <p className="text-gray-700">
              📞 Phone: <span className="text-orange-600">123-456-7890</span>
            </p>
            <p className="text-gray-700">🏠 Address: Pizza App Store, Mumbai</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
