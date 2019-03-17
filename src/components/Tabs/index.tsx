import React from 'react'
import { TabBar } from 'antd-mobile'
import { RouteComponentProps, withRouter} from 'react-router-dom'

interface TabOpt {
   icon: string
   title: string
   path: string
}

export const tabOptions:Array<TabOpt> = [
   {
      icon: 'icon-hot',
      title: '热映',
      path: '/hot'
   },
   {
      icon: 'icon-rank',
      title: 'TOP榜',
      path: '/rank'
   },
   {
      icon: 'icon-classify',
      title: '分类',
      path: '/category'
   },
   {
      icon: 'icon-user',
      title: '用户',
      path: '/user'
   }
]

const Tabs = (props: RouteComponentProps) => {
   return (
      <TabBar
            tintColor="#58bc5a"
            barTintColor="#f8f8f8"
			>
         {
            tabOptions.map(item => {
               return (
                  <TabBar.Item
                     icon={<i className={ item.icon }></i>}
                     selectedIcon={<i className={ item.icon }></i>}
                     title={ item.title }
                     key={ item.title }
                     selected={ props.location.pathname === item.path }
                     onPress={() => props.history.push(item.path)}
                  />
               )
            })
         }
      </TabBar>
   )
}

export default withRouter(Tabs)