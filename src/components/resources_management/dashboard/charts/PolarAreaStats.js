import React from "react";
import { Tag, Typography, Row, Col, Divider } from 'antd';
import { PolarArea }  from 'react-chartjs-2'

const { Paragraph } = Typography

class PolarAreaStats extends React.Component {

  render() {
    const { stats_values, max } = this.props
    return (
      <div style={{margin: "auto"}}>
        <Row align="middle" justify="center">
          <Col span={6}>
            <Divider> Légende </Divider>
            <Paragraph style={{textAlign: "start"}}>
              <Tag color="#FF6384" className="legendStyle"/> Application (fichier) 
            </Paragraph>

            <Paragraph style={{textAlign: "start"}}>
              <Tag color="#36A2EB" className="legendStyle"/> Application (Liens)
            </Paragraph>
            <Paragraph style={{textAlign: "start"}}>
              <Tag color="#FFCE56" className="legendStyle"/> Services en ligne
            </Paragraph>
            <Paragraph style={{textAlign: "start"}}>
              <Tag color="#4BC0C0" className="legendStyle"/> Procédures 
            </Paragraph>

          </Col>
          <Col span={6} style={{marginLeft: "6em"}}>
            <div>
              <PolarArea
                datasetIdKey='id'
                options={{
                  responsive: true,
                  scales: {
                    r: {
                      min: 0,
                      max: max ? max:null,
                      grid: {
                        color: 'RGBA(102,102,102,0.76)'
                      },
                      ticks: {
                        color: '#666666',
                        backdropColor: 'transparent'
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      position: 'top',
                      display: false,
                    },
                    title: {
                      display: false,
                      text: 'Stats des ressources',
                    },
                  },
                }}
                data={{
                  labels: ['Application (fichier)', 'Application (Liens)', 'Services en ligne', 'Procédures'],
                  datasets: [{
                    data: stats_values,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.25)',
                      'rgba(54, 162, 235, 0.25)',
                      'rgba(255, 206, 86, 0.25)',
                      'rgba(75, 192, 192, 0.25)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1,
                  }],
                }}
              />            
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PolarAreaStats