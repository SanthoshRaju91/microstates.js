import State from './state';

export default State.extend({
  transitions: {
    toggle(value) {
      return !value;
    }
  }
});