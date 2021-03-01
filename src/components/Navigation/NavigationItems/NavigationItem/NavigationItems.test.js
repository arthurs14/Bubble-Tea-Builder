import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// connects enzyme
configure({adapter: new Adapter()});

// 1. description of test bundle (identify the kind of test)
// 2. a function that will do a test
describe('<NavigationItems />', () => {
  it('should render two <NavigationItem /> elements if not authenticated', () => {

  });
});