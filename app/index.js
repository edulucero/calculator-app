import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Calculator from './components/Calculator'

class App extends React.Component {
  render() {
    return(
      <React.Fragment>
        <div className='row'>
          <Calculator />
        </div>
      </React.Fragment>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)