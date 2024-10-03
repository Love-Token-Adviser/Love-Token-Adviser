import { useState, ChangeEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../apis/apiClient";
import { useLoginContext } from "@/components/context/useLoginContext";
import { TOKEN_KEY } from "@/constants";

const LoginPage = () => {
  const navigate = useNavigate();
  const loginContext = useLoginContext();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  if (!loginContext) {
    return null;
  }

  const { setIsLoggedIn } = loginContext;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username || !formData.password) return;

    apiClient
      .post("accounts/login/", { ...formData })
      .then((response) => {
        localStorage.setItem(TOKEN_KEY, response.data.token);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error Login", error);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-full bg-gradient-to-r from-pink-400 via-red-300 to-purple-400">
      <h2 className="mt-8 text-white text-3xl font-bold">
        Login to Find the Perfect Outfit!
      </h2>
      <p className="text-white mt-2">
        sign in and get trendy dating outfit suggestions.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-white px-6 py-14 rounded-lg shadow-lg flex flex-col gap-6 items-center w-2/5"
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
          <label className="font-bold">Password</label>
          <input
            type="password"
            name="password"
            className="rounded-md border border-gray-300 p-2 mt-1"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white py-2 px-6 rounded-lg mt-4 hover:bg-red-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
