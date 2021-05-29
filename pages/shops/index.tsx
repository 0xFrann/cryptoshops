import axios from "axios";
import { TShop } from "../../types";

interface IShopsProps {
  shops: TShop[];
}

const Shops = ({ shops }: IShopsProps): React.ReactElement => {
  return shops ? (
    <ul>
      {shops.map((shop, i) => (
        <li key={i}>{shop.name}</li>
      ))}
    </ul>
  ) : (
    <h1>There is no data to show</h1>
  );
};

export const getServerSideProps = async (): Promise<{ props: IShopsProps }> => {
  const shops = await axios.get(process.env.API_HOST + "/api/shops");
  return {
    props: { shops: [...shops.data] },
  };
};

export default Shops;
