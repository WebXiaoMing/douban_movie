import { ComponentClass } from 'react'

import Login from '../pages/Login'
import Hot from '../pages/Hot'
import Rank from '../pages/Rank'
import User from '../pages/User'
import Category from '../pages/Category'

export interface RouteProps {
   path: string
   key: string
   exec?: boolean
   component?: ComponentClass
   render?: () => any
}


const routes:Array<RouteProps> = [
   {
      path: '/login',
      key: 'login',
      exec: true,
      component: Login
   },
   {
      path: '/hot',
      key: 'hot',
      exec: true,
      component: Hot
   },
   {
      path: '/rank',
      key: 'rank',
      exec: true,
      component: Rank
   },
   {
      path: '/user',
      key: 'user',
      exec: true,
      component: User
   },
   {
      path: '/category',
      key: 'category',
      exec: true,
      component: Category
   }

]

export default routes