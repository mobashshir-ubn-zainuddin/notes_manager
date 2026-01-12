# Notes Management App

Link: http://notes-manager-jade.vercel.app/login

---

## 🚀 Quick Setup

Follow these steps to run the app locally for development.

1. Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd notes_manager
# install server deps
cd server
npm install
# install client deps
cd ../client
npm install
```

2. Create a `.env` file in the project root with these variables (example):

```dotenv
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=Cluster0
JWT_SECRET=your-256-bit-secret
PORT=5000
CLIENT_URL=http://localhost:3000
```

> Tip: Use a cryptographically-random `JWT_SECRET` (32 bytes). See `README` notes below for generation examples.

3. Start the backend and frontend:

```bash
# from project root (or separate terminals)
node server/server.js
# in another terminal
cd client
npm run dev
```

---

## 🔐 Admin account (development)

For local development you can create a user via the UI and promote it to an admin manually. Example **development-only** credentials you can use as a starting point:

- **Email:** `admin@example.com`
- **Password:** `AdminPass123!` (change immediately)

Important:
- Do **not** use plain credentials like the example in production.
- The project currently does not include an `admin` field in the `User` schema. To add role-based admin support do one of the following:
  - Option A (quick, via MongoDB): Register the user via the app, then promote with the Mongo shell or GUI:

```js
// Mongo shell (replace email)
db.users.updateOne({ email: 'admin@example.com' }, { $set: { admin: true } })
```

  - Option B (recommended): Add an `admin` boolean to the `User` schema and seed an admin user at startup.

Example schema addition (server/models/User.js):

```js
admin: { type: Boolean, default: false }
```

And a one-off script to seed an admin user which hashes the password before saving.