import React from "react";
import { Layout } from 'antd';
import HeaderLogin from "../../components/layout/login/HeaderLayout";
import FooterLogin from "../../components/layout/login/FooterLogin";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { useEffect } from "react";


const { Content } = Layout;


const LoginLayout = (props) =>{

const { switcher, themes } = useThemeSwitcher();

useEffect(() =>{
  switcher({theme: themes.light})
})

   return(
    <Layout className="LayoutContainer">
      <HeaderLogin/>
      <Content >
        {props.children}
      </Content>
    <FooterLogin/>
    </Layout>
  )
  
}
export default LoginLayout