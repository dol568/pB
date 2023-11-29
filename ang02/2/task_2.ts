interface IProduct {
    name: string,
    price: number
}

let product: IProduct = {
    name: 'bread',
    price: 1
};

function presentProduct(product: IProduct) {
    console.log('We have a ' + product.name + ' which costs ' + product.price)
}

presentProduct(product);
