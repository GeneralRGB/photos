import React from 'react';
import './index.scss';
import { Collection } from './Collection';
import DetailedCollection from './DetailedCollection';

const categories = [
  { "name": "Все" },
  { "name": "Лето" },
  { "name": "Зима" },
  { "name": "Осень" },
  { "name": "Архитектура" },
  { "name": "Самолёты" }
];

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);
  
  const [isDetailedViewOpened, setDetailedView] = React.useState(false);
  const [detailedPhotos, setDetailedPhotos] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    fetch(`https://6307af893a2114bac76922d9.mockapi.io/photos/photos?page=${page}&limit=3&${category}`)
      .then(res => res.json())
      .then(json => {
        setCollections(json);
      })
      .catch(err => {
        console.log(err);
        alert('Error while getting data');
      }).finally(() => setIsLoading(false));
  }, [categoryId, page]
  );

  const openDetailedView = (images) => {
    setDetailedView(true);
    setDetailedPhotos(images);
  };

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            categories.map((el, index) =>
              <li
                key={el.name}
                className={categoryId === index ? 'active' : ''}
                onClick={() => setCategoryId(index)}>
                {el.name}
              </li>)
          }
        </ul>
        <input
          className="search-input"
          placeholder="Поиск по названию"
          onChange={(value) => setSearchValue(value.target.value)} />
      </div>
      <div className="content">
        {isLoading ? (<h2>Loading...</h2>)
          : (
            collections
              .filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
              .map((el, index) =>
                <Collection
                  key={index}
                  name={el.name}
                  images={el.photos}
                  setDetailedView={openDetailedView}
                />)
          )
        }

        {isDetailedViewOpened && <DetailedCollection imageLinks={detailedPhotos} setDetailedView={setDetailedView} />}

      </div>
      <ul className="pagination">
        {
          [...Array(4)].map((_, i) => {
            const newPage = ++i;
            return (
              <li
                className={(newPage) === page ? 'active' : ''}
                onClick={() => setPage(newPage)}>
                {newPage}
              </li>
            );
          }
          )
        }
      </ul>
    </div>
  );
}

export default App;
