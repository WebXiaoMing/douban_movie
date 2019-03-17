import React from 'react'
import { Button, InputItem, List, WhiteSpace, Flex } from 'antd-mobile'

import './index.scss'


class Login extends React.Component {
   render ():React.ReactNode {
      return (
         <div className="login">
            <div className="login-header">
               <div className="close"><i className="icon-close"></i></div>
               <div className="login-text">登录</div>
            </div>
            <WhiteSpace/>
            <div className="login-bg"></div>
            <List className="login-form">
               <InputItem placeholder="请输入用户名" labelNumber={2}><i className="icon-user"></i></InputItem>
               <InputItem placeholder="请输入密码" labelNumber={2}><i className="icon-password"></i></InputItem>
            </List>
            <WhiteSpace/>
            <Flex wrap="wrap" className="login-btn-wrapper">
               <Button className="login-btn" inline={true}>
                  注册
               </Button>
               <Button className="login-btn theme" inline={true}>
                  登录
               </Button>
            </Flex>
         </div>
      )
   }
}

export default Login