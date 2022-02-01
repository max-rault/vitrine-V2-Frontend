import React from "react";
import { Layout, Affix, Row, Col } from 'antd';
import { Link } from "react-router-dom";

const { Header } = Layout;


class HeaderLogin extends React.Component{
  render() {
    return(
        <Affix>
          <Header className="headerStyle">
            <Row>
              <Col span={12}> 
                <Link to="/home">
                  <strong className="textLogoStyle">
                    RESIN
                  </strong>                
                </Link>
              </Col>
            </Row>
        </Header>
      </Affix>
    )
  } 
}
export default HeaderLogin