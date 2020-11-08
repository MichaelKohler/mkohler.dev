import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faXing } from '@fortawesome/free-brands-svg-icons';
import {
  faGlobe, faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer>
      <section>
        <h3>Michael Kohler</h3>
        <p>
          Software Engineer with a passion for Web Standards and DevOps
        </p>
        <p className="copyrights">
          © 2016-2020 Michael Kohler - Design is an adapted version of a template by&nbsp;
          <a href="https://wrapbootstrap.com/user/alexeyka">alexeyka</a>
        </p>
      </section>
      <section>
        <h3>Follow me</h3>
        <div className="follow">
          <ul className="list-inline social">
            <li><a target="_blank" aria-label="Michael on Twitter" title="foo" rel="noopener noreferrer" href="https://www.twitter.com/KohlerSolutions"><FontAwesomeIcon icon={faTwitter} /></a></li>
            <li><a target="_blank" aria-label="Michael on Xing" rel="noopener noreferrer" href="https://www.xing.com/profile/Michael_Kohler36"><FontAwesomeIcon icon={faXing} /></a></li>
            <li><a target="_blank" aria-label="Michael's Blog" rel="noopener noreferrer" href="https://michaelkohler.info"><FontAwesomeIcon icon={faGlobe} /></a></li>
            <li><a target="_blank" aria-label="Michael on GitHub" rel="noopener noreferrer" href="https://www.github.com/MichaelKohler"><FontAwesomeIcon icon={faGithub} /></a></li>
            <li><a target="_blank" aria-label="Michael's Email" rel="noopener noreferrer" href="mailto:me@michaelkohler.info"><FontAwesomeIcon icon={faEnvelope} /></a></li>
          </ul>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
