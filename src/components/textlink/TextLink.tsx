import React,{ FC } from "react";
import { Link } from "react-router-dom";
import './TextLink.scss';
interface ITLProps {
  startText: string;
  link: string;
  linkText: string;
  endText: string;
}

const TextLink: FC<ITLProps> = (props) => {
  return (
    <p className="text-link">
      {props.startText} <Link to={props.link}>{props.linkText}</Link>
      {props.endText}
    </p>
  );
};

export default TextLink;
