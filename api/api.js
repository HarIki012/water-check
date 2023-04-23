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
		    "Content-Type": "application/x-www-form-urlencoded"
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