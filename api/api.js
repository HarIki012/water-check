import { baseUrl } from './config.js'


// 获取所有的项目详情
export function projectsAll_API(data) {
	return uni.request({
		url: `${baseUrl}/projects`,
		data: data.data,
		method:'GET',
		header:{
			"Authorization":data.token,
		}
	})
}

// 按ID获取项目详情
export function projectInfo_API(data){
	return uni.request({
		url:`${baseUrl}/project?id=${data.data}`,
		method:'GET',
		header:{
			"Authorization":data.token,
		}
	})
}

// 按照工程项目获取历史巡检活动
export function patrolByProject_API(data){
	return uni.request({
		url:`${baseUrl}/patrols_by_project?id=${data.data}`,
		method:'GET',
		header:{
			"Authorization":data.token,
		}
	})
}

// 新建项目
export function createProject_API(data) {
	return uni.request({
		url: `${baseUrl}/project_create`,
		data: data.newProject,
		method:'POST',
		header:{
			"Authorization":data.token,
		}
	})
}


// 修改问题记录
export function updataProblems_API(data) {
	return uni.request({
		url: `${baseUrl}/problem_update`,
		data: data.data,
		method:'PUT',
		header:{
			"Authorization":data.token,
		}
	})
}

// 新增问题记录
export function addProblem_API(data) {
	return uni.request({
		url: `${baseUrl}/problem_create`,
		data: data.data,
		method:'POST',
		header:{
			"Authorization":data.token,
		}
	})
}

// 查找所有问题记录
export function allProblem_API(data) {
	return uni.request({
		url: `${baseUrl}/problems`,
		data: data.data,
		method:'GET',
		header:{
			"Authorization":data.token,
		}
	})
}

// 添加记录此问题的巡查组信息
export function bindTeam_API(data) {
	return uni.request({
		url: `${baseUrl}/problem_team_bind?team_id=${data.teamId}&problem_id=${data.problemId}`,
		method:'PUT',
		header:{
			"Authorization":data.token,
		}
	})
}


// 删除问题记录
export function deleteProblem_API(data) {
	return uni.request({
		url: `${baseUrl}/problem_delete`,
		data: data.data,
		method:'DELETE',
		header:{
			"Authorization":data.token,
		}
	})
}

// 按ID查找单条问题记录
export function basisById_API(data) {
	return uni.request({
		url:`${baseUrl}/basis?id=${data.id}`,
		method:'GET',
		header:{
			"Authorization":data.token,
		}
	})
}

//条款反馈
export function feedbackBasis_API(data) {
	return uni.request({
		url: `${baseUrl}/feedback_create`,
		data: data.data,
		method:'POST',
		header: {
		    "Content-Type": "application/json",
			"Authorization":data.token,
		},
	})
}

//查找条款
export function searchBasis_API(data) {
	return uni.request({
		url: `${baseUrl}/basis_from_search?desc=${data.data}`,
		method:'GET',
		header:{
			"Authorization":data.token,
		}
	})
}

//依据反馈绑定依据
export function feedbackBindBasis_API(data) {
	return uni.request({
		url: `${baseUrl}/feedback_basis_bind?basis_id=${data.data.basisId}&feedback_id=${data.data.feedbackId}`,
		method:'PUT',
		header:{
			"Authorization":data.token,
		}
	})
}

//获取该项目使用的固定检查项模板下的固定检查项
export function basisByProject_API(data) {
	return uni.request({
		url: `${baseUrl}/bases_by_project?id=${data.data}`,
		method:'GET',
		header:{
			"Authorization":data.token,
		}
	})
}

// 修改工程项目
export function updataProject_API(data) {
	return uni.request({
		url: `${baseUrl}/project_update`,
		data: data.data,
		method:'PUT',
		header:{
			"Authorization":data.token,
		}
	})
}

// 按活动与项目查找所有问题
export function problemsbyId_API(data) {
	return uni.request({
		url: `${baseUrl}/problems_by_project_patrol_finder`,
		data: data.data,
		method:'GET',
		header:{
			"Authorization":data.token,
		}
	})
}

// 依据专家手机号查找账户
export function expertByPhone_API(data) {
	return uni.request({
		url: `${baseUrl}/expert_by_phone?phone=${data.phone}`,
		method:'GET',
		header:{
			"Authorization":data.token,
		}
	})
}

//请假报备
export function reporting_API(data) {
	return uni.request({
		url: `${baseUrl}/reporting_create`,
		data: data.reportingData,
		method:'POST',
		header: {
		    "Content-Type": "application/json",
			"Authorization":data.token,
		},
	})
}

//获得该活动下巡查该项目的专家组
export function teamByProject_API(data){
	return uni.request({
		url: `${baseUrl}/team_by_project?id=${data.data.id}&patrol_id=${data.data.patrolId}`,
		method:'GET',
		header:{
			"Authorization":data.token,
		}
	})
}


//修改工程项目
export function projectUpdate_API(data){
	return uni.request({
		url: `${baseUrl}/project_update`,
		data: data.data,
		method:'PUT',
		header:{
			"Authorization":data.token,
		}
	})
}


//修改密码
export function userUpdate_API(data){
	return uni.request({
		url: `${baseUrl}/account_update`,
		data: data.data,
		method:'PUT',
		header:{
			"Authorization":data.token,
		}
	})
}

//登录
export function login_API(data){
	return uni.request({
		url:`${baseUrl}/login`,
		data:data,
		method:'POST',
		header: {
		    "Content-Type": "application/json",
		},
	})
}