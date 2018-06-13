import React, { Component } from 'react';
import { Field, reduxForm, change, FieldArray, getFormValues, formValues, formValueSelector } from 'redux-form';
import { Container, ListGroup, CardFooter, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { showError } from '../actions/common'
import {uploadOwners} from '../actions/owner'
import { getBuildingsByDepartment } from '../actions/building'
import RoomWidget from '../components/RoomWidget'

import { InputField, SelectField, InlineField, } from '../components/field'
const UploadFile = ({ input: {value: omitValue, ...inputProps }, meta: omitMeta, ...props }) => (
  <input type='file' {...inputProps} {...props} />
);
/* const  validate = values => {
  const errors = {}
  console.log('---------------------------------')
  console.log(values)
  if (!values.buildingId) {   
    errors.buildingId = '楼栋不能为空'
  }
  if (!values.file) {
    errors.file = '请上传文件'
  }
  return errors
} */

class ImportOwners extends Component {
  componentWillMount() {
  }
  componentWillReceiveProps(nextProps) {
    //确认删除记录操作    
    /* if (nextProps.confirmDel) {
      this.props.dispatch(delList(this.state.selection, 'project'))
    } */
  }
  constructor(props) {
    super(props)
    this.props.dispatch(getBuildingsByDepartment())
  }
  onFormSubmit = (values) => {
    alert(JSON.stringify(values))
    let formData=new FormData()
    formData.append('buildingId',this.props.buildingList[values.buildingId].id)
    formData.append('projectId',this.props.buildingList[values.buildingId].projectId)
    alert(JSON.stringify(formData))
    formData.append('file',values.ownerFile[0])
    alert(JSON.stringify(formData))
    this.props.dispatch(uploadOwners(formData))
   
    //this.props.dispatch(saveForm(values, 'project'))
    
  }
  render() {
    const { values, dispatch, error, pristine, reset, submitting, closeForm, buildingList,handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.onFormSubmit)} >
        <Container><FormGroup row>
          <Label sm={3} for="buildingId">楼栋号</Label>
          <Col sm={9}>
            <Field name="buildingId" component="select"  >
              <option value="">请选择楼栋</option>
              {buildingList != undefined ?
                buildingList.map((build,index) => (
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
          type="text"
          label=""      
        />
    
    <Field 
          name="ownerFile"
          component={UploadFile}
          accept=".xlsx"
         
        />
    {/* 
         <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file">上传文件</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="file" name="file" />
                    </Col>
                  </FormGroup> */}
                  {error && <strong>{error}</strong>}
        <Row className="align-items-center">
          <Col col='11' />
          <Col col="1" sm="4" md="2" xl className="mb-3 mb-xl-0">
            <Button block color="primary"  type="submit" disabled={submitting}>提交</Button>
          </Col>
        </Row>
      </form>
    );
  }
}




// Decorate the form component
ImportOwners = reduxForm({
  form: 'importOwners', // a unique name for this form
  //validate,                // redux-form同步验证 
})(ImportOwners);
/* const selector = formValueSelector('building') */
const mapStateToProps = (state) => {
  let buildingList = state.buildingList
  return { buildingList }
}

ImportOwners = connect(
  mapStateToProps
  // { load: loadAccount } // bind account loading action creator
)(ImportOwners)
export default ImportOwners;
