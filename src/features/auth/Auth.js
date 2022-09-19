import React, { useState } from 'react';
import { authActions } from './auth.slice'
import { connect, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"

function Auth (props) {
    const [state, setState] = useState({pin: ''})
    const dispatch = useDispatch()

    const onChange = (e) => {
        setState(prev => ({...prev, pin: e.target.value}))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(authActions.login(state))
    }

  return (
    <div>
        {props.error && <p>{props.error}</p>}
        {props.user?.id && (
            <Navigate to="/home" replace={true} />
        )}
        <h1>Welcome to See Me Cu</h1>
        <h4>Please enter your PIN to continue (1234)</h4>
        <form onSubmit={onSubmit}>
            <input type="password"
                value={state.pin}
                onChange={onChange}
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
