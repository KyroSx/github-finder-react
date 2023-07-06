import React, { useState } from 'react';

export function useSearchInput() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleEnterPressed =
    (fun: Function) => async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        await fun();
      }
    };

  return {
    searchQuery,
    updateSearchQuery: handleChange,
    handleEnterPressed,
  };
}
