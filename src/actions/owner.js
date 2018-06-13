import { loaded, loading, showError,checkStatus,showSuccess } from "./common";
//上传住客信息
export const uploadOwners = (formData) =>dispatch=> {   
    //不能用headers=new Headers()，否则跨域出错
    //let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    let headers = { 'Content-Type': 'multipart/form-data;boundary=3750d8ce0a824a1b95830b89e5e1822e' };
    headers.Authorization = window.sessionStorage.accessToken
    let body = formData
    alert(JSON.stringify(body))
  //body.Authorization=window.sessionStorage.accessToken
    let args = { method: 'POST', mode: 'cors', headers,body, cache: 'reload' }
    let getUrl = window.TParams.urls['uploadOwners']
    return fetch(getUrl, args).then(checkStatus).then(response => {
        return (response.json())
    })
    .then(json => {
        dispatch(loaded())    
            if (json.code !== 0) {               
                console.log(json.msg)
                return dispatch(showError(json.msg + '<br>' + json.data))
            }
            else {
                dispatch(showSuccess('上传数据成功！'))               
            }
        }).catch(error => {            
            dispatch(loaded())
            if(error.response===undefined){
                return dispatch(showError('远程服务器连接异常，请稍后再试！<br/>' ))         
            }                  
            return dispatch(showError('其它异常，请稍后再试！<br/>' + error))     
        })
}
//新增或修改后的记录更新列表
export const fillInhabitants = (location,values) => {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`')
    console.log(values)
    return {
        type: 'FILL_INHABITANTS_BY_ROOM',
        data: values,
        location
    }
}