import React from 'react';

const Score = props => (
    <h4 className="score">
        {props.type}: {props.score}
    </h4>
)

export default Score;
