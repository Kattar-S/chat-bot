import React from 'react';
// import './RichResponses.css';

const ListResponse = ({ data }) => {
  const { type, items } = data;
  
  if (type === 'ordered-list') {
    return (
      <div className="list-response">
        <ol>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>
    );
  }
  
  return (
    <div className="list-response">
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListResponse;
