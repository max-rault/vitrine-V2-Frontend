import React from "react";
import { Avatar } from "antd";
import maggySad from "../../../public/Maggy_sad-no-bg.png";
import maggyTalk from "../../../public/maggy_talk.png";

class EmptyData extends React.Component {
 
  render() {
    return (
       <div className="SpinContainer">
          <Avatar icon={ <img src={maggySad} />} size={175} className="AvatarStyle"/>
          <img src={maggyTalk} className="MaggyTalk"/>
          <p className="MaggyTextEmpty">
            <strong>
              Oops ! 
              <br/>
              je n'ai pas trouvé de données ...
            </strong>
          </p>
        </div>
    );
  }
}

export default EmptyData