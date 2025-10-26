import { EventEmitter } from 'events';

class DomainIterator {
  constructor(urls) {
    this.urls = urls;
  }

  urlIterator() {
    let index = 0;
    const urls = this.urls;
    return {
      [Symbol.asyncIterator]: () => {
        return this.buildIterator(index, urls);
      }
    };
  }

  buildIterator(index, urls) {
    return {
      next: async () => {
        if (index < urls.length) {
          try {
            const res = await urls[index++];
            const result = await res.json();
            return { value: result, done: res.status === undefined };
          } catch (err) {
            return Promise.reject(err);
          }
        }
        return { done: true }; // end iteration
      }
    };
  }
}

// // Example URLs
// const urls = [
//   fetch('https://jsonplaceholder.typicode.com/posts'),
//   fetch('https://jsonplaceholder.typicode.com/comments'),
//   fetch('https://jsonplaceholder.typicode.com/photos'),
//   fetch('https://jsonplaceholder.typicode.com/albums')
// ];

// async function start(urls) {
//   try {
//     const iteratorResult = new DomainIterator(urls);

//     console.time('fetch-loop');
//     for await (const status of iteratorResult.urlIterator()) {
//       console.log('Result status:', status);
//     }
//     console.timeEnd('fetch-loop');
//   } catch (err) {
//     console.error('Error in iteration:', err);
//   }
// }

// start(urls);

// const EventEmitter = require('events');

class Calculator extends EventEmitter {
  iterateMessage(eventname) {
    const queue = [];
    let listening = true;
    let resolveNext;

    const listener = (event) => {
      if (resolveNext) {
        // If someone is waiting, resolve immediately
        resolveNext({ value: event, done: false });
        resolveNext = null;
      } else {
        queue.push(event);
      }
    };

    this.on(eventname, listener);

    return {
      next: () => {
        if (!listening) return Promise.resolve({ done: true });

        if (queue.length > 0 && listening) {
          return Promise.resolve({ value: queue.shift(), done: false });
        }

        // Wait for next event
        return new Promise((resolve) => {
          resolveNext = resolve;
        });
      },
      return: () => {
        listening = false;
        this.removeListener(eventname, listener);
        return Promise.resolve({ done: true });
      },
      throw: (err) => {
        listening = false;
        this.removeListener(eventname, listener);
        return Promise.reject(err);
      },
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  }
}

async function* generator(calc, event) {
  try {
    console.time('Start time');
    for await (const val of calc.iterateMessage(event)) {
      console.log('Generator saw:', val.name);
      if (val.name.toString() !== 'Return') {
        yield val;
      } else {
        return undefined;
      }
    }
    console.timeEnd('Start time');
  } catch (err) {
    console.error(err);
  }
}

const calc = new Calculator();

const run = (event, name) => {
  setImmediate(() => {
    calc.emit(event, { name });
  });
};

(async () => {
  const iter = generator(calc, 'Hello');

  // Fire events
  run('Hello', 'Fred');
  run('Hello', 'Rick');
  run('Hello', 'Webster');
  run('Hello', 'Douglas');
  run('Hello', 'Return');

  console.log('Iterator 1:', JSON.stringify(await iter.next()));
  console.log('Iterator 2:', JSON.stringify(await iter.next()));
  console.log('Iterator 3:', JSON.stringify(await iter.next()));
  console.log('Iterator 4:', JSON.stringify(await iter.next()));
  console.log('Iterator 5:', JSON.stringify(await iter.next()));

  // If you want, close the iterator
  await iter.return();
})();
