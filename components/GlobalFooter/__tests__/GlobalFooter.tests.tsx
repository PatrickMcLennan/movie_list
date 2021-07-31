/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import GlobalFooter from '../GlobalFooter';

test(`<GlobalFooter />`, () => {
  render(<GlobalFooter />);
  expect(screen.getByText(/Made by Patrick McLennan & Matthew Palmer/));
});
