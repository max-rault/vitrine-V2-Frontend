import React from "react";
import { Spin, Avatar } from "antd";

import maggyThink from "../../../public/Maggy_think-no-bg.png";
import maggyTalk from "../../../public/maggy_talk.png";

const MaggyThink = (Component) => {
    return function WithLoadingComponnent({ isLoading, ...props }) {
      if(!isLoading) return (<Component {...props} />)
      return (
       <div className="SpinContainer">
          <Avatar icon={ <img src={maggyThink} />} size={175} className="AvatarStyle"/>
          <img src={maggyTalk} className="MaggyTalk"/>
          <p className="MaggyText">
            <strong>
              Attendez je réfléchie ...
                <br/>
              (Le service informatique s'éxcuse pour la gène occasionnée)
            </strong>
          </p>
          <Spin spinning size="large" tip="Chargement ..." className="SpinStyle"/>
        </div>
      ); 
    }
  }
export default MaggyThink