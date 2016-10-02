import ComputedProperty from './computed-property';
import assign from './assign';

import { reduceObject, isArray, sameType } from './object-utils';

const { keys } = Object;

export class ValueOfMethod extends ComputedProperty {
  constructor(metadata, state, value, descriptors) {
    /**
     * super receives a function that will return the valueOf this microstate.
     * The returned value is cached by ComputedProperty.
     */
    super(function() {
      let valueOf = compute();
      function compute() {
        if (keys(descriptors).length > 0) {
          let properties = reduceObject(descriptors, (result, key)=> {
            return assign(result, {
              [key]: new ComputedProperty(function() {
                return state[key].valueOf();
              }, { enumerable: true })
            });
          });
          if (isArray(value)) {
            return Object.create(Array.prototype, properties);
          } else {
            return Object.create(typeof value === 'undefined' ? null : value, properties);
          }
        } else {
          return value;
        }
      }
      if (metadata.definition.hasOwnProperty('valueOf')) {
        /**
         * Class has a custom valueOf method. This custom valueOf method
         * should receive the fully expanded value of this microstate.
         */
        let customValueOf = metadata.definition.valueOf.call(state, valueOf);
        return function() {
          return customValueOf;
        };
      } else {
        /**
         * Without custom valueOf just return result of unboxing of value
         */
        return function() {
          return valueOf;
        };
      }
    });
  }
}

export class LengthProperty extends ComputedProperty {
  constructor(metadata, state, value, descriptors) {
    super(function(){
      return value.length;
    });
  }
}

export class ForEachMethod extends ComputedProperty {
  constructor(metadata, state, value, descriptors) {
    super(function(){
      return function() {
        return value.forEach(...arguments);
      }
    });
  }
}

export class FillMethod extends ComputedProperty {
  constructor(metadata, state, value, descriptors) {
    super(function(){
      return function() {
        return value.slice().fill(...arguments);
      }
    });
  }
}