import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import injectSheet from 'react-jss';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';

import {
  About,
  Article,
  Category,
  Categories,
  Home,
  Login,
  Tags
} from './pages';

const styles = {
  '@global': {
    '*': {
      boxSizing: 'border-box'
    },
    body: {
      fontFamily: '-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,"PingFang SC","Hiragino Sans GB",STHeiti,"Microsoft YaHei","Microsoft JhengHei","Source Han Sans SC","Noto Sans CJK SC","Source Han Sans CN","Noto Sans SC","Source Han Sans TC","Noto Sans CJK TC","WenQuanYi Micro Hei",SimSun,sans-serif;'
    }
  },
  main: {
    width: '100vw'
  }
};

@injectSheet(styles)
@withRouter
class App extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <Navbar />
        <Header />
        <Route exact strict path='/' component={Home} />
        <Route exact strict path='/page/:page/' component={Home} />
        <Route exact strict path='/about/' component={About} />
        <Route exact strict path='/tags/:tag?/' component={Tags} />
        <Route exact strict path='/categories/' component={Categories} />
        <Route exact strict path='/categories/:category/' component={Category} />
        <Route exact strict path='/:year/:month/:day/:url/' component={Article} />
        <Route exact strict path='/login/' component={Login} />
        <Footer />
      </main>
    );
  }
}

export default App;
