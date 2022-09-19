import React, { useState } from 'react'
import { connect, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import { accountActions } from '../../app/account.slice'

function Withdraw (props) {

  const [amount, setAmount] = useState( '' )
  const [backClicked, setBackClicked] = useState( false )
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(accountActions.withdraw({amount: parseFloat(amount)}))
  }

  return (
    <div>
      {!props.token && (
          <Navigate to="/" replace={true} />
        )}
        <h1>Withdraw</h1>

        {props.error && <p>{props.error}</p>}
        {props.withdrawalStatus !== 'withdrawn' && (
        <form onSubmit={onSubmit}>
          <h3>Daily limit: $300</h3>
            <input type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required />
            <button type="submit">Confirm</button>
            <button onClick={() => setBackClicked(true)}>Back</button>
        </form>
        )}
        {backClicked && (
          <Navigate to="/home" />
        )}
        {props.withdrawalStatus === 'withdrawn' && (
          <div>
            <h1>Success</h1>
            <button onClick={() => setBackClicked(true)}>Back</button>
          </div>
        )}
    </div>
  );
}

function mapStateToProps(state) {
  const { token, user } = state.auth
  const { error } = state.account
  return { token, user, error, withdrawalStatus: state.account.status }
}

export default connect(mapStateToProps)(Withdraw)
