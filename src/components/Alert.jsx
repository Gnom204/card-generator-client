import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function Alert() {
  const message = useSelector((state) => state.alert.message);
  const type = useSelector((state) => state.alert.type);
  useEffect(() => {}, []);
  return (
    <div
      className={
        type === "success" ? "alert alert-success" : "alert alert-danger"
      }
    >
      <p>{message}</p>
      <span className=""></span>
    </div>
  );
}

export default Alert;
