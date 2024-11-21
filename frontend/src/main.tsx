import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext.tsx';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>      
    </BrowserRouter>,
)