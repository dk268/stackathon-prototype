import React from "react";

const Checkpoint = props => (
  <div id="checkpoint-outer-div">
    {props.raid.checkpoints.map(checkpoint => (
      <ul key={checkpoint.id} className="checkpoint-detail-map-item">
        <li className="checkpoint-detail-name-li">
          {checkpoint.checkpointName}
        </li>{" "}
        <li className="checkpoint-detail-dkp-li">
          {"dkp value: "}
          {checkpoint.checkpointDKP}
        </li>
      </ul>
    ))}
  </div>
);

export default Checkpoint;
