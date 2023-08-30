<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel</title>
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">

        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <base href="{{asset('admin-app')}}" target="_blank">
      <script type="text/javascript" src="https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.js"></script>
      <!-- The core Firebase JS SDK is always required and must be listed first -->
      <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js"></script>

      <!-- TODO: Add SDKs for Firebase products that you want to use
          https://firebase.google.com/docs/web/setup#available-libraries -->

      <script>
        // Your web app's Firebase configuration
        const firebaseConfig = {
          apiKey: "AIzaSyDntU78Z8qEK8Qs5H7BAg-75BaxiTiqFAQ",
          authDomain: "chatappdemo-7301e.firebaseapp.com",
          projectId: "chatappdemo-7301e",
          storageBucket: "chatappdemo-7301e.appspot.com",
          messagingSenderId: "835122346412",
          appId: "1:835122346412:web:48f1f0df894538692f2209",
          measurementId: "G-92HR3HL563"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        // const messaging = firebase.messaging();

        function initFirebaseMessagingRegistration() {
          console.log('Calleme')
          messaging.requestPermission().then(function () {
            return messaging.getToken()
          }).then(function(token) {

            axios.post("{{ route('fcmToken') }}",{
              _method:"PATCH",
              token
            }).then(({data})=>{
              console.log(data)
            }).catch(({response:{data}})=>{
              console.error(data)
            })

          }).catch(function (err) {
            console.log(`Token Error :: ${err}`);
          });
        }
        //
        // initFirebaseMessagingRegistration();
        //
        // messaging.onMessage(function({data:{body,title}}){
        //   new Notification(title, {body});
        // });

      </script>
    </head>
    <body class="antialiased">
        <div id="app">App will be here soon</div>
        <noscript>You need to enable JavaScript to run this app.</noscript>
<!--        <script src="{{mix('index.js', 'admin-app')}}"></script>-->
        <script src="{{asset('admin-app/index.js')}}"></script>
    </body>
</html>
