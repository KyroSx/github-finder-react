import React, { useState } from 'react';

export function useSearchInput() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return { searchQuery, handleChange };
}
