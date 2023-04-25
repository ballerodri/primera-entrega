import { Router } from "express";
import { CartManager } from "../CartManager.js";

const cartManager = new CartManager('./carrito.txt')

const cartRouter = Router() //productRouter voy a definir mis rutas

cartRouter.post("/", async (req, res) => {
    try {
        await cartManager.createCarrito()
        res.send("Carrito creado");
    } catch (error) {
      res.send(error);
    }
});

cartRouter.get("/:cid", async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid)
        res.send(cart)
    } catch (error) {
        res.send(error)
    }

})

cartRouter.post("/:cid/products/:pid", async (req, res) => {
    try {
        await cartManager.addProductCart(req.params.cid, req.body.quantity, req.params.pid)
        res.send("Producto agregado al carrito");
    } catch (error) {
      res.send(error);
    }
});

export default cartRouter