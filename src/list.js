import State from './state';

export default State.extend({

  transitions: {
    fill(value, ...args) {
      return value.slice().fill(...args);
    }
  }
});