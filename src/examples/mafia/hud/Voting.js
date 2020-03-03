import React from 'react';


const Voting = ({ players, me, role, change, dawn, night, report, suspect }) => {

  const votes = [];
  const mafiaVotes = [];
  const options = [];
  var myvote = null;

  options.push(<option key={0} value={0}></option>);

  for (var player in players) {
    votes.push(<span key={player}> {player + "'s vote: "} <span style={{
        'backgroundColor': 'white'
      }}>{players[player].vote}</span> <br /></span>);
    if (player !== String(me)) {
      if (night)
        if (players[player].role === role)
          continue;
      options.push(<option key={player} value={player}>{player}</option>);
    }
  }

  if (night && role === 'mafia') {
    for (var player in players) {
      if (players[player].role === 'mafia')
        mafiaVotes.push(<span key={player}> {player + "'s vote: "} <span style={{
            'backgroundColor': 'white'
          }}>{players[player].vote}</span> <br /></span>);
    }
  }

  var action = '';
  if (night) {
    if (role === 'mafia') action = 'kill';
    else if (role === 'cop') action = 'investigate';
    else if (role === 'doctor') action = 'save';
  }

  return (
    <span>
      {night ? 'Pick a player to ' + action + ': ' : 'Vote: '}
      <select id="voteselect" onChange={change} value={dawn ? 0 : undefined}>
        {options}
      </select>
      {night ? null :
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
      }
      {night && role === 'mafia' ?
        <div style={{
          'position': 'fixed',
          'backgroundColor': 'lightpink',
          'top': '120px',
          'right': '10px',
          'minWidth': '200px',
          'padding': '10px'
        }}>
          {mafiaVotes}
        </div>
        : null
      }
      {!night && role === 'cop' && report !== '' ?
        <div style={{
          'position': 'fixed',
          'backgroundColor': 'gold',
          'top': '120px',
          'right': '250px',
          'minWidth': '200px',
          'padding': '10px'
        }}>
          <span> {"Player " + suspect + " is "} <span style={{
            'backgroundColor': 'white'
          }}>{report}</span>! <br /></span>
        </div>
        : null
      }
    </span>
  );
};

export default Voting;