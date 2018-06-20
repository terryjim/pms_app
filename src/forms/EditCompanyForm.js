import React, { Component } from 'react';
import { Field, reduxForm, change, FieldArray } from 'redux-form';
import { Container, ListGroup, CardFooter, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { showError } from '../actions/common'
import { InputField } from '../components/field'
import { getBuildingsByDepartment } from '../actions/building'

const simpleField = ({ readOnly, input, label, type, meta: { touched, error } }) => (
  <Input type={type} invalid={touched && error ? true : false} valid={touched && !error ? true : false} id="name" placeholder={label} {...input} readOnly={readOnly} />
)

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = '业主名称不能为空'
  }
  if (!values.domain) {
    errors.domain = '企业空间名称不能为空'
  }
  if (!values.location) {
    errors.location = '房间号不能为空'
  }
  if (!values.manager) {
    errors.manager = '管理员不能为空'
  }
  if (!values.phone) {
    errors.phone = '手机号码不能为空'
  }
  if (!values.buildingId) {
    errors.buildingId = '楼栋号不能为空'
  }
  return errors
}

let EditCompanyForm = props => {
  const { name, phone, header, dispatch, error, handleSubmit, pristine, reset, submitting, closeForm, initialValues, buildingList } = props;
  initialValues.name = name
  initialValues.phone = phone
  console.log('-------------------------------------------------------------')
  console.log(buildingList)
  //let 
  if (buildingList === undefined||buildingList.length===0){
    console.log('-------------------------------------------------------------')
    props.dispatch(getBuildingsByDepartment())
  }
   

  return (
    <div className="animated fadeIn">
      <form onSubmit={handleSubmit} >
        <Field name="id" component="input" type="hidden" label="id" />
        <Label>{header}</Label>
        <Field
          name="name"
          component={InputField}
          type="text"
          label="企业名称"
        />
        <Field
          name="domain"
          component={InputField}
          placeholder="六位及以上英文（不区分大小写）及数字组成"
          type="text"
          label="企业空间名称"
        />
        <Container><FormGroup row>
          <Label sm={3} for="buildingId">楼栋号</Label>
          <Col sm={9}>
            <Field name="buildingId" component="select"  >
              <option value="">请选择楼栋</option>
              {buildingList != undefined ?
                buildingList.map((build, index) => (
                  <option value={index} key={index}>
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
        />
        <Field
          name="location"
          component={InputField}
          type="text"
          placeholder="按单元号-楼层号-房号格式输入，多间房以逗号分隔，如1-12-1,1-12-2,1-12-3"
          label="房间号"
        />
       
        <Field
          name="manager"
          component={InputField}
          type="text"
          label="管理员"
        />
        <Field
          name="phone"
          component={InputField}
          type="text"
          label="手机号码"
        />
        {/* 
      <Field readOnly={readOnly}
        name="enabled"
        component={InputField}
        type="text"
        label="楼栋类型"
      />*/}


        {error && <strong>{error}</strong>}


        <Row className="align-items-center">
          <Col col='9' />
          <Col col="1" sm="4" md="2" xl className="mb-3 mb-xl-0">
            <Button block color="primary" type="submit" disabled={pristine || submitting}>提交</Button>
          </Col>
          {/*  <Col col="1" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="success" hidden={readOnly} disabled={pristine || submitting} onClick={reset}>重置</Button>
              </Col>     */}
          <Col col="1" sm="4" md="2" xl className="mb-3 mb-xl-0">
            <Button block color="danger" onClick={closeForm}>关闭</Button>
          </Col>
        </Row>

      </form>

    </div>
  );
}





// Decorate the form component
EditCompanyForm = reduxForm({
  form: 'company', // a unique name for this form
  validate,                // redux-form同步验证 
})(EditCompanyForm);
const mapStateToProps = (state, ownProps) => {
  let buildingList = state.buildingList
  return { initialValues: {}, buildingList }
}

EditCompanyForm = connect(
  mapStateToProps
  // { load: loadAccount } // bind account loading action creator
)(EditCompanyForm)

export default EditCompanyForm;



