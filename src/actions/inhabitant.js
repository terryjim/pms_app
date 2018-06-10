import { loaded, loading, showError } from "./common";
//获取楼盘列表
export const getInhabitantsByRoom = (values) =>dispatch=> {   
    //不能用headers=new Headers()，否则跨域出错
    /*let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };*/
    let headers = { 'Content-Type': 'application/json' };
    //values:{buildingId:...,unit:...,floor:...,room:...}
    let body = JSON.stringify(values)
  
    let args = { method: 'POST', mode: 'cors', body,headers, cache: 'reload' }
    let getUrl = window.TParams.urls['getInhabitantsByRoom']
    return fetch(getUrl, args).then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.code !== 0) {               
                console.log(json.msg)
                return dispatch(showError(json.msg + '<br>' + json.data))
            }
            else {
                console.log(json.data)
                dispatch(fillProjectList(json.data))
            }
        }).catch(e => {
            return dispatch(showError('网络异常，获取楼盘列表出错，请稍后再试！<br/>' + e))
        })
}
//新增或修改后的记录更新列表
export const fillProjectList = (values) => {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`')
    console.log(values)
    return {
        type: 'FILL_PROJECT_LIST',
        data: values
    }
}