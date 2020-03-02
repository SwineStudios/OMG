import React from 'react';


const Voting = ({ players, me }) => {

  const votes = [];
  const options = [];
  var myvote = null;

  options.push(<option key={0} value={0}></option>);

  for (var player in players) {
    votes.push(<span key={player}> {player + "'s vote: "} <span style={{
        'backgroundColor': 'white'
      }}>{players[player].vote}</span> <br /></span>);
    if (player !== String(me)) {
      options.push(<option key={player} value={player}>{player}</option>);
    }
  }

  return (
    <span>
      Your vote:
      <select id="voteselect">
        {options}
      </select>
      <div style={{
        'position': 'fixed',
        'backgroundColor': 'lightblue',
        'top': '120px',
        'right': '10px',
        'minWidth': '200px',
        'padding': '10px'
      }}>
        {votes}
      </div>
    </span>
  );
};

export default Voting;