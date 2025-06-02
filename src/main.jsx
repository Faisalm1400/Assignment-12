import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './routes/Routes.jsx';
import AuthContextProvider from './context/AuthContextProvider.jsx';
import QueryProvider from './context/QueryProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </AuthContextProvider>
  </StrictMode>,
)
