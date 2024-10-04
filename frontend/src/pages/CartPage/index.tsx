import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface LikedItem {
  Name: string;
  Price: string;
  URL: string;
  image: string;
}

const CartPage = () => {
  const location = useLocation();
  const navigator = useNavigate();
  const { likedItems }: { likedItems: LikedItem[] } = location.state || {
    likedItems: [],
  };

  useEffect(() => {
    if (likedItems?.length === 0) {
      navigator("/");
      return;
    }
  }, [navigator, likedItems]);

  return (
    <div className="w-full h-full overflow-hidden p-6 bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Products you are interested in
      </h2>
      <ul className="px-2 py-6 w-full h-full overflow-y-scroll flex flex-col gap-4">
        {likedItems.map((item, idx) => (
          <li
            key={idx}
            className="flex gap-4 items-center w-full border border-gray-300 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className=" rounded-md">
              <img
                src={item.image}
                alt={item.Name}
                className="object-contain w-32 h-32"
              />
            </div>
            <div className="flex flex-col gap-3 w-full overflow-hidden">
              <h3 className="w-full text-gray-900 truncate text-lg font-semibold">
                {item.Name}
              </h3>
              <p className="w-full flex gap-2 items-center text-gray-700">
                <span>Price: </span>
                <span className="font-semibold text-gray-800">
                  {item.Price}円
                </span>
              </p>
              <Link to={item.URL} target="_blank" className="w-40">
                <Button className="bg-blue-600 text-white hover:bg-blue-500 transition-colors">
                  Go to Shopping
                </Button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
