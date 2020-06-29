/*eslint-disable*/
import React from 'react'
import { NavLink, Link } from 'react-router-dom'
// nodejs library to set properties for components
import { PropTypes } from 'prop-types'
import styled from 'styled-components'

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar'

// reactstrap components
import { Nav, NavLink as ReactstrapNavLink } from 'reactstrap'

const NavItem = styled.p`
  font-weight: bold;
  font-size: 0.8rem;
`

var ps

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.activeRoute.bind(this)
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    // return this.props.location.pathname === routeName ? 'active' : ''
    return ''
  }
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false,
      })
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy()
    }
  }
  linkOnClick = () => {
    document.documentElement.classList.remove('nav-open')
  }
  render() {
    const { bgColor, routes, rtlActive, logo } = this.props
    let logoImg = null
    let logoText = null
    let allRoutes = this.props.routes.map((route) => route.subRoutes).flat()
    console.log(allRoutes)
    if (logo !== undefined) {
      if (logo.outterLink !== undefined) {
        logoImg = (
          <a
            href={logo.outterLink}
            className="simple-text logo-mini"
            target="_blank"
            onClick={this.props.toggleSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          </a>
        )
        logoText = (
          <a
            href={logo.outterLink}
            className="simple-text logo-normal"
            target="_blank"
            onClick={this.props.toggleSidebar}
          >
            {logo.text}
          </a>
        )
      } else {
        logoImg = (
          <Link
            to={logo.innerLink}
            className="simple-text logo-mini"
            onClick={this.props.toggleSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          </Link>
        )
        logoText = (
          <Link
            to={logo.innerLink}
            className="simple-text logo-normal"
            onClick={this.props.toggleSidebar}
          >
            {logo.text}
          </Link>
        )
      }
    }
    return (
      <div className="sidebar" data={bgColor}>
        <div className="sidebar-wrapper" ref="sidebar">
          {logoImg !== null || logoText !== null ? (
            <div className="logo">
              {logoImg}
              {logoText}
            </div>
          ) : null}
          <Nav>
            {allRoutes.map((prop, key) => {
              if (prop.redirect) return null
              return (
                <li
                  className={
                    this.activeRoute(prop.path) +
                    (prop.pro ? ' active-pro' : '')
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.path}
                    className="nav-link"
                    activeClassName="active"
                    onClick={this.props.toggleSidebar}
                  >
                    <i className={prop.icon} />
                    <NavItem>{rtlActive ? prop.rtlName : prop.name}</NavItem>
                  </NavLink>
                </li>
              )
            })}
            {/* <li className="active-pro">
              <ReactstrapNavLink href="https://www.creative-tim.com/product/black-dashboard-pro-react?ref=bdr-user-archive-sidebar-upgrade-pro">
                <i className="tim-icons icon-spaceship" />
                <p>Upgrade to PRO</p>
              </ReactstrapNavLink>
            </li> */}
          </Nav>
        </div>
      </div>
    )
  }
}

Sidebar.defaultProps = {
  rtlActive: false,
  bgColor: 'red',
  routes: [{}],
}

Sidebar.propTypes = {
  // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
  // insde the links of this component
  rtlActive: PropTypes.bool,
  bgColor: PropTypes.oneOf(['primary', 'blue', 'green', 'red']),
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string,
  }),
}

export default Sidebar
