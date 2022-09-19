import { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Navigate } from "react-router-dom"
import { accountActions } from '../../app/account.slice'

function Balance (props) {

    const [state, setState] = useState( {backClicked: false} )

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(accountActions.getBalance())
    }, [dispatch, props.balance])

    const goBack = () => {
      setState(prev => ({...prev, backClicked: true}))
    }

    const numberFormat = (value) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);

    return (
      <div>
        {!props.token && (
          <Navigate to="/" replace={true} />
        )}
        {state.backClicked && (
          <Navigate to="/home" />
        )}

        {props.status !== 'loading' && (
        <div>
            <h1>Your current balance is: {numberFormat(props.balance)}</h1>
            <button onClick={goBack}>Back</button>
        </div>
        )}
      </div>
    );
}
  
function mapStateToProps(state) {
    const { token } = state.auth
    const { balance, status } = state.account
    console.debug('status', status);
    return { token, balance, status }
}
  
export default connect(mapStateToProps)(Balance)