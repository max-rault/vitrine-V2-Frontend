import React from "react";

import LimitForm from "./form/LimitForm";
import ImageForm from "./form/ImageForm";
import TasksForm from "./form/TasksForm";
import AdSettingsForm from "./form/AdSettingsForm";

import { Collapse, Typography, Row } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import cloudBackground from "../../../public/cloud.png"
import toolsBackground from "../../../public/tools.png"

const { Panel } = Collapse;
const { Paragraph, Title } = Typography;

class Settings extends React.Component {


  render() {

    const { appSettings, appTasks } = this.props
    return (
      <div>
        <Row justify="center" align="middle">
          <img src={cloudBackground} style={{width: "22em"}}/>
          <img src={toolsBackground} style={{position: "absolute", width: "8em"}}/>
          <Title level={3} className="SettingsTitle">Paramètres</Title>
        </Row>
        <Collapse 
          accordion
          bordered
          style={{margin:"0 5em 0 5em"}}
        > 
          <Panel header="Limite du stockage" key="1">
            <LimitForm
              appSettings={appSettings}
            />
          </Panel>
          <Panel header="Image par défaut" key="2">
            <ImageForm
              appSettings={appSettings}
            />
          </Panel>
          <Panel header="Cron Task" key="3">
            <TasksForm
              appTasks={appTasks}
            />
          </Panel>
          <Panel header="Active Directory" key="4">
            <AdSettingsForm
              appTasks={appTasks}
            />
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default Settings