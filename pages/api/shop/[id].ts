import db from "../../../utils/db";

export default async (req, res) => {
  const { id } = req.query;

  try {
    if (req.method === "PUT") {
      await db
        .collection("shops")
        .doc(id)
        .update({
          ...req.body,
          updated: new Date().toISOString(),
        });
      res.status(200).end({ message: "Shop modified" });
    } else if (req.method === "GET") {
      const doc = await db.collection("shops").doc(id).get();
      if (!doc.exists) {
        res.status(404).json({ message: "Shop doesn't exists" });
      } else {
        res.status(200).json({ id: doc.id, ...doc.data() });
      }
    } else if (req.method === "DELETE") {
      await db.collection("shops").doc(id).delete();
      res.status(200).end({ message: "Shop deleted" });
    }
  } catch (e) {
    res.status(400).end();
  }
};
