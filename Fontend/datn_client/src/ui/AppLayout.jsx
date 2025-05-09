import Header from "./Header";
import Cart from "./Cart"
import Slider from "./Slider";
import Banner from "./Banner";
import Product from "./Product";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import Modal from "./Modal";

import { useEffect } from "react";


const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = false; // đảm bảo chạy đúng thứ tự
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

export default function AppLayout() {

  useEffect(() => {
    const loadScripts = async () => {
      try {
        // Load script lần lượt theo thứ tự
        await loadScript('/assets/vendor/jquery/jquery-3.2.1.min.js');
        await loadScript('/assets/vendor/animsition/js/animsition.min.js');
        await loadScript('/assets/vendor/bootstrap/js/popper.js');
        await loadScript('/assets/vendor/bootstrap/js/bootstrap.min.js');
        await loadScript('/assets/vendor/select2/select2.min.js');
        await loadScript('/assets/vendor/daterangepicker/moment.min.js');
        await loadScript('/assets/vendor/daterangepicker/daterangepicker.js');
        await loadScript('/assets/vendor/slick/slick.min.js');
        await loadScript('/assets/js/slick-custom.js');
        await loadScript('/assets/vendor/parallax100/parallax100.js');
        await loadScript('/assets/vendor/MagnificPopup/jquery.magnific-popup.min.js');
        await loadScript('/assets/vendor/isotope/isotope.pkgd.min.js');
        await loadScript('/assets/vendor/sweetalert/sweetalert.min.js');
        await loadScript('/assets/vendor/perfect-scrollbar/perfect-scrollbar.min.js');
        await loadScript('/assets/js/main.js');

        // Sau khi load xong các script => chạy code khởi tạo
        window.$(".js-select2").each(function () {
          window.$(this).select2({
            minimumResultsForSearch: 20,
            dropdownParent: window.$(this).next('.dropDownSelect2')
          });
        });

        window.$('.parallax100').parallax100();

        window.$('.gallery-lb').each(function() { // the containers for all your galleries
          window.$(this).magnificPopup({
                delegate: 'a', // the selector for gallery item
                type: 'image',
                gallery: {
                  enabled:true
                },
                mainClass: 'mfp-fade'
            });
        });


        window.$('.js-addwish-b2').on('click', function(e){
          e.preventDefault();
        });
    
        window.$('.js-addwish-b2').each(function(){
          var nameProduct =  window.$(this).parent().parent().find('.js-name-b2').html();
          window.$(this).on('click', function(){
            window.swal(nameProduct, "is added to wishlist !", "success");
    
            window.$(this).addClass('js-addedwish-b2');
            window.$(this).off('click');
          });
        });
    
        window.$('.js-addwish-detail').each(function(){
          var nameProduct =  window.$(this).parent().parent().parent().find('.js-name-detail').html();
    
          window.$(this).on('click', function(){
            window.swal(nameProduct, "is added to wishlist !", "success");
    
            window.$(this).addClass('js-addedwish-detail');
            window.$(this).off('click');
          });
        });
    
        /*---------------------------------------------*/
    
        window.$('.js-addcart-detail').each(function(){
          var nameProduct =  window.$(this).parent().parent().parent().parent().find('.js-name-detail').html();
          window.$(this).on('click', function(){
            window.swal(nameProduct, "is added to cart !", "success");
          });
        });



        


        // Các đoạn jQuery init khác cũng đặt ở đây...

      } catch (error) {
        console.error("Script load failed:", error);
      }
    };

    loadScripts();
  }, []);

  return (
    <div>
      <Header/>
      <Cart/>
      <Slider/>
      <Banner/>
      <Product/>
      <Footer/>
      <BackToTop/>
      <Modal/>
    </div>
  )
}
