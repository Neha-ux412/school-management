# School Management API

A simple Node.js and Express-based RESTful API to manage schools. This API allows adding new schools and retrieving existing school records using a MySQL database.

## 🚀 Live Deployment

The API is live and accessible at:

**🔗 [https://school-management-production-b590.up.railway.app](https://school-management-production-b590.up.railway.app)**

## 📂 Features

- Add new school data
- Retrieve all school records
- RESTful structure
- MySQL database integration
- Deployed on Railway

## 🧪 Postman Collection

The Postman collection includes example requests and expected responses for easy testing.

🔗 [Postman Collection Link](#) *(Replace with actual sharable link)*

## 📦 Tech Stack

- Node.js
- Express.js
- MySQL
- Railway (for deployment)
- Postman (for API testing)

## 📁 Folder Structure

schl_mngmnt/
│
├── routes/
│ └── schools.js # API routes
│
├── server.js # Main server file
├── .env # Environment variables
├── package.json # Project metadata and dependencies
└── README.md # Project documentation

## ⚙️ Setup Instructions

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/school-management-api.git
   cd school-management-api
2. Install dependencies
   npm install
3. Configure environment variables
Create a .env file in the root directory and add your DB credentials:
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
PORT=8080
4. Start the server
 node server.js
5. Access API Endpoints
   GET    /api/schools       → Fetch all schools
   POST   /api/schools       → Add a new school
💡 Example API Requests
  Add a School
bash
Copy
Edit
POST /api/schools
Content-Type: application/json

{
  "name": "Springfield High",
  "address": "742 Evergreen Terrace",
  "city": "Springfield"
}
GET GET http://localhost:3000/api/listSchools?latitude="give the value u gave"&longitude="give the value u gave"
🙋‍♀️ Contact
If you face any issues or have questions, feel free to reach out. I’d be happy to help!
