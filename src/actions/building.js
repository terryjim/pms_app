import { loaded, loading, showError, checkStatus, showSuccess } from "./common";

//根据项目部ID获取楼栋列表
export const getBuildingsByDepartment = (did = 0) => dispatch => {
    //不能用headers=new Headers()，否则跨域出错
    /*let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };*/
    let headers = { 'Content-Type': 'application/json' };
    headers.Authorization = window.sessionStorage.accessToken
    //orderBy
    //let body = JSON.stringify({ did })
    let args = { method: 'POST', mode: 'cors', headers: headers, cache: 'reload' }
    let getUrl = window.TParams.urls['getBuildingsByDepartment']
    if (did != 0)
        getUrl += '?did=' + did
    return fetch(getUrl, args).then(checkStatus).then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.code !== 0)
                return dispatch(showError(json.msg + '<br>' + json.data))
            else
                return dispatch(getBuildingListResult(json.data))
        }).catch(e => {
            if (e.response === undefined) {
                return dispatch(showError('远程服务器连接异常，请稍后再试！<br/>'))
            }
            if (e != undefined)
                return dispatch(showError(e))
            else
                return dispatch(showError('系统异常，请稍后再试！<br/>'))
        }
        )
}
//获取列表回调
export const getBuildingListResult = (json) => (
    {
        type: 'FILL_BUILDING_LIST',
        data: json
    }
)

