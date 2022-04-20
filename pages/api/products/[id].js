import dbConnect from "../../../util/mongo";
import appertizer_products from "../../../models/appertizer_products";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;


  dbConnect();

  if (method === "GET") {
    try {
      const product = await appertizer_products.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  if (method === "PUT") {
    /*if(!token || token !== process.env.token){
      return res.status(401).json("Not authenticated!")
    })*/
    try {
      const product = await appertizer_products.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
   /* if(!token || token !== process.env.token){
      return res.status(401).json("Not authenticated!")
    }*/
    try {
      await appertizer_products.findByIdAndDelete(id);
      res.status(200).json("The product has been deleted!");
    } catch (err) {
      res.status(508).json(err);
    }
  }
}
