import React, { Component } from 'react';
import { Field, reduxForm, change, FieldArray } from 'redux-form';
import { Container, ListGroup, CardFooter, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { showError } from '../actions/common'
import { InputField, FieldValidate } from '../components/Field'
import { getBuildingsByDepartment } from '../actions/building'
const simpleField = ({ readOnly, input, label, type, meta: { touched, error } }) => (
  <Input type={type} invalid={touched && error ? true : false} valid={touched && !error ? true : false} id="name" placeholder={label} {...input} readOnly={readOnly} />
)
const checkField = ({ readOnly, input, label, value, meta: { touched, error } }) => (
  <FormGroup row>
    {/* <Label for="checkbox2" sm={2}>Checkbox</Label>*/}
    <Col sm={{ size: 10 }}>
      <FormGroup check>
        <Label check>
          <Input type="checkbox" />{' '}
          {label}
        </Label>
      </FormGroup>
    </Col>
  </FormGroup>
)

const validate = values => {
  const errors = {}
  if (values.endTime<values.startTime) {
    errors.endTime = '授权结束时间不得小于开始时间'
  }  
  return errors
}
let EditOwnerCardForm = ({
  readOnly = false, error, dispatch, handleSubmit, pristine, reset, submitting, closeForm, initialValues, buildingList }) => {
  if (buildingList === undefined || buildingList.length === 0) {
    dispatch(getBuildingsByDepartment())
  }
  return (
    <form onSubmit={handleSubmit} >
      <Field name="id" component="input" type="hidden" label="id" />
      <Container><FormGroup row>
        <Label sm={3} for="buildingId">楼栋号</Label>
        <Col sm={9}>
          <Field name="buildingId" component="select" validate={[FieldValidate.required]}>
            <option value="">请选择楼栋</option>
            {buildingList != undefined ?
              buildingList.map((build, index) => (
                <option value={build.id} key={index}>
                  {build.name}
                </option>
              )) : ''}
          </Field>
        </Col>
      </FormGroup></Container>
      <Field
        name="buildingId"
        component={InputField}
        type="hidden"
        label=""
        validate={[FieldValidate.required]}
      />
      <Field
        name="location"
        component={InputField}
        type="text"
        placeholder="按单元号-楼层号-房号格式输入"
        validate={[FieldValidate.required, FieldValidate.room]}
        label="房间号"
      />

      <Field readOnly={readOnly}
        name="title"
        component={InputField}
        type="text"
        label="卡名称"
        validate={[FieldValidate.required]}
      />
      <Field readOnly={readOnly}
        name="code"
        component={InputField}
        type="text"
        label="卡号"
        validate={[FieldValidate.required]}
      />
      <Field readOnly={readOnly}
        name="startTime"
        component={InputField}
        type="date"
        label="授权开始时间"
        validate={[FieldValidate.required]}
      />
      <Field readOnly={readOnly}
        name="endTime"
        component={InputField}
        type="date"
        label="授权结束时间"
        validate={[FieldValidate.required]}
      />
      <Field readOnly={readOnly}
        name="name"
        component={InputField}
        type="text"
        readOnly={true}
        label="业主姓名"
      />
      <Field readOnly={readOnly}
        name="phone"
        component={InputField}
        type="text"
        readOnly={true}
        label="业主电话"
      />



      <Row className="align-items-center">
        <Col col='9' />
        <Col col="1" sm="4" md="2" xl className="mb-3 mb-xl-0">
          <Button block color="primary" hidden={readOnly} type="submit" disabled={submitting}>提交</Button>
        </Col>
        <Col col="1" sm="4" md="2" xl className="mb-3 mb-xl-0">
          <Button block color="danger" onClick={closeForm}>关闭</Button>
        </Col>
      </Row>

    </form>
  );
}





// Decorate the form component
EditOwnerCardForm = reduxForm({
  form: 'EditOwnerCardForm', // a unique name for this form
  validate,                // redux-form同步验证 
})(EditOwnerCardForm);
const mapStateToProps = (state) => {
  let buildingList = state.buildingList
  let title = '户主卡'
  if (state.cForm.data !== undefined && state.cForm.data !== null && state.cForm.data.title !== '')
    title = state.cForm.data.title

  let date = new Date()
  let startTime = date.Format('yyyy-MM-dd')
  //let startTime = '2019-01-01'
  if (state.cForm.data !== undefined && state.cForm.data !== null && state.cForm.data.startTime !== undefined && state.cForm.data.startTime !== '')
    startTime = state.cForm.data.startTime
  let endTime = ('2019-12-31')
  if (state.cForm.data !== undefined && state.cForm.data !== null && state.cForm.data.endTime !== undefined && state.cForm.data.endTime !== '')
    endTime = state.cForm.data.endTime
  let location = ''
  if (state.cForm.data !== undefined && state.cForm.data !== null && state.cForm.data.location !== undefined)
    location = JSON.stringify(state.cForm.data.location)
  return { initialValues: { ...state.cForm.data, title, isManage: 1, startTime,endTime }, buildingList }
}
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

EditOwnerCardForm = connect(
  mapStateToProps
  // { load: loadAccount } // bind account loading action creator
)(EditOwnerCardForm)

export default EditOwnerCardForm;

