import React, { Component } from 'react';
import { connect } from 'react-redux'
import { showConfirm, closeConfirm, getList, saveForm, fillForm, delList } from '../actions/common'
import { clearEditedIds, clearCList, addToGrid } from '../actions/common'
import { checkHardwareStatus } from '../actions/hardware'
import { Badge, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import ReactTable from "react-table";

import checkboxHOC from "react-table/lib/hoc/selectTable";
import 'react-table/react-table.css'

const CheckboxTable = checkboxHOC(ReactTable);

class HardwareStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: [],
      selectAll: false,
    };
  }
  componentDidMount() {
    this.props.dispatch(getList({}, 'hardware'))

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

  columns = [{
    accessor: 'id',
    Header: 'id',
    show: false,

  }, {
    accessor: 'title',
    Header: '门禁名称', filterable: false,

  }, {
    accessor: 'hardwareCode',
    Header: '硬件编号', filterable: false,

  }, {
    id: 'status',
    Header: '在线状态', filterable: false,
    accessor: d => d.status === 1 ? <Badge value={d.status} className="mr-1" color="success">在线</Badge> : d.status === 2 ? <Badge className="mr-1" value={d.status} color="danger">不在线</Badge> : <Badge className="mr-1" value={0} color="info">未知状态</Badge>,
    sortMethod: (a, b) => {
     
      return a.props.value > b.props.value ? 1 : -1;
    }
  },
/*   {
    accessor: 'status',
    Header: '在线状态', filterable: false,
  }, */ {
    accessor: 'updated',
    Header: '最新在线时间', filterable: false,
  },
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
    let hardwares = this.props.hardwares
    return (
      <div className="animated fadeIn">
        <Button color="primary" size="sm" onClick={() => { this.props.dispatch(checkHardwareStatus()) }}>查询在线状态</Button>
        <CheckboxTable ref={r => (this.checkboxTable = r)} keyField='id' data={hardwares.content} minRows={3}
          defaultPageSize={999}
          showPagination={false}
          columns={this.columns} filterable
          className="-striped -highlight"
          /*    manual // Forces table not to paginate or sort automatically, so we can handle it server-side
             onFetchData={(state, instance) => {
              // this.props.dispatch(checkHardwareStatus())
              this.props.dispatch(getList({}, 'hardware'))   
             }} */
          getTrProps={
            (state, rowInfo, column, instance) => {
              let style = {}
              if ((this.props.editedIds != undefined) && rowInfo != undefined && this.props.editedIds.includes(rowInfo.row.id)) {
                style.background = '#c8e6c9';
              }
              return {
                style
              }
            }
          }
          {...checkboxProps}
        />

      </div>
    )
  }
}
//获取building记录集及修改记录ＩＤ数组
const mapStateToProps = (state) => {
  let hardwares = state.cList
  console.log(hardwares)
  return { hardwares }
}


HardwareStatus = connect(
  mapStateToProps
)(HardwareStatus)
export default HardwareStatus;
