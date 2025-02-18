import React from 'react';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <p>S.A.D.C LTD | טלפון: 076-6654376 | www.sadac-ltd.com</p>
        </footer>
    );
};

const footerStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#1976d2',
    color: 'white',
    padding: '10px 0',
    fontWeight: 'bold',
};

export default Footer;


