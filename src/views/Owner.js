import React, { Component } from 'react';
import { connect } from 'react-redux'
import { showConfirm, closeConfirm, getList, saveForm, fillForm, delList } from '../actions/common'
import { clearEditedIds } from '../actions/common'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import EditBuildingForm from '../forms/EditBuildingForm'
import TopModal from '../components/TopModal'
import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import 'react-table/react-table.css'



class Owner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditBuilding: false,//显示修改表单
      showDanger: false,   //显示错误信息

      edit: false,//是否为编辑状态
      selectAll: false,
    };
  }

  componentWillMount() {
    //每次打开时清除页面修改痕迹
    this.props.dispatch(clearEditedIds())
  }




  //切换编辑窗口状态（开、闭）
  toggleShowEditBuilding = () => {
    this.setState({
      showEditBuilding: !this.state.showEditBuilding,
    });
  }

  //切换错误窗口状态（开、闭）  
  toggleShowDanger = () => {
    this.setState({
      showDanger: !this.state.showDanger,
    });
  }
  submit = (values) => {
    console.log(values)

    this.props.dispatch(saveForm(values, 'building'))
    this.setState({ showEditBuilding: false })
  }
  columns = [{
    accessor: 'id',
    Header: 'id',
    // show: false,

  }, {
    accessor: 'name',
    Header: '业主名称',

  }, {
    accessor: 'phone',
    Header: '手机号',

  }, {
    accessor: 'buildingId',
    Header: '楼栋ID',
    show: false,
  }, {
    accessor: 'buildingName',
    Header: '所在楼栋',

  }, {
    id: 'location',
    Header: '房号',
    width:60,
    filterable:false,
    accessor: d => {
      try {
        let location = d.location[0]
        return location.unit + '-' + location.floor + '-' + location.room
      } catch (e) { return '' }
    },

  }
  ];

  render() {

    let vOwners = this.props.vOwners
    return (
      <div className="animated fadeIn">
        <ReactTable keyField='id' data={vOwners.content}
          pages={vOwners.totalPages} columns={this.columns} defaultPageSize={window.TParams.defaultPageSize} filterable
          className="-striped -highlight"          
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          onFetchData={(state, instance) => {
            let whereSql = ' and category=1'
            state.filtered.forEach(
              v => whereSql = whereSql + ' and ' + v.id + ' like \'%' + v.value + '%\''
            )          
              state.sorted.forEach(
                (v,index) => {
                  if(index===0)
                  whereSql += ' order by  ' + v.id +(v.desc?" desc" : " asc")
                  else
                  whereSql+=' and '+ v.id +(v.desc?" desc" : " asc")
                }
            )
         
            this.props.dispatch(getList({ whereSql, page: state.page, size: state.pageSize }, 'vOwner'))
          }}
          getTrProps={
            (state, rowInfo, column, instance) => {
              let style = {}
              if ((this.props.editedIds != undefined) && rowInfo != undefined && this.props.editedIds.includes(rowInfo.row.id)) {
                style.background = '#c8e6c9';
              }

              return {
                style, onDoubleClick: (e, handleOriginal) => {
return null
                  this.props.dispatch(fillForm(rowInfo.row));
                  this.setState({ showEditBuilding: true, edit: false })
                },
                onClick: (e, handleOriginal) => {
                  //
                }
              }
            }
          }

        />
        {/*  <div className="row">

          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify"></i> 管理员设置
              </div>
              <div className="card-block"> */}

        <TopModal style={{ "max-width": "950px" }} isOpen={this.state.showEditBuilding} toggle={() => this.toggleShowEditBuilding()}
          className={'modal-primary ' + this.props.className}>
          <ModalHeader toggle={() => this.toggleShowEditBuilding()}>楼栋信息</ModalHeader>
          <ModalBody>
            <EditBuildingForm readOnly={!this.state.edit} onSubmit={this.submit} closeForm={this.toggleShowEditBuilding} />
          </ModalBody>
        </TopModal>
        {/*  <TopModal isOpen={this.state.showBuilding} toggle={() => this.toggleShowBuilding()}
                  className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={() => this.toggleShowBuilding()}>查看记录</ModalHeader>
                  <ModalBody>
                    <EditBuildingForm readOnly={true} />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.toggleShowBuilding}>关闭</Button>
                  </ModalFooter>
                </TopModal> */}
        {/* </div>
            </div>
          </div>
        </div> */}
      </div>
    )
  }
}
//获取building记录集及修改记录ＩＤ数组
const mapStateToProps = (state) => {
  let vOwners = state.cList
  console.log(vOwners)
  let editedIds = state.editedIds

  return { vOwners, editedIds }
}


Owner = connect(
  mapStateToProps
)(Owner)
export default Owner;
