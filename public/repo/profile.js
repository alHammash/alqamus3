
 function getUrlVars()
 {
   var vars = [], hash;
   var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
   for (var i = 0; i < hashes.length; i++)
   {
     hash = hashes[i].split('=');
     vars.push(hash[0]);
     vars[hash[0]] = hash[1];
   }
   return vars;
 }
 ;
 var userv = getUrlVars()['user'];
 var tokenv = getUrlVars()['token'];
 console.log(userv);

 //document.getElementsById("userEmail").innerHTML = userv;
 $('#userEmail').html(userv);
 //document.getElementById("demo").innerHTML = 5 + 6;


 $('#btnLogout').click(function () {
   console.log('logoutfun: ' + userv);
   logout();
   return false;
 });
 function logout() {
   console.log('logout: ' + userv);
   $.ajax({
     type: 'post',
     url: './v1/user/logout?user=' + userv,
     dataType: "json"
      //success: function (data) {

   });
 }