import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const OrderDetails = lazy(() => import('./routes/OrderDetails'));
const OrderList = lazy(() => import('./routes/OrderList'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/details/:id" component={OrderDetails} />
        <Route exact path="/orderList" component={OrderList} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;