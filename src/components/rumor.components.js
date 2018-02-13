import React from 'react';
//import RumorVote from '../components/RumorVote';

const Rumor = ({id, body, points, user, posted }) => {
  return (
    <div>
      <div className="rumor">
        Someone heard that { user } { body }
      </div>
      <div className="rumor-credibility">
        Rumor credibility rating: { points }
      </div>
    </div>
  )
}


export default Rumor;