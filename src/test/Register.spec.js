
import { render, screen } from '@testing-library/react';
import {render as renderer,unmountComponentAtNode} from 'react-dom';
import React from 'react';
import'@testing-library/jest-dom/extend-expect';
import Register from '../Components/register/Register';




describe('Testing Dashboad Component',()=>{
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
 

    test('Register Should have one h1 field', () => {
        renderer(<Register />, element);
        const count = element.getElementsByTagName('h1').length;
        expect(count).toBe(1);
    });
    test('Register Should have Registration Form text', ()=>{
        render(<Register/>,element);
        expect(screen.getByText('Registration Form')).toBeInTheDocument();
    });
 
 
    test('Register Should have two div field',()=>{
        renderer(<Register/>,element);
        const count = element.getElementsByTagName('div').length;
        expect(count).toBe(8);
    });
   
    test('Register Should have six input field',()=>{
        renderer(<Register/>,element);
        const count = element.getElementsByTagName('input').length;
        expect(count).toBe(7);
    });
   
 
    
    
    
 
  
    
})
 
export default Register;
