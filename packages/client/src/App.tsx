import * as React from 'react';
import { Global, css } from '@emotion/react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Top } from './components/pages/Top';
import { globalStyle } from './styles/globalStyle';
import { BookDetail } from './components/pages/BookDetail';
import { BookRegister } from './components/pages/BookRegister';

export const App = () => {
  return (
    <>
      <Global styles={globalStyle} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />}></Route>
          <Route path="/:id" element={<BookDetail />}></Route>
          <Route path="/register" element={<BookRegister />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
