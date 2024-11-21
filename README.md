# **CryptoLab**
Week 14 Group Project with Shareef Evans, Henry Agustin and Lachlan Miles. Building a Full Stack Crypto Application: CryptoLab is a full-stack web application designed for cryptocurrency enthusiasts to stay updated on the latest trends, monitor the performance of their favorite coins, and securely manage their accounts. By integrating real-time updates with a clean, intuitive interface, CryptoLab empowers users to make informed decisions about their cryptocurrency portfolios. The platform is scalable, responsive, and built with modern web technologies, ensuring a seamless experience on both desktop and mobile devices.

## **Table of Contents**

1. [Project Description](#project-description)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Database Seeding](#database-seeding)
7. [Project Structure](#project-structure)
8. [Future Enhancements](#future-enhancements)
9. [Contributing](#contributing)
10. [License](#license)

## **Project Description**

Cryptocurrencies have become an integral part of the financial world, but staying updated with the latest information can be overwhelming. CryptoLab simplifies this by providing:
- **Real-Time Data:** Get updates on the latest prices, trends, and performance of various cryptocurrencies.
- **User Customization:** Save your favorite coins for quick access and personalized tracking.
- **Secure Authentication:** Log in to manage your portfolio with confidence, knowing your data is protected.

CryptoLab aims to bridge the gap between complexity and usability, offering both novice and experienced users a platform to engage with the cryptocurrency market effortlessly.

## **Features**

- **Secure Authentication:** 
  - User login with password hashing for security.
  - Role-based access (e.g., admin, standard user).

- **Real-Time Updates:**
  - View live updates and performance metrics for various coins.

- **Favorites Management:**
  - Save, update, and manage a list of favorite cryptocurrencies.

- **Mobile-Responsive Design:**
  - Accessible on desktops, tablets, and smartphones.

- **Modular Architecture:**
  - Designed for scalability with separate front-end and back-end systems.



## **Technologies Used**

### **Frontend**
- React (with TypeScript)
- Vite for build optimization
- Axios for API calls
- Bootstrap for styling and responsiveness

### **Backend**
- Node.js with Express.js
- Sequelize ORM for database interaction
- PostgreSQL as the database
- bcrypt for password hashing

---

## **Installation**

Follow these steps to set up the project locally:

1. **Clone the repository**
```bash
   git clone https://github.com/your-repo/cryptolab.git
```

2. **Navigate to the project directory**
```bash
    cd cryptolab
```

3. **Install dependencies**
```bash
    cd client && npm install
    cd ../server && npm install
```

4. **Set up the environment variables**
Create a .env file in the server folder with the following
```bash
    DB_NAME='kanban_db'
    DB_USER=''
    DB_PASSWORD=''
    JWT_SECRET_KEY=''
```

5. **Run the development servers**
- Start the back-end
```bash
    cd server && npm start
```
- Start the front-end
```bash
    cd client && npm run dev
```

6. **Open the app in your browser at** http://localhost:3000.

## Usage
1. Register or log in to the application using secure authentication.
2. Browse a live feed of cryptocurrency updates to monitor trends.
3. Save your favorite coins for easy access.

## **Database Seeding**
To populate the database with default users for login functionality:

1. Ensure the database is properly configured and running.
2. Run the seeding script:
```bash
    npm run seed
```
3. Default login credentials:
    - Admin: admin@example.com / admin123
    - User: user@example.com / user123

## Project Structure
```bash
cryptolab/
├── client/          # Front-end application
│   ├── src/         # Source code for React
│   ├── public/      # Static assets
│   └── dist/        # Build output
├── server/          # Back-end application
│   ├── src/
│   │   ├── models/  # Sequelize models
│   │   ├── routes/  # API routes
│   │   ├── seeds/   # Database seeders
│   │   └── controllers/ # Business logic
├── package.json     # Root-level configuration
└── README.md        # Project documentation
```

## Futere Enhancements
- **WebSocket Integration:**
    - *Enable real-time updates for coin performance.*

- **Alert Notifications**
    - *Notify users of significant price changes or trends.*

- **Advanced Filtering:**
    - *Add sorting, filtering, and categorization of coin data.*

- **Multi-Language Support:**
    - *Translate the application to support global users.*

## **Contributing**
Contributions are welcome! Please follow these steps:
    1. Fork the repository.
    2. Create a new branch

 ```bash
    git checkout -b feature-name
```
    3. Commit changes and open a pull request.

## **Licence**
This project is licensed under the MIT License.
```bash
MIT License

Copyright (c) 2024 Henry Agustin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```