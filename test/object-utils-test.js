import { describe, beforeEach, it } from 'mocha';
import { expect } from 'chai';

import { mapObject } from '../src/object-utils';

describe('mapObject', function() {
  describe('result', function() {
    let object;    
    beforeEach(function(){
      object = {};
    });
    it.skip('maintains result object', function() {
      expect(mapObject(object, () => {})).to.equal(object);
    });
  });

});