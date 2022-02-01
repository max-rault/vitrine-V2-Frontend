import React from "react";
import { Button, Empty } from 'antd';
import imgNotFound from '../../../public/404.png'
import { Link } from "react-router-dom";

class NotFound extends React.Component{

  render() {
    return(
      <Empty
        image={imgNotFound}
        imageStyle={{
          height: 550,
          //marginTop: 10
        }}
        description={
          <h1>
            Oups vous faites fausse route !!!
          </h1>
        }
      >
      <Link to="/">
        <Button type="primary">Retour</Button>
      </Link>
      </Empty>
    )
  }
}

export default NotFound