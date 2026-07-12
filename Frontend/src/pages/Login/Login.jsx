import { Mail, Lock, Eye } from "lucide-react";
import loginImage from "../../assets/images/login-showroom.png";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* Left Side */}
        <div className="hidden lg:flex items-center justify-center bg-black">
          <img
            src={loginImage}
            alt="Luxury Car"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="p-12 flex flex-col justify-center">

          <h1 className="text-4xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Sign in to continue to Luxury Motors
          </p>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3">
              <Mail size={18} className="text-gray-400" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full ml-3 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3">
              <Lock size={18} className="text-gray-400" />

              <input
                type="password"
                placeholder="Enter password"
                className="w-full ml-3 outline-none"
              />

              <Eye
                size={18}
                className="text-gray-400 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-between text-sm mb-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#" className="text-red-500">
              Forgot Password?
            </a>
          </div>

          <button className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition">
            Login
          </button>

          <div className="text-center mt-6 text-gray-500">
            Don't have an account?
            <Link
                to="/register"
                className="text-red-600 font-semibold ml-2 hover:underline"
                >
                Register
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;