import React from 'react';
import Rumor from'./rumor.components';

const RumorList = ({rumors}) => {
  console.log(rumors, "COMPONENTS");
  return (

    <div className="rumor-list">
    {
      rumors.map((rumor) => {
        return (
          <Rumor
          body={rumor.body}
          user={rumor.user.username}
          points={rumor.points}
          key={rumor.id}
          />
        );
      })

    }
    </div>


  );
}

export default RumorList;