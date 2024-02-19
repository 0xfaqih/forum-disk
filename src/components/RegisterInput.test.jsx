import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, it, expect, afterEach, vi } from "vitest";
import RegisterInput from "./RegisterInput";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers)

describe('registerInput component', () => {
   afterEach(() => {
      cleanup();
   })

   it('should handle name typing correctly', async () => {
      render(<RegisterInput register={() => {}}/> )
      const nameInput = await screen.getByPlaceholderText('Nama');

      await userEvent.type(nameInput, 'nameTest');
      expect(nameInput.value).toBe('nameTest')
   })

   it('should handle email typing correctly', async () => {
      render(<RegisterInput register={() => {}}/> )
      const emailInput = await screen.getByPlaceholderText('Email');

      await userEvent.type(emailInput, 'emailTest');
      expect(emailInput.value).toBe('emailTest')
   })

   it('should handle password typing correctly', async () => {
      render(<RegisterInput register={() => {}}/> )
      const passwordInput = await screen.getByPlaceholderText('Password');

      await userEvent.type(passwordInput, 'passwordTest');
      expect(passwordInput.value).toBe('passwordTest')
   })

   it('should call register function when register button is clicked', async () => {
      const mockRegister = vi.fn();
      render(<RegisterInput register={mockRegister} />);
      const nameInput = await screen.getByPlaceholderText('Nama');
      await userEvent.type(nameInput, 'nameTest')
      const emailInput = await screen.getByPlaceholderText('Email');
      await userEvent.type(emailInput, 'emailTest');
      const passwordInput = await screen.getByPlaceholderText('Password');
      await userEvent.type(passwordInput, 'passwordTest');
      const loginButton = await screen.getByRole('button', { name: 'Sign Up' });
  
      await userEvent.click(loginButton);
      expect(mockRegister).toHaveBeenCalledWith({
         name: 'nameTest',
        email: 'emailTest',
        password: 'passwordTest',
      });
    });
})