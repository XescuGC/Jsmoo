import { describe, it } from 'mocha';
import { expect } from 'chai';
import { buildObject, buildRoleWith } from './utils';
import Jsmoo from '../src';

describe("Role composition with 'WITH'", () => {
  it("must have the function 'with'", () => {
    expect(Jsmoo).to.have.property('with');
  });
  it("normal objects can't be composed", () => {
    const Obj = buildObject();
    const NoRole = buildObject();
    expect(() => {
      Obj.with(NoRole);
    }).to.throw(TypeError, 'Only Roles can be composed');
  });
  it('only Roles can be composed', () => {
    const Obj = buildObject();
    const Role = buildRoleWith();
    expect(() => {
      Obj.with(Role);
    }).not.to.throw(TypeError, 'Only Roles can be composed');
  });
  describe('must merge the ROLE to the Class', () => {
    it('if a function is not defined on the Class it must be copyed', () => {
      const Obj = buildObject();
      const Role = buildRoleWith();
      Role.prototype.testFunction = () => { return 'from role'; };
      Obj.with(Role);
      const newObj = new Obj();
      expect(newObj).respondTo('testFunction');
      expect(newObj.testFunction()).to.equal('from role');
    });
    it('if a function is defined on the Class it must not be copyed');
  });
});