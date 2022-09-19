import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Navigate } from "react-router-dom"

function Home (props) {

    const [state, setState] = useState( {buttonClicked: ''} )

    const onButtonClick = (e) => {
      setState(prev => ({...prev, buttonClicked: e.target.name}))
    }

    return (
      <div>
        {!props.token && (
          <Navigate to="/" replace={true} />
        )}
        <div>
            <h1>Welcome {props.user.name}</h1>
            {state.buttonClicked && (
              <Navigate to={'/' + state.buttonClicked} />
            )}

            <ul>
              <li><button name="withdraw" onClick={onButtonClick}>Withdraw</button></li>
              <li><button name="deposit" onClick={onButtonClick}>Deposit</button></li>
              <li><button name="balance" onClick={onButtonClick}>Check Balance</button></li>
            </ul>
        </div>
      </div>
    );
}
  
function mapStateToProps(state) {
    const { token, user } = state.auth
    return { token, user }
}
  
export default connect(mapStateToProps)(Home)