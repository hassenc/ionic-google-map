angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})



.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})



.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
	$scope.init =function () {
        var myLatlng = new google.maps.LatLng(45.460760, -75.680405);
        var mapOptions = {
          center: myLatlng,
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('map'),
            mapOptions);

// document.getElementById('map').innerHTML  = JSON.stringify(google);

      //   var marker = new google.maps.Marker({
      //       position: myLatlng,
      //       map: map,
      //       title: 'Hello World!'
      //   });

      //  var populationOptions = {
      //     strokeColor: '#FF0000',
      //     strokeOpacity: 0.8,
      //     strokeWeight: 2,
      //     fillColor: '#FF0000',
      //     fillOpacity: 0.35,
      //     map: map,
      //     center: myLatlng,
      //     radius: Math.sqrt(500) * 100
      //   };
      //   // Add the circle for this city to the map.
      //   cityCircle = new google.maps.Circle(populationOptions);





      //   var contentString = '<div id="content">'+
      // '<div id="siteNotice">'+
      // '</div>'+
      // '<h1 id="firstHeading" class="firstHeading">Place</h1>'+
      // '<div id="bodyContent">'+
      // '<p><b>Place</b>, This is a good place.</p>'+
      // '</div>'+
      // '</div>';

      // var infowindow = new google.maps.InfoWindow({
      //     content: contentString
      // });


      // google.maps.event.addListener(marker, 'click', function() {
      //   infowindow.open(map,marker);
      // });


      // google.maps.event.addListener(map, 'zoom_changed', function() {
      //   var zoomLevel = map.getZoom();
      //   map.setCenter(myLatlng);
      //   infowindow.setContent('Zoom: ' + zoomLevel);
      // });
      $scope.map=map;

      }
      // google.maps.event.addDomListener(window, 'load', initialize);
      // ionic.Platform.ready(initialize);

});


