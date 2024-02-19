import { useState } from 'react';

function useDropdown(defaultValue = false) {
  const [isDropdownOpen, setDropdownOpen] = useState(defaultValue);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return [isDropdownOpen, toggleDropdown, closeDropdown];
}

export default useDropdown;
