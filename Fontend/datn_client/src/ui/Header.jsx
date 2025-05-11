import { useLocation } from "react-router-dom";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";
import MenuMobile from "./MenuMobile";
import ModalSearch from "./ModalSearch";

export default function Header() {

	const location = useLocation();
	const isHomeOrRoot = location.pathname === "/" || location.pathname === "/home";

	console.log(isHomeOrRoot)

  return (
    // <!-- Header -->
	<header className={isHomeOrRoot ? "" : "header-v4"}>
		{/* <!-- Header desktop --> */}
		<HeaderDesktop isHomeOrRoot={isHomeOrRoot}/>

		{/* <!-- Header Mobile --> */}
		<HeaderMobile/>


		{/* <!-- Menu Mobile --> */}
		<MenuMobile/>

		{/* <!-- Modal Search --> */}
		<ModalSearch/>
	</header>
  )
}
