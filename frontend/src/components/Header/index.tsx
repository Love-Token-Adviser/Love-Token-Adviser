import heartIcon from "../../assets/heart.png";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useLoginContext } from "@/components/context/useLoginContext";
import { TOKEN_KEY } from "@/constants";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const loginContext = useLoginContext();

  if (!loginContext) {
    return null;
  }

  const { isLoggedIn, setIsLoggedIn } = loginContext;

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem(TOKEN_KEY);
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center px-6 py-3">
      <img
        src={heartIcon}
        alt="heart icon"
        className="w-10 h-10"
        onClick={() => navigate("/")}
      />
      <div className="flex gap-4">
        {pathname === "/cart" && (
          <Button
            variant="default"
            className="border border-gray-800"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        )}
        {pathname !== "/login" && (
          <>
            {isLoggedIn ? (
              <Button
                variant="secondary"
                className="border border-gray-800"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={() => navigate("/login")}
                className="border border-gray-800"
              >
                Sign in
              </Button>
            )}
          </>
        )}

        {pathname === "/signup" ? (
          <Button variant="default" onClick={() => navigate("/")}>
            Home
          </Button>
        ) : (
          !isLoggedIn && (
            <Button variant="default" onClick={() => navigate("/signup")}>
              Register
            </Button>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
