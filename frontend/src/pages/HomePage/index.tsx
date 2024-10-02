import { useState, useEffect } from "react";
import apiClient from "../../apis/apiClient";

const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await apiClient.get("test/").then((res) => setData(res.data.message));
    };

    fetchData();
  }, [setData]);

  return (
    <div>
      <h1 className="bg-red-200">Home</h1>
      {data && <div>{data}</div>}
    </div>
  );
};

export default HomePage;
