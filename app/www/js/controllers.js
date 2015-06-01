angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http,$ionicPopup) {
  $scope.dash = {};
  $scope.users = [];
  /*$scope.enviar=function(){
    console.log("iniciar");
    var user = $scope.dash.nombre;
    var ape = $scope.dash.apellido;
    };*/
    console.log('lista');

   $scope.doRefresh = function(){
    $http.get('http://192.168.1.9:8080/sii/rest/users').
       success(function(data, status, headers, config) {
         console.log("conecting:"+"http://192.168.1.9:8080/sii/rest/users");
         console.log(data);
         $scope.users = data;
       }).
       error(function(data, status, headers, config) {
          console.log("error "+data+" "+status+" "+headers+ " "+config);
       })
       .finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
       });
   }

   $scope.doRefresh();

  /*$http.get('http://192.168.1.3/insert.php?id='+user+"&name="+ape).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      console.log("OK");
      $scope.dash.nombre="";
      $scope.dash.apellido="";
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log("error");

         var alertPopup = $ionicPopup.alert({
           title: 'Error!',
           template: 'No se pudo conectar'
         });
         alertPopup.then(function(res) {
           console.log('Thank you for not eating my delicious ice cream cone');
         });

    });
  };*/

})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('UsersCtrl', function($scope,$http,$q,$log) {
  $scope.user = {};

 $log.info('vista de guardar');


$scope.test = function(){
    $state.go("tab.chats");
}
   var deferred = $q.defer();

  $scope.guardar = function(){
    $http.post('http://192.168.1.9:8080/sii/rest/users',$scope.user).
        success(function(data, status, headers, config) {
            console.log(data);
            $scope.user = {};
            //def.resolve(data);
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            //alert("No se pudo guardar");
            console.log("error "+data+" "+status+" "+headers+ " "+config);
            $log.error("error con log");
            deferred.reject('error');
        });
  }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
