import { expect } from 'chai';
import sinon from 'sinon';
import validateUser from '../src/middlewares/validateUserRequest.js';

describe('User Validation Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    next = sinon.spy();
  });

  it('should return 400 if required fields are missing', () => {
    req.body = { firstName: null, lastName: null, email: null, age: null };

    validateUser(req, res, next);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWithMatch({
      message: sinon.match.string,
    })).to.be.true;
  });

  it('should return 400 if firstName contains non-alphabetic characters', () => {
    req.body = { firstName: 'nency123', lastName: 'rana', email: 'nency@demo.com', age: 25 };

    validateUser(req, res, next);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWithMatch({
      message: 'First name should contain only alphabets',
    })).to.be.true;
  });

  it('should return 400 if lastName contains non-alphabetic characters', () => {
    req.body = { firstName: 'nency', lastName: 'rana@123', email: 'nency@demo.com', age: 25 };

    validateUser(req, res, next);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWithMatch({
      message: 'Last name should contain only alphabets',
    })).to.be.true;
  });

  it('should return 400 if email format is incorrect', () => {
    req.body = { firstName: 'nency', lastName: 'rana', email: '@123', age: 25 };

    validateUser(req, res, next);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWithMatch({
      message: 'Invalid email format',
    })).to.be.true;
  });

  it('should return 400 if age is negative', () => {
    req.body = { firstName: 'nency', lastName: 'rana', email: 'nency@demo.com', age: -5 };

    validateUser(req, res, next);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWithMatch({
      message: 'Age must be a non-negative number',
    })).to.be.true;
  });

  it('should call next() if validation passes', () => {
    req.body = { firstName: 'nency', lastName: 'rana', email: 'nency@demo.com', age: 30 };

    validateUser(req, res, next);

    expect(next.calledOnce).to.be.true;
  });
});
