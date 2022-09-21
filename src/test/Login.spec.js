
import { render, screen } from '@testing-library/react';
import {render as renderer,unmountComponentAtNode} from 'react-dom';
import React from 'react';

import'@testing-library/jest-dom/extend-expect';
import Login from '../Components/login/Login'
import { Router } from 'react-router';




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
 

    test('Login Should have two h5 input field', () => {
        renderer(<Login />, element);
        const count = element.getElementsByTagName('input').length;
        expect(count).toBe(2);
    });
    test('Login should have sign in',()=>{
        render(<Login/>,element);
        expect(screen.getByText('Sign In')).toBeInTheDocument();
    });
    test('Login should have Register',()=>{
        render(<Login/>,element);
        expect(screen.getByText('Register')).toBeInTheDocument();
    });
 
 
   
    
})
 
export default Login;
