import {render as renderer, unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '../Components/footer/Footer'
import React from 'react';

 
describe('Testing Footer Component', ()=>{
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
 
    test('Should have one h5 tag in Footer component', () => {
        renderer(<Footer />, element);
        const count = element.getElementsByTagName('h5').length;
        expect(count).toBe(1);
    });
 
    test('Should have one div tag in Footer component', () => {
        renderer(<Footer />, element);
        const count = element.getElementsByTagName('div').length;
        expect(count).toBe(1);
    });
 
    test('Should have footdiv text in Footer', () => {
        render(<Footer />);
      expect(screen.getByTestId('footer')).toBeInTheDocument();
     });
 
     test('First div tag should have class name foot',()=>{
        render(<Footer/>);
        expect(screen.getByTestId('footer')).toHaveClass('footer');
    });
 
    
});
export default Footer;
