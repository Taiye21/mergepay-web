import React from 'react';
export function TransactionFilter({ onSearch }: any) {
  return <input type="text" placeholder="Search by title or memo" onChange={(e) => onSearch(e.target.value)} />;
}
