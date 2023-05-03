import { promises as fs } from 'fs'

export class CartManager {
    constructor(path) {
        this.path = path
    }

    static incrementarID() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }

    async createCarrito() {
        const cartsJSON = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartsJSON)
        const carrito = {
            id: CartManager.incrementarID(),
            products: []
        }
        carts.push(carrito)
        await fs.writeFile(this.path, JSON.stringify(carts))
        return "Carrito creado"
    }

    async getCartById(id) {
        const cartsJSON = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartsJSON)
        if (carts.some(cart => cart.id === parseInt(id))) {
            return carts.find(cart => cart.id === parseInt(id))
        } else {
            return "Carrito no encontrado"
        }
    }

    async addProductCart(idCart, quantity, id) {
        const cartsJSON = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartsJSON)
        const carrito = carts.find(cart => cart.id === parseInt(idCart))
        if (carrito.products.some(product => product.product === parseInt(id))) {
            let index = carrito.products.findIndex(product => product.product === parseInt(id))
            carrito.products[index].product = parseInt(id)
            //carrito.products[index].quantity = parseInt(quantity) corrección del tutor
            carrito.products[index].quantity = carrito.products[index].quantity + parseInt(quantity)
            //await fs.writeFile(this.path, JSON.stringify([carrito])) corrección del tutor
            await fs.writeFile(this.path, JSON.stringify(carts))
            return "Producto agregado"
        } else {
                const newproduct = {"product":parseInt(id),"quantity":parseInt(quantity)}
                carrito.products.push(newproduct)
                carts.push(carrito)
                await fs.writeFile(this.path, JSON.stringify(carts))
                return "Producto agregado"
        }
    }
}