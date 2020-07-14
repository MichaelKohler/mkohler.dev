import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faXing } from '@fortawesome/free-brands-svg-icons';
import {
  faGlobe, faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="padding-50 ui-bg-color02">
      <div className="container-fluid nopadding">
        <div className="row">
          <div className="col-md-6">
            <h4 className="font-accident-two-normal uppercase">Michael Kohler</h4>
            <p className="inline-block">
              JavaScript developer with a passion for Web Standards and DevOps
            </p>
          </div>
          <div className="col-md-6">
            <h4 className="font-accident-two-normal uppercase">Follow me</h4>
            <div className="follow">
              <ul className="list-inline social">
                <li><a target="_blank" aria-label="Michael on Twitter" title="foo" rel="noopener noreferrer" href="https://www.twitter.com/KohlerSolutions"><FontAwesomeIcon icon={faTwitter} /></a></li>
                <li><a target="_blank" aria-label="Michael on Xing" rel="noopener noreferrer" href="https://www.xing.com/profile/Michael_Kohler36"><FontAwesomeIcon icon={faXing} /></a></li>
                <li><a target="_blank" aria-label="Michael's Blog" rel="noopener noreferrer" href="https://www.michaelkohler.info"><FontAwesomeIcon icon={faGlobe} /></a></li>
                <li><a target="_blank" aria-label="Michael on GitHub" rel="noopener noreferrer" href="https://www.github.com/MichaelKohler"><FontAwesomeIcon icon={faGithub} /></a></li>
                <li><a target="_blank" aria-label="Michael's Email" rel="noopener noreferrer" href="mailto:me@michaelkohler.info"><FontAwesomeIcon icon={faEnvelope} /></a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 copyrights">
            <p>
              © 2016-2020 Michael Kohler - Design is an adapted template by&nbsp;
              <a href="https://wrapbootstrap.com/user/alexeyka">alexeyka</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
