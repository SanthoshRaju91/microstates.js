import 'jest';

import createActions from '../../src/utils/createActions';

describe('createActions', () => {
  class Item {
    string = String;
    say() {
      return 'hello';
    }
    get getter() {
      return;
    }
    static add(current, prop, value) {
      return {
        ...current,
        [prop]: value,
      };
    }
  }
  let path = [];
  let onChange = jest.fn();
  let actions = createActions(Item, path, onChange);
  actions.add('description', 'widget');

  it('returns an object', () => {
    expect(actions).toBeInstanceOf(Object);
  });

  it('ignores everything except static method', () => {
    expect(actions.add).not.toBeUndefined();
    expect(actions.string).toBeUndefined();
    expect(actions.getter).toBeUndefined();
    expect(actions.say).toBeUndefined();
  });

  it('enumerates actions', () => {
    expect(Object.keys(actions)).toEqual(['add', 'set']);
  });

  it('calling action invokes onChange', () => {
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('passes arguments to action', () => {
    expect(onChange.mock.calls[0][0]).toBe(Item.add);
    expect(onChange.mock.calls[0][1]).toBe(path);
    expect(onChange.mock.calls[0][2]).toEqual(['description', 'widget']);
  });
});
