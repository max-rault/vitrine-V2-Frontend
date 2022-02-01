import React from "react";
import { Carousel, Row, Col, Image, Typography, Button } from 'antd';

import Nextcloud from "../../../public/nextcloud.png"
import Gitlab from "../../../public/gitlab.png"
import DocsTree from "../../../public/DocsTree.png"
import Teams from "../../../public/Teams.png"
import Outlook from "../../../public/outlook.png"
import TeamViewer from "../../../public/Teamviewer.png"

import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography

class HomeList extends React.Component{

  render() {
    const { user } = this.props
    return(
      <div>
        <Carousel autoplay effect="fade">
          <div className="CarouselApps">
            <Row  >
              <Col style={{marginLeft: "7em"}}>
                <Title level={1}>Applications les plus populaires</Title>
                <Paragraph>
                  Découvrez nos apps !!!!
                </Paragraph>
                <Button type="ghost">Découvrire</Button>
              </Col>
              <Col style={{left: "8%"}}>
                <Image src={Teams} preview={false} style={{marginLeft: "5em", width:"12em"}}/>
                <Image src={Outlook} preview={false} style={{marginLeft: "5em", width:"12em"}}/>
                <Image src={TeamViewer} preview={false} style={{marginLeft: "5em", width:"12em"}}/>
              </Col>
            </Row>
          </div>
          <div className="CarouselOnlineServices">
            <Row  >
              <Col style={{marginLeft: "7em"}}>
                <Title level={1}>Nos services en lignes</Title>
                <Paragraph>
                  Découvrez nos services en lignes !!!!
                </Paragraph>
                <Button type="ghost">Découvrire</Button>
              </Col>
              <Col style={{left: "25%"}}>
                <Image src={Outlook} preview={false} style={{marginLeft: "5em", width:"10em"}}/>
                <Image src={Nextcloud} preview={false} style={{marginLeft: "5em", width:"12em"}}/>
                <Image src={Gitlab} preview={false} style={{marginLeft: "5em", width:"11em"}}/>
              </Col>
            </Row>
          </div>
          <div className="CarouselDocs">
            <Row  >
              <Col style={{marginLeft: "7em"}}>
                <Title level={1}>La conaissance accéssible à tous !</Title>
                <Paragraph>
                  Vous avez des difficulté à utiliser votre application préférrée ?
                  <br/>
                  Le service informatique  met à vôtre disposition un large éventaille de procédure
                </Paragraph>
                <Button type="ghost">Découvrire</Button>
              </Col>
              <Col style={{left: "15%", bottom: "5em"}}>
                <Image src={DocsTree} preview={false} style={{marginLeft: "5em", width:"30em"}}/>
              </Col>
            </Row>
          </div>
        </Carousel>
      </div>
    )
  }
}

export default HomeList