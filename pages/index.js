import React, {Component} from 'react';
import App from '../src/components';

import Footer from '../src/components/footer/Footer'
import NavigationBar from '../src/components/header/NavigationBar'

function SafeHydrate({ children }) {
    return (
      <div suppressHydrationWarning>
        {typeof window === 'undefined' ? null : children }
  
      </div>
    )
    
  }

class Index extends Component {

    static async getInitialProps() {
        return {
            isLoggedIn: false,
            user : null
        };
    }

    render() {
        return (
            <SafeHydrate>
                <App/>    
            </SafeHydrate>
                     
        )
    }
}

// Index.propTypes = {};
// Index.defaultProps = {};

export default Index;