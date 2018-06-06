import React from 'react'

import {  compose, branch, renderComponent } from 'recompose'

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';

import {VictoryBar, VictoryContainer, VictoryChart, VictoryAxis} from 'victory'
import MaterialStyles from '../../../style/material-ui-style'
import Typography from '@material-ui/core/Typography';

// import '../../style/index.scss'


const styles = theme =>({
  container: theme.overrides.MuiPaper.root,
  cardHeader:theme.overrides.PollCard.cardHeader,
})


class TotalVotesGraph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        data: this.getData(),
    }
  }


  getData() {
    const rand = () => Math.max(Math.floor(Math.random() * 10000), 1000);

    return [
        { x: 'Yes', y: this.props.totalVotesData.yesVotes },
        { x: 'No', y: this.props.totalVotesData.noVotes },
      ];
  }

  render(){
      console.log('total bar GRAPH DATA!', this.state, this.props)
      let {classes} = this.props
      return(
          <div>
                      <Typography variant="subheading" component="p">
                      Total Votes: {this.props.totalVotesData.totalVotes}
                      </Typography>
                   

                  <VictoryChart
                    domainPadding={{ x: 100 }}
                  >
                  <VictoryAxis/>
                  <VictoryBar name="Bar-1"
                        style={{
                          data: {
                            fill: (d) => d.x === "Yes" ? '#4CAF50' : '#D32F2F',
                            fillOpacity: 0.7,
                          },
                          labels: {
                            fontSize: 20,
                            fill: (d) => d.x === "Yes" ? '#4CAF50' : '#D32F2F'
                          },
                          margin: "20%", 
                          maxWidth: "100%"
                        }}
                        categories={{
                          x: ["Yes", "No"]
                        }}
                        labels={(d) => `${d.y}%`}
                        data={this.state.data}
                        animate={{
                          duration: 2000,
                          onLoad: { duration: 1000 }
                        }}
          
                        // containerComponent={<VictoryContainer responsive={false}/>}
                    />
                    </VictoryChart>
                    
          </div>
      )
  }
}


export default compose(
  // connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme:true}),
)(TotalVotesGraph);