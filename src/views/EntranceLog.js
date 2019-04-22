import React, { Component } from 'react';
import { connect } from 'react-redux'
import { showConfirm, closeConfirm, getList, saveForm, fillForm, delList } from '../actions/common'
import { clearEditedIds, clearCList, addToGrid } from '../actions/common'

import { Badge, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import ReactTable from "react-table";

import checkboxHOC from "react-table/lib/hoc/selectTable";
import 'react-table/react-table.css'

import MyPagination from '../components/MyPagination'
const CheckboxTable = checkboxHOC(ReactTable);

class EntranceLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: [],
      selectAll: false,
      loading: true
    };
  }
  componentDidMount() {
    this.props.dispatch(getList({}, 'entranceLog'))

  }
  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false })
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
    id: 'index',
    Header: '序号',
    filterable: false,
    width: 60,
    Cell: props => (props.page * props.pageSize + props.viewIndex + 1),
    sortable: false
  },
   
    {
      accessor: 'id',
      Header: 'id',
      show: false,
    },
    {
      accessor: 'deviceName',
      Header: '门禁名称',
      //filterable: false,
    },{
      accessor: 'deviceCode',
      Header: '门禁编号',
      //filterable: false,

    }, {
      accessor: 'userName',
      Header: '用户名称',
      //filterable: false,

    },
    
    {
      accessor: 'openMode',
      Cell: ({ value }) =>{
        let openMode = window.TParams.openMode.find(x => x.id == value)
        return openMode === undefined ? '' : openMode.name
      } ,
      Header: '开门方式',
      width: 160,
      Filter: ({ filter, onChange }) =>
        <select
          onChange={event => onChange(event.target.value)}
          value={filter ? filter.value : 0}
        >
           {[<option value={0}>请选择开门方式</option>].concat(
            window.TParams.openMode.map(manu => (
              <option value={manu.id} key={manu.id}>
                {manu.name}
              </option>
            )))}
        </select>,
    },{
      accessor: 'cardCode',
      Header: '门禁卡号',
      //filterable: false,

    },{
      accessor: 'openTime',
      Header: '开门时间',
      //filterable: false,
      Filter: ({ filter, onChange }) =>
      <Input type="date" onChange={event => onChange(event.target.value)} value={filter ? filter.value : ''} />
    },
  ]
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
    let entranceLogs = this.props.entranceLogs
 
   
    return (
      <div className="animated fadeIn">
        <Row style={{ marginBottom: '8px' }}>
          </Row>
        
        <CheckboxTable ref={r => (this.checkboxTable = r)} keyField='id' data={entranceLogs.content}
          pages={entranceLogs.totalPages} columns={this.columns}
          defaultPageSize={window.TParams.defaultPageSize}
          filterable
          className="-striped -highlight"
          total={entranceLogs.totalElements}
          PaginationComponent={MyPagination}
          loading={this.state.loading}
          /* onPageChange={(pageIndex) => this.props.dispatch(getTicket({page:pageIndex,size:10}))}  */
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          style={{
            height: document.body.clientHeight - 220 // This will force the table body to overflow and scroll, since there is not enough room
            , backgroundColor: '#FFFFFF'
          }}

          getTheadProps={() => {
            return {
              style: {
                height: '40px', boxShadow: '0px 1px 3px rgba(34, 25, 25, 0.5)',
              }
            };
          }}
          getTheadThProps={() => {
            return {
              style: {
                marginTop: '5px'
              }
            };
          }}
          getTdProps={(state, rowInfo, column) => {
            return {
              style: {
                textAlign: "center"
              }
            };
          }}

          onFetchData={(state, instance) => {            
            let whereSql = ''
            state.filtered.forEach(
              v => {
                /*    if (v.id === 'address')
                     whereSql += ' and address=\'{\'p\':\''+ v.value + '\'}'
                   else */
                if (v.id === 'openMode') {                 
                  if (v.value !=='0')
                    whereSql += ' and openMode=' + v.value
                } else
                  whereSql += ' and ' + v.id + ' like \'%' + v.value + '%\''
              }
            )
           
            state.sorted.forEach(
              (v, index) => {
                if (index === 0)
                  whereSql += ' order by  ' + v.id + (v.desc ? " desc" : " asc")
                else
                  whereSql += ' and ' + v.id + (v.desc ? " desc" : " asc")
              }
            )
            this.props.dispatch(getList({ whereSql, page: state.page, size: state.pageSize }, 'entranceLog'))
          }}



          getTrProps={
            (state, rowInfo, column, instance) => {
              let style = {}
              if (rowInfo != undefined && this.state.selection.includes(rowInfo.row.id)) {
                style.background = '#4DBD74'
                style.color = '#FFFFFF'
              }
              else
                if ((this.props.editedIds != undefined) && rowInfo != undefined && this.props.editedIds.includes(rowInfo.row.id)) {
                  style.background = '#F86C6B'
                  style.color = '#FFFFFF'
                } else
                  style = {}
              return {
                style, onDoubleClick: (e, handleOriginal) => {
                  this.props.dispatch(fillForm(rowInfo.row));
                  this.setState({ showEditTicket: true, edit: false })
                },
                onClick: (e, handleOriginal) => {
                  if (e.ctrlKey) {
                    if (this.state.selection.includes(rowInfo.row.id))
                      this.setState({ selection: this.state.selection.filter(x => x !== rowInfo.row.id) })
                    else
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

      </div>
    )
  }
}
//获取building记录集及修改记录ＩＤ数组
const mapStateToProps = (state) => {
  let entranceLogs = state.cList

  return { entranceLogs }
}


EntranceLog = connect(
  mapStateToProps
)(EntranceLog)
export default EntranceLog;
