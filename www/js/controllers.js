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



.controller('MapCtrl', function($scope, $ionicLoading, $compile, $element) {

    $scope.mapData = [{
        lat: 45.460760,
        lng: -75.680405,
        score: 4,
        image: '/img/ionic.png',
    }, {
        lat: 45.460750,
        lng: -75.880435,
        score: 2,
        image: '/img/ionic.png',
    }];

    $scope.colorMapping = {
        1: '#E54B00',
        2: '#FFAF02',
        3: '#F7E301',
        4: '#8DEF45',
        5: '#53D44D'
    }
    $scope.init = function() {
        $scope.$watch('mapData', function(mapData) {
                if (mapData && mapData.length > 0) {

                    var myLatlng = new google.maps.LatLng(45.460760, -75.680405);
                    var mapOptions = {
                        center: myLatlng,
                        zoom: 10,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                    var map = new google.maps.Map(document.getElementById('map'),
                        mapOptions);

                    var infowindow = new google.maps.InfoWindow();
                    // document.getElementById('map').innerHTML  = JSON.stringify(google);
                    for (var i = 0; i < mapData.length; i++) {
                        var center = new google.maps.LatLng(mapData[i].lat, mapData[i].lng);
                        var marker = new google.maps.Marker({
                            position: center,
                            map: map,
                        });

                        var populationOptions = {
                            strokeColor: $scope.colorMapping[mapData[i].score],
                            strokeOpacity: 0.8,
                            strokeWeight: 0,
                            fillColor: $scope.colorMapping[mapData[i].score],
                            fillOpacity: 0.35,
                            map: map,
                            center: center,
                            radius: Math.sqrt(500) * 100
                        };
                        // Add the circle for this city to the map.
                        cityCircle = new google.maps.Circle(populationOptions);

                        var contentString = '<div id="content">' +
                            '<div id="siteNotice">' +
                            '</div>' +
                            '<p><b>Score </b>' + mapData[i].score + '</p>' +
                            '<div star-rating rating-value="' + (mapData[i].score) + '" max="5" ></div>' +
                            // '<h1 id="firstHeading" class="firstHeading">Place</h1>'+
                            '<div id="bodyContent">' +
                            '<img style="width:100px;height:100px" src="' + mapData[i].image + '"/>' +
                            '</div>' +
                            '</div>';

                        marker.popup = $compile(contentString)($scope);

                        google.maps.event.addListener(marker, 'click',
                            function(marker) {
                                return function() {


                                    infowindow.setContent(marker.popup.html());
                                    infowindow.open(map, marker);
                                }
                            }(marker));
                    };



                    // google.maps.event.addListener(map, 'zoom_changed', function() {
                    //   var zoomLevel = map.getZoom();
                    //   map.setCenter(myLatlng);
                    //   infowindow.setContent('Zoom: ' + zoomLevel);
                    // });
                    $scope.map = map;
                } //end if
            }) //end watch


    }


})


.directive('starRating', function() {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '='
        },
        link: function(scope, elem, attrs) {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
                scope.stars.push({
                    filled: i < scope.ratingValue
                });
            }
        }
    }
});
