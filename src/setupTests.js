import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({
  adapter: new Adapter()
});

Object.defineProperty(document, 'execCommand', {
  value: () => {return true}
});

Object.defineProperty(window.location, 'href', {
  value: 'http://localhost:3000/player?sharePlaylist=LOL&data={"0B3-82hcS8hjnREw3VEhXSXpGcGs":"回忆的沙漏","0B3-82hcS8hjnSWd6M2RXT2xRUnM":"如果来生还能遇见你","0B3-82hcS8hjnZTRYUFNqanluOFU":"I Loved You"}'
});

Object.defineProperty(window, 'requestAnimationFrame', {
  value: () => {return true}
});
