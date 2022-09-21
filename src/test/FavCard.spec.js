import '@testing-library/jest-dom/extend-expect';
import {render as renderer, unmountComponentAtNode } from 'react-dom';
import React from 'react';
import FavCard from '../Components/favCard/FavCard';

 
describe('Testing Card Component', ()=>{
    let element;
    beforeEach(() => {
        element = document.createElement('div');
        document.body.appendChild(element);
    });
 
    afterEach(() => {
        unmountComponentAtNode(element);
        element.remove();
        element = null;
    });
 
    test('Should have one img tag in card component', () => {
        renderer(<SearchResult  />, element);
        const count = element.getElementsByTagName('img').length;
        expect(count).toBe(1);
    });
 
   
 
      test('Should have 3 div tag in card component', () => {
        renderer(<SearchResult  />, element);
        const count = element.getElementsByTagName('div').length;
        expect(count).toBe(3);
    });
    
 
});
export default FavCard;
