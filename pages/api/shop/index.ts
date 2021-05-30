import { TShop } from "../../../types";
import db from "../../../utils/db";

export default async (req, res) => {
  try {
    const { name, location }: TShop = req.body;
    const shops = await db.collection("shops").get();
    const shopsData = shops.docs.map((shops) => shops.data());

    if (
      shopsData.some((shop) => shop.name === name && shop.location.address === location.address)
    ) {
      res.status(409).json({
        message: "Shop already exists",
      });
    } else {
      const { id } = await db.collection("shops").add({
        ...req.body,
        created: new Date().toISOString(),
      });
      res.status(200).json({ id });
    }
  } catch (e) {
    res.status(400).end();
  }
};
