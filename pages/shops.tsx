import axios from "axios";
import { useEffect, useState } from "react";

const Shops = (): React.ReactElement => {
  const [shopList, setShopList] = useState([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const result = await axios.get("/api/shops");
      setShopList([...result.data]);
    };

    fetchData();
  }, []);

  return shopList ? (
    <ul>
      {shopList.map((shop, i) => (
        <li key={i}>{shop.name}</li>
      ))}
    </ul>
  ) : (
    <h1>There is no data to show</h1>
  );
};

export default Shops;
