import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Search } from './component/Search/Search';

export const App: React.FC = () => (
  <div>
    <Search />
  </div>
);

export default hot(App);
