import { useState, useEffect } from "react";

const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/test/");
      const data = await response.json();

      setData(data);
    };

    fetchData();
  }, [setData]);

  console.log(data);

  return (
    <div>
      <h1 className="bg-red-200">Home</h1>
      <div>imst</div>
    </div>
  );
};

export default HomePage;
