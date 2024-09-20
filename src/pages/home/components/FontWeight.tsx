import React from 'react';

function FontWeight() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Font Weight:</h1>
      <div className="text-2xl">
        <p className="font-thin ...">The quick brown fox ...</p>
        <p className="font-extralight ...">The quick brown fox ...</p>
        <p className="font-light ...">The quick brown fox ...</p>
        <p className="font-normal ...">The quick brown fox ...</p>
        <p className="font-medium ...">The quick brown fox ...</p>
        <p className="font-semibold ...">The quick brown fox ...</p>
        <p className="font-bold ...">The quick brown fox ...</p>
        <p className="font-extrabold ...">The quick brown fox ...</p>
        <p className="font-black ...">The quick brown fox ...</p>
      </div>
    </div>
  );
}

export default FontWeight;
