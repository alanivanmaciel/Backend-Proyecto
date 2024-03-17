class CartService {
    constructor(cartsDao) {
        this.dao = cartsDao
    }
    
    getCart = async (cid) => this.dao.get(cid)

    createCart = async () => this.dao.create()

    addProduct = async (cid, pid) => this.dao.addProductToCart(cid, pid)

    deleteProductToCart = async (cid, pid) => this.dao.deleteProductToCart(cid, pid)

    deleteProducts = async (pid) => this.dao.deleteProducts(pid)
    
    updateQuantity = async (cid, pid, quantity) => this.dao.update(cid, pid, quantity)
}

export default CartService