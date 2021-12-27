import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinkAdapter = React.forwardRef((props, ref: any) => <NavLink to="" innerRef={ref} {...props} />);

export default NavLinkAdapter;
