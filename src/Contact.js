import React from 'react';

const Contact = () => {
  return (
    <section id="contact">
      <h2>Contact</h2>
      <h3 className="quote">
        Get in touch with me if you like my skills
      </h3>

      <section className="contacts-data">
        <div>E-mail:</div>
        <p><a href="mailto:me@michaelkohler.info">me@michaelkohler.info</a></p>
        <div>Twitter:</div>
        <p><a href="https://twitter.com/KohlerSolutions">https://twitter.com/KohlerSolutions</a></p>
        <div>Linkedin:</div>
        <p><a href="https://www.linkedin.com/in/michaelkohler1991">https://www.linkedin.com/in/michaelkohler1991</a></p>
        <div>Xing:</div>
        <p><a href="https://www.xing.com/profile/Michael_Kohler36">https://www.xing.com/profile/Michael_Kohler36</a></p>
      </section>
    </section>
  );
};

export default Contact;
