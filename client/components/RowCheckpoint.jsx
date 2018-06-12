import React from "react";
import { Link } from "react-router-dom";
import Error from "./Error";

const RowCheckpoint = props => {
  if (props.raid) return RowCheckpointRaids(props);
  if (props.checkpoint) return RowCheckpointCheckpoints(props);
  else return <Error componentName="RowCheckpoint" />;
};

const RowCheckpointRaids = props => (
  <div id="raid-checkpoint-outer-div">
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

export default RowCheckpoint;

const RowCheckpointCheckpoints = props => (
  <div id="checkpoint-checkpoint-outer-div">
    <ul className="checkpoint-detail-map-item">
      <li className="checkpoint-detail-name-li">
        {props.checkpoint.checkpointName}
      </li>{" "}
      <li className="checkpoint-detail-dkp-li">
        {"dkp value: "}
        {props.checkpoint.checkpointDKP}
      </li>
      <li className="checkpoint-detail-raid-li">
        <Link to={`/raids/${props.checkpoint.raid.id}`}>
          {props.checkpoint.raid.raidName}
        </Link>
      </li>
    </ul>
  </div>
);
