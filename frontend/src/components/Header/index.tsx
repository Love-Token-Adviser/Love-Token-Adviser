import heartIcon from "../../assets/heart.png";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-3">
      <img src={heartIcon} alt="heart icon" className="w-10 h-10" />
      <div className="flex gap-4">
        <Button variant="secondary" className="border border-gray-800">
          Sign in
        </Button>
        <Button variant="default">Register</Button>
      </div>
    </header>
  );
};

export default Header;
