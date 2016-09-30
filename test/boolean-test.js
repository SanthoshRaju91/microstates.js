import { describe, beforeEach, it } from 'mocha';
import { expect } from 'chai';

import Bool from '../src/bool';

describe('bool microstate', function(){
  let True, False;
  beforeEach(function(){
    True = new Bool(true);
    False = new Bool(false);
  });
  describe('valueOf', function() {
    it('returns a boolean', function(){
      expect(True.valueOf()).to.be.a('boolean');
      expect(True.valueOf()).to.equal(true);
      expect(False.valueOf()).to.be.a('boolean');
      expect(False.valueOf()).to.equal(false);
    });
  });
  describe('toggle transition', function(){
    it('returns opposite microstate on toggle', function(){
      expect(True.toggle().valueOf()).to.equal(false);
      expect(False.toggle().valueOf()).to.equal(true);
    });
  });
});