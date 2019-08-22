import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const TopNav = props => {
  const auth_items = [
    { key: "/dashboard", label: "Dashboard" },
    { key: "/analysis", label: "Analysis" },
    { key: "/logout", label: "Logout" }
  ];

  const not_auth_items = [{ key: "/login", label: "Login" }, { key: "/register", label: "Register" }];

  const general_items = [{ key: "/", label: "Home" }];

  let menu_items = general_items;

  if (props.is_logged_in) {
    menu_items = menu_items.concat(auth_items);
  } else {
    menu_items = menu_items.concat(not_auth_items);
  }

  return (
    <div>
      {menu_items.map(menu_item => (
        <NavLink
          to={menu_item.key}
          exact
          key={menu_item.key}
          activeStyle={{
            fontWeight: "bold",
            color: "red"
          }}>
          {menu_item.label}
        </NavLink>
      ))}
      <span>{props.is_user_info_available && `Logged as: ${props.user_info.f_name}`}</span>
    </div>
  );
};

const mapStateToProps = state => ({
  is_logged_in: state.user.is_logged_in,
  is_user_info_available: state.user.is_user_info_available,
  user_info: state.user.user_info
});

export default connect(
  mapStateToProps,
  null
)(TopNav);
