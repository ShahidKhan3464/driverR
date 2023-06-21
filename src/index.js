import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './contextApi';
import "react-datepicker/dist/react-datepicker.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppProvider>
        <App />
    </AppProvider>
)