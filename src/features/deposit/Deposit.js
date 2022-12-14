import React, { useState } from 'react'
import { connect, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import { accountActions } from '../../app/account.slice'

function Deposit (props) {

  const [amount, setAmount] = useState( '' )
  const [backClicked, setBackClicked] = useState( false )
  
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(accountActions.deposit({amount: parseFloat(amount)}))
  }

  return (
    <div>
        {!props.token && (
          <Navigate to="/" replace={true} />
        )}

        <h1>Deposit</h1>
        {props.error && <p>{props.error}</p>}
        {props.depositStatus !== 'deposited' && (
        <form onSubmit={onSubmit}>
            <input type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required />
            <button type="submit">Confirm</button>
            <button onClick={() => setBackClicked(true)}>Back</button>
        </form>
        )}
        
        {props.depositStatus === 'deposited' && (
          <div>
            <h1>Success</h1>
            <button onClick={() => setBackClicked(true)}>Back</button>
          </div>
        )}
        {backClicked && (
          <Navigate to="/home" />
        )}
    </div>
  );
}

function mapStateToProps(state) {
  const { token, user } = state.auth
  const { error } = state.account
  return { token, user, error, depositStatus: state.account.status }
}

export default connect(mapStateToProps)(Deposit)
