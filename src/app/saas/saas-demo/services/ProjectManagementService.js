import { http } from '../../../utils/HttpUtils';
const listProject = (params)=>(http({
    url: '/demo/listProject',
    method: 'post',
    data: {
      pageSize: 10,
      page:1,
      ...params,
    },
    type: 'json',
  }))

const deleteProject = (projectId)=>(
  http({
    url:'/demo/deleteProject',
    data:{projectId:projectId}
  })
)

const getProject = (projectId) =>(
  http({
    url:'/demo/getProject',
    data:{
      projectId:projectId
    }
  })
)

export default {
    listProject,
    deleteProject,
    getProject
}