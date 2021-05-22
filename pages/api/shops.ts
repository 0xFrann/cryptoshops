import db from "../../utils/db";

export default async (req, res) => {
  try {
    const shops = await db.collection("shops").orderBy("created").get();
    const shopsData = shops.docs.map((entry) => ({
      id: entry.id,
      ...entry.data(),
    }));
    res.status(200).json([...shopsData]);
  } catch (e) {
    res.status(400).end();
  }
};
