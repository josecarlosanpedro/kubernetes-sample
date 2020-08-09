import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};
class Layout extends Component {
  render() {
    const { isLoggedIn } = this.props
    return (
      <section className="Layout-section">
        <Header isLoggedIn={isLoggedIn} />
        <main className="main-content">{this.props.children}</main>
        <Footer />
      </section>
    );
  }
}

Layout.propTypes = propTypes;
export default Layout;
