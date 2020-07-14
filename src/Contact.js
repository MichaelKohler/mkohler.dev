import React from 'react';

const Contact = () => {
  return (
    <div className="content-wrap">
      <section id="contactsection" className="container-fluid nopadding">
        <div className="row nopadding bg-color01">
          <div className="col-md-12 nopadding">
            <div className="padding-50">
              <div className="row nopadding">
                <div className="col-md-12 nopadding">
                  <h2 className="font-accident-two-normal uppercase">Contact</h2>
                  <div className="quote">
                    <h4 className="font-accident-one-bold uppercase subtitle">
                      JavaScript frontend and backend developer with a passion for Web Standards
                    </h4>
                  </div>
                  <p className="small fontcolor-medium">
                    Feel free to get in touch with me if you like my skills. Since this is
                    a public place, I&apos;m not confident to publish my phone number here,
                    but you can get in touch with me through the channels below and I will
                    most probably answer within 48 hours.
                  </p>

                  <section id="contacts-data" className="inner-block">
                    <div className="container-fluid nopadding">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-2"><span className="font-accident-two-bold uppercase">E-mail:</span></div>
                            <div className="col-sm-10">
                              <p className="small"><a href="mailto:me@michaelkohler.info">me@michaelkohler.info</a></p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-2"><span className="font-accident-two-bold uppercase">Twitter:</span></div>
                            <div className="col-sm-10">
                              <p className="small"><a href="https://twitter.com/KohlerSolutions">https://twitter.com/KohlerSolutions</a></p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-sm-2"><span className="font-accident-two-bold uppercase">Linkedin:</span></div>
                            <div className="col-sm-10">
                              <p className="small"><a href="https://www.linkedin.com/in/michaelkohler1991">https://www.linkedin.com/in/michaelkohler1991</a></p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-2"><span className="font-accident-two-bold uppercase">Xing:</span></div>
                            <div className="col-sm-10">
                              <p className="small"><a href="https://www.xing.com/profile/Michael_Kohler36">https://www.xing.com/profile/Michael_Kohler36</a></p>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default Contact;
