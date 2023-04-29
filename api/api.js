import { baseUrl } from './config.js'

// 获取所有的巡检活动
export function patrolAll_API(){
	
	return uni.request({
		url: `${baseUrl}/patrols`,
		method:'GET',
	});
}


// 按ID获取单次巡检活动
export function patrolById_API(id){
	
	return uni.request({
		url: `${baseUrl}/patrols?id=${id}`,
		method:'GET',
	});
}
// 获取所有的项目详情
export function projectsAll_API(data) {
	return uni.request({
		url: `${baseUrl}/projects`,
		data: data,
		method:'GET',
	})
}

// 按ID获取项目详情
export function projectInfo_API(id){
	return uni.request({
		url:`${baseUrl}/project?id=${id}`,
		method:'GET',
	})
}

// 按照工程项目获取历史巡检活动
export function patrolByProject_API(id){
	return uni.request({
		url:`${baseUrl}/patrols_by_project?id=${id}`,
		method:'GET',
	})
}

// 新建项目
export function createProject_API(data) {
	return uni.request({
		url: `${baseUrl}/project_create`,
		data: data,
		method:'POST',
	})
}

// 按id获取单次巡检活动
export function patrolID_API(id) {
	return uni.request({
		url:`${baseUrl}/patrol?id=${id}`,
		method:'GET',
	})
}

// 修改问题记录
export function updataProblems_API(data) {
	return uni.request({
		url: `${baseUrl}/problem_update`,
		data: data,
		method:'PUT',
	})
}

// 新增问题记录
export function addProblem(data) {
	return uni.request({
		url: `${baseUrl}/problem_create`,
		data: data,
		method:'POST',
	})
}

// 上传文件
export function uploadFiles(data) {
	return uni.request({
		url: `${baseUrl}/upload_files`,
		data: data,
		method:'POST',
		header: {
		    "Content-Type": "application/json"
		},
	})
}

// 删除存储文件
export function deleteFile(data) {
	return uni.request({
		url: `${baseUrl}/delete_files`,
		data: data,
		method:'DELETE',
	})
}

// 按ID查找单条问题记录
export function problemById_API(id) {
	return uni.request({
		url:`${baseUrl}/problem?id=${id}`,
		method:'GET',
	})
}

// 查找所有问题记录
export function allProblem_API(data) {
	return uni.request({
		url: `${baseUrl}/problems`,
		data: data,
		method:'GET',
	})
}

// 添加记录此问题的巡查组信息
export function bindTeam_API(data) {
	return uni.request({
		url: `${baseUrl}/problem_team_bind?team_id=${data.teamId}&problem_id=${data.problemId}`,
		
		method:'PUT',
	})
}


// 删除问题记录
export function deleteProblem_API(data) {
	return uni.request({
		url: `${baseUrl}/problem_delete`,
		data: data,
		method:'DELETE',
	})
}

// 按ID查找单条问题记录
export function basisById_API(id) {
	return uni.request({
		url:`${baseUrl}/basis?id=${id}`,
		method:'GET',
	})
}

// 按页获取多个依据
export function allBasis_API(data) {
	return uni.request({
		url: `${baseUrl}/bases`,
		data: data,
		method:'GET',
	})
}

//条款反馈
export function feedbackBasis_API(data) {
	return uni.request({
		url: `${baseUrl}/feedback_create`,
		data: data,
		method:'POST',
		header: {
		    "Content-Type": "application/json"
		},
	})
}

//查找条款
export function searchBasis_API(data) {
	return uni.request({
		url: `${baseUrl}/basis_from_search?desc=${data}`,
		method:'GET',
	})
}

//依据反馈绑定依据
export function feedbackBindBasis_API(data) {
	return uni.request({
		url: `${baseUrl}/feedback_basis_bind?basis_id=${data.basisId}&feedback_id=${data.feedbackId}`,
		method:'PUT',
	})
}

//获取该项目使用的固定检查项模板下的固定检查项
export function basisByProject_API(id) {
	return uni.request({
		url: `${baseUrl}/bases_by_project?id=${id}`,
		method:'GET',
	})
}

// 修改工程项目
export function updataProject_API(data) {
	return uni.request({
		url: `${baseUrl}/project_update`,
		data: data,
		method:'PUT',
	})
}

// 按活动与项目查找所有问题
export function problemsbyId_API(data) {
	return uni.request({
		url: `${baseUrl}/problems_by_project`,
		data: data,
		method:'GET',
	})
}

// 依据专家手机号查找账户实现伪登录
export function expertByPhone_API(phone) {
	return uni.request({
		url: `${baseUrl}/expert_by_phone?phone=${phone}`,
		method:'GET',
	})
}

//请假报备
export function reporting_API(data) {
	return uni.request({
		url: `${baseUrl}/reporting_create`,
		data: data,
		method:'POST',
		header: {
		    "Content-Type": "application/json"
		},
	})
}

//获取所有的账号信息
export function accounts_API(){
	return uni.request({
		url: `${baseUrl}/accounts`,
		method:'GET',
	})
}

//获得该活动下巡查该项目的专家组
export function teamByProject_API(data){
	return uni.request({
		url: `${baseUrl}/team_by_project?id=${data.id}&patrol_id=${data.patrolId}`,
		method:'GET',
	})
}


//修改工程项目
export function projectUpdate_API(data){
	return uni.request({
		url: `${baseUrl}/project_update`,
		data: data,
		method:'PUT',
	})
}

// 按id获取单个巡查组
export function team_API(id){
	return uni.request({
		url: `${baseUrl}/team?id=${id}`,
		method:'GET',
	})
}