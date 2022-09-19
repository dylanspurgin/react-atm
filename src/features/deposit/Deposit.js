import React, { useState } from 'react'
import { connect, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import { accountActions } from '../../app/account.slice'

function Deposit (props) {

  const [state, setState] = useState({amount: '', status: 'new', backClicked: false})
  const dispatch = useDispatch()

  const onChange = (e) => {
      setState(prev => ({...prev, amount: e.target.value}))
  }
  
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(accountActions.deposit({amount: parseFloat(state.amount)}))
  }

  const goBack = () => {
    setState(prev => ({...prev, backClicked: true}))
  }

  return (
    <div>
        {!props.token && (
          <Navigate to="/" replace={true} />
        )}

        <h1>Deposit</h1>
        {props.error && <p>{props.error}</p>}
        {state.status === 'new' && props.depositStatus !== 'deposited' && (
        <form onSubmit={onSubmit}>
            <input type="number"
                value={state.amount}
                onChange={onChange}
                required />
            <button type="submit">Confirm</button>
            <button onClick={goBack}>Back</button>
        </form>
        )}
        
        {props.depositStatus === 'deposited' && (
          <div>
            <h1>Success</h1>
            <button onClick={goBack}>Back</button>
          </div>
        )}
        {state.backClicked && (
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
