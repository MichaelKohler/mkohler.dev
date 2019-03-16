import React from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import '../public/theme/theme.css';
import '../public/theme/theme-additions.css';

const App = () => {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default App;
