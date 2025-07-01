# Pizzify - Online Pizza Ordering App

**Pizzify** is a modern and responsive pizza ordering e-commerce platform. Users can browse a menu of delicious pizzas, add items to their cart, make secure payments, and track their orders. The platform uses JWT-based authentication stored in HTTPS-only cookies for secure login.

The admin dashboard enables efficient management of products, users, and orders. It also includes a sales analytics section, allowing admins to view the **total amount** collected, with filters for **monthly and yearly data** based on order dates.

🔗 **Live Demo**: [https://pizzify-lilac.vercel.app](https://pizzify-lilac.vercel.app)  
🔗 **Backend Repository**: [https://github.com/Roshan21p/Pizza-App-Backend](https://github.com/Roshan21p/Pizza-App-Backend)

> ⚠️ The backend is hosted on Render and may take a few seconds to start if idle.

---

## Features

- User registration and login
- JWT-based authentication using HTTPS-only cookies
- Forgot password and reset password via email
- Admin dashboard to manage users, products, and orders
- Add to cart and place orders with Stripe Payment Gateway
- View order history, detailed order information and download invoice
- Order status updates via admin dashboard (manual)
- Monthly and yearly sales amount overview (admin)
- Stripe for payment integration
- Toast notifications for feedback (e.g., login, logout, error)
- Fully responsive design for all screen sizes

---

## 🛠️ Technologies Used

- **React.js**
- **Tailwind CSS**
- **Redux Toolkit** for global state management
- **Axios** for API communication
- **React Router DOM** for navigation
- **JWT** (handled via backend) for secure authentication

---

## 🌐 Deployment

### ✅ Frontend

Deployed on **Vercel**  
🔗 [Live Site](https://pizzify-lilac.vercel.app)

### ✅ Backend

Deployed on **Render**  
🔗 [Backend API](https://pizza-app-backend-807z.onrender.com/ping)

> The backend handles user auth, order processing, product management, and payment logic.

---

## 💻 How to Run Locally

#  Frontend SetUp
### 1. Clone the repository

```bash
git clone https://github.com/Roshan21p/Pizza-Frontend.git
cd Pizza-Frontend
```
### 2. Install dependencies
```bash
npm install
```
### 3. To run the project, use the following command
```bash
npm run dev
```
### 4 Frontend .env
 Create a .env file in the root of Pizza-Frontend
```bash
VITE_BACKEND_URL=http://localhost:8000
# Or for production:
VITE_BACKEND_URL=https://pizza-app-backend-807z.onrender.com
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

---
# Backend SetUp
### 1. Clone the repository

```bash
git clone https://github.com/Roshan21p/Pizza-App-Backend.git
cd Pizza-App-Backend
```
### 2. Install dependencies
```bash
npm install
```
### 3. To run the project, use the following command
```bash
npm start
```
### 4 Backend .env
Create a .env file in the root of Pizza-App-Backend
```bash
PORT=3000
FRONTEND_URL=http://localhost:5173

# Add your actual credentials below:
DB_URL=mongodb+srv://<your-mongo-credentials>.oqsvz.mongodb.net/pizzify?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=your_jwt_secret
JWT_EXPIRY= expiry_time

COOKIE_SECURE=false   # true in production

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_username
SMTP_PASSWORD=your_smtp_password
SMTP_FROM_EMAIL=your_email

STRIPE_SECRET_KEY=your_stripe_secret_key

CONTACT_US_EMAIL=your_email
```

---

## 📸 Screenshots

### Home_page
![Home1](https://github.com/user-attachments/assets/aa0ba2dd-0fb0-4b97-9815-7e3c62d5439f)
![Screenshot 2025-06-22 201938](https://github.com/user-attachments/assets/c9836de5-c96e-4c8f-9a0f-dbeb2575e6bc)

### Service_page
![service_page](https://github.com/user-attachments/assets/792bea19-ba5e-4fdc-8181-46f75ee343b6)

### About_page
![About_page](https://github.com/user-attachments/assets/d0ae2f87-a694-44e6-b84a-53a605e74f51)

### SignUp_page
![signup_page](https://github.com/user-attachments/assets/f161e38b-5133-4de9-8d27-9f87784282c7)

### Login_page
![Login_page](https://github.com/user-attachments/assets/99e25207-0d10-41a7-b9ca-bbb363f84587)

### Forgot_Password_page
![ForgotPassword_page](https://github.com/user-attachments/assets/63141d8c-fbbb-4591-aded-2d615c0d7134)

### Profile_page
![profile](https://github.com/user-attachments/assets/a4d22a72-e4d0-4206-99dd-42434e0077f9)

### Menu_page
![Menu_page](https://github.com/user-attachments/assets/d522b57b-9060-40d4-80c9-79f47c1be562)

### Product_details_page
![Product_details_page](https://github.com/user-attachments/assets/bc10dbf7-a347-4c9e-bfe3-bc9fcfab981d)

### Cart_page
![Cart_page](https://github.com/user-attachments/assets/2bf49691-0b86-41f4-b6c5-dd104dbff41c)

### Address_page
![Address_page](https://github.com/user-attachments/assets/66f29238-fb8b-4e48-a1c3-a4ab8b3c811b)

### Checkout_page
![Checkout_page](https://github.com/user-attachments/assets/7447ca25-2830-4cd5-a3c2-568d48b48ab2)

### Stripe_gateway_page
![Stripe_gateway_page](https://github.com/user-attachments/assets/4ef67f13-3f59-4cc7-bd44-8a6da0bbc32f)

### Verification_page
![Verification_page](https://github.com/user-attachments/assets/a5d7d0f6-ec42-4512-b799-1ec4cb35ed0a)

### Payment_Success_page
![Success_page](https://github.com/user-attachments/assets/33e4dfda-883c-43a9-a1db-a8bc53f41f61)

### User_Order_page
![Order_history_page](https://github.com/user-attachments/assets/2d47b467-5619-4123-b61b-b92c7ddac584)

![Order_detail_page](https://github.com/user-attachments/assets/6b22873e-0605-4fcc-90b5-bd8270272722)

### Admin_Sales_Analytics (Monthly/Yearly)
![Sales_data_page](https://github.com/user-attachments/assets/e278b1a8-5071-4199-b35b-d78c92ba3e86)

###  Admin_Product_Management_page
![All_product_page](https://github.com/user-attachments/assets/93980cc2-62d9-4585-8e0d-adb5c0fde53e)
![Create_new_product_page](https://github.com/user-attachments/assets/f350671b-94f1-447c-98ec-e57cf27ccd2b)

###  Admin_Order_Management_page
![Admin_order_page](https://github.com/user-attachments/assets/38bed4d1-f8b3-479b-bfdf-4839aaf3a055)
![Order_status_page](https://github.com/user-attachments/assets/eacc5921-8e40-4c04-9cec-9f36d272d786)

### Not_Found_page
![Not_found](https://github.com/user-attachments/assets/fdda6e80-37a4-4d14-926f-16459f3fed9c)

### Access_Denied_page
![Access_denied](https://github.com/user-attachments/assets/203d6f64-fcb1-4fbd-a4ce-4b0f0354ef7a)
