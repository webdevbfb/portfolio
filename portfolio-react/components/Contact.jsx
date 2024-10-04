import React from 'react';

function Contact() {
  return (
    <section id="contact">
      <h2>Kontakt</h2>
      <p>Schreib mir gerne eine Nachricht!</p>
      <form>
        <input type="text" placeholder="Dein Name" required />
        <input type="email" placeholder="Deine E-Mail" required />
        <textarea placeholder="Deine Nachricht" required></textarea>
        <button type="submit">Absenden</button>
      </form>
    </section>
  );
}

export default Contact;
