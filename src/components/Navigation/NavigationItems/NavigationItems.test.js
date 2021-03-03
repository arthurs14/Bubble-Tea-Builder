import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// connects enzyme
configure({ adapter: new Adapter() });

// 1. description of test bundle (identify the kind of test)
// 2. a function that will do a test
describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render two <NavigationItem /> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> elements if authenticated', () => {
    //wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should have a route /logout if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.contains(<NavigationItem item="Logout" link="/logout" />)).toEqual(true);
  });
});