import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook, faHeart,
} from '@fortawesome/free-solid-svg-icons';

const Front = () => {
  return (
    <section id="homesection">
      <section className="details">
        <div className="about">
          <h2>About Michael</h2>
          <h3 className="quote">
            JavaScript developer with a passion for Web Standards and DevOps
          </h3>

          <section className="row infoblock-container">
            <div className="infoblock">
              <h4><FontAwesomeIcon icon={faBook} /> Eager to learn</h4>
              <p>
                Even though I have several years of experience with Software Development
                I&apos;m always eager to learn more to increase my knowledge.
              </p>
            </div>
            <div className="infoblock">
              <h4><FontAwesomeIcon icon={faHeart} /> Motivated</h4>
              <p>
                With my volunteer work for Mozilla I&apos;m very passionate about the Open
                Web and therefore very motivated to work as Web Developer.
              </p>
            </div>
          </section>
        </div>

        <section className="personal">
          <h3>Personal Info</h3>
          <div className="personal-info">
            <div className="row">
              <div>Name:</div>
              <div>Michael Kohler</div>
            </div>
            <div className="row">
              <div>Date of Birth:</div>
              <div>30/11/1991</div>
            </div>
            <div className="row">
              <div>Place:</div>
              <div>
                Berlin, Germany
                <br />
                originally from Bern, Switzerland
              </div>
            </div>
            <div className="row">
              <div>eMail:</div>
              <a href="mailto:me@michaelkohler.info">me@michaelkohler.info</a>
            </div>
            <div className="row">
              <div>Languages (fluent):</div>
              <div>German, English</div>
            </div>
          </div>
        </section>
      </section>

      <section className="experience-info">
        <div className="pro-experience">
          <h3>Experience</h3>
          <div className="experience">
            <ul>
              <li className="date">04/2008 - now</li>
              <li className="company">
                <a href="https://www.mozilla.org">Volunteer @ Mozilla Foundation</a>
              </li>
              <li className="position">Developer, Community Builder</li>
              <li>
                Technologies: Node.js, React, Vanilla JavaScript, Rust
              </li>
            </ul>
            <ul>
              <li className="date">02/2019 - now</li>
              <li className="company">
                <a href="http://www.control4.com">Control4 + SnapAV (acquired NEEO)</a>
              </li>
              <li className="position">Senior Software Developer</li>
              <li>
                Technologies: Node.js, React, Lua, Python, Bash
              </li>
            </ul>
            <ul>
              <li className="date">11/2016 - 01/2019</li>
              <li className="company">
                <a href="http://www.neeo.com">NEEO AG</a>
              </li>
              <li className="position">JavaScript Developer</li>
              <li>
                Technologies: Node.js, AngularJS, Ionic, Z-Wave, Bash
              </li>
            </ul>
            <ul>
              <li className="date">04/2015 - 10/2016</li>
              <li className="company">
                <a href="http://www.netcase.ch">NETCASE GmbH</a>
              </li>
              <li className="position">Web Developer</li>
              <li>
                Technologies: Node.js, AngularJS, Bootstrap
              </li>
            </ul>
            <ul>
              <li className="date">01/2014 - 02/2015</li>
              <li className="company">
                <a href="http://www.swisscom.ch">Swisscom Banking Provider AG</a>
              </li>
              <li className="position">
                Application Developer, 2nd-Level-Support Document Output
                Management, Requirement Engineering
              </li>
              <li>
                Technologies: C#, XML, VBA, ITIL
              </li>
            </ul>
            <ul>
              <li className="date">08/2010 - 12/2013</li>
              <li className="company">
                <a href="http://www.entris-banking.ch">Entris Banking AG</a>
              </li>
              <li className="position">
                Application Developer, 2nd-Level-Support
                Document Output Management, Requirement Engineering
              </li>
              <li>
                Technologies: C#, XML, VBA, ITIL
              </li>
            </ul>
          </div>

          <h3>Education</h3>
          <div className="experience">
            <ul>
              <li className="date">02/2013 - 02/2017</li>
              <li className="company">
                <a href="https://www.ffhs.ch">Fernfachhochschule Schweiz</a>
              </li>
              <li className="position">Computer Science, not finished</li>
            </ul>
            <ul>
              <li className="date">09/2011 - 01/2013</li>
              <li className="company">
                <a href="http://www.inf.unibe.ch/index_eng.html">University of Bern</a>
              </li>
              <li className="position">Computer Science, not finished</li>
            </ul>
            <ul>
              <li className="date">08/2006 - 07/2010</li>
              <li className="company">
                <a href="http://www.gymneufeld.ch">Gymnasium Neufeld</a>
              </li>
              <li className="position">Matura</li>
            </ul>
          </div>
        </div>

        <div className="skills">
          <h3>My Professional skills</h3>
          <div className="row">
            <div className="single-skill">
              <h4>Backend JavaScript</h4>
              <p>
                I&apos;ve been developing Node.js applications since 2013, as
                side projects as well as professionally. Currently at Control4 I&apos;m
                developing Node.js applications to support the Neeo Remote. Before being
                acquired by Control4, at NEEO I developed JavaScript applications for both
                front and back end based with Ionic and Node.js in an IoT environment.
                Previously during my time at NETCASE GmbH I have also worked on Sails.js
                and Loopback based APIs.
              </p>
            </div>
            <div className="single-skill">
              <h4>Frontend JavaScript</h4>
              <p>
                Recently I&apos;ve mostly used React for my personal as well
                as Mozilla projects. As part of my work at NEEO and NETCASE GmbH and
                several private projects I used AngularJS 1 for about 4 years.
              </p>
            </div>
            <div className="single-skill">
              <h4>Other languages</h4>
              <p>
                Recently I&apos;ve been doing smaller projects with Lua and Rust as well.
                Additionally I have also worked with TypeScript for the NEEO SDK. I
                haven&apos;t written any PHP, Ruby or Java in years, but back in the days...
              </p>
            </div>
          </div>
          <div className="row">
            <div className="single-skill">
              <h4>Web Standards</h4>
              <p>
                Due to my affiliation with Mozilla, I&apos;m really passionate about the Open
                Web. Therefore I&apos;m trying to keep on top of changes to Web Standards and
                will always encourage the use of modern standards where possible.
              </p>
            </div>
            <div className="single-skill">
              <h4>DevOps</h4>
              <p>
                At NEEO and Control4 I gained experience in DevOps methodologies.
                I try to make sure Infrastructure as Code is applied where possible.
                I&apos;ve helped creating a complete test
                cluster to test our commits for Control4 in different levels of detail and
                technology. I&apos;ve also implemented different metrics tracking systems
                and visualizations through Grafana. For my private projects I&apos;m using
                Kubernetes and monitor the health of the cluster as well as my personal
                Raspberry Pi. I&apos;ve been using Ansible for
                configuration management. I test and deploy my personal projects through
                GitHub Actions, keeping dependencies up to date with dependabot.
              </p>
            </div>
            <div className="single-skill">
              <h4>Databases</h4>
              <p>
                Nowadays I&apos;me mostly using MySQL for my database needs. In the past, for
                example at NETCASE, I was also using MongoDB.
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Front;
