import { useState, ChangeEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../apis/apiClient";

const SignupPage = () => {
  const navigate = useNavigate();
  const [isSamePassword, setIsSamePassword] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      setIsSamePassword(false);
      return;
    }

    apiClient
      .post("accounts/signup/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        console.log("User created", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error creating user", error);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-pink-400 via-red-300 to-purple-400">
      <h2 className="mt-8 text-white text-3xl font-bold">
        Join Us to Find the Perfect Gift!
      </h2>
      <p className="text-white mt-2">
        Sign up and get personalized dating gift suggestions.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-white p-6 rounded-lg shadow-lg flex flex-col gap-6 items-center w-2/5"
      >
        <div className="flex flex-col w-4/5">
          <label className="font-bold">Username</label>
          <input
            type="text"
            name="username"
            className="rounded-md border border-gray-300 p-2 mt-1"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-4/5">
          <label className="font-bold">Email</label>
          <input
            type="email"
            name="email"
            className="rounded-md border border-gray-300 p-2 mt-1"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-4/5">
          <label className="font-bold">Password</label>
          <input
            type="password"
            name="password"
            className="rounded-md border border-gray-300 p-2 mt-1"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-4/5">
          <label className="font-bold">Confirm Password</label>
          <input
            type="password"
            name="password"
            className="rounded-md border border-gray-300 p-2 mt-1"
            onChange={handleChange}
          />
        </div>
        {!isSamePassword && (
          <p className="text-red-500">Passwords do not match</p>
        )}
        <button
          type="submit"
          className="bg-red-500 text-white py-2 px-6 rounded-lg mt-4 hover:bg-red-600"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
