import * as React from 'react'
import { RootState } from '../store'
import { connect } from 'react-redux'
import { login } from '../store/actions'
import { AccessToken } from '../store/reducers'
import { ThunkDispatch } from 'redux-thunk'

interface State {
  student_name: string
}

interface OwnProps {
}

interface DispatchProps {
  login: (student_name: string) => void,
}

interface StateProps {
  accessToken: AccessToken
}

type Props = StateProps & OwnProps & DispatchProps

class Login extends React.Component<Props, State> {

  constructor(prop:Props) {
    super(prop)
    this.state = {
      student_name: ''
    }
  }
  
  handleInputSearchKey = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ student_name: e.currentTarget.value })
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center mb-3">
          <div className="col-6">
          {
            this.props.accessToken.isFetching && 
            <div>
              <button className="btn btn-primary logout">
                LogOut
              </button>
            </div>
            ||
            // this.props.accessToken.isFetching && 'Faking Login in' 
            // ||
            <div>
              <div className="Login">
                <p>Student Name:</p>
                <input type="text" onChange={this.handleInputSearchKey} />
              </div>
              <button className="btn btn-primary" onClick={()=>{this.props.login(this.state.student_name)}}>
                Login
              </button>
            </div>
          }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (states: RootState, ownProps: OwnProps): StateProps => {
  return {
    accessToken: states.session.accessToken
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => {
  return {
    login: async (student_name) => {
      await dispatch(login(student_name))
      console.log('Completed [UI]')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)