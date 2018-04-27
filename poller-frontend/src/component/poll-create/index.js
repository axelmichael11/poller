import React from 'react'
import { connect } from 'react-redux'
// import { checkProfileExists } from '../../action/profile-actions.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import FontAwesome from 'react-fontawesome' 


import {
    pollSend,
  } from '../../action/poll-actions.js'


import Pets from 'material-ui/svg-icons/action/pets'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import TimePicker from 'material-ui/TimePicker'
import RaisedButton from 'material-ui/RaisedButton'
import * as util from '../../lib/util.js'
import uuid from 'uuid/v1'
import Avatar from 'material-ui/Avatar'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'

import ChatIcon from 'material-ui/svg-icons/communication/chat'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


import AppBar from 'material-ui/AppBar'

import MaterialStyles from '../../style/material-ui-style'
import Snackbar from 'material-ui/Snackbar';

import {
    Step,
    Stepper,
    StepButton,
    StepContent,
  } from 'material-ui/Stepper';




class PollCreatePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        pollSubject: '',
        pollQuestion:'',
        openSubjectValidationError: false,
        subjectValidationErrorMessage: 'Your Subject is too short!',
        openQuestionValidationError:false,
        questionValidationErrorMessage: 'That can\'t be a question, it is too short!',
        snackBarDuration: 4000,
        openPollCreateSuccess:false,
        pollCreateSuccessMessage:'Poll has been created!',
    }
   this.pollSubmit = this.pollSubmit.bind(this)
   this.handleSubjectChange = this.handleSubjectChange.bind(this)
   this.handleQuestionChange = this.handleQuestionChange.bind(this)
   this.handleSubjectValidationError = this.handleSubjectValidationError.bind(this)
   this.handleQuestionValidationError = this.handleQuestionValidationError.bind(this)
   this.handlePollCreateSuccess = this.handlePollCreateSuccess.bind(this)
   this.handlePollClear = this.handlePollClear.bind(this)
  }

  componentWillMount() {
    console.log(this.props.history)
  }

  handleSubjectChange(e){
      this.setState({pollSubject: e.target.value})
  }

  handleQuestionChange(e){
    this.setState({pollQuestion: e.target.value})
  }

  handleSubjectValidationError(){
    this.setState((oldState)=>{
      return {
        openSubjectValidationError: !oldState.openSubjectValidationError,
      }
    });
  }

  handleQuestionValidationError(){
    this.setState((oldState)=>{
      return {
        openQuestionValidationError: !oldState.openQuestionValidationError,
      }
    });
  }

  handlePollCreateSuccess(){
    this.setState((oldState)=>{
        return {
          openPollCreateSuccess: !oldState.openPollCreateSuccess,
        }
      });
  }

  handlePollClear(){
    this.setState({
          pollSubject: '',
          pollQuestion:'',
        });
  }


  pollSubmit(){
      let {pollSubject, pollQuestion} = this.state
      let {nickname} = this.props.userProfile
      let poll = Object.assign({}, {pollSubject, pollQuestion, nickname})
      console.log('this is the poll', poll)
      if (poll.pollSubject.length < 5){
          this.handleSubjectValidationError();
          return;
      }
      
      if (poll.pollQuestion.length < 10){
          this.handleQuestionValidationError();
          return;
      } else {
        this.handlePollCreateSuccess()
        this.handlePollClear()
        // this.props.pollSend(poll)
        // .then((profile)=>{
        //     this.handlePollCreateSuccess()
        //     this.handlePollClear()
        // })
        // .catch(err=>console.log(error))
      }
  }

  render() {
    console.log('this is the poll create page state', this.state, this.props)
    return (
        <div style={{maxWidth: 450, maxHeight: 600, margin: 'auto'}}>
        <MuiThemeProvider>
        {/* <Dialog
              title="Are You Sure?"
              actions={}
              modal={false}
              open={this.state.profileUpdateAlert}
            >
              This information can be updated or deleted at anytime. Do you still want to update your information?
          </Dialog> */}


        <Paper style={{margin:'auto'}} zDepth={2}>

        </Paper>

        <Card style={MaterialStyles.title}>
          <CardHeader
              title="Poll Create"
              style={MaterialStyles.title}
             
            />
            <CardText style={MaterialStyles.text}>
            Post a question here! You can post up to three questions for people to vote on!
          </CardText>
          <CardHeader
              title={this.props.userProfile.nickname}
              subtitle={this.props.userProfile.email}
              avatar={this.props.userProfile.picture}
              style={MaterialStyles.title}
            />
            <CardMedia style={{margin:10}}>
            <form onSubmit={this.handleSubmit}>

            <CardText style={MaterialStyles.text}>Subject:</CardText>
            <Paper zDepth={2} style={{marginBotton:10}}>
                <TextField onChange={this.handleSubjectChange} value={this.state.pollSubject} hintText="Subject" fullWidth={true} style={MaterialStyles.text} underlineShow={false} multiLine={false} rows={1} rowsMax={1} maxLength="20" />
            </Paper>
            <CardText style={MaterialStyles.text}>Question:</CardText>
            <Paper zDepth={2} style={{marginBotton:10}}>
                <TextField onChange={this.handleQuestionChange} value={this.state.pollQuestion} hintText="Question" fullWidth={true} style={MaterialStyles.text} underlineShow={false} multiLine={true} rows={3} rowsMax={3} maxLength="100"/>
            </Paper>
            </form>
            </CardMedia>
            <RaisedButton
                style={{ margin: 20 }}
                label="Create Poll"
                type="submit"
                onClick={this.pollSubmit}
                style={MaterialStyles.title}
            />
        </Card>

         <Snackbar
          open={this.state.openSubjectValidationError}
          message={this.state.subjectValidationErrorMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onActionClick={this.handleSubjectValidationError}
          onRequestClose={this.handleSubjectValidationError}
        />

         <Snackbar
          open={this.state.openQuestionValidationError}
          message={this.state.questionValidationErrorMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onActionClick={this.handleQuestionValidationError}
          onRequestClose={this.handleQuestionValidationError}
        />

         <Snackbar
          open={this.state.openPollCreateSuccess}
          message={this.state.pollCreateSuccessMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onActionClick={this.handlePollCreateSuccess}
          onRequestClose={this.handlePollCreateSuccess}
        />
        </MuiThemeProvider>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    userProfile: state.userProfile,
  })
  
  export const mapDispatchToProps = dispatch => ({
    pollSend: (poll)=> dispatch(pollSend(poll))
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(PollCreatePage)