import React from 'react';

export default ({ score }) => (
  <div>
    <h4>{score.subject}: {score.score}</h4>
    <p>{score.feedback}</p>
    <small>{new Date(score.createdAt).toLocaleDateString()}</small>
  </div>
);