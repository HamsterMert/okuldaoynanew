import React, { useState } from 'react';
import { GithubIcon, InstagramIcon, MailIcon } from 'lucide-react';
import Footer from '../components/Footer';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await fetch('https://formspree.io/f/xeogeqgw', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });

    setSubmitted(true);
    e.currentTarget.reset();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-indigo-50 flex items-center justify-center p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">İletişim</h2>

          {submitted ? (
            <div className="text-green-600 font-semibold text-center">
              Mesajınız başarıyla gönderildi! 🎉
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  İsim
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Adınızı girin"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="E-posta adresinizi girin"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Mesaj
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Mesajınızı yazın"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
              >
                Gönder
              </button>
            </form>
          )}

          {/* Sosyal Medya Linkleri */}
          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold text-indigo-600 mb-4">Beni Takip Et!</h3>
            <div className="flex justify-center space-x-6">
              <a
                href="https://instagram.com/sagokajmert"
                className="text-indigo-500 hover:text-indigo-700 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/HamsterMert"
                className="text-indigo-500 hover:text-indigo-700 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="w-6 h-6" />
              </a>
              <a
                href="mailto:mertt5552@gmail.com"
                className="text-indigo-500 hover:text-indigo-700 transition"
              >
                <MailIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
