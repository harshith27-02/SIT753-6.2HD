// test/app.test.js

const chai = require('chai');
//import chai from 'chai';
//import * as chai from 'chai';
const expect = chai.expect;

describe('Sample Test', () => {
    it('should return true', () => {
        const result = true;
        expect(result).to.be.true;
    });
});
