import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Progress } from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';
import { connect } from 'react-redux'
import { getInhabitantsByRoom } from '../actions/inhabitant'
const propTypes = {
  header: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.string,
  /*  children: PropTypes.node, */
  className: PropTypes.string,
  cssModule: PropTypes.object,
  invert: PropTypes.bool,
};

const defaultProps = {
  header: '87.500',
  icon: 'icon-people',
  color: 'info',
  value: '25',
  /*  children: 'Visitors', */
  invert: false,
};

class RoomWidget extends Component {
  constructor(props) {
    console.log("constructorconstructorconstructorconstructorconstructorconstructorconstructor")
    super(props);
    this.state = {
      //num: 0,//选中的单元号楼层房间绑定用户数    
      inhabitants: [],
    };
    let inhabitantList = this.props.inhabitantList //现有store中居民库
    let { buildingId, unit, floor, room } = this.props
    //如果现有store中没有当前房号则从数据库加载数据
    if (inhabitantList === undefined || inhabitantList.length === 0 || inhabitantList.findIndex(value => {
      return value.buildingId === buildingId && value.location.unit === unit && value.location.floor === floor && value.location.room === room
    }) < 0) {
      this.props.dispatch(getInhabitantsByRoom({ buildingId, unit, floor, room }))
    } else {
      this.setState({
        inhabitants: inhabitantList[inhabitantList.findIndex(value => {
          return value.buildingId === buildingId && value.location.unit === unit && value.location.floor === floor && value.location.room === room
        })].inhabitants
      })     
    }

    /* 
    
    
        inhabitantList[inhabitantList.findIndex(value => {
          return value.buildingId === buildingId && value.location.unit === unit && value.location.floor === floor && value.location.room === room
        })].inhabitants */


  }
  componentWillReceiveProps(nextProps) {
    let inhabitantList = this.props.inhabitantList
    let { buildingId, unit, floor, room } = nextProps
    if (inhabitantList === undefined || inhabitantList.length === 0 || inhabitantList.findIndex(value => {
      return value.buildingId === buildingId && value.location.unit === unit && value.location.floor === floor && value.location.room === room
    }) < 0) {
      this.props.dispatch(getInhabitantsByRoom({ buildingId, unit, floor, room }))
    } else {
      this.setState({
        inhabitants: inhabitantList[inhabitantList.findIndex(value => {
          return value.buildingId === buildingId && value.location.unit === unit && value.location.floor === floor && value.location.room === room
        })].inhabitants
      })
    }
  }
  render() {
    const { buildingId, unit, floor, room, className, cssModule, header, icon, color, value, children, invert, inhabitantList, ...attributes } = this.props;
    /* alert(buildingId)
    alert(unit)
    alert(floor)
    alert(room) */
    // demo purposes only
    const progress = { style: '', color: color, value: value };
    const card = { style: '', bgColor: '', icon: icon };

    if (invert) {
      progress.style = 'progress-white';
      progress.color = '';
      card.style = 'text-white';
      card.bgColor = 'bg-' + color;
    }

    const classes = mapToCssModules(classNames(className, card.style, card.bgColor), cssModule);
    progress.style = classNames('progress-xs mt-3 mb-0', progress.style);

    return (
      <Card color={this.state.inhabitants===undefined||this.state.inhabitants.length===0?'danger':'info'} className={classes} {...attributes}>
        <CardBody>
          <div className="h1 text-muted text-right mb-2">
            <i className={card.icon}></i>
          </div>
          <div className="h4 mb-0">{header}</div>
          <small className="text-muted text-uppercase font-weight-bold">{this.state.inhabitants===undefined||this.state.inhabitants.length===0?'未绑定':'绑定'+this.state.inhabitants.length+'人'}</small>
          <Progress className={progress.style} color={progress.color} value={this.state.inhabitants===undefined?0:this.state.inhabitants.length*10} />
        </CardBody>
      </Card>
    );
  }
}

RoomWidget.propTypes = propTypes;
RoomWidget.defaultProps = defaultProps;
const mapStateToProps = (state) => {
  console.log('mapStateToPropsmapStateToPropsmapStateToPropsmapStateToPropsmapStateToPropsmapStateToPropsmapStateToProps')

  let inhabitantList = state.inhabitantList
  console.log(inhabitantList)
  return { inhabitantList }
}


RoomWidget = connect(
  mapStateToProps
)(RoomWidget)

export default RoomWidget;