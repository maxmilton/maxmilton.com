import Nav from '../Nav.svelte';

describe('Nav component', () => {
  it('renders correctly with no props', () => {
    expect.assertions(3);
    function wrapper(): void {
      const target = document.createElement('div');
      new Nav({ target });
      expect(target.querySelector('nav')).not.toBeNull();
      expect(target.innerHTML).toMatchSnapshot();
    }
    expect(wrapper).not.toThrow();
  });
});
