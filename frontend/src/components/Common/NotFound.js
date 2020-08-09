import React from 'react';

const NotFound = () => {
  return (
    <div id='error'>
      <h1 className="notFoundTitle">Oops! That page can’t be found.</h1>
      <p className="notFoundDesc">
        It looks like nothing was found at this location.
        </p>
    </div>
  );
}
export default NotFound;