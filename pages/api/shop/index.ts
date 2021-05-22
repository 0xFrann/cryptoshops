import db from "../../../utils/db";

export default async (req, res) => {
  try {
    const { name, address } = req.body;
    const shops = await db.collection("shops").get();
    const shopsData = shops.docs.map((shops) => shops.data());

    if (shopsData.some((shop) => shop.name === name && shop.address === address)) {
      res.status(400).json({ message: "Shop already exists" });
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
