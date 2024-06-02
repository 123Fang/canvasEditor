import axios from 'axios';
const baseURL = 'http://localhost:3001'

const instance = axios.create({ baseURL });

instance.interceptors.request.use(function (config) {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

const tokenKey = 'token';
function getToken() {
  const token = localStorage.getItem(tokenKey);
  return token;
}


// 上传素材
export const uploadImg = (data: any) => instance.post('/api/upload', data);

// 创建模板
export const createdTempl = (data: any) => instance.post('/api/user-templs', data);

// 删除素材
export const removeTempl = (data: any) => instance.delete(`/api/user-templs/${data}`);

// 更新素材
export const updataTempl = (id: any, data: any) => instance.put(`/api/user-templs/${id}`, data);


// 查询素材列表
export const getTmplInfo = (data: any) => instance.get(`/api/user-templs/${data}`);
