import React from 'react'

export default function HeaderMobile() {
  return (
    <div className="wrap-header-mobile">
			{/* <!-- Logo moblie -->		 */}
			<div className="logo-mobile">
				<a href="index.html"><img src="/assets/images/icons/logo-01.png" alt="IMG-LOGO"/></a>
			</div>

			{/* <!-- Icon header --> */}
			<div className="wrap-icon-header flex-w flex-r-m m-r-15">
				<div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
					<i className="zmdi zmdi-search"></i>
				</div>

				<div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart" data-notify="2">
					<i className="zmdi zmdi-shopping-cart"></i>
				</div>

				<a href="#" className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti" data-notify="0">
					<i className="zmdi zmdi-favorite-outline"></i>
				</a>
			</div>

			{/* <!-- Button show menu --> */}
			<div className="btn-show-menu-mobile hamburger hamburger--squeeze">
				<span className="hamburger-box">
					<span className="hamburger-inner"></span>
				</span>
			</div>
		</div>
  )
}
