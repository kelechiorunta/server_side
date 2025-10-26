import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { createRoot } from 'react-dom/client';
import App from './App';

// ✅ Import the function normally if you're not mocking it in this test
import * as utils from './utils';
import { addThreeToApp } from './App';

jest.mock('./utils', () => ({
  addTwoToAge: jest.fn(() => 4) // ✅ Mocked return value
}));

describe('App', () => {
  it('renders App component correctly', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it('mocks addTwoToAge correctly', () => {
    const result = utils.addTwoToAge(2);
    expect(utils.addTwoToAge).toHaveBeenCalledWith(2);
    expect(result).toBe(4);
  });

  it('mocks the addition 3 correctly', () => {
    const mocked = jest.fn().mockImplementation((n) => ({ add: n + 1 }));
    const mockedfn = mocked.mockName;
    const result = mocked(1).add;

    console.log(mockedfn);

    expect(mocked).toHaveBeenCalledWith(1);
    expect(result).toBe(2);
  });

  it('gets the button click handler', async () => {
    render(<App />);
    const testbutton = screen.getByText(/Show Surname/i);

    fireEvent.click(testbutton);

    const result = await screen.findByText(/Kelechi/i);
    expect(result).toBeVisible();
  });
});

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
