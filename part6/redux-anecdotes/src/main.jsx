import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import App from './App';
import anecdoteReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';

const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer
});

const store = createStore(rootReducer);
const root = createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

renderApp();
store.subscribe(renderApp);
