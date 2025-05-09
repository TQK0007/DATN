import MainPanel from "./MainPanel"
import Sidebar from "./Sidebar"

export default function AppLayout() {
  return (
    <div className="wrapper">
      <Sidebar/>
      <MainPanel/>
    </div>
  )
}
