import React, { Component } from 'react';
import { Field, reduxForm, change, FieldArray, formValueSelector } from 'redux-form';
import { Container, ListGroup, CardFooter, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { showError } from '../actions/common'

import { InputField, InlineField } from '../components/Field'

const simpleField = ({ readOnly, input, label, type, meta: { touched, error } }) => (
  <Input type={type} invalid={touched && error ? true : false} valid={touched && !error ? true : false} id="name" placeholder={label} {...input} readOnly={readOnly} />
)
let EditTicketForm = props => {
  const { dispatch, error, handleSubmit, readOnly = false, pristine, reset, submitting, closeForm, initialValues } = props;
  let images = initialValues.images
  let imgs = (images === undefined ? '' : images.map((item, index) => {
    return (
      <img key={index} src={item} width="100%" />
    )
  }))
  return (
    <Form onSubmit={handleSubmit} >
      <Container style={{ 'textAlign': 'right' }}>
        <Field name="id" component="input" type="hidden" label="id" />
        <FormGroup row>
          <Col md="6">
            <Field
              name="createdAt"
              component={InlineField}
              type="text"
              label="提交时间"
              readOnly={true}
              mdLabel={4}
              mdContent={8}
            />
          </Col>
          <Col md="6">
            <Field
              name="contact"
              component={InlineField}
              type="text"
              label="业主"
              readOnly={true}
              mdLabel={4}
              mdContent={8}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="6">
            <Field
              name="phoneNr"
              component={InlineField}
              type="text"
              label="联系电话"
              readOnly={true}
              mdLabel={4}
              mdContent={8}
            />
          </Col>
          <Col md="6">
            <Field
              name="location"
              component={InlineField}
              type="text"
              label="地址"
              readOnly={true}
              mdLabel={4}
              mdContent={8}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="6">
            <Field
              name="buildingName"
              component={InlineField}
              type="text"
              label="楼栋"
              readOnly={true}
              mdLabel={4}
              mdContent={8}
            /> </Col>
          <Col md="6">
            <Field
              name="room"
              component={InlineField}
              type="text"
              label="房号"
              readOnly={true}
              mdLabel={4}
              mdContent={8}
            /> </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="12">
        <Field
          name="content"
          component={InlineField}
          label="事由"
          type="textarea"
          readOnly={true}
          mdLabel={2}         
          mdContent={10}
        />
        </Col>
        </FormGroup>
        <div>{imgs}</div>
      </Container>
      <Row className="align-items-center" style={{ 'margin-top': '20px' }}>
        <Col col='9' />
        <Col col="1" sm="4" md="2" xl className="mb-3 mb-xl-0">
          <Button block color="primary" type="submit" disabled={submitting}>标记完成</Button>
        </Col>
        {/*  <Col col="1" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="success" hidden={readOnly} disabled={pristine || submitting} onClick={reset}>重置</Button>
              </Col>     */}
        <Col col="1" sm="4" md="2" xl className="mb-3 mb-xl-0">
          <Button block color="danger" onClick={closeForm}>关闭</Button>
        </Col>
      </Row>
    </Form >
  );
}





// Decorate the form component
EditTicketForm = reduxForm({
  form: 'ticket', // a unique name for this form
  // redux-form同步验证 
})(EditTicketForm);
//const selector = formValueSelector('ticket')
const mapStateToProps = (state, ownProps) => {

  if (state.cForm.data != undefined && state.cForm.data != null)
    return { initialValues: { ...state.cForm.data } }
  else
    return { initialValues: {} }
}

EditTicketForm = connect(
  mapStateToProps
  // { load: loadAccount } // bind account loading action creator
)(EditTicketForm)

export default EditTicketForm;



