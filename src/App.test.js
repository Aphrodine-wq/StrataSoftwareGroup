import { render, screen } from '@testing-library/react';
import Home from './pages/Home';

test('renders Strata Software Group', () => {
  render(<Home />);
  const element = screen.getByText(/Strata Software Group/i);
  expect(element).toBeInTheDocument();
});
