// eslint-disable-next-line no-unused-vars

const factorial = (args) => {
  var l = 1;
  for (let n = 1; n <= args; n++) {
    l *= n;
  }
  return l;
};

console.time();
console.log(factorial(5));
console.timeEnd();

const memoize = (callback) => {
  const cache = {};
  return (...args) => {
    if (args.toString() in cache) {
      return cache[args.toString];
    }
    cache[args.toString()] = callback(...args);
    return cache[args.toString()];
  };
};

const memoizedFactorial = memoize(factorial);

console.time();
console.log(memoizedFactorial(5));
console.timeEnd();
