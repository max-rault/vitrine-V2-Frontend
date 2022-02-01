import React from "react";
import { Layout } from 'antd';
import HeaderApp from "../../components/layout/HeaderApp";
import db from "../../utils/db";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";

const { Content } = Layout;

const AppLayout = (props) =>{

const { switcher, themes } = useThemeSwitcher();
const [user, setUser] = useState({})

useLiveQuery( async () =>{

  let isSubscribed = true

  const userData = await db.table('user').get(1);

  if(isSubscribed){
  
    setUser(userData)

    if(userData.data.theme === "dark"){
    
      switcher({theme: themes.dark})
    } else {
    
      switcher({theme: themes.light})
    }

  }  
  return () => isSubscribed = false 
},[])
  const history = useHistory()
  return(
  <Layout className="LayoutContainer">
    <HeaderApp history={history}/>
      <Content >
        {props.children}
      </Content>
    </Layout>
  )  
}
export default AppLayout