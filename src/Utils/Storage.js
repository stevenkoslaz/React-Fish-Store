export default class Storage {

  // Adds a new product to the list of products in localStorage
  static addProduct(newProduct) {
    const products = Storage.loadProducts();
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
  }

  // Retrieves cart items from localStorage, parsing them into an array, or returns an empty array if none exist
  static loadCartItems() {
    const cartItemsString = localStorage.getItem("cart");
    if (cartItemsString) {
      return JSON.parse(cartItemsString);
    }
    return [];
  }
  
  // Retrieves products from localStorage, parsing them into an array, or returns an empty array if none exist
  static loadProducts() {
    const productsString = localStorage.getItem("products");
    return productsString ? JSON.parse(productsString) : [];
  }

  // Saves the entire products array to localStorage
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}
