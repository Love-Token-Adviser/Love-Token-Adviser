import heartIcon from "../../assets/heart.png";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header className="flex justify-between items-center px-6 py-3">
      <img
        src={heartIcon}
        alt="heart icon"
        className="w-10 h-10"
        onClick={() => navigate("/")}
      />
      <div className="flex gap-4">
        {pathname !== "/login" && (
          <Button
            variant="secondary"
            onClick={() => navigate("/login")}
            className="border border-gray-800"
          >
            Sign in
          </Button>
        )}
        {pathname === "/signup" ? (
          <Button variant="default" onClick={() => navigate("/")}>
            Home
          </Button>
        ) : (
          <Button variant="default" onClick={() => navigate("/signup")}>
            Register
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
