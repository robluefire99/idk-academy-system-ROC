import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchScores } from '../store/slices/scoreSlice';
import ScoreItem from './ScoreItem';

export default () => {
  const [page, setPage] = useState(1);
  const dispatch   = useDispatch();
  const scores     = useSelector(state => state.scores.list);

  useEffect(() => {
    dispatch(fetchScores({ page, limit: 5 }));
  }, [page, dispatch]);

  return (
    <div>
      {scores.map(s => <ScoreItem key={s._id} score={s} />)}
      <button onClick={() => setPage(p => p + 1)}>Load more</button>
    </div>
  );
};
