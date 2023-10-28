import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Togglable from './Togglable';

describe('<Togglable />', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="View">
        <div className="togglableContent">
          <p>Blog URL: newUrl</p>
          <p>Likes: newLikes</p>
        </div>
      </Togglable>
    );
  });

  test('details are initially hidden', () => {
    const details = component.container.querySelector('.togglableContent');
    expect(getComputedStyle(details).display).toBe('none');
  });

  test('details become visible after clicking the button', () => {
    const button = screen.getByText('View');
    fireEvent.click(button);

    const details = component.container.querySelector('.togglableContent');
    expect(getComputedStyle(details).display).toBe('block');
  });
});
