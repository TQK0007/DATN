import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faUsers,
  faShoppingCart,
  faBoxes,
  faClipboardList,
  faFolderOpen,
  faUserCircle,
  faTachometerAlt,
  faSearch,
  faEnvelope,
  faBell,
  faBars,
  faCheck,
  faEllipsisH,
  faEdit,
  faTrashAlt,
  faPlus,
  faTimes,
  faUser,
  faCog,
  faSignOutAlt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons"
import { faFacebookF, faGoogle, faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons"

library.add(
  faUsers,
  faShoppingCart,
  faBoxes,
  faClipboardList,
  faFolderOpen,
  faUserCircle,
  faTachometerAlt,
  faSearch,
  faEnvelope,
  faBell,
  faBars,
  faCheck,
  faEllipsisH,
  faEdit,
  faTrashAlt,
  faPlus,
  faTimes,
  faUser,
  faCog,
  faSignOutAlt,
  faChevronDown,
  faFacebookF,
  faGoogle,
  faTwitter,
  faGithub,
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
