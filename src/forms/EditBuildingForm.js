import React, { Component } from 'react';
import { Field, reduxForm, change, FieldArray, getFormValues, formValues, formValueSelector } from 'redux-form';
import { Container, ListGroup, CardFooter, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { showError } from '../actions/common'
import { initRooms } from '../actions/building'
import RoomWidget from '../components/RoomWidget'

import { InputField, SelectField, InlineField, } from '../components/field'


class EditBuildingForm extends Component {
  componentWillMount() {
  }
  componentWillReceiveProps(nextProps) {
    //确认删除记录操作    
    /* if (nextProps.confirmDel) {
      this.props.dispatch(delList(this.state.selection, 'project'))
    } */
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedUnit: -1,//选中的单元号index
      selectedFloor: -1,//选中的楼层号index
      selectedUnitName: '',
      selectedFloorName: '',
      floors: [],   //选中的单元号楼层数组
      rooms: [],//选中的单元号楼层房间数组      
    };
  }
  validate = values => {
    const errors = {}
    return errors
  }
  selectUnit = (event) => {//更改单元后填充楼层信息 
    let unit = event.target.value
    this.setState({ selectedUnit: unit })   //记录选中单元信息
    this.setState({ selectedUnitName: this.props.initialValues._original.structure[unit].unit })
    this.setState({ floors: this.props.initialValues._original.structure[unit].floors })
 
  }
  selectFloor = (event) => {//更改单元后填充楼层信息
    let floor = event.target.value
    this.setState({ selectedFloor: floor })
    this.setState({ selectedFloorName: this.state.floors[floor].name })
    this.setState({ rooms: this.state.floors[floor].rooms })
  }

  render() {
    const { readOnly = false, values, dispatch, error, handleSubmit, pristine, reset, submitting, closeForm, initialValues } = this.props;
    let structure = initialValues._original.structure;
    if (structure === undefined)
      structure = []

    return (
      <form onSubmit={handleSubmit} >

        <Field name="id" component="input" type="hidden" label="id" />
        <Label>{initialValues.name}</Label>
        <Container><FormGroup row>
          <Label sm={3} for="unit">单元号</Label>
          <Col sm={3}>
            <div onChange={this.selectUnit}><Field name="unit" component="select" >
              <option value="">请选择单元</option>
              {structure.map((struc, index) => (
                <option value={index} key={index}>
                  {struc.unit}
                </option>
              ))}
            </Field></div>
          </Col>
          <Label sm={3} for="floors">楼层号</Label>
          <Col sm={3}>
            <div onChange={this.selectFloor}><Field name="floor" component="select">
              <option value="">请选择楼层单元</option>
              {this.state.floors.map((f, index) => (
                <option value={index} key={f.name}>
                  {f.name}
                </option>
              ))}
            </Field>
            </div>
          </Col>
        </FormGroup></Container>

        <Label>房间分配</Label>
       
        <Row>
          {this.state.rooms.map(room => {
            return (
              <Col sm="6" md="2">
                <RoomWidget key={room} icon="icon-user-follow" color="success" value="55" buildingId={initialValues.id} projectId={initialValues.projectId} unit={this.state.selectedUnitName} floor={this.state.selectedFloorName} room={room} invert header={this.state.selectedUnitName + '-' + this.state.selectedFloorName + '-' + room} />
              </Col>)
          })}
          {/* <Col sm="6" md="2">
            <Widget icon="icon-people" color="info" header="87.500" value="25" invert>Visitors</Widget>
          </Col>
          <Col sm="6" md="2">
            <Widget icon="icon-user-follow" color="success" header="385" value="25" invert>New Clients</Widget>
          </Col>
          <Col sm="6" md="2">
            <Widget icon="icon-basket-loaded" color="warning" header="1238" value="25" invert>Products sold</Widget>
          </Col>
          <Col sm="6" md="2">
            <Widget icon="icon-pie-chart" color="primary" header="28%" value="25" invert>Returning Visitors</Widget>
          </Col>
          <Col sm="6" md="2">
            <Widget icon="icon-speedometer" color="danger" header="5:34:11" value="25" invert>Avg. Time</Widget>
          </Col>
          <Col sm="6" md="2">
            <Widget icon="icon-speech" color="info" header="972" value="25" invert>Comments</Widget>
          </Col> */}
        </Row>


       
        <Row className="align-items-center">
          <Col col='9' />
          <Col col="1" sm="4" md="2" xl className="mb-3 mb-xl-0">
            <Button block color="primary" hidden={readOnly} type="submit" disabled={submitting}>提交</Button>
          </Col>
          {/*  <Col col="1" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="success" hidden={readOnly} disabled={pristine || submitting} onClick={reset}>重置</Button>
              </Col>     */}
          <Col col="1" sm="4" md="2" xl className="mb-3 mb-xl-0">
            <Button block color="danger" onClick={closeForm}>关闭</Button>
          </Col>
        </Row>

      </form>
    );
  }
}




// Decorate the form component
EditBuildingForm = reduxForm({
  form: 'building', // a unique name for this form
  //validate,                // redux-form同步验证 
})(EditBuildingForm);
/* const selector = formValueSelector('building') */
const mapStateToProps = (state) => {
  let initialValues = state.cForm.data
  initialValues.unit = ''
  initialValues.floors = ''
  return { initialValues }

}

EditBuildingForm = connect(
  mapStateToProps
  // { load: loadAccount } // bind account loading action creator
)(EditBuildingForm)
export default EditBuildingForm;
