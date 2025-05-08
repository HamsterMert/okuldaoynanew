import React from 'react';

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={logoStyle}>
          <img src="../../../public/images/nobg.png" alt="Okulda Oyna" style={imgStyle} />
          <h2 style={titleStyle}>Okulda Oyna</h2>
        </div>

        <div style={linksStyle}>
          <a href="/" style={linkStyle}>Anasayfa</a>
          <a href="/about" style={linkStyle}>Hakkında</a>
          <a href="/contact" style={linkStyle}>İletişim</a>
          <a href="/embed" style={linkStyle}>Özel Oyun</a>
        </div>

        <p style={copyright}>
          © {new Date().getFullYear()} Okulda Oyna. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}

// Stil ayarları
const footerStyle: React.CSSProperties = {
  backgroundColor: '#f9f9f9',
  padding: '40px 20px',
  borderTop: '1px solid #ddd',
  marginTop: 'auto',
};

const containerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  textAlign: 'center',
};

const logoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  marginBottom: '20px',
};

const imgStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
  borderRadius: '10px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
  margin: 0,
};

const linksStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  marginBottom: '20px',
  flexWrap: 'wrap',
};

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#555',
  fontSize: '16px',
  transition: 'color 0.3s ease',
} as React.CSSProperties;

const copyright: React.CSSProperties = {
  fontSize: '14px',
  color: '#777',
  marginTop: '10px',
};
