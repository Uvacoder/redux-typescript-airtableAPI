import * as React from 'react'
import { RootState } from '../store'
import { connect } from 'react-redux'
import { login } from '../store/actions'
import { logout } from '../store/actions'
import { IClasses } from '../store/reducers'
import { ThunkDispatch } from 'redux-thunk'

interface State {
  student_name: string
}

interface OwnProps {
}

interface DispatchProps {
  login: (student_name: string) => void,
  logout: () => void
}

interface StateProps {
  accessToken: IClasses
}

type Props = StateProps & OwnProps & DispatchProps

class Login extends React.Component<Props, State> {

  constructor(prop: Props) {
    super(prop)
    this.state = {
      student_name: ''
    }
  }

  handleInputSearchKey = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ student_name: e.currentTarget.value })
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.login(this.state.student_name);
    this.setState({ student_name: '' })
  };

  render() {
    return (
      <div className="row">
        {
          this.props.accessToken.classList &&
          <>
            {
              this.props.accessToken.classList.map((_class, idx) => (
                <div key={idx} className="card">
                  <p className="title">Name</p>
                  <p className="content-top">{_class.name}</p>
                  <p className="title">Students</p>
                  <p className="content">{_class.students.join(', ')}</p>
                </div>
              ))
            }
            <button className="btn btn-primary logout" onClick={() => { this.props.logout() }}>
              LogOut
            </button>
          </>
          ||
          this.props.accessToken.isFetching && 'Loading...'
          ||
          <form onSubmit={this.handleSubmit}>
            <div className="Login">
              <p>Student Name:</p>
              <input type="text" required={true} onChange={this.handleInputSearchKey} />
            </div>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </form>
        }
      </div>
    )
  }
}
//This method will be invoked automatically so that it will update the properties that will be passed down to Component.
//This method has 2 arguments first is the root states and second is the Component’s own props 
//(you may use them in order to compute/transform the states.
const mapStateToProps = (states: RootState, ownProps: OwnProps): StateProps => {
  return {
    //'accessToken:' is meaning props
    //'states' is State
    accessToken: states.session.classes
  }
}

//With the same fashion this method is to map the actions and provide it back as a properties of the component.
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => {
  return {
    login: async (student_name) => {
      await dispatch(login(student_name))
      console.log('Completed [UI]')
    },
    logout: () => {

      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)