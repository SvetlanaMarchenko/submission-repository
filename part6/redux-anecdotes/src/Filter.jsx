
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from './reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();
  const filterText = useSelector((state) => state.filter);

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
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


