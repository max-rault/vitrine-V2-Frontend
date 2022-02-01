import React from "react";
import { 
  Form,
  Tag,
  Col,
  Row,
  Select,
  Switch,
  Button
 } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import db from "../../utils/db";
import { useThemeSwitcher } from "react-css-theme-switcher";
import * as serviceWorker from "../../service-worker/registerSW";

const { Option } = Select;
const formRef = React.createRef();

const PreferencesForm = (props) =>{

  const { switcher, themes } = useThemeSwitcher("light");


  const changeTheme = async (value) =>{

    if(value === "light"){
      const user = await db.user.get(1)
      user.data.theme = 'light'
      await db.user.update(1, user)
      switcher({ theme: themes.light });

    } else {
      const user = await db.user.get(1)
      user.data.theme = 'dark'
      await db.user.update(1, user)
      switcher({ theme: themes.dark });

    }
  }

  const changePermission = (value) =>{
    try {
      window.Notification = function() {
        const notificationEnabled = Notification.permission === 'denied';
        return notificationEnabled ? new window.oldNotification(...arguments) : {};
      };

      Object.defineProperty(Notification, 'permission', {
        get() {
          return value === true ? 'granted' : 'denied';
        }
      })
      Notification.requestPermission = (callback) => {
        if (typeof callback === 'function') {
          callback(Notification.permission);
        }

        return Promise.resolve(Notification.permission);
      };
    } catch (error) {
      console.log('error : ', error)
    }
  }
 return(
  <Form
    ref={formRef}
    name="PreferencesForm"
    layout="vertical"
    onFinish={props.onFinish}
    onFinishFailed={props.onFinishFailed}
    initialValues={{
      avatarColor: !props.user ? "#009FD4":props.user.avatarColor,
      theme: !props.user ? "light":props.user.theme,
      nottification : props.user.notiffication === "granted" ? "checked":"unchecked"
    }}
  >
    <Row>
      <Col span={7}>
        <Form.Item
          label="Thèmes"
          name="theme"
        >
          <Select onChange={value => changeTheme(value)} style={{width:"10em"}}>
            <Option value="light">
              light
            </Option>
            <Option value="dark">
              dark
            </Option>
          </Select>
        </Form.Item>
      </Col>

      <Col span={7}>
        <Form.Item
          label="Couleur de l'avatar"
          name="avatarColor"
        >

          <Select style={{width:"10em"}} onChange={value => props.onColorChange(value)}>
            <Option value="#00AA55" >
              <Tag 
                color="#00AA55" 
                className="ColorPickerStyle"
              >
                <strong>Vert</strong>
              </Tag>
            </Option>
            <Option value="#009FD4">
              <Tag 
                className="ColorPickerStyle"
                color='#009FD4'
              >
                <strong>Bleu</strong>
              </Tag>            
            </Option>
            <Option value="#B381B3">
              <Tag 
                color='#B381B3'
                className="ColorPickerStyle"
              >
                <strong>Rose</strong>
              </Tag>            
            </Option>
            <Option value="#D47500">
              <Tag 
                color='#D47500'
                className="ColorPickerStyle"
              >
                <strong>Orange</strong>
              </Tag>            
            </Option>
            <Option value="#DC2A2A">
              <Tag 
                color='#DC2A2A'
                className="ColorPickerStyle"
              >
                <strong>Rouge</strong>
              </Tag>            
            </Option>
          </Select>
        </Form.Item>
      </Col>
      <Col  span={7}>
        <Form.Item name="nottification" label="Notiffication" valuePropName="checked">
          <Switch onChange={(value) => changePermission(value)} />
        </Form.Item>      
      </Col>
      <Form.Item  className="ButtonProjectForm">
        <Button 
          type="primary"  
          htmlType="submit"
          // style={{margin: "2em"}}
          // loading={loading} 
          icon={<SaveOutlined />}
        >
          Sauvegarder
        </Button>
      </Form.Item>
    </Row>
  </Form>
 )  
}
export default PreferencesForm