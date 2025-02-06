import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { expect } from 'chai';
import User from '../src/models/userModel.js';
import {errorMessages} from '../src/helpers/constant.js';
import controller from '../src/controllers/userController.js';

chai.use(chaiHttp);

describe('User Controller - createUser', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: { firstName: 'Nency', lastName: 'Rana', email: 'nency.rana@demo.com', age: 30 } };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
    sinon.stub(console, 'log');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a new user when email does not exist', async () => {
    sinon.stub(User, 'findOne').resolves(null);
    sinon.stub(User, 'create').resolves({ _id: '12345', email: req.body.email });

    await controller.createUser(req, res, next);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith({
      message: `user created successfully with ID 12345`,
      userId: '12345',
      email: req.body.email,
    })).to.be.true;
  });

  it('should return 400 if email already exists', async () => {
    sinon.stub(User, 'findOne').resolves({ email: req.body.email });

    await controller.createUser(req, res, next);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ message: errorMessages.EMAIL_EXIST })).to.be.true;
  });

  it('should handle errors properly and call next()', async () => {
    const error = new Error('Database error');
    sinon.stub(User, 'findOne').throws(error);

    await controller.createUser(req, res, next);

    expect(next.calledWith(error)).to.be.true;
  });

  
});
