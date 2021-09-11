import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Article } from '../../types';
import s from './Articles.module.scss';

interface ArticleProps {
  articles: Article[];
  page: number;
  onChangePage: (pageFromInput: number) => void;
}

export const Articles: FC<ArticleProps> = ({
  articles,
  page,
  onChangePage,
}) => {
  const [artPage, setArtPage] = useState<number | string>('');

  // возьмем page в момент маунтинга
  useEffect(() => {
    setArtPage(page);
  }, [page]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const regexp = /\d+/;
    const matchedValue = value.match(regexp);
    if (matchedValue) {
      const newValue = +matchedValue[0];
      onChangePage(newValue);
      setArtPage(newValue);
    } else {
      setArtPage('');
    }
  };
  return (
    <div>
      {articles.map(({ author, title, urlToImage, publishedAt }, index) => (
        <div>
          <table className={s.table}>
            <tr>
              <th key={index} className={s.title}>
                {title}
              </th>
              <th className={s.author}>Author</th>
              <th className={s.published}>publishedAt</th>
            </tr>
            <tr>
              <td>
                <img className={s.img} src={urlToImage} />
              </td>
              <td className={s.author}>{author}</td>
              <td className={s.published}>{publishedAt}</td>
            </tr>
          </table>
        </div>
      ))}
      <input type="text" value={artPage} onChange={handleChange} />
    </div>
  );
};
