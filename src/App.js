import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Front from './Front';
import Contact from './Contact';
import Talks from './Talks';
import Mozilla from './Mozilla';
import '../public/theme/theme.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={Front} />
      <Route path="/contact/" component={Contact} />
      <Route path="/talks/" component={Talks} />
      <Route path="/mozilla/" component={Mozilla} />
      <Footer />
    </Router>
  );
};

export default App;
