import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <section id="top-navigation" className="container-fluid nopadding">
        <div className="row nopadding ident ui-bg-color01">
          <div className="col-md-5 col-lg-4 vc-photo">&nbsp;</div>

          <div className="col-md-7 col-lg-8 vc-name nopadding">
            <div className="row nopadding name">
              <div className="col-md-12 name-title">
                <h1 className="font-accident-two-light uppercase">Michael Kohler</h1>
              </div>
            </div>

            <aside className="row nopadding position">
              <div className="col-md-12 position-title">
                <section className="cd-intro">
                  <h4 className="cd-headline clip is-full-width font-accident-two-normal uppercase">
                    <span>I&apos;m an experienced&nbsp; ...</span>
                  </h4>
                </section>
              </div>
            </aside>

            <nav>
              <ul id="nav" className="row nopadding cd-side-navigation">
                <li className="col-xs-4 col-sm-2 nopadding menuitem ui-menu-color01">
                  <Link to="/">
                    <i className="fa fa-user" />
                    <span>resume</span>
                  </Link>
                </li>
                <li className="col-xs-4 col-sm-2 nopadding menuitem ui-menu-color03">
                  <Link to="/mozilla">
                    <i className="fa fa-globe" />
                    <span>mozilla</span>
                  </Link>
                </li>
                <li className="col-xs-4 col-sm-2 nopadding menuitem ui-menu-color04">
                  <Link to="/talks">
                    <i className="fa fa-microphone" />
                    <span>talks</span>
                  </Link>
                </li>
                <li className="col-xs-4 col-sm-2 nopadding menuitem ui-menu-color05">
                  <Link to="/contact">
                    <i className="fa fa-envelope" />
                    <span>contact</span>
                  </Link>
                </li>
                <li className="col-xs-4 col-sm-2 nopadding menuitem ui-menu-color05">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.github.com/MichaelKohler"
                  >
                    <i className="fa fa-github" />
                    <span>GitHub</span>
                  </a>
                </li>
                <li className="col-xs-4 col-sm-2 nopadding menuitem ui-menu-color06">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.michaelkohler.info"
                  >
                    <i className="fa fa-pencil" />
                    <span>blog</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
