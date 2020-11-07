import React from 'react';
import { Link } from 'react-router-dom';
import Typist from 'react-typist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faUser, faMicrophone, faGlobe, faEnvelope, faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header>
      <div className="photo">&nbsp;</div>
      <div className="nav-container">
        <div className="name">
          <h1>Michael Kohler</h1>
        </div>
        <section className="position">
          <h2>
            <span>
              I&apos;m a&nbsp;
              <Typist cursor={{ hideWhenDone: true }}>
                <span>JavaScript Developer</span>
                <Typist.Backspace count={20} delay={1000} />
                <span>Node.js Developer</span>
                <Typist.Backspace count={17} delay={1000} />
                <span>Community Builder</span>
                <Typist.Backspace count={17} delay={1000} />
                <span>JavaScript Developer</span>
              </Typist>
            </span>
          </h2>
        </section>
        <nav>
          <ul>
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faUser} />
                <span>resume</span>
              </Link>
            </li>
            <li>
              <Link to="/mozilla">
                <FontAwesomeIcon icon={faGlobe} />
                <span>mozilla</span>
              </Link>
            </li>
            <li>
              <Link to="/talks">
                <FontAwesomeIcon icon={faMicrophone} />
                <span>talks</span>
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <FontAwesomeIcon icon={faEnvelope} />
                <span>contact</span>
              </Link>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.github.com/MichaelKohler"
              >
                <FontAwesomeIcon icon={faGithub} />
                <span>GitHub</span>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://michaelkohler.info"
              >
                <FontAwesomeIcon icon={faPencilAlt} />
                <span>blog</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
