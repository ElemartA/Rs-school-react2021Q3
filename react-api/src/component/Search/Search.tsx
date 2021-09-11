import React, { ChangeEvent, FC, useState } from 'react';
import axios from '../../services/api';
import { Article, SortType } from '../../types';
import { Articles } from '../Articles/Articles';
import s from './Search.module.scss';

export const Search: FC = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [art, setArt] = useState<Article[]>([]);
  const [sortBy, setSortBy] = useState<SortType>(SortType.popularity);
  const [page, setPage] = useState<number>(1);

  const API_KEY = 'd78b9ec7f77844f295150cc398c5fde4';
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(
        `v2/everything?q=${searchValue}&apiKey=${API_KEY}&sortBy=${sortBy}&pageSize=10&page=${page}`,
      );
      setArt(response.data.articles);
    } catch (err) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };
  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          id="search"
          className={s.input}
          type="text"
          placeholder="Искать здесь..."
          value={searchValue}
          onChange={handleChange}
          disabled={isLoading}
        ></input>
        <div className={s.block}>
          <label className={s.block__sort}>
            relevancy
            <input
              className={s.block__input}
              type="radio"
              value={SortType.relevancy}
              checked={sortBy === SortType.relevancy}
              onChange={() => setSortBy(SortType.relevancy)}
            />
          </label>
          <label className={s.block__sort}>
            popularity
            <input
              className={s.block__input}
              type="radio"
              value={SortType.popularity}
              checked={sortBy === SortType.popularity}
              onChange={() => setSortBy(SortType.popularity)}
            />
          </label>
          <label className={s.block__sort}>
            publishedAt
            <input
              className={s.block__input}
              type="radio"
              value={SortType.publishedAt}
              checked={sortBy === SortType.publishedAt}
              onChange={() => setSortBy(SortType.publishedAt)}
            />
          </label>
        </div>
        <button className={s.button} disabled={isLoading} type="submit">
          {isLoading ? 'Loading...' : 'Search'}
          <img src="./search.svg" alt="searchIcon" className={s.img}></img>
        </button>
      </form>
      <Articles
        articles={art}
        page={page}
        onChangePage={(pageFromInput: number) => setPage(pageFromInput)}
      />
    </div>
  );
};
