import MenuHeaderDesktop from "./MenuHeaderDesktop";
import TopBar from "./TopBar";

export default function HeaderDesktop({isHomeOrRoot}) {
  return (
    <div className="container-menu-desktop">
			{/* <!-- Topbar --> */}
			<TopBar/>

      {/* Menu header desktop */}
			<MenuHeaderDesktop isHomeOrRoot={isHomeOrRoot}/>
		</div>
  )
}
