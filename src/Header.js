import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faUser, faMicrophone, faGlobe, faFile, faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header>
      <img className="photo" src="/images/userpic01.webp" alt="Michael" />
      <div className="nav-container">
        <div className="name">
          <h1>Michael Kohler</h1>
        </div>
        <section className="position">
          <h2>
            <span>
              Senior Software Engineer
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
              <Link to="/opensource">
                <FontAwesomeIcon icon={faGlobe} />
                <span>Open Source</span>
              </Link>
            </li>
            <li>
              <Link to="/talks">
                <FontAwesomeIcon icon={faMicrophone} />
                <span>talks</span>
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
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="/resume.json"
              >
                <FontAwesomeIcon icon={faFile} />
                <span>JSON</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
