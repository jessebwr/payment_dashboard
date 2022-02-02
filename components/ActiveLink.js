import { useRouter } from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";

const ActiveLink = ({ children, className, activeClassName, ...props }) => {
  const { pathname } = useRouter();

  return (
    <Link {...props}>
      <a className={pathname === props.href ? activeClassName : className}>
        {children}
      </a>
    </Link>
  );
};

ActiveLink.propTypes = {
  activeClassName: PropTypes.string,
  className: PropTypes.string,
};

export default ActiveLink;
