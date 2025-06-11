import React from "react";
import SingleBtn from "./SingleBtn";

function DualBtn({
  onYes,
  onNo,
  classes,
  divClasses,
  idforno,
  idforyes,
  yestext = "yosh 😇",
  notext = "Noo 😑",
}) {
  return (
    <div className={`${divClasses}`}>
      <SingleBtn
        id={idforyes}
        key={"yes"}
        btnText={yestext}
        onchange={onYes}
        className={classes}
      />
      <SingleBtn
        id={idforno}
        key={"no"}
        btnText={notext}
        onchange={onNo}
        className={classes}
      />
    </div>
  );
}

export default DualBtn;
