import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import LoginInput from './LoginInput';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    await userEvent.type(emailInput, 'emailTest');
    expect(emailInput.value).toBe('emailTest');
  });

  it('should handle password typing correctly', async () => {
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'passwordTest');
    expect(passwordInput.value).toBe('passwordTest');
  });

  it('should call login function when login button is clicked', async () => {
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'emailTest');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordTest');
    const loginButton = await screen.getByRole('button', { name: 'Log In' });

    await userEvent.click(loginButton);
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'emailTest',
      password: 'passwordTest',
    });
  });
});
