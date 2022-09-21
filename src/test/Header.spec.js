
import Header from '../Components/header/Header';
import { render, screen } from '@testing-library/react';
import { render as renderer, unmountComponentAtNode } from 'react-dom';
import React from 'react';
import'@testing-library/jest-dom/extend-expect';
import { router } from 'json-server';


describe('Testing Header Component', () => {

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

    test('Should have Home in header', () => {
        render(<router />);
     
     screen.findByText('Home');
        
    });
    test('Should have Favourite in header', () => {
        render(<router />);
     
     screen.findByText('Favourite');
        
    });
   
   test('Hyperlinks should have nav-link class', () => {
        renderer(<router/>, element);
        const links = element.getElementsByTagName('li');
        for (let i = 1; i < links.length; i++) {
            expect(links[i]).toHaveClass('nav-item');
        }
    });
    test('Should have Login field in header', () => {
        render(<router />);
     
     screen.findByText('Login');
        
    });
  

});

export default Header;
