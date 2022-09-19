import React, { useState } from 'react';
import { authActions } from './auth.slice'
import { connect, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"

function Auth (props) {
    const [pin, setPin] = useState('')
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(authActions.login(pin))
    }

  return (
    <div>
        {props.user?.id && (
            <Navigate to="/home" replace={true} />
        )}
        <h1>MOON CREDIT UNION</h1>
        <h2>Please Login</h2>
        <h4>Please enter your PIN to continue (1234)</h4>
        {props.error && <p>{props.error}</p>}
        <form onSubmit={onSubmit}>
            <input type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required />
            <button type="submit">Continue</button>
        </form>
    </div>
  );
}

function mapStateToProps(state) {
    const { token, user, error } = state.auth
    return { token, user, error }
  }
  
  export default connect(mapStateToProps)(Auth)
