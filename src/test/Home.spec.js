import { render, screen } from '@testing-library/react';
import Home from '../Components/home/Home';
import '@testing-library/jest-dom/extend-expect';
import {render as renderer,unmountComponentAtNode} from 'react-dom';
import React from 'react';


describe('Testing Home Component',()=>{
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

    test('should have Trending Movies field in Home component',()=>{
        render(<Home/>);
        expect(screen.getByText('Trending Movies')).toBeInTheDocument();
    });
    test('should have Trending Whats popular field in Home component',()=>{
        render(<Home/>);
        expect(screen.getByText('What\'s Popular')).toBeInTheDocument();
    });

   
    test('Home component should have only five button tag',()=>{
        renderer(<Home/>,element);
        const count = element.getElementsByTagName('button').length;
        expect(count).toBe(5);
    });

    test('Home component should have only three img tag',()=>{
        renderer(<Home/>,element);
        const count = element.getElementsByTagName('img').length;
        expect(count).toBe(3);
    });


   
    
})


export default Home;
