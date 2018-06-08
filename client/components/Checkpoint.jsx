import React from "react";

const Checkpoint = props => (
  <div id="checkpoint-outer-div">
    {props.raid.checkpoints.map(checkpoint => (
      <li key={checkpoint.id} className="checkpoint-detail-map-item">
        <p className="checkpoint-detail-name-p">{checkpoint.checkpointName}</p>{" "}
        <p className="checkpoint-detail-dkp-p"> {checkpoint.checkpointDKP}</p>
      </li>
    ))}
  </div>
);

export default Checkpoint;
