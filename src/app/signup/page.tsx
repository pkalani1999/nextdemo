"use client"
import { UserData } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface FormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    mobile: string;
}

interface Errors {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    gender?: string;
    mobile?: string;
}
const useValidation = (formData: FormData) => {
    const errors: Errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const mobilePattern = /^\d{10}$/;

    if (!formData.fullName) errors.fullName = "Full name is required.";
    if (!formData.email) {
        errors.email = "Email is required.";
    } else if (!emailPattern.test(formData.email)) {
        errors.email = "Invalid email format.";
    }
    if (!formData.password) {
        errors.password = "Password is required.";
    } else if (!passwordPattern.test(formData.password)) {
        errors.password = "Password must be at least 8 characters, with 1 uppercase, 1 lowercase, 1 digit, and 1 special character.";
    }
    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.gender) errors.gender = "Gender is required.";
    if (!formData.mobile) {
        errors.mobile = "Mobile number is required.";
    } else if (!mobilePattern.test(formData.mobile)) {
        errors.mobile = "Mobile number must be 10 digits.";
    }

    return errors;
};
const page = () => {
    const router = useRouter()
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        mobile: ""
    });
    const [errors, setErrors] = useState<Errors>({});
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = useValidation(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            let storedData: UserData[] = JSON.parse(localStorage.getItem("userData") || "[]");
            const { fullName, email, gender, mobile, password } = formData;
            const userData = { fullName, email, gender, mobile, password };
            storedData.push(userData);
            localStorage.setItem("userData", JSON.stringify(storedData));
            router.push("/login")
            setFormData({
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
                gender: "",
                mobile: "",
            });
            setErrors({});
        }
    };
    return (
        <div className="max-w-lg mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Signup</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-semibold">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold">Gender</label>
                    <div className="flex gap-4">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === "Male"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === "Female"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Female
                        </label>
                    </div>
                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold">Mobile</label>
                    <input
                        type="number"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Signup
                </button>
            </form>
            <div className="text-center mt-4">
                <p className="text-gray-600">Already have an account?
                    <Link href="/login" className="text-blue-500 hover:underline"> Login here</Link>
                </p>
            </div>
        </div>
    )
}
export default page