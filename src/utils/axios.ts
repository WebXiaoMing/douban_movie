import axios, { AxiosRequestConfig } from 'axios'
import { Toast } from 'antd-mobile'


const DELAY = 300

axios.interceptors.request.use(
   config => {
      return config
   },
   error => {
      Toast.fail('加载失败', DELAY, () => {
         console.log('加载失败')
      })
      return Promise.reject(error)
   }
)

axios.interceptors.response.use(
   res => {
      return res
   },
   error => {
      Toast.fail('请求失败', DELAY, () => {
         console.log('请求失败')
      })
      return Promise.reject(error)
   }
)

export type RequestMethodName = 'get' | 'post'
const createRequestInstance = (method: RequestMethodName, url: string, config?: AxiosRequestConfig) => {

   const name:string = method === 'get' ? 'params' : 'data'
   return ( params: any) => {
      return axios({
         method,
         url,
         [name]: params,
         ...config
      }).then(res => {
         res.data.OK_CODE = 0
         return Promise.resolve(res.data)
      })
   }
}

export default createRequestInstance

