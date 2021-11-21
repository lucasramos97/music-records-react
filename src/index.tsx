import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './index.css';

import Login from './components/users/Login';
import MusicList from './components/musics/MusicList';
import DeletedMusicList from './components/musics/DeletedMusicList';

import RequireAuthentication from './components/utils/RequireAuthentication';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuthentication>
            <MusicList />
          </RequireAuthentication>
        }
      />
      <Route
        path="/musics"
        element={
          <RequireAuthentication>
            <MusicList />
          </RequireAuthentication>
        }
      />
      <Route
        path="/musics/deleted"
        element={
          <RequireAuthentication>
            <DeletedMusicList />
          </RequireAuthentication>
        }
      />
      <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
