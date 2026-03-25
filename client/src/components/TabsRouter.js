import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {
  MemoryRouter,
  Route,
  Routes,
  Link,
  matchPath,
  useLocation,
  StaticRouter,
} from 'react-router';

import Transactions from '../pages/Transactions';
import Statistics from '../pages/Statistics';
import Import from '../pages/Import';


function Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/transactions">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={['/transactions']} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

Router.propTypes = {
  children: PropTypes.node,
};

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function MyTabs() {
  // You need to provide the routes in descendant order.
  // This means that if you have nested routes like:
  // users, users/new, users/edit.
  // Then the order should be ['users/add', 'users/edit', 'users'].
  const routeMatch = useRouteMatch(['/transactions', '/statistics', '/import']);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab}>
      <Tab label="Transactions" value="/transactions" to="/transactions" component={Link} />
      <Tab label="Statistics" value="/statistics" to="/statistics" component={Link} />
      <Tab label="Import" value="/import" to="/import" component={Link} />
    </Tabs>
  );
}

function CurrentRoute() {
  const location = useLocation();

  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', pb: 2 }}>
      Current route: {location.pathname}
    </Typography>
  );
}

export default function TabsRouter() {
  return (
    <Router>
      <Box sx={{ width: '100%' }}>
        <MyTabs />
        <Routes>
          <Route path="/transactions" element={<Transactions/>} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/import" element={<Import />} />
        </Routes>
      </Box>
    </Router>
  );
}
