import { http } from '../../../utils/HttpUtils';
const listProject = (params)=>(http({
    url: 'http://127.0.0.1:3001/demo/listProject',
    method: 'post',
    data: {
      pageSize: 10,
      ...params,
    },
    type: 'json',
  }))


export {
    listProject
}