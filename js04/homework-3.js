// Create an IIFE that returns an object with fields:
// method setValue(),
// method showValue()
// and method reverseValue().
// Calling showValue should log the value, or if there is no value
// - tell us about that.
// Calling setValue will set given number or string in closure,
// if the argument is other type - throw an error.
// Value can be type string or number.
// reverseValue(): If number do (*(-1)), if string reverse it.  Closure pattern.

const myObject = (() => {
    let value;

    return {
        setValue: (arg) => {
            if (typeof arg !== 'string' && typeof arg !== 'number') {
                throw new Error('Value must be type string or number!');
            }
            value = arg;
        },
        showValue: () => {
            if (!value) {
                throw new Error('There is no value!');
            }
            console.log(value);
        },
        reverseValue: () => {
            if (!value) {
                throw new Error('There is no value!');
            }
            if (typeof value !== 'string' && typeof value !== 'number') {
                throw new Error('Value must be type string or number!');
            }
            typeof value === 'string' ? value = Array.from(value).reverse().join('') : value = value * -1;
        }
    }
})();

myObject.setValue(5);
myObject.showValue();
myObject.reverseValue();
myObject.showValue();
myObject.setValue('hello');
myObject.showValue();
myObject.reverseValue();
myObject.showValue();