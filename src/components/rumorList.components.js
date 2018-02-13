import React from 'react';
import Rumor from'./rumor.components';

const RumorList = ({rumors}) => {
  console.log(rumors, "COMPONENTS");
  return (
    <div className="rumor-list"> {
      rumors.map(rumor => { //renders X amount of rumors
        return (
          <Rumor
          body={rumor.body}
          user={rumor.user}
          points={rumor.points}
          key={rumor.id}/>
        );
      })
    }
    </div>
  );
}

export default RumorList;