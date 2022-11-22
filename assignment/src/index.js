import React from 'react';
import ReactDom from 'react-dom';
import { createRoot } from "react-dom/client";
import SWAPI from './components/firstComponent';


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<SWAPI/>);
