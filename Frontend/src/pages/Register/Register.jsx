import React, { useState } from 'react';
import { Link } from "react-router-dom";
import loginImage from "../../assets/images/login-showroom.png";
const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-2xl rounded-lg flex w-full max-w-5xl overflow-hidden">
                
                {/* Image Side */}
                <div className="hidden lg:flex items-center justify-center bg-black">
                          <img
                            src={loginImage}
                            alt="Luxury Car"
                            className="w-full h-full object-cover"
                          />
                        </div>

                {/* Form Side */}
                <div className="w-full md:w-1/2 p-12">
                    <h2 className="text-2xl font-bold mb-6">Create an Account</h2>
                    <form className="space-y-4">
                        <input className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black" type="text" placeholder="Full Name" />
                        <input className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black" type="email" placeholder="Email Address" />
                        <input className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black" type="password" placeholder="Password" />
                        <input className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black" type="password" placeholder="Confirm Password" />
                        
                        <label className="flex items-center text-sm text-gray-600">
                            <input type="checkbox" className="mr-2" /> Subscribe to newsletter
                        </label>
                        
                        <button className="w-full bg-[#1a1a2e] text-white py-3 rounded font-bold hover:bg-black transition">
                            REGISTER
                        </button>
                    </form>
                    
                    <button className="w-full mt-4 py-3 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50">
                        Or, sign up with Google
                    </button>
                    
                    <p className="text-center text-sm mt-6 text-gray-500">
                        Already have an account? <Link
                                                    to="/login"
                                                    className="text-black font-bold hover:underline"
                                                    >
                                                    Login
                                                    </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;