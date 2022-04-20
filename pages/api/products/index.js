import dbConnect from "../../../util/mongo";
import appertizer_products from "../../../models/appertizer_products";

export default async function handler(req, res) {
  const { method, cookies } = req;
  const token = cookies.token

  dbConnect();

  if (method === "GET") {
    try {
      const products = await appertizer_products.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    
    try {
      const product = await appertizer_products.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  
}
