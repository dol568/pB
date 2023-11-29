import {IProduct, Type} from "./products";

export class Supermarket {
    private _fruits: IProduct[] = [];
    private _sweets: IProduct[] = [];
    private _alcohol: IProduct[] = [];
    private _other: IProduct[] = [];


    addSupplies(items: IProduct[]) {
        for (const item of items) {
            if (item.type === Type.FRUIT) {
                this._fruits.push(item);

            } else if (item.type === Type.SWEETS) {
                this._sweets.push(item);

            } else if (item.type === Type.ALCOHOL) {
                this._alcohol.push(item);

            } else {
                this._other.push(item);
            }
        }
    }

    advertise() {
        console.log('--------------------------------------------------------------------------------------------')
        console.log('-------------------------------- Welcome to our supermarket --------------------------------')
        console.log('-------------------------------- check what we have for you today --------------------------')
        console.log('--------------------------------------------------------------------------------------------')
        console.log()
        console.log('--------------------------------------------------------------------------------------------')
        console.log('--- For those with sweet tooth we have:')
        this._printCategory(this._sweets);
        console.log()
        console.log('--------------------------------------------------------------------------------------------')
        console.log('--- Stay healthy with our:')
        this._printCategory(this._fruits);
        console.log()
        console.log('--------------------------------------------------------------------------------------------')
        console.log('--- If you are 18 you can buy something stronger:')
        this._printCategory(this._alcohol);
        console.log()
        console.log('--------------------------------------------------------------------------------------------')
        console.log('--- We also have:')
        this._printCategory(this._other);

        console.log('--------------------------------------------------------------------------------------------')
        console.log('-------------------------------- Thank you! ------------------------------------------------')
        console.log('------------------------------Come back soon! ----------------------------------------------')
        console.log('--------------------------------------------------------------------------------------------')
    }

    private _printCategory(items: IProduct[]) {
        for (const item of items) {
            console.log(item.name + ' (' + item.qty + ' available)');
        }
    }
}
