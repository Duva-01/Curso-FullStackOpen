import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import Blog from './blog'

const user = {
  name: 'Test User',
  username: 'testuser',
};

const blog = {
  author: 'Test Author',
  title: 'Component testing is done with react-testing-library',
  url: 'testurl.com',
  likes: 5,
  user,
};

const setup = (props) => {
  const utils = render(<Blog blog={blog} user={user} onDelete={jest.fn()} {...props} />);
  const expandButton = screen.getByRole('button', { name: /view/i });
  return {
    ...utils,
    expandButton,
    user: userEvent,
  };
};

describe('when collapsed', () => {
  beforeEach(() => setup());

  it('renders the title and author', () => {
    expect(screen.getByText(new RegExp(blog.title))).toBeVisible();
    expect(screen.getByText(new RegExp(blog.author))).toBeVisible();
  });

  it('does not render the URL or likes', () => {
    expect(screen.queryByText(new RegExp(blog.url))).not.toBeInTheDocument();
    expect(screen.queryByText(/likes/i)).not.toBeInTheDocument();
  });
});

describe('when expanded', () => {
  it('renders the URL and likes', async () => {
    const { expandButton, user } = setup();
    await user.click(expandButton);

    expect(screen.queryByText(new RegExp(blog.url))).toBeVisible();
    expect(screen.queryByText(/likes/i)).toBeVisible();
  });

  it('calls the event handler when the like button is pressed', async () => {
    const likeHandler = jest.fn();
    const { expandButton, user } = setup({ onLike: likeHandler });
    await user.click(expandButton);

    const clickCount = 2;
    const likeButton = screen.getByRole('button', { name: /like/i });
    for (let i = 0; i < clickCount; i++) await user.click(likeButton);
    expect(likeHandler.mock.calls).toHaveLength(clickCount);
  });
});
