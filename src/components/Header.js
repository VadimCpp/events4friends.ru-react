import React, { Component } from 'react';
import './Header.css';

// eslint-disable-next-line no-unused-vars
class Header extends Component {
    render() {
        return(
            <div className="borderbottom">
                <header className="header">
                    <h2 className="header_title" data-text="События для друзей">События для друзей</h2>
                </header>
            </div>
        )
    }
}

export default Header;