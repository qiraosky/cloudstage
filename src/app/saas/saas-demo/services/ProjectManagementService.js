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

const saveProject = (projectEntity) => (
  http({
    url:'/demo/saveProject',
    data:projectEntity
  })
)

const updateProject = (projectEntity) => (
  http({
    url:'/demo/updateProject',
    data:projectEntity
  })
)

export default {
    listProject,
    deleteProject,
    getProject,
    saveProject,
    updateProject
}