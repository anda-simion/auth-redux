import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { isLoggedIn } from "../services/users";

class TopNav extends Component {
  constructor(props) {
    super(props);

    const auth_items = [
      { key: "/dashboard", label: "Dashboard" },
      { key: "/analysis", label: "Analysis" },
      { key: "/logout", label: "Logout" }
    ];

    const not_auth_items = [{ key: "/login", label: "Login" }, { key: "/register", label: "Register" }];
    let menu_items = [{ key: "/", label: "Home" }];

    if (isLoggedIn()) {
      console.log("isLoggedIn should be true", isLoggedIn())
      menu_items = menu_items.concat(auth_items);
    } else {
      console.log("isLoggedIn should be false", isLoggedIn())
      menu_items = menu_items.concat(not_auth_items);
    }

    this.state = {
      menu_items: menu_items,
      is_logged_in: isLoggedIn()
    };
  }

  componentDidMount = () => {
    if (isLoggedIn()) {
      console.log("isLoggedIn from Dashboard", isLoggedIn())
    }
  }

  render() {
    return (
      <div>
        {this.state.menu_items.map(menu_item => (
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
      </div>
    );
  }
}

export default TopNav;

