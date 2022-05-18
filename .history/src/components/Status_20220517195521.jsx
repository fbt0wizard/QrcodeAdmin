import React from "react";

const Status = (props) => {
  return (
    <div
      style={{
        color: "#fff",
        background: props.color,
        width: "max-content",
        borderRadius: "11px",
        padding: "1px 8px",
        fontSize: "12px",
        fontWeight: 600,
      }}
    >
      {props.content}
    </div>
  );
};

export default Status;
