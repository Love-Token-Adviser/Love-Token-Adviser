import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetRecommendation } from "@/apis/hooks";
import { HeartIcon, HeartPlusIcon } from "@/assets/Icons";

interface LocationState {
  type: "gift" | "outfit";
  gender: "0" | "1";
}

interface Data {
  Name: string;
  Price: number;
  URL: string;
  image: string;
}

const ITEMS_PER_PAGE = 8; // 1ページあたりのアイテム数

const RecommendationPage = () => {
  const location = useLocation();
  const { type, gender }: LocationState = location.state;
  const [data, setData] = useState<Data[]>([]);
  const [keyword, setKeyword] = useState(""); // キーワード入力の状態管理
  const [minPrice, setMinPrice] = useState(""); // 最小価格の状態管理
  const [maxPrice, setMaxPrice] = useState(""); // 最大価格の状態管理
  const [currentPage, setCurrentPage] = useState(1); // 現在のページ番号
  const [likedItems, setLikedItems] = useState<Data[]>([]); // お気に入りアイテムの状態管理
  const { data: fetchedData, refetch: giftRefetch } = useGetRecommendation({
    type,
    gender,
    keyword,
    minPrice,
    maxPrice,
  });

  console.log(likedItems);

  useEffect(() => {
    if (fetchedData) {
      console.log("fetchedData changed");
      setData(fetchedData);
    }
  }, [fetchedData]);

  // 現在のページに応じた表示データの取得
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // 総ページ数の計算
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  // ページ移動関数
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSearch = () => {
    giftRefetch();
    setCurrentPage(1);
  };

  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + "...";
  };

  return (
    <div className="relative h-full flex">
      {/* 左側の入力フォーム */}
      <div className="w-1/4 bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Filter Options</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Keyword</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter keyword"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Min Price (円)</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Min price"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Max Price (円)</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Max price"
          />
        </div>
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* 右側の検索結果 */}
      <div className="w-full h-full relative px-6 py-4 bg-gray-100">
        <div className="w-full h-full max-w-6xl overflow-y-scroll">
          <h1 className="text-4xl font-bold text-gray-900 py-4">
            {type === "gift"
              ? "Gift Recommendations"
              : "Outfit Recommendations"}
          </h1>

          <div className="h-full w-full relative  py-6">
            <ul className="grid grid-cols-4 gap-6 min-h-fit">
              {currentItems.map((item, idx) => (
                <li
                  key={idx}
                  className="relative min-h-fit flex flex-col bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-shadow"
                >
                  <img
                    src={item.image}
                    alt={item.Name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <div className="flex flex-col mt-4">
                    <a
                      href={item.URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-blue-600 hover:underline"
                    >
                      {truncateTitle(item.Name, 20)}
                    </a>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600 mt-1">{item.Price}円</p>
                      {likedItems.find((each) => item.Name === each.Name) ? (
                        <HeartPlusIcon
                          onClick={() =>
                            setLikedItems((prev) => {
                              return prev.filter(
                                (each) => each.Name !== item.Name
                              );
                            })
                          }
                        />
                      ) : (
                        <HeartIcon
                          onClick={() =>
                            setLikedItems((prev) => {
                              return prev.includes(item)
                                ? prev
                                : [...prev, item];
                            })
                          }
                        />
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* ページネーション */}
            <div className="pb-16 pt-6 px-2 min-h-fit">
              <div className="flex justify-between items-center w-full h-10">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="bg-gray-500 text-white py-2 px-4 rounded disabled:bg-gray-300"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="bg-gray-500 text-white py-2 px-4 rounded disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage;
