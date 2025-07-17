import React, {useContext} from "react";
import "./Talks.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function Talks() {
  const {isDark} = useContext(StyleContext);
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="talks">
        <div className="talk-header">
          {/* Talks section removed */}
        </div>
      </div>
    </Fade>
  );
}
