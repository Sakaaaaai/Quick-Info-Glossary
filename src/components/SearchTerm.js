import React from 'react';

const SearchTerm = ({ results }) => {
  if (results.length === 0) {
    return <p>単語が見つかりませんでした。</p>;
  }

  return (
    <ul>
      {results.map((result, index) => (
        <li key={index}>{result.name}: {result.meaning}</li>
      ))}
    </ul>
  );
};

export default SearchTerm;
