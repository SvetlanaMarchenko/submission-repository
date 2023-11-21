

import { useSelector, useDispatch } from 'react-redux';
import { appendAnecdoteFilter } from './reducers/anecdoteReducer';

const Filter = () => {
  const dispatch = useDispatch();
  const filterText = useSelector((state) => state.anecdotes.filter);

  const handleChange = (e) => {
    dispatch(appendAnecdoteFilter({ filterText: e.target.value }));
  };

  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input type="text" onChange={handleChange} value={filterText}/>
    </div>
  );
};

export default Filter;
