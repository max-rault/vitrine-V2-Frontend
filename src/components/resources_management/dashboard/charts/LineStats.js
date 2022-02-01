import React from "react";
import { Tag, Typography } from 'antd';
import { Line } from 'react-chartjs-2';

const { Paragraph } = Typography


class LineStats extends React.Component {

  render() {
    const { stats_values, max } = this.props
    return (
      <div style={{margin: "auto"}}>


        <Paragraph style={{textAlign: "center"}}>

          <Tag color="#35A2EB" style={{marginLeft: "2em"}} className="legendStyle"/> {this.props.legendTitle}  

        </Paragraph>

        <Line
          datasetIdKey='id'
          options={{
            responsive: true,
            scales: {
              x: {
                grid: {
                  color:  'RGBA(102,102,102,0.25)',
                  tickColor: 'RGBA(102,102,102,0.75)'
                },
                ticks: {
                  color: 'RGBA(102,102,102,0.75)',
                  font:{
                    size: 16
                  }
                }
              },
              y: {
                min: 0,
                max: max ? max:null,
                grid: {
                  color:  'RGBA(102,102,102,0.25)',
                  tickColor: 'RGBA(102,102,102,0.75)'
                },
                ticks: {
                  color: 'RGBA(102,102,102,0.75)',
                  font:{
                    size: 16
                  }
                }
              }
            },
            plugins: {
              legend: {
                display:false,
                position: 'top',
              },
              title: {
                display: false,
                text: "Consomations des ressource sur l'année",
              },
            },
          }}
          data={{
            labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            datasets: [
              {
                data: stats_values,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          }}
        />
      </div>
    );
  }
}

export default LineStats