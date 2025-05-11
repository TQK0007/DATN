import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MenuHeaderDesktop({isHomeOrRoot}) {

	console.log(isHomeOrRoot)

  return (
    <div className={`wrap-menu-desktop  ${isHomeOrRoot? '' : 'how-shadow1'}`}>
				<nav className="limiter-menu-desktop container">
					
					{/* <!-- Logo desktop -->		 */}

					<NavLink to="/" className="logo">
						<img src="/assets/images/icons/logo-01.png" alt="IMG-LOGO"/>
					</NavLink>

					

					{/* <!-- Menu desktop --> */}
					<div className="menu-desktop">
						<ul className="main-menu">
							<li className="active-menu">
								<NavLink to="/">Home</NavLink>
							</li>

							<li>
								<NavLink to="/shop">Shop</NavLink>								
							</li>

							{/* <li className="label1" data-label1="hot">
								<NavLink to="/features">Features</NavLink>
							</li> */}

							{/* <li>
								<NavLink to="/blog">Blog</NavLink>
							</li> */}

							<li>
								<NavLink to="/about">About</NavLink>
							</li>

							<li>
								<NavLink to="/contact">Contact</NavLink>
							</li>
						</ul>
					</div>	

					{/* <!-- Icon header --> */}
					<div className="wrap-icon-header flex-w flex-r-m">
						<div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
							<i className="zmdi zmdi-search"></i>
						</div>

						<div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart" data-notify="2">
							<i className="zmdi zmdi-shopping-cart"></i>
						</div>

						<a href="#" className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti" data-notify="0">
							<i className="zmdi zmdi-favorite-outline"></i>
						</a>
					</div>
				</nav>
			</div>	
  )
}
