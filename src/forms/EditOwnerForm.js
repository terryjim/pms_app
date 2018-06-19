import React, { Component } from 'react';
import { Field, reduxForm, change, FieldArray } from 'redux-form';
import { ListGroup, CardFooter, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { showError } from '../actions/common'
import { InputField } from '../components/field'


const simpleField = ({ readOnly, input, label, type, meta: { touched, error } }) => (
  <Input type={type} invalid={touched && error ? true : false} valid={touched && !error ? true : false} id="name" placeholder={label} {...input} readOnly={readOnly} />
)

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = '业主名称不能为空'
  }
  if (!values.phone) {
    errors.phone = '手机号码不能为空'
  }
  return errors
}

let EditOwnerForm = props => {
  const { name, phone, header,dispatch, error, handleSubmit, pristine, reset, submitting, closeForm, initialValues } = props;
  initialValues.name = name
  initialValues.phone = phone
  return (
    <div className="animated fadeIn">
      <form onSubmit={handleSubmit} >
        <Field name="id" component="input" type="hidden" label="id" />
        <Label>{header}</Label>
        <Field
          name="name"
          component={InputField}
          type="text"
          label="业主名称"
        />
        <Field
          name="phone"
          component={InputField}
          type="text"
          label="手机号码"
          value={phone}
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
EditOwnerForm = reduxForm({
  form: 'owner', // a unique name for this form
  validate,                // redux-form同步验证 
})(EditOwnerForm);
const mapStateToProps = (state) => {

  return { initialValues: {} }// 单选框选中状态必须为字符串，所以要将数字加引号
}

EditOwnerForm = connect(
  mapStateToProps
  // { load: loadAccount } // bind account loading action creator
)(EditOwnerForm)

export default EditOwnerForm;



