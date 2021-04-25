123 instanceof Number;              // false 
new Number(123) instanceof Number;  // true
Number(123) instanceof Number;      // false


// 'some string' instanceof String returns false
// new String('some string') instanceof String => true
// String('some string') instanceof String also returns false
// ('some string').toString instanceof String also returns false