import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import App from './App.jsx'
import { store } from './store'
import { checkAuth } from './features/authSlice'

ModuleRegistry.registerModules([AllCommunityModule])

// Check if user is already authenticated on app start
store.dispatch(checkAuth());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
