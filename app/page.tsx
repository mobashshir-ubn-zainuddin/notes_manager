import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 text-white">
          <h1 className="text-5xl font-bold mb-4">📝 Notes Management App</h1>
          <p className="text-xl text-purple-100">A complete MERN Stack Application</p>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 mb-8">
          {/* Project Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">✅ Project Structure</CardTitle>
              <CardDescription>Your complete MERN application is ready to run</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">📂 Backend (Node.js + Express)</h3>
                  <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                    <li>MongoDB connection configuration</li>
                    <li>User and Note schemas with validation</li>
                    <li>JWT authentication with bcrypt password hashing</li>
                    <li>RESTful API endpoints for auth and notes CRUD</li>
                    <li>Protected routes with JWT middleware</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">⚛️ Frontend (React + Vite)</h3>
                  <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                    <li>Login and Register pages with validation</li>
                    <li>Dashboard for managing notes</li>
                    <li>Create, view, and delete notes</li>
                    <li>Beautiful gradient UI design</li>
                    <li>Responsive design for all devices</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Setup Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">🚀 Quick Start Guide</CardTitle>
              <CardDescription>Follow these steps to run your app locally</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Step 1: MongoDB Setup</h3>
                  <ol className="list-decimal list-inside text-sm space-y-2 text-gray-700">
                    <li>
                      Go to{" "}
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                        https://www.mongodb.com/cloud/atlas
                      </span>
                    </li>
                    <li>Create a free account and log in</li>
                    <li>Create a new cluster (free tier available)</li>
                    <li>Click "Connect" and copy the connection string</li>
                    <li>
                      Replace <span className="font-mono">&lt;username&gt;</span> and{" "}
                      <span className="font-mono">&lt;password&gt;</span> with your credentials
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Step 2: Environment Variables</h3>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono space-y-2 overflow-x-auto">
                    <div>
                      # Create <span className="text-yellow-400">server/.env</span> file
                    </div>
                    <div>MONGODB_URI=mongodb+srv://username:password@cluster...net/notesapp</div>
                    <div>
                      JWT_SECRET=<span className="text-red-400"># Generate with node command below</span>
                    </div>
                    <div>PORT=5000</div>
                    <div>CLIENT_URL=http://localhost:3000</div>
                    <div className="text-gray-400 mt-4">Generate JWT_SECRET:</div>
                    <div className="text-green-400">
                      node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Step 3: Install & Run Backend</h3>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono space-y-2">
                    <div>cd server</div>
                    <div>npm install</div>
                    <div>npm run dev</div>
                    <div className="text-yellow-400">Server will run on http://localhost:5000</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Step 4: Install & Run Frontend</h3>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono space-y-2">
                    <div>cd client</div>
                    <div>npm install</div>
                    <div>npm run dev</div>
                    <div className="text-yellow-400">App will open at http://localhost:3000</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Endpoints */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">🔌 API Endpoints</CardTitle>
              <CardDescription>Available REST API routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Authentication</h4>
                  <div className="space-y-2 text-sm">
                    <div className="bg-blue-50 p-2 rounded font-mono">POST /api/auth/register</div>
                    <div className="bg-blue-50 p-2 rounded font-mono">POST /api/auth/login</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Notes (Protected)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="bg-green-50 p-2 rounded font-mono">GET /api/notes</div>
                    <div className="bg-green-50 p-2 rounded font-mono">POST /api/notes</div>
                    <div className="bg-green-50 p-2 rounded font-mono">DELETE /api/notes/:id</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">✨ Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">🔐 Security</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>✓ Password hashing with bcryptjs</li>
                    <li>✓ JWT token authentication</li>
                    <li>✓ Protected API routes</li>
                    <li>✓ User-specific data access</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">📱 User Experience</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>✓ Clean, modern design</li>
                    <li>✓ Responsive on all devices</li>
                    <li>✓ Form validation</li>
                    <li>✓ Error handling</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">🔧 Troubleshooting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-1">Backend won't start?</h4>
                  <ul className="list-disc list-inside text-gray-700 ml-2">
                    <li>Check MongoDB URI is correct</li>
                    <li>Ensure .env file has MONGODB_URI and JWT_SECRET</li>
                    <li>Verify port 5000 is not in use</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Frontend can't connect to backend?</h4>
                  <ul className="list-disc list-inside text-gray-700 ml-2">
                    <li>Check if backend server is running</li>
                    <li>Look for CORS errors in browser console</li>
                    <li>Verify CLIENT_URL matches in backend .env</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Notes not appearing?</h4>
                  <ul className="list-disc list-inside text-gray-700 ml-2">
                    <li>Confirm you're logged in</li>
                    <li>Check Network tab for API errors</li>
                    <li>Verify JWT token is valid</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Info */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-2xl">📥 Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-gray-700">
                  Your complete MERN Notes Management App is ready! All files are included in the project:
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    ✓ <span className="font-semibold">server/</span> - Express backend with MongoDB integration
                  </li>
                  <li>
                    ✓ <span className="font-semibold">client/</span> - React frontend with Vite
                  </li>
                  <li>
                    ✓ <span className="font-semibold">SETUP_INSTRUCTIONS.md</span> - Detailed setup guide
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  Click the three dots in the top right and select "Download ZIP" to get all files, then follow the
                  Quick Start Guide above to run your app locally!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-purple-100 text-sm mt-8">
          <p>Built with React, Node.js, Express, and MongoDB</p>
          <p>All code ready to run - just add your MongoDB credentials!</p>
        </div>
      </div>
    </main>
  )
}
