import { useState, ChangeEvent, MouseEvent } from "react";
import apiClient from "../../apis/apiClient";
// import CSRFToken from "../../apis/CSRFToken";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    apiClient
      .post("accounts/signup/", formData)
      .then((response) => {
        console.log("User created", response.data);
      })
      .catch((error) => {
        console.error("Error creating user", error);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <meta name="csrf-token" content="{{ csrf_token }}"></meta>
      <h2 className="mt-4">User Creation Page</h2>
      <form
        onSubmit={handleSubmit}
        className="mt-3 flex flex-col gap-6 items-center"
      >
        {/* <CSRFToken /> */}
        <div className="flex gap-3">
          <label>Username</label>
          <input
            type="text"
            name="username"
            className="rounded-md border border-black"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="rounded-md border border-black"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="rounded-md border border-black"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="border border-black w-40">
          Create
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
