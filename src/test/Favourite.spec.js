import { render, screen } from '@testing-library/react';
import {render as renderer,unmountComponentAtNode} from 'react-dom';
import React from 'react';
import'@testing-library/jest-dom/extend-expect';
import Favourite from '../Components/favourite/Favourite';




describe('Testing Favourite Component',()=>{
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
 
 
    test('Favourite component should have 5 div tags',()=>{
        renderer(<Favourite />,element);
        const count = element.getElementsByTagName('div').length;
        expect(count).toBe(5);
    });
    test('Favourite Should have row div',()=>{
        render(<Favourite />);
        expect(screen.getByTestId('innerdiv')).toHaveClass('row');
    });
 
    test('Favourite Should have container div',()=>{
        render(<Favourite />);
        expect(screen.getByTestId('outerdiv')).toHaveClass('container mt-3');
    });
 
    
    
 
  
    
})
 
export default Favourite;
