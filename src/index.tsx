/**

https://www.gutenberg.org/ is a library of over 50,000 ebooks.
The goal is to build a simple snappy search page for the ebooks.
There is starting code that loads the list of books in App() function.
You only need to modify App() function and create any helper functions if needed.

## Display
 [ ] Show list of 50 books in div.results. Use book.name
 [ ] Make the list clickable links that open in a new tab, the link is getBookUrl(bookid)
 [ ] Make the links color black, no underline. Padding of 5px all around. 
 [ ] When hovered, an underline is shown under the text, and background color of #eee.

## Search
 [ ] Change search placeholder to 'Search ebooks'
 [ ] Show books that contain the search text. Search text is case insensitive. Show only first 50 that matched.
 [ ] In div.stats, show a message like "Found 12,345 ebooks in 120ms" 
     where 12345 is ebooks matched and 120ms is time it took to filter.

*/

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const CATALOG_URL = `https://assets.recurrency.com/misc/interview-assets/gutenberg-catalog.txt`;
const STORAGE_KEY = `gutenberg-catalog`;

interface Book {
  id: string;
  name: string;
}

function getBookUrl(id: string) {
  return `https://www.gutenberg.org/ebooks/${id}`;
}

async function fetchBooks(): Promise<Book[]> {
  // cache in localstorage for faster page refreshes
  let catalog = localStorage.getItem(STORAGE_KEY);
  if (!catalog) {
    catalog = await (await fetch(CATALOG_URL)).text();
    localStorage.setItem(STORAGE_KEY, catalog);
  }

  return (
    catalog
      .trim()
      .split(`\n`)
      .reverse()
      .map((line) => {
        // parse book's name and id into object
        const [, name, id] = line.match(/^(.*?)\s+(\d+)$/);
        return { name, id };
      })
      // TODO: comment this when code is ready to handle 55K ebooks
      .slice(0, 200)
  );
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    fetchBooks().then((books) => setBooks(books));
  }, []);

  console.log({ books });

  return (
    <div>
      <input className="search" type="text" />
      <div className="stats"></div>
      <div className="results"></div>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
