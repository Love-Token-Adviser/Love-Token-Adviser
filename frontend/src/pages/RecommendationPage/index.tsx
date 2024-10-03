import apiClient from "@/apis/apiClient";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

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

const RecommendationPage = () => {
  const location = useLocation();
  const { type, gender }: LocationState = location.state;
  const [datas, setDatas] = useState<Data[]>([]);

  console.log(type, gender);

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiClient
        .get("/LoveTokenAdviser/recommend_gift/", {
          params: {
            gender,
          },
        })
        .then((res) => res.data);
      console.log(data);
      setDatas(() => data);
    };

    fetchData();
  }, [gender]);

  return (
    <div className="h-full overflow-y-scroll">
      <h1>Recommendation Page</h1>
      <li className="flex flex-col gap-3">
        {datas.map((data, idx) => (
          <div key={idx} className="">
            <img src={data.image} alt={data.Name} />
            <h1>{data.Name}</h1>
            <p>{data.Price}</p>
          </div>
        ))}
      </li>
    </div>
  );
};

export default RecommendationPage;
