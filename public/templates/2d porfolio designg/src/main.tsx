import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { CustomizerProvider } from './context/CustomizerContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomizerProvider>
      <App />
    </CustomizerProvider>
  </StrictMode>,
)
