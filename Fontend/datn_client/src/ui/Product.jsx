import ProductOverView from "./ProductOverView";
import ProductShop from "./ProductShop";

export default function Product() {
  return (
    // <!-- Product -->
	<section className="bg0 p-t-23 p-b-140">
		<div className="container">
			<ProductOverView/>

			<ProductShop/>
		</div>
	</section>
  )
}
