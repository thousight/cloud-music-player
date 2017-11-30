import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({
  adapter: new Adapter()
});

Object.defineProperty(document, 'execCommand', {
  value: () => {return true}
});
