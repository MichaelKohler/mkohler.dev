import React from 'react';

const Mozilla = () => {
  return (
    <div className="content-wrap">
      <section id="mozillasection" className="container-fluid nopadding">
        <div className="mozilla row nopadding bg-color01">
          <div className="col-md-12 nopadding">
            <div className="padding-50">
              <div className="row nopadding">
                <div className="col-md-12 nopadding">
                  <h2 className="font-accident-two-normal uppercase">Mozilla Contributions</h2>
                  <div className="quote">
                    <h5 className="font-accident-one-bold uppercase subtitle">
I&apos;m a passionate Mozillian volunteering in
                      different areas of Mozilla.
                    </h5>
                  </div>

                  <section className="mozilla-container">
                    <h3>Why Mozilla?</h3>
                    <p>
                      I&apos;ve always been interested in the Open Web since I started creating my
                      first websites. Mozilla’s mission is ​to &quot;ensure the Internet is a global
                      public resource, open and accessible to all&quot;. This resonates with me very
                      well because a lot of my knowledge comes from research on the internet.
                    </p>
                    <p>
                      I started to use Firefox around version 1 and never have switched since then.
                      In the beginning I was using the release channel. After my math teacher in
                      high school introduced us to Mozilla and what he is working on for Firefox
                      (he wrote the initial code for Session Restore) I was hooked and started to
                      use the nightly build and report bugs. Soon after that I wrote my first patch
                      to improve the sorting the bookmarks backup menu. Since then I have written
                      patches, started to bring Swiss Mozillians together, went as far as Germany
                      and Austria to help build the German speaking community and nowadays
                      I&apos;m also involved in the Mozilla Reps (Representative) program.
                    </p>

                    <img src="/images/me.webp" alt="Michael sitting and listening" />

                    <h3>What I have done for Mozilla</h3>

                    <h4>Profiles</h4>
                    <ul>
                      <li>
                        Bugzilla:&nbsp;
                        <a href="https://bugzilla.mozilla.org/user_profile?login=me@michaelkohler.info">bugzilla.mozilla.org</a>
                      </li>
                      <li>
                        Mozilla Reps:&nbsp;
                        <a href="https://reps.mozilla.org/u/michaelkohler/">reps.mozilla.org</a>
                      </li>
                      <li>
                        Mozillians:&nbsp;
                        <a href="https://mozillians.org/en-US/u/mkohler/">mozillians.org</a>
                      </li>
                    </ul>

                    <h4>Firefox</h4>
                    <p>2008 - now</p>
                    <ul>
                      <li>
                        Using Firefox Nightly on a daily basis to test new features and look out
                        for regressions
                      </li>
                      <li>
                        Filed more than 130 bugs
                      </li>
                      <li>
                        Submitted more than 250 patches for several different Firefox components
                      </li>
                    </ul>

                    <img src="/images/me_firefox.webp" alt="Michael hugging the fox" />

                    <h4>Community Building</h4>
                    <p>2010 - now</p>
                    <ul>
                      <li>
                        Started with another Mozillian in Switzerland to build the <a href="https://mozilla.ch">mozilla.ch</a> community
                      </li>
                      <li>
                        Organized (almost) monthly <a href="http://www.meetup.com/Mozilla-Meetup-Switzerland/">meetups in Zurich</a>
                      </li>
                      <li>
                        Nurturing <a href="http://github.com/mozillach/participation/">Participation</a> in Switzerland
                      </li>
                      <li>
                        In 2013, 2014 and 2015 I helped develop the German-speaking community
                        (Germany, Austria, Switzerland)
                      </li>
                      <li>
                        I&apos;ve spoken about Mozilla at several conferences
                      </li>
                      <li>
                        Organized Firefox hackathons around Switzerland to share my knowledge
                      </li>
                      <li>
                        Since April 2018 hosting bi-weekly Meetups in Berlin and
                        organizing other events
                      </li>
                    </ul>

                    <img src="/images/me_community_building.webp" alt="Michael in front of the Brandenburger Tor with a group of Mozillians" />

                    <h4>Mozilla Reps</h4>
                    <p>2012 - now</p>
                    <ul>
                      <li>
                        Started as <a href="https://reps.mozilla.org">Mozilla Rep</a> in 2012
                      </li>
                      <li>
                        Officially represented Mozilla in Switzerland and supporting
                        Community Development
                      </li>
                      <li>
                        Reps Mentor since 2014 to coach other Mozilla Reps
                      </li>
                      <li>
                        I was voted to be a <a href="https://wiki.mozilla.org/ReMo/Council">Reps Council</a> member from
                        May 2015 to November 2017 to bring the Reps program to the
                        next phase and take care of operational
                        and strategic responsibilities of the Reps program
                      </li>
                      <li>
                        Since December 2017 in the leadership body (Module Peers)
                        of the Reps Program
                      </li>
                    </ul>

                    <img src="/images/reps_group.webp" alt="Michael and the rest of the Reps Council and Peers in Berlin in April 2016" />

                    <h4>Firefox - Choose Independent</h4>
                    <div className="mozilla-video-container">
                      <iframe
                        title="mozilla video"
                        className="mozilla-video"
                        src="https://www.youtube.com/embed/LtOGa5M8AuU"
                        frameBorder="0"
                        allowFullScreen
                      />
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mozilla;
