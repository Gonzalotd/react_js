function Product(name, price, stock) {
    this.name = name;
    this.price = price;
    this.stock = stock;
}

Product.prototype.getInfo = function() {
    return `nombre: ${this.name} - Precio: €${this.price} - Stock: ${this.stock}`;
};

Product.prototype.isAvailable = function() {
    return this.stock > 0;
}

// ES6

class ProductClass {
    constructor(name, price, stock) {
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    getInfo() {
        return `nombre: ${this.name} - Precio: €${this.price} - Stock: ${this.stock}`;
    }

    isAvailable() {
        return this.stock > 0;
    }
}

const teclado = new Product("Teclado", 25.99, 10);
const raton = new ProductClass("Ratón", 15.50, 10);

console.log("1.", teclado.getInfo());
console.log(" Disponible:", teclado.isAvailable() ? "true" : "false");


console.log("2.", raton.getInfo());
console.log(" Disponible:", teclado.isAvailable() ? "true" : "false");