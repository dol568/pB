"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supermarket = void 0;
var products_1 = require("./products");
var Supermarket = /** @class */ (function () {
    function Supermarket() {
        this._fruits = [];
        this._sweets = [];
        this._alcohol = [];
        this._other = [];
    }
    Supermarket.prototype.addSupplies = function (items) {
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (item.type === products_1.Type.FRUIT) {
                this._fruits.push(item);
            }
            else if (item.type === products_1.Type.SWEETS) {
                this._sweets.push(item);
            }
            else if (item.type === products_1.Type.ALCOHOL) {
                this._alcohol.push(item);
            }
            else {
                this._other.push(item);
            }
        }
    };
    Supermarket.prototype.advertise = function () {
        console.log('--------------------------------------------------------------------------------------------');
        console.log('-------------------------------- Welcome to our supermarket --------------------------------');
        console.log('-------------------------------- check what we have for you today --------------------------');
        console.log('--------------------------------------------------------------------------------------------');
        console.log();
        console.log('--------------------------------------------------------------------------------------------');
        console.log('--- For those with sweet tooth we have:');
        this._printCategory(this._sweets);
        console.log();
        console.log('--------------------------------------------------------------------------------------------');
        console.log('--- Stay healthy with our:');
        this._printCategory(this._fruits);
        console.log();
        console.log('--------------------------------------------------------------------------------------------');
        console.log('--- If you are 18 you can buy something stronger:');
        this._printCategory(this._alcohol);
        console.log();
        console.log('--------------------------------------------------------------------------------------------');
        console.log('--- We also have:');
        this._printCategory(this._other);
        console.log('--------------------------------------------------------------------------------------------');
        console.log('-------------------------------- Thank you! ------------------------------------------------');
        console.log('------------------------------Come back soon! ----------------------------------------------');
        console.log('--------------------------------------------------------------------------------------------');
    };
    Supermarket.prototype._printCategory = function (items) {
        for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
            var item = items_2[_i];
            console.log(item.name + ' (' + item.qty + ' available)');
        }
    };
    return Supermarket;
}());
exports.Supermarket = Supermarket;
//# sourceMappingURL=supermarket.js.map