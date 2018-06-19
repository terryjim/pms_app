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

const CheckboxTable = checkboxHOC(ReactTable);
//企业列表
class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditCompany: false,//显示修改表单
      showDanger: false,   //显示错误信息
      selection: [],
      edit: false,//是否为编辑状态
      selectAll: false,
    };
  }

  componentWillMount() {
    //每次打开时清除页面修改痕迹
    this.props.dispatch(clearEditedIds())
  }
  toggleSelection = (key, shift, row) => {
    /* 
      Implementation of how to manage the selection state is up to the developer.
      This implementation uses an array stored in the component state.
      Other implementations could use object keys, a Javascript Set, or Redux... etc.
    */
    // start off with the existing state
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);
    // check to see if the key exists
    if (keyIndex >= 0) {
      // it does exist so we will remove it using destructing
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      // it does not exist so add it
      selection.push(key);
    }
    // update the state
    this.setState({ selection });
  };

  toggleAll = () => {
    const selectAll = this.state.selectAll ? false : true;
    const selection = [];
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array
      currentRecords.forEach(item => {
        selection.push(item._original.id);
      });
    }
    this.setState({ selectAll, selection });
  };

  isSelected = key => {
    /*
      Instead of passing our external selection state we provide an 'isSelected'
      callback and detect the selection state ourselves. This allows any implementation
      for selection (either an array, object keys, or even a Javascript Set object).
    */
    return this.state.selection.includes(key);
  };

  //切换编辑窗口状态（开、闭）
  toggleShowEditCompany = () => {
    this.setState({
      showEditCompany: !this.state.showEditCompany,
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
    this.props.dispatch(saveForm(values, 'owner'))
    this.setState({ showEditCompany: false })
  }
  columns = [ {
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
            this.setState({ showEditProject: true, edit: true })
          }
        }>
      </a>
      &nbsp;
      <a className="fa fa-trash-o" style={{ fontSize: 20, color: '#FF5722', alignItems: 'top' }}
        onClick={
          e => {
            e.stopPropagation()
             this.setState({selection:[c.row.id]})
            this.props.dispatch(showConfirm('是否删除选中记录？', 'project', 'del'))
          }
        }>
      </a>
    </div>)
  },{
    accessor: 'id',
    Header: 'id',
    // show: false,
  }, {
    accessor: 'name',
    Header: '企业名称',

  }, {
    accessor: 'phone',
    Header: '联系电话',

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
    //width: 60,
    filterable: false,
    accessor: d => {
      try {
        let location = ''
        d.location.map(loc => {
          location += loc.unit + '-' + loc.floor + '-' + loc.room + ','
        })
        //去掉最后的逗号    
        return location.slice(0, location.length - 1)
      } catch (e) { return '' }
    },
  }
  ];

  render() {
    const { toggleSelection, toggleAll, isSelected } = this
    const { selectAll } = this.state
    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox",
    }
    let vOwners = this.props.vOwners
    return (
      <div className="animated fadeIn">
         <Button color="primary" size="sm" onClick={() => { this.props.dispatch(fillForm(null)); this.setState({ showEditCompany: true, edit: true }) }}>新增</Button>
        <Button color="danger" size="sm" onClick={() => {
          if (this.state.selection.length < 1)
            alert('请选择要删除的记录！')
          else
            this.props.dispatch(showConfirm('是否删除选中记录？', 'owner', 'del'));
        }}>删除</Button>
        <CheckboxTable ref={r => (this.checkboxTable = r)} keyField='id' data={vOwners.content}
          pages={vOwners.totalPages} columns={this.columns} defaultPageSize={window.TParams.defaultPageSize} filterable
          className="-striped -highlight"
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          onFetchData={(state, instance) => {
            let whereSql = ' and category=2'
            state.filtered.forEach(
              v => whereSql = whereSql + ' and ' + v.id + ' like \'%' + v.value + '%\''
            )
            state.sorted.forEach(
              (v, index) => {
                if (index === 0)
                  whereSql += ' order by  ' + v.id + (v.desc ? " desc" : " asc")
                else
                  whereSql += ' and ' + v.id + (v.desc ? " desc" : " asc")
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
                  this.setState({ showEditCompany: true, edit: false })
                },
                onClick: (e, handleOriginal) => {
                  if (e.ctrlKey) {
                    this.setState({ selection: [rowInfo.row.id, ...this.state.selection] })
                  } else {
                    if (this.state.selection.includes(rowInfo.row.id))
                      this.setState({ selection: [] })
                    else
                      this.setState({ selection: [rowInfo.row.id] })
                  }
                }
              }
            }
          }
          {...checkboxProps}
        />
       
        <TopModal style={{ "max-width": "950px" }} isOpen={this.state.showEditBuilding} toggle={() => this.toggleShowEditBuilding()}
          className={'modal-primary ' + this.props.className}>
          <ModalHeader toggle={() => this.toggleShowEditBuilding()}>楼栋信息</ModalHeader>
          <ModalBody>
            <EditBuildingForm readOnly={!this.state.edit} onSubmit={this.submit} closeForm={this.toggleShowEditBuilding} />
          </ModalBody>
        </TopModal>      
      </div>
    )
  }
}
//获取building记录集及修改记录ＩＤ数组
const mapStateToProps = (state) => {
  let vOwners = state.cList
  console.log(vOwners)
  let editedIds = state.editedIds
  let confirmDel = state.confirm.module === 'project' && state.confirm.operate === 'del' ? state.confirm.confirm : false
  return { vOwners, editedIds, confirmDel }
}


Company = connect(
  mapStateToProps
)(Company)
export default Company;
