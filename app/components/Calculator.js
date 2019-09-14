import React from 'react'
import '../index.css'

// if last entered value is an operator when operator is clicked change to the new operator unless its + or -

export default class Calculator extends React.Component {

  state = {
    display: '0',
    equation: [],
    op: false,
    equals: false,
    input: false
  }

  handleDigit = (num) => {

    const { display, op, equation, equals } = this.state

    if ( display === '0' || op == true ) {
      this.setState({
        input: true,
        display: num,
        op: false,
        equals: false,
        equation: [...equation, num]
      })
    } else if ( equals === true && op === false) {
      this.setState( prevState => ({
        input: true,
        display: num,
        equation: [prevState.equation.join('').replace(/(\d)+$/gm, num)],
        equals: false,
        op: false
      }))
    } else {
      this.setState({
        input: true,
        display: display.concat(num),
        equation: [...equation, num],
        op: false,
        equals: false
      })
    }
  }

  handleOperator = (operator) => {

    const { equation, equals, op } = this.state
    // handle continuous equals presses
    if ( equals === true ) {
      this.setState({
        op: true,
        equation: [eval([...equation].join(''))].concat(operator),
        equals: false
      })
    // handle change of operator
    } else if ( op === true ) {
      this.setState({
        equation: [equation.join('').replace(/\W+$/gm, operator)],
        op: true
      })
    // handle update cumulative value when + or - are pressed
    } else if ( equation.includes('+', '-') ) {
      this.setState({
        display: eval(equation.join('')),
        equation: [...equation, operator],
        op: true
      })
    } else {
      this.setState({
        op: true,
        equation: [...equation, operator]
      })
    }
  }

  handleClear = () => {
    const { input, equals, equation } = this.state

    input === true && equals === false
    // handles "clear entry"
    ? this.setState({
      input: false,
      display: '0',
      equation: [equation.join('').replace(/\d+$/gm, '')]
    })
    // handles all clear
    : this.setState({
      input: false,
      display: '0',
      equation: []
    })
  }

  handleInverse = () => {
    const { display, equation, op} = this.state

    op === true
    ? this.setState({
      display: '-0',
      equation: []
    })
     
    : this.setState({
      display: (display *-1).toString(),
      equation: [equation.join('').replace(/\W(\d)+$/gm, (display*-1).toString())]
    })
  }

  handlePercent = () => {
    this.setState({
      display: (this.state.display/100).toString(),
      equation: [(this.state.display/100).toString()]
    })
  }

  handleEquals = () => {
    const { equals, equation, display, input } = this.state

    if( display === '0' || input === false) { return null }

    if ( equation[equation.length-1] === '+' ||
         equation[equation.length-1] === '-' ||
         equation[equation.length-1] === '*' ||
         equation[equation.length-1] === '/') {
      null
    } else
    if ( equals === true) {
      (eval([...equation, equation.join('').match(/\W(\d)+$/gm)].join(''))).toString().includes('.')
      ? this.setState(prevState => ({
          display: eval([...prevState.equation, prevState.equation.join('').match(/\W(\d)+$/gm)].join('')).toFixed(1),
          equation: [...prevState.equation, prevState.equation.join('').match(/\W(\d)+$/gm)],
          equals: true,
          op: false,
        }))
      //Handle continous presses of equals *ISSUE HERE WITH FLOATS*
      : this.setState(prevState => ({
        display: eval([...prevState.equation, prevState.equation.join('').match(/\W(\d)+$/gm)].join('')),
        equation: [...prevState.equation, prevState.equation.join('').match(/\W(\d)+$/gm)],
        equals: true,
        op: false,
      }))
    } else {
      (eval(equation.join(''))).toString().length > 3
      ? this.setState({
        op: false,
        display: eval(equation.join('')).toFixed(2),
        equals: true,
      })
      : this.setState(prevState => ({
        op: false,
        display: eval(prevState.equation.join('')),
        equals: true,
      }))
    }
    
    console.log(this.state.equation)

  }


  handleDecimal = () => { 

    const{ display, equation} = this.state

    display.includes('.')
    ? null
    : this.setState({
      display: display.concat('.'),
      equation: equation.concat('.'),
      op: false
    })
  }

  render() {

    const { display, equation, input } = this.state

    return(
      
      <React.Fragment>
        <div className="wrapper">
          {/*Digits*/}
          <button className="one dark-btn" onClick={() => this.handleDigit('1')} onKeyDown={() => this.handleDigit('1')}>1</button>
          <button className="two dark-btn" onClick={() => this.handleDigit('2')}>2</button>
          <button className="three dark-btn" onClick={() => this.handleDigit('3')}>3</button>
          <button className="four dark-btn" onClick={() => this.handleDigit('4')}>4</button>
          <button className="five dark-btn" onClick={() => this.handleDigit('5')}>5</button>
          <button className="six dark-btn" onClick={() => this.handleDigit('6')}>6</button>
          <button className="seven dark-btn" onClick={() => this.handleDigit('7')}>7</button>
          <button className="eight dark-btn" onClick={() => this.handleDigit('8')}>8</button>
          <button className="nine dark-btn" onClick={() => this.handleDigit('9')}>9</button>
          <button className="zero wide-btn dark-btn" onClick={() => this.handleDigit('0')}><span className='zero-text'>0</span></button>
          {/*Operators*/}
          <button className="decimal  dark-btn" onClick={() => this.handleDecimal('.')}>.</button>
          <button className="equals op-btn" onClick={this.handleEquals}>=</button>
          <button className="plus op-btn" onClick={() => this.handleOperator('+')}>+</button>
          <button className="minus op-btn" onClick={() => this.handleOperator('-')}>-</button>
          <button className="multiply op-btn" onClick={() => this.handleOperator('*')}>×</button>
          <button className="divide op-btn" onClick={() => this.handleOperator('/')}>÷</button>
          <button className="percent light-btn" onClick={this.handlePercent}>%</button>
          <button className="inverse light-btn" onClick={this.handleInverse}>+/-</button>
          { 
            input === true
            ? <button className="clear light-btn" onClick={this.handleClear}>
                C
              </button>
            : <button className="clear light-btn" onClick={this.handleClear}>
                AC
              </button>
          }
          <div className="display">
            <p className="display-text">{display}</p>
          </div>
        </div>
      </React.Fragment>
    )
  }
}