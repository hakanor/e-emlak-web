import "./widget.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import ContentPasteOffOutlinedIcon from '@mui/icons-material/ContentPasteOffOutlined';
import { Link } from 'react-router-dom';

const Widget = ({ type, amount, diff }) => {
  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        link: "See all users",
        path: "/users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "ads":
      data = {
        title: "ADS",
        link: "View all ads",
        path: "/ads",
        icon: (
          <ContentPasteOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "userReports":
      data = {
        title: "USER REPORTS",
        link: "View all user reports",
        path: "/userReports",
        icon: (
          <PersonOffOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "adReports":
      data = {
        title: "AD REPORTS",
        link: "View all ad reports",
        path: "/adReports",
        icon: (
          <ContentPasteOffOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {amount}
        </span>
        <Link
          to={data.path}
          className="link"
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          {data.link}
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
