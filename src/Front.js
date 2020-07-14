import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook, faHeart,
} from '@fortawesome/free-solid-svg-icons';

const Front = () => {
  return (
    <div className="content-wrap">
      <section id="homesection" className="container-fluid nopadding">
        <section className="m-details row nopadding bg-color01">
          <div className="col-md-12 col-lg-8 nopadding">
            <div className="padding-50 full-height">
              <div className="row nopadding">
                <div className="col-md-12 nopadding">
                  <h2 className="font-accident-two-normal uppercase">About Michael</h2>
                  <div className="quote">
                    <h5 className="font-accident-one-bold uppercase subtitle">
                      JavaScript developer with a passion for Web Standards and DevOps
                    </h5>
                  </div>
                </div>
              </div>

              <section className="row infoblock-container nopadding">
                <div className="col-md-5 infoblock mt-5 pl-0">
                  <div className="row nopadding">
                    <div className="icon-container col-sm-1 col-md-3 d-none d-lg-block">
                      <FontAwesomeIcon icon={faBook} />
                    </div>
                    <div className="col-sm-11 col-md-9 nopadding">
                      <h5 className="font-accident-one-bold uppercase">Eager to learn</h5>
                      <p>
                        Even though I have several years of experience with Software Development
                        I&apos;m always eager to learn more to increase my knowledge.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-1" />
                <div className="col-md-5 infoblock mt-5 pl-0">
                  <div className="row nopadding">
                    <div className="icon-container col-sm-1 col-md-3 d-none d-lg-block">
                      <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <div className="col-sm-11 col-md-9 nopadding">
                      <h5 className="font-accident-one-bold uppercase">Motivated</h5>
                      <p>
                        With my volunteer work for Mozilla I&apos;m very passionate about the Open
                        Web and therefore very motivated to work as Web Developer.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <section className="col-md-12 col-lg-4 personal nopadding ui-block-color01">
            <div className="padding-50">
              <h3 className="font-accident-two-normal uppercase">Personal Info</h3>
              <div className="personal-info fullwidth">
                <div className="row">
                  <div className="col-lg-5 col-sm-12">Name:</div>
                  <div className="col-lg-7 col-sm-12">Michael Kohler</div>
                </div>
                <div className="row">
                  <div className="col-lg-5 col-sm-12">Date of Birth:</div>
                  <div className="col-lg-7 col-sm-12">30/11/1991</div>
                </div>
                <div className="row">
                  <div className="col-lg-5 col-sm-12">Place:</div>
                  <div className="col-lg-7 col-sm-12">
                    Berlin, Germany
                    <br />
                    originally from Bern, Switzerland
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-5 col-sm-12">eMail:</div>
                  <div className="col-lg-7 col-sm-12">
                    <a href="mailto:me@michaelkohler.info">me@michaelkohler.info</a>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-5 col-sm-12">Languages (fluent):</div>
                  <div className="col-lg-7 col-sm-12">German, English</div>
                </div>
              </div>
            </div>
          </section>
        </section>

        <section className="row nopadding ui-block-color02">
          <div className="col-md-12 col-lg-4 pro-experience nopadding">
            <div className="padding-50">
              <h3 className="font-accident-two-normal uppercase">Experience</h3>
              <div className="experience">
                <ul className="">
                  <li className="date">04/2008 - now</li>
                  <li className="company uppercase">
                    <a href="https://www.mozilla.org">Volunteer @ Mozilla Foundation</a>
                  </li>
                  <li className="position">Developer, Community Builder</li>
                  <li>
                    Technologies: Node.js, React, Vanilla JavaScript, Rust
                  </li>
                </ul>
                <ul className="">
                  <li className="date">02/2019 - now</li>
                  <li className="company uppercase">
                    <a href="http://www.control4.com">Control4 + SnapAV (acquired NEEO)</a>
                  </li>
                  <li className="position">Software Development Engineer</li>
                  <li>
                    Technologies: Node.js, React, Lua, Python, Bash
                  </li>
                </ul>
                <ul className="">
                  <li className="date">11/2016 - 01/2019</li>
                  <li className="company uppercase">
                    <a href="http://www.neeo.com">NEEO AG</a>
                  </li>
                  <li className="position">JavaScript Developer</li>
                  <li>
                    Technologies: Node.js, AngularJS, Ionic, Z-Wave, Bash
                  </li>
                </ul>
                <ul className="">
                  <li className="date">04/2015 - 10/2016</li>
                  <li className="company uppercase">
                    <a href="http://www.netcase.ch">NETCASE GmbH</a>
                  </li>
                  <li className="position">Web Developer</li>
                  <li>
                    Technologies: Node.js, AngularJS, Bootstrap
                  </li>
                </ul>
                <ul className="">
                  <li className="date">01/2014 - 02/2015</li>
                  <li className="company uppercase">
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
                <ul className="">
                  <li className="date">08/2010 - 12/2013</li>
                  <li className="company uppercase">
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

              <h3 className="font-accident-two-normal uppercase">Education</h3>
              <div className="experience">
                <ul className="">
                  <li className="date">02/2013 - 02/2017</li>
                  <li className="company uppercase">
                    <a href="https://www.ffhs.ch">Fernfachhochschule Schweiz</a>
                  </li>
                  <li className="position">Computer Science, not finished</li>
                </ul>
                <ul className="">
                  <li className="date">09/2011 - 01/2013</li>
                  <li className="company uppercase">
                    <a href="http://www.inf.unibe.ch/index_eng.html">University of Bern</a>
                  </li>
                  <li className="position">Computer Science, not finished</li>
                </ul>
                <ul className="">
                  <li className="date">08/2006 - 07/2010</li>
                  <li className="company uppercase">
                    <a href="http://www.gymneufeld.ch">Gymnasium Neufeld</a>
                  </li>
                  <li className="position">Matura</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-12 col-lg-8 circle-skills nopadding ui-block-color03">
            <div className="padding-50">
              <h3 className="font-accident-two-normal uppercase">My Professional skills</h3>
              <div className="row">
                <div className="col-md-4 col-sm-12 single-skill">
                  <h4 className="font-accident-one-normal uppercase">Backend JavaScript</h4>
                  <p className="font-regular-normal">
                    I&apos;ve been developing Node.js applications for the past 8 years, as private
                    side projects as well as professionally. Currently at Control4 I&apos;m
                    developping Node.js applications to support the Neeo Remote. Before being
                    acquired by Control4, at NEEO I developed JavaScript applications for both
                    front and back end based with Ionic and Node.js in an IoT environment.
                    Previously during my time at NETCASE GmbH I have also worked on Sails.js
                    and Loopback based APIs.
                  </p>
                </div>
                <div className="col-md-4 col-sm-12 single-skill">
                  <h4 className="font-accident-one-normal uppercase">Frontend JavaScript</h4>
                  <p className="font-regular-normal">
                    In the recent past I&apos;ve mostly used React for my personal as well
                    as Mozilla projects. As part of my work at NEEO and NETCASE GmbH and
                    several private projects I used AngularJS 1 for about 4 years.
                  </p>
                </div>
                <div className="col-md-4 col-sm-12 single-skill">
                  <h4 className="font-accident-one-normal uppercase">Other languages</h4>
                  <p className="font-regular-normal">
                    I have experience in several other languages, most notably HTML and CSS.
                    Recently I&apos;ve been doing smaller projects with Lua and Rust as well.
                    Additionally I have also worked with TypeScript for the NEEO SDK. I
                    haven&apos;t written any PHP, Ruby or Java in years, but back in the days...
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-sm-12 single-skill">
                  <h4 className="font-accident-one-normal uppercase">Web Standards</h4>
                  <p className="font-regular-normal">
                    Due to my affiliation with Mozilla, I&apos;m really passionate about the Open
                    Web. Therefore I&apos;m trying to keep on top of changes to Web Standards and
                    will always encourage the use of modern standards where possible.
                  </p>
                </div>
                <div className="col-md-4 col-sm-12 single-skill">
                  <h4 className="font-accident-one-normal uppercase">DevOps</h4>
                  <p className="font-regular-normal">
                    At NEEO and Control4 I gained experience in DevOps methodologies.
                    I try to make sure Infrastructure as Code is applied where possible.
                    I&apos;ve helped creating a complete test
                    cluster to test our commits for Control4 in different levels of detail and
                    technology. I&apos;ve also implemented different metrics tracking systems
                    and visualizations through Grafana. For my private projects I&apos;m using
                    Kubernetes and monitor the health of the cluster as well as my personal
                    Raspberry Pi. For my personal gadgets I&apos;ve been using Ansible for
                    configuration management. I test and deploy my personal projects through
                    GitHub Actions, keeping dependencies up to date with dependabot.
                  </p>
                </div>
                <div className="col-md-4 col-sm-12 single-skill">
                  <h4 className="font-accident-one-normal uppercase">Databases</h4>
                  <p className="font-regular-normal">
                    Nowadays I&apos;me mostly using MySQL for my database needs. In the past, for
                    example at NETCASE, I was also using MongoDB.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Front;
