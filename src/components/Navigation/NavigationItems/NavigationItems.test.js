//enzyme testing package allows us to write tests where we dont need to run complete react app OR to not render whole dom and just render small parts.
//shallow takes the copy of the file with is passed as argument..

import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from '../NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({isAuthenticate: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should an exact logout button', () => {
        wrapper.setProps({isAuthenticate: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});




// import React from 'react';
// import {configure, shallow} from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import NavigationItems from './NavigationItems';
// import NavigationItem from '../NavigationItem/NavigationItem';

// configure({adapter: new Adapter()});

// describe('<NavigationItems/>' , () => {
//     it('should render two <NavigationItem /> elements if not authenticated', () => {
//         const wrapper = shallow(<NavigationItems />);
//         expect(wrapper.find(NavigationItem)).toHaveLength(2);
//     })

//     it('should render three <NavigationItem /> elements if authenticated', () => {
//         const wrapper = shallow(<NavigationItems isAuthenticate/>);
//         expect(wrapper.find(NavigationItem)).toHaveLength(3);
//     })
// })