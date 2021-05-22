import db from "../../utils/db";

export default async (req, res) => {
  try {
    const categories = await db.collection("categories").get();
    const categoriesData = categories.docs[0].data();
    res.status(200).json({ ...categoriesData });
  } catch (e) {
    res.status(400).end();
  }
};
