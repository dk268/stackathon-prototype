import React from "react";
import { Link } from "react-router-dom";

const RowItem = props => {
  return (
    <div id="row-item-div">
      <Link to={`/items/${props.item.id}`}>{props.item.itemName}</Link>
      <p>{props.item.itemDKPCost}</p>
    </div>
  );
};

const RowItemsMapper = props => {
  return props.items.map(item => <RowItem item={item} key={item.id} />);
};

export default RowItemsMapper;
