export interface IProduct {
    type: Type,
    name: string,
    qty: number
}

export enum Type {
    FRUIT, SWEETS, ALCOHOL, OTHER
}

export const products: IProduct[] = [
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
        name: 'Gingerbread',
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
]
