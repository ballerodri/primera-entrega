import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const productManager = new ProductManager("./productos.txt");

const productRouter = Router(); //productRouter voy a definir mis rutas

productRouter.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts(req.query.limit);
    res.send(products);
  } catch (error) {
    res.send(error);
  }
});

productRouter.get("/:pid", async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);
    res.send(product);
  } catch (error) {
    res.send(error);
  }
});

productRouter.post("/", async (req, res) => {
  try {
    if (req.body.title === undefined) res.send("Campo title requerido");
    else if (req.body.description === undefined) res.send("Campo description requerido");
    else if (req.body.price === undefined) res.send("Campo price requerido");
    else if (req.body.code === undefined) res.send("Campo code requerido");
    else if (req.body.stock === undefined) res.send("Campo stock requerido");
    else if (req.body.category === undefined) res.send("Campo category requerido");
    else {
      const { title, description, price, thumbnail, code, stock, category } = req.body
      await productManager.addProduct({ title, description, price, thumbnail, code, stock, category })
      res.send("Producto creado");
    }
  } catch (error) {
    res.send(error);
  }
});

productRouter.put("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    } = req.body;
    const mensaje = await productManager.updateProduct(id, {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    });
    res.send(mensaje);
  } catch (error) {
    res.send(error);
  }
});

productRouter.delete("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const mensaje = await productManager.deleteProduct(id);
    res.send(mensaje);
  } catch (error) {
    res.send(error);
  }
});

export default productRouter;
