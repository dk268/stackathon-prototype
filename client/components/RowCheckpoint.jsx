import React from "react";

const RowCheckpoint = props => (
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
        <li className="checkpoint-detail-raid-li">
          <Link to={`/raids/${checkpoint.raid.id}`}>
            {checkpoint.raid.raidName}
          </Link>
        </li>
      </ul>
    ))}
  </div>
);

export default RowCheckpoint;
