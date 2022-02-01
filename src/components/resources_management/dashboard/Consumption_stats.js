import React from "react";
import { Row, Col, Typography, PageHeader, Statistic } from 'antd';
import Chart from 'chart.js/auto';
import { getConsumptionStats } from "../../../store/actions/stats";
import {connect} from "react-redux";
import LineStats from "./charts/LineStats";
import DoughnutStats from "./charts/DoughnutStats";
import PolarAreaStats from "./charts/PolarAreaStats";


const { Title } = Typography

class Consumption_stats extends React.Component {

 componentDidMount(){

    this.props.getConsumptionStats()

    Chart.register()

  }

  render() {
    const { consumptionStats } = this.props
    return (
      <div>
        <Row justify="center" align="top" style={{marginTop: "3em"}}>
          <Col span={11}>
            <Title style={{textAlign: "center"}} level={5}>Consomation des ressources</Title>
            <LineStats
              legendTitle="Obtention"
              stats_values={consumptionStats.per_month}
            />
          </Col>
          <Col span={11}>
            <Row justify="center" align="middle"> 
              <Col flex="auto">
                <Title style={{textAlign: "center", marginBottom: "2em"}} level={5}>Répartition des resources disponnible sur le site</Title>
                <DoughnutStats
                  distribution={consumptionStats.Distribution}
                />              
              </Col>
            </Row>
            <Row justify="center" align="middle" style={{marginTop: "3em"}}>
              <Col flex="auto">
                <Title style={{textAlign: "center",  marginBottom: "2em"}} level={5}>Obtentions des ressources par catégorie sur l'année</Title>
                <PolarAreaStats
                  stats_values={consumptionStats.per_category}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>     
    );
  }
}
const mapdispatchtoprops = {
    getConsumptionStats,
}

function mapStateToProps(state) {
  return {
    visible: state.messages.visible,
    consumptionStats: state.stats.consumptionStats
  }
}

export default connect(mapStateToProps, mapdispatchtoprops)(Consumption_stats)