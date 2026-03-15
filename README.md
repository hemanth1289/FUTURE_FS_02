# MiniCRM — Client Lead Management System

A full-stack Lead Management System built with React, Node.js/Express, and MongoDB.

---

## 📁 Project Structure

```
crm/
├── backend/
│   ├── controllers/
│   │   └── leadController.js
│   ├── models/
│   │   └── Lead.js
│   ├── routes/
│   │   └── leadRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── api/
    │   │   └── leads.js
    │   ├── components/
    │   │   ├── Sidebar.js
    │   │   └── Sidebar.css
    │   ├── pages/
    │   │   ├── Dashboard.js
    │   │   ├── Dashboard.css
    │   │   ├── LeadList.js
    │   │   ├── LeadList.css
    │   │   ├── AddLeadForm.js
    │   │   └── AddLeadForm.css
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    └── package.json
```

---

## ✅ Prerequisites

Make sure the following are installed on your machine:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | v18+ | https://nodejs.org |
| npm | v9+ | Comes with Node.js |
| MongoDB | v6+ | https://www.mongodb.com/try/download/community |

---

## 🚀 Step-by-Step Setup

### Step 1 — Clone or extract the project

If you downloaded a ZIP, extract it. Then open a terminal in the `crm/` root folder.

---

### Step 2 — Start MongoDB

Make sure MongoDB is running locally on the default port `27017`.

**On macOS (Homebrew):**
```bash
brew services start mongodb-community
```

**On Ubuntu/Linux:**
```bash
sudo systemctl start mongod
```

**On Windows:**
```bash
net start MongoDB
```

Or simply open **MongoDB Compass** and connect to `mongodb://localhost:27017` — that will start the service.

---

### Step 3 — Set up the Backend

```bash
# Navigate to backend folder
cd crm/backend

# Install dependencies
npm install

# (Optional) Edit the .env file if your MongoDB URI is different
# Default is: MONGO_URI=mongodb://localhost:27017/minicrm
```

The `.env` file looks like this:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/minicrm
```

**Start the backend server:**
```bash
# Production mode
npm start

# Development mode (auto-restart on changes)
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

---

### Step 4 — Set up the Frontend

Open a **new terminal window/tab**, keeping the backend running.

```bash
# Navigate to frontend folder
cd crm/frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The app will automatically open at **http://localhost:3000**

> The `"proxy": "http://localhost:5000"` in `frontend/package.json` forwards all `/leads` API calls to the backend — no CORS issues.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/leads` | Get all leads |
| POST | `/leads` | Create a new lead |
| PUT | `/leads/:id` | Update a lead by ID |
| DELETE | `/leads/:id` | Delete a lead by ID |

### Sample POST body:
```json
{
  "name": "Sarah Johnson",
  "email": "sarah@company.com",
  "phone": "+1 555 000 0000",
  "source": "Referral",
  "status": "New",
  "notes": "Interested in enterprise plan"
}
```

---

## 🌐 Pages

| Page | Description |
|------|-------------|
| Dashboard | Stats, conversion rate, source breakdown, recent leads |
| All Leads | Full lead list with search, filter, status update, edit, delete |
| Add Lead | Form to create a new lead or edit an existing one |

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Axios, react-hot-toast, CSS3
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Fonts:** Syne + DM Sans (Google Fonts)

---

## 🐛 Troubleshooting

**"MongoDB connection failed"**
- Ensure MongoDB is running: `mongod --version` and then start the service
- Check `MONGO_URI` in `.env` matches your setup

**"Cannot GET /leads" or network error**
- Make sure the backend is running on port 5000
- Check that `"proxy"` is set correctly in `frontend/package.json`

**Port already in use**
- Kill the process: `lsof -ti:5000 | xargs kill` (macOS/Linux)
- Or change `PORT` in `.env`

---

## 📦 Building for Production

```bash
# Build the React frontend
cd frontend
npm run build

# Serve the build folder with your backend (optional)
# Add this to server.js:
# app.use(express.static(path.join(__dirname, '../frontend/build')));
```
