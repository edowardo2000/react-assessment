import React, { useState, Fragment } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import AddPage from './pages/AddPage';
import ViewPage from './pages/ViewPage';
import axios from "axios";

function App() {

  const [contacts, setContacts] = useState([]);

  const baseURL = "https://6300660834344b6431080190.mockapi.io/api/v1/phoneBook";

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setContacts(response.data);
    });
  }, []);


  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewPage setContacts={setContacts} contacts={contacts} />} />
          <Route path="add" element={<AddPage setContacts={setContacts} contacts={contacts} />} />
        </Routes>
      </BrowserRouter>

      {/* <ViewPage />
      <AddPage /> */}
    </div>
  );
};

export default App;
