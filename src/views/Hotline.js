import React, { Component } from 'react';
import { connect } from 'react-redux'
import { showConfirm, closeConfirm, getList, saveForm, fillForm, delList } from '../actions/common'
import { clearEditedIds } from '../actions/common'
import { Badge, Alert, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import EditHotlineForm from '../forms/EditHotlineForm'
import TopModal from '../components/TopModal'
import {setHotline,getHotlines} from '../actions/building'
import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import 'react-table/react-table.css'

const CheckboxTable = checkboxHOC(ReactTable);
class Hotline extends Component {
  componentWillMount() {
    //每次打开时清除页面修改痕迹
    this.props.dispatch(clearEditedIds())
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.closeModal)    //保存成功后关闭表单窗口
    this.setState({ showEditHotline: false })
  }
  constructor(props) {
    super(props);
    this.state = {
      showEditHotline: false,//显示修改表单
      showDanger: false,   //显示错误信息
      /*    showHotline: false,   */
    
      edit: false,//是否为编辑状态
     
    };
  }
  
  
  //切换编辑窗口状态（开、闭）
  toggleShowEditHotline = () => {
    this.setState({
      showEditHotline: !this.state.showEditHotline,
    });
  }
  //切换查看窗口状态（开、闭）
  /*   toggleShowHotline = () => {
      this.setState({
        showHotline: !this.state.showHotline,
      });
    } */
  //切换错误窗口状态（开、闭）  
  toggleShowDanger = () => {
    this.setState({
      showDanger: !this.state.showDanger,
    });
  }
  submit = (values) => {    
    this.props.dispatch(setHotline(values))   
  }
  columns = [{
    accessor: 'id',
    Header: 'id',
    show: false,

  }, {
    Header: '',
    sortable: false,
    width: 60,
    filterable: false,
    Cell: (c) => (<div>
      <a className="fa fa-edit" style={{ fontSize: 20, color: '#00adff', alignItems: 'top' }}
        onClick={
          (e) => {
            e.stopPropagation()           
            this.props.dispatch(fillForm(c.row))　　/* 获取当前行信息填充到编辑表单 */
            this.setState({ showEditHotline: true, edit: true })
          }
        }>
      </a>
 
    </div>)
  }, {
    accessor: 'name',
    Header: '楼栋名称',
    width: 500,
  }, {
    accessor: 'hotline',
    Header: '管家客服'
    },  /*{
    //accessor: 'enabled',
    id:'enabled',
    Header: '状态',
    width: 80,
    accessor: d => (d.enabled ? ( <Badge color="primary">启用中</Badge>) : ( <Badge color="danger">已禁用</Badge>))
  },*/ 
  ];

  render() {   
    const Hotlines = this.props.Hotlines
    const checkboxProps = {     
      selectType: "checkbox",
    }
    return (
      <div className="animated fadeIn">          
        <CheckboxTable ref={r => (this.checkboxTable = r)} keyField='id' data={Hotlines.content}
          pages={Hotlines.totalPages} columns={this.columns} defaultPageSize={10} filterable
          className="-striped -highlight"
          /* onPageChange={(pageIndex) => this.props.dispatch(getHotline({page:pageIndex,size:10}))}  */
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          onFetchData={(state, instance) => {
            let whereSql = ''
            state.filtered.forEach(
              v => {                
                  whereSql += ' and ' + v.id + ' like \'%' + v.value + '%\''
              }
            )
            this.props.dispatch(getHotlines({ whereSql, page: state.page, size: state.pageSize }))
          }}
          getTrProps={
            (state, rowInfo, column, instance) => {
              let style = {}
             /*  if ((this.props.editedIds != undefined) && rowInfo != undefined && this.props.editedIds.includes(rowInfo.row.id)) {
                style.background = '#c8e6c9';
              }
              if (rowInfo != undefined ) {
                style.background = '#62c2de';
              } */
              return {
                style, onDoubleClick: (e, handleOriginal) => {
                  this.props.dispatch(fillForm(rowInfo.row));
                  this.setState({ showEditHotline: true, edit: false })
                }
              }
            }
          }
          {...checkboxProps}
        />

        <TopModal isOpen={this.state.showEditHotline} toggle={() => this.toggleShowEditHotline()}
          className={'modal-primary ' + this.props.className}>
          <ModalHeader toggle={() => this.toggleShowEditHotline()}>客服电话</ModalHeader>
          <ModalBody>
            <EditHotlineForm readOnly={!this.state.edit} onSubmit={this.submit} closeForm={this.toggleShowEditHotline} />
          </ModalBody>
        </TopModal>

      </div>
    )
  }
}
//获取hotline记录集及修改记录ＩＤ数组
const mapStateToProps = (state) => {
  let Hotlines =  state.cList
  let success = state.success
  let editedIds = state.editedIds
  return {closeModal: success.show, Hotlines, editedIds}
}
Hotline = connect(
  mapStateToProps
)(Hotline)
export default Hotline

