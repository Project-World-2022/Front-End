/*!
    * Start Bootstrap - SB Admin v7.0.0 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2021 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    //
// Scripts
//
$('#sidebarToggle').click(() => {
  if ($('.body').hasClass('sb-sidenav-toggled')) {
    $('.body').removeClass('sb-sidenav-toggled')
  } else {
    $('.body').addClass('sb-sidenav-toggled');
  }
});
