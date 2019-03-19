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
          <div className="col-md-8 nopadding">
            <div className="padding-50">
              <div className="row nopadding">
                <div className="col-md-12 nopadding">
                  <h2 className="font-accident-two-normal uppercase">About Michael</h2>
                  <div className="quote">
                    <h5 className="font-accident-one-bold uppercase subtitle">
                      JavaScript frontend and backend developer with a passion for Web Standards
                    </h5>
                  </div>
                </div>
              </div>

              <section className="row infoblock-container">
                <div className="col-md-5 infoblock">
                  <div className="row">
                    <div className="icon-container col-sm-1 col-md-3 hidden-sm hidden-xs">
                      <FontAwesomeIcon icon={faBook} />
                    </div>
                    <div className="col-sm-11 col-md-9">
                      <h5 className="font-accident-one-bold uppercase">Eager to learn</h5>
                      <p>
                        Even though I have several years of experience with Web Development
                        I&apos;m always eager to learn more to increase my knowledge.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-1" />
                <div className="col-md-5 infoblock nopadding">
                  <div className="row">
                    <div className="icon-container col-sm-1 col-md-3 hidden-sm hidden-xs">
                      <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <div className="col-sm-11 col-md-9">
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

          <section className="col-md-4 personal nopadding ui-block-color01">
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
                    Bern, Switzerland
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
          <div className="col-md-4 pro-experience nopadding">
            <div className="padding-50">
              <h3 className="font-accident-two-normal uppercase">Experience</h3>
              <div className="experience">
                <ul className="">
                  <li className="date">02/2008 - now</li>
                  <li className="company uppercase">
                    <a href="https://www.mozilla.org">Volunteer @ Mozilla Foundation</a>
                  </li>
                  <li className="position">Developer, Community Builder</li>
                </ul>
                <ul className="">
                  <li className="date">11/2016 - now</li>
                  <li className="company uppercase">
                    <a href="http://www.neeo.com">NEEO AG</a>
                  </li>
                  <li className="position">JavaScript Developer</li>
                </ul>
                <ul className="">
                  <li className="date">04/2015 - 10/2016</li>
                  <li className="company uppercase">
                    <a href="http://www.netcase.ch">NETCASE GmbH</a>
                  </li>
                  <li className="position">Web Developer, NodeJS and AngularJS</li>
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

          <div className="col-md-8 circle-skills nopadding ui-block-color03">
            <div className="padding-50">
              <h3 className="font-accident-two-normal uppercase">My Professional skills</h3>
              <div className="row">
                <div className="col-sm-4 single-skill">
                  <h4 className="font-accident-one-normal uppercase">JavaScript (NodeJS)</h4>
                  <p className="font-regular-normal">
                    I&apos;ve been developing Node.js APIs for the past 6 years, as private
                    projects as well as professionally. At NEEO I&apos;m developing JavaScript
                    for both front and back end based on Ionic and NodeJS in a IoT environment.
                    Previously during my time at NETCASE GmbH I&apos;ve worked on Sails.js /
                    Loopback APIs.
                  </p>
                </div>
                <div className="col-sm-4 single-skill">
                  <h4 className="font-accident-one-normal uppercase">JavaScript (AngularJS)</h4>
                  <p className="font-regular-normal">
                    As part of my work at NEEO and NETCASE GmbH and several private projects
                    I&apos;ve been using AngularJS 1 for the past 4 years. From really simple to
                    more complex frontends, I&apos;ve been involved in developing them. While my
                    CSS skills are not perfect, I know AngularJS well and can output semantic DOM
                    to make it as easy as possible to style.
                  </p>
                </div>
                <div className="col-sm-4 single-skill">
                  <h4 className="font-accident-one-normal uppercase">Other languages</h4>
                  <p className="font-regular-normal">
                    I have experience in several other Web related (HTML, CSS, minimal PHP
                    and Ruby) languages, as well as non-Web related languages such as Java.
                    While I&apos;m not a professional in either CSS nor PHP or Ruby, I am eager to
                    refresh those technologies if necessary.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4 single-skill">
                  <h4 className="font-accident-one-normal uppercase">Databases</h4>
                  <p className="font-regular-normal">
                    I&apos;ve been mostly using MongoDB as database. Nevertheless I have used
                    several other database systems in the past.
                  </p>
                </div>
                <div className="col-sm-4 single-skill">
                  <h4 className="font-accident-one-normal uppercase">Web Standards</h4>
                  <p className="font-regular-normal">
                    Due to my affiliation with Mozilla, I&apos;m really passionate about the Open
                    Web. Therefore I&apos;m trying to keep on top of changes to Web Standards and
                    will always encourage the use of modern standards where possible.
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