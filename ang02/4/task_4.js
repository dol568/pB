"use strict";
var Type;
(function (Type) {
    Type[Type["FRUIT"] = 0] = "FRUIT";
    Type[Type["VEG"] = 1] = "VEG";
})(Type || (Type = {}));
var items = [];
items.push({
    name: 'Apple',
    taste: 'sweet',
    type: Type.FRUIT
});
items.push({
    name: 'Lemon',
    taste: 'sour',
    type: Type.FRUIT
});
items.push({
    name: 'Potato',
    type: Type.VEG
});
items.push({
    name: 'Car'
});
function printFruitsAndVeggies(fruitsAndVeggies) {
    for (var _i = 0, fruitsAndVeggies_1 = fruitsAndVeggies; _i < fruitsAndVeggies_1.length; _i++) {
        var item = fruitsAndVeggies_1[_i];
        if (item.type === Type.FRUIT) {
            console.log("We have a fruit: " + item.taste + " " + item.name);
        }
        else if (item.type === Type.VEG) {
            console.log('We have a vegetable: ' + item.name);
        }
        else {
            console.log('--- Error ---');
            console.log('We have an item of unknown type: ' + item.name);
            console.log('--- End of error ---');
        }
    }
}
printFruitsAndVeggies(items);
//# sourceMappingURL=task_4.js.map