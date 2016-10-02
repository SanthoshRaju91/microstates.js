import { describe, beforeEach, it } from 'mocha';
import { expect } from 'chai';

import { mapObject } from '../src/object-utils';

describe('mapObject', function() {
  describe('result', function() {
    let object, array;    
    beforeEach(function(){
      object = {};
      array = [];
    });
    it.only('maintains type', function() {
      expect(mapObject(object, () => {})).to.be.instanceOf(Object);
      expect(mapObject(array, () => {})).to.be.instanceOf(Array);
    });
  });

});