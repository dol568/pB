"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = exports.Type = void 0;
var Type;
(function (Type) {
    Type[Type["FRUIT"] = 0] = "FRUIT";
    Type[Type["SWEETS"] = 1] = "SWEETS";
    Type[Type["ALCOHOL"] = 2] = "ALCOHOL";
    Type[Type["OTHER"] = 3] = "OTHER";
})(Type || (exports.Type = Type = {}));
exports.products = [
    {
        type: Type.FRUIT,
        name: 'Apples',
        qty: 5
    },
    {
        type: Type.FRUIT,
        name: 'Bananas',
        qty: 2
    },
    {
        type: Type.SWEETS,
        name: 'Candies',
        qty: 1
    },
    {
        type: Type.SWEETS,
        name: 'Gingerbead',
        qty: 10
    },
    {
        type: Type.ALCOHOL,
        name: 'Tequila',
        qty: 9
    },
    {
        type: Type.ALCOHOL,
        name: 'Tequila',
        qty: 9
    },
    {
        type: Type.OTHER,
        name: 'Weed',
        qty: 9
    },
    {
        type: Type.OTHER,
        name: 'Candles',
        qty: 9
    },
];
//# sourceMappingURL=products.js.map