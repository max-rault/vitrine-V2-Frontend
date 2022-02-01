import React from "react";
import { Row, Col, Statistic, PageHeader, Tabs } from 'antd';
import Chart from 'chart.js/auto';
// import {connect} from "react-redux";
import Consumption_stats from "./Consumption_stats";
import Feedbacks_stats from "./Feedbacks_stats";

const { TabPane } = Tabs;

class Dashboards_Tabs extends React.Component {
  
  state = {
    currentYear: new Date().getFullYear()
  }

 componentDidMount(){
    Chart.register()
  }

  render() {
    
    const { headerStats } = this.props
    const { currentYear } = this.state
    return (
      <div>
        <PageHeader title="Tableau de bord" subTitle={`données statistiques de l'année ${currentYear}`}>
          <Row>
            <Col flex="auto">
              <Statistic title="Total des ressources disponnible" value={headerStats.RessourcesCount} />
            </Col>
            <Col flex="auto">
              <Statistic title="Note moyene des ressources" value={`${headerStats.feedBackAVG}/5`} precision={2} />
            </Col>
            <Col flex="auto">
              <Statistic title="Nombre de notes" value={headerStats.feedbacksCount} />
            </Col>
          </Row>
        </PageHeader>
        <Tabs defaultActiveKey="1" tabPosition="top" animated destroyInactiveTabPane type="card">
          <TabPane tab="Consomation" key="1">
            <Consumption_stats/>
          </TabPane>
          <TabPane tab="Retour d'éxperience" key="2">
            <Feedbacks_stats/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
// const mapdispatchtoprops = {
//     getHeaderStats,
// }

// function mapStateToProps(state) {
//   return {
//     visible: state.messages.visible,
//   }
// }

// export default connect(mapStateToProps)(Dashboards_Tabs)
export default Dashboards_Tabs