import React from "react";
import { Row, Col, Typography } from 'antd';
import Chart from 'chart.js/auto';
import {connect} from "react-redux";
import LineStats from "./charts/LineStats";
import PolarAreaStats from "./charts/PolarAreaStats";
import { getFeedBacksStats } from "../../../store/actions/stats";

const { Title } = Typography

class Feedbacks_stats extends React.Component {

 componentDidMount(){
    this.props.getFeedBacksStats()

    Chart.register()
  }

  render() {
    const { feedbacksStats } = this.props
    console.log('feedbacks : ', feedbacksStats)
    return (
      <div>
        <Row justify="center" align="top" style={{marginTop: "3em"}}>
          <Col span={11}>
            <Title style={{textAlign: "center"}} level={5}>Note moyenne</Title>
            <LineStats
              legendTitle="Notes moyenne"
              stats_values={feedbacksStats.average_score_per_month}
              max={5}
            />
          </Col>
          <Col span={11}>
            <Title style={{textAlign: "center"}} level={5}>Note Moyenne par catégorie sur l'année</Title>
            <PolarAreaStats
              stats_values={feedbacksStats.average_score_per_category}
              max={5}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
const mapdispatchtoprops = {
    getFeedBacksStats,
}

function mapStateToProps(state) {
  return {
    visible: state.messages.visible,
    feedbacksStats: state.stats.feedbacksStats
  }
}

export default connect(mapStateToProps, mapdispatchtoprops)(Feedbacks_stats)