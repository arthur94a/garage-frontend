import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserContextProvider } from "./context/userContext/userContextProvider.tsx"

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <UserContextProvider>
            <App />
        </UserContextProvider>
    </StrictMode>,
)
