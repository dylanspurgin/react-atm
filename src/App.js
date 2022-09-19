import { Route, Routes } from "react-router-dom"
import Auth from './features/auth/Auth'
import Home from './features/home/Home'
import Withdraw from './features/withdraw/Withdraw'
import Balance from './features/balance/Balance'
import Deposit from './features/deposit/Deposit'

import store from './app/store'
import { Provider } from 'react-redux'

import './App.css'

function App() {
  return (
    <div className="app">
      <Provider store={store}>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/balance" element={<Balance />} />
            <Route path="/deposit" element={<Deposit />} />
          </Routes>
      </Provider>
    </div>
  );
}

export default App;
