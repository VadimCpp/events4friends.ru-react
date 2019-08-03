import React, { Component } from 'react';
import './Header.css';

// eslint-disable-next-line no-unused-vars
class Header extends Component {
    render() {
        return(
            <header className="header">
                <div className="header_effect">
                    <h2 className="header_text" data-text="События для друзей">События для друзей</h2>
                </div>
            </header>
        )
    }
}

export default Header;