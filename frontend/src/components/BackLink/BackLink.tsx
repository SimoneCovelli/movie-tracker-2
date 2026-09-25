import { Link } from "react-router-dom";
import "./BackLink.css";

type BackLinkProps = {
  to: string;
  children: string;
};

function BackLink({ to, children }: BackLinkProps) {
  return (
    <Link to={to} className="back-link">
      {children}
    </Link>
  );
}

export default BackLink;
