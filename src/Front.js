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
                Web and Software Engineering in general.
              </p>
            </div>
          </section>
        </div>

        <section className="sidebar">
          <h3>Personal Info</h3>
          <div className="sidebar-info">
            <div className="row">
              <div>Name:</div>
              <div>Michael Kohler</div>
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
        <section className="sidebar skills">
          <h3>Skills</h3>
          <div className="sidebar-info">
            <div className="row">
              <div>Programming Languages:</div>
              <div>JavaScript, HTML, CSS, Python, Lua, Bash, Rust</div>
            </div>
            <div className="row">
              <div>DevOps:</div>
              <div>Pipelines/Actions, Docker, Kubernetes, Grafana, Prometheus, GitLab, Ansible</div>
            </div>
            <div className="row">
              <div>Databases:</div>
              <div>MySQL, InfluxDB, MongoDB</div>
            </div>
            <div className="row">
              <div>IoT:</div>
              <div>Z-Wave, Device Management, Firmware Management</div>
            </div>
            <div className="row">
              <div>Methodologies:</div>
              <div>Scrum, Pair Programming, TDD, Feature Flags</div>
            </div>
            <div className="row">
              <div>Product:</div>
              <div>
                Requirement Engineering, Release Management, Backlog Grooming, Sprint Planning
              </div>
            </div>
            <div className="row">
              <div>Management:</div>
              <div>Mentoring, Conflict Resolution</div>
            </div>
          </div>
        </section>

        <div className="pro-experience">
          <h3>Experience</h3>
          <div className="experience">
            <ul>
              <li className="date">04/2008 - now</li>
              <li className="company">
                <a href="https://www.mozilla.org">Volunteer @ Mozilla Foundation</a>
              </li>
              <li className="position">Developer, Community Builder</li>
              <li className="responsibilities">
                <ul>
                  <li>
                    Mozilla Rep since 2012 (served on the Reps Council and now a Reps Module Peer)
                  </li>
                  <li>
                    Community Building in Switzerland and Germany
                  </li>
                  <li>
                    Improved the Common Voice Sentence Collector (Node.js, React, MySQL)
                  </li>
                  <li>
                    Improved the Common Voice Sentence Extractor (Rust)
                  </li>
                  <li>
                    Implemented several GitHub Actions to automate processes for Common Voice
                  </li>
                  <li>
                    Created several volunteer campaign websites to boost volunteer involvement
                  </li>
                  <li>
                    Wrote several patches for Firefox (JavaScript, XUL)
                  </li>
                </ul>
              </li>
            </ul>
            <ul>
              <li className="date">02/2019 - 12/2020</li>
              <li className="company">
                <a href="http://www.control4.com">Control4 (acquired NEEO)</a>
              </li>
              <li className="position">Senior Software Development Engineer</li>
              <li className="responsibilities">
                <ul>
                  <li>
                    Integration of the Neeo Remote into the Control4 system
                  </li>
                  <li>
                    Development of the Neeo middleware running on the Control4 controller (Node.js)
                  </li>
                  <li>
                    Bugfixes on the Control4 remote driver (Lua)
                  </li>
                  <li>
                    Feature Flags implementation and administration
                  </li>
                  <li>
                    Improvements to Automated Test Infrastructure (Python, Ansible, GitLab)
                  </li>
                  <li>
                    Implementation of Metrics Tracking and Dashboards (Node.js, SQL, Grafana)
                  </li>
                  <li>
                    Responsible for Release Management processes and tools
                  </li>
                  <li>
                    Scrum Master
                  </li>
                </ul>
              </li>
            </ul>
            <ul>
              <li className="date">11/2016 - 01/2019</li>
              <li className="company">
                <a href="http://www.neeo.com">NEEO AG</a>
              </li>
              <li className="position">JavaScript Developer</li>
              <li className="responsibilities">
                <ul>
                  <li>
                    Development of the NEEO services serving content to the remote (Node.js, Linux)
                  </li>
                  <li>
                    Integration of Z-Wave devices into NEEO (including certification)
                  </li>
                  <li>
                    Development of the NEEO App for configuration (Ionic, AngularJS)
                  </li>
                  <li>
                    Development of the NEEO Cloud to manage customer accounts and firmware groups
                  </li>
                  <li>
                    Customer Support on the NEEO Planet
                  </li>
                </ul>
              </li>
            </ul>
            <ul>
              <li className="date">04/2015 - 10/2016</li>
              <li className="company">
                <a href="http://www.netcase.ch">NETCASE GmbH</a>
              </li>
              <li className="position">Web Developer</li>
              <li className="responsibilities">
                <ul>
                  <li>
                    Created several smaller websites (Vanilla JS, Sails.js)
                  </li>
                  <li>
                    Worked on a larger product management tool (Node.js, Loopback, AngularJS)
                  </li>
                </ul>
              </li>
            </ul>
            <ul>
              <li className="date">01/2014 - 02/2015</li>
              <li className="company">
                <a href="http://www.swisscom.ch">Swisscom Banking Provider AG</a>
              </li>
              <li className="position">
                Application Developer, 2nd-Level-Support Document Output
                Management
              </li>
              <li className="responsibilities">
                <ul>
                  <li>
                    Worked on a large project to migrate the core banking platform of several banks
                  </li>
                  <li>
                    Responsible for the Document Output System used to print customer documents
                  </li>
                  <li>
                    Improvements and adjustments to documents and wizard (C#, VBA, Office)
                  </li>
                  <li>
                    Requirement engineering and project management for the Document Output System
                  </li>
                </ul>
              </li>
            </ul>
            <ul>
              <li className="date">08/2010 - 12/2013</li>
              <li className="company">
                <a href="http://www.entris-banking.ch">Entris Banking AG</a>
              </li>
              <li className="position">
                Application Developer, 2nd-Level-Support
                Document Output Management
              </li>
              <li className="responsibilities">
                <ul>
                  <li>
                    Worked on a large project to migrate the core banking platform of several banks
                  </li>
                  <li>
                    Responsible for a part of the Document Output System
                  </li>
                  <li>
                    Improvements and adjustments to documents (VBA, Office)
                  </li>
                  <li>
                    Requirement engineering and project management for the Document Output System
                  </li>
                </ul>
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
      </section>
    </section>
  );
};

export default Front;
