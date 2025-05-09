import Header from "./Header"
import ContainerPanel from "./ContainerPanel"
import FooterPanel from "./FooterPanel"

export default function MainPanel() {
  return (
    <div className="main-panel">
      <Header/>
      <ContainerPanel/>
      <FooterPanel/>
    </div>
  )
}
