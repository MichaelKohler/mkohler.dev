import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Front from './Front';
import Talks from './Talks';
import OpenSource from './OpenSource';
import '../public/theme.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={Front} />
      <Route path="/talks/" component={Talks} />
      <Route path="/opensource/" component={OpenSource} />
      <Footer />
    </Router>
  );
};

export default App;
