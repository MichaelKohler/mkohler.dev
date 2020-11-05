import React from 'react';

const Contact = () => {
  return (
    <section id="contactsection">
      <div className="row bg-color01">
        <div className="col-md-12">
          <h2>Contact</h2>
          <p>
            Feel free to get in touch with me if you like my skills. Since this is
            a public place, I&apos;m not confident to publish my phone number here,
            but you can get in touch with me through the channels below and I will
            most probably answer within 48 hours.
          </p>

          <section id="contacts-data" className="inner-block">
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-sm-2">E-mail:</div>
                  <div className="col-sm-10">
                    <p><a href="mailto:me@michaelkohler.info">me@michaelkohler.info</a></p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2">Twitter:</div>
                  <div className="col-sm-10">
                    <p><a href="https://twitter.com/KohlerSolutions">https://twitter.com/KohlerSolutions</a></p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2">Linkedin:</div>
                  <div className="col-sm-10">
                    <p><a href="https://www.linkedin.com/in/michaelkohler1991">https://www.linkedin.com/in/michaelkohler1991</a></p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2">Xing:</div>
                  <div className="col-sm-10">
                    <p><a href="https://www.xing.com/profile/Michael_Kohler36">https://www.xing.com/profile/Michael_Kohler36</a></p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Contact;
