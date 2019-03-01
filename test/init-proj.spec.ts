import { expect } from 'chai';
import { InitProj } from '../src/init-proj';

describe('InitProj', () => {
    let initProj: InitProj;

    beforeEach( () => {
        initProj = new InitProj();
    });

    it('getProjectName() returns project root folder name', () => {
        expect(initProj.getProjectName()).to.equal('express-ts-seed');
    });

    it('capWords() returns capitalized words separated by spaces from the input of hyphen separated words', () => {
        expect(initProj.capWords("this-is-A-test")).to.equal('This Is A Test');
    });
});