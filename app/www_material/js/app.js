"use strict";

angular.module('starter', ['ionic','ionMdInput'])


    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

        // Turn off caching for demo simplicity's sake
        $ionicConfigProvider.views.maxCache(0);

        $stateProvider
            .state('menu', {
                url: "/menu",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'MainCtrl'
            })
            .state('menu.home', {
                url: "/home",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/home.html",
                        controller: 'SearchCtrl'
                    }
                }
            })
            .state('menu.login', {
                url: "/login",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/login.html",
                        controller: 'LoginCtrl'
                    },
                    'fabContent': {
                        template: ''
                    }
                }
            })
            .state('menu.profile', {
                url: "/profile",
                views: {
                    'menuContent': {
                        templateUrl: 'templates/profile.html',
                        controller: 'ProfileCtrl'
                    },
                    'fabContent': {
                        template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                        controller: function ($timeout) {
                            alert("fabcontent");
                            /*$timeout(function () {
                             document.getElementById('fab-profile').classList.toggle('on');
                             }, 800);*/
                        }
                    }
                }
            })
            .state('menu.galeria', {
                url: "/galeria",
                views: {
                    'menuContent': {
                        templateUrl: 'templates/gallery.html',
                        controller: 'GalleryCtrl'
                    },
                    'fabContent': {
                        template: '<button id="fab-gallery" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
                        controller: function ($timeout) {
                            $timeout(function () {
                                document.getElementById('fab-gallery').classList.toggle('on');
                            }, 600);
                        }
                    }
                }
            })
            .state('menu.search', {
                url: "/search",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/search.html",
                        controller: 'SearchCtrl'
                    }
                }
            })
        ;

        $urlRouterProvider.otherwise("menu/home");
    })

    .controller('MainCtrl', function($scope, $ionicSideMenuDelegate,$ionicModal) {
        $scope.attendees = [
            { firstname: 'Nicolas', lastname: 'Cage' },
            { firstname: 'Jean-Claude', lastname: 'Van Damme' },
            { firstname: 'Keanu', lastname: 'Reeves' },
            { firstname: 'Steven', lastname: 'Seagal' }
        ];

        $scope.home_msg = function() {
            //alert("mensaje");
            $scope.setExpanded(true);
        };

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        /////////////////////////////////////
        // fab icon
        /////////////////////////////////////
        var navIcons = document.getElementsByClassName('ion-navicon');
        for (var i = 0; i < navIcons.length; i++) {
            navIcons.addEventListener('click', function () {
                this.classList.toggle('active');
            });
        }

        var fab = document.getElementById('fab');
        fab.addEventListener('click', function () {
            location.href = 'https://twitter.com/ZachFitzgerald';
        });

      

        /////////////////////////////////////
        // Login
        /////////////////////////////////////
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            //$timeout(function() {
                $scope.closeLogin();
            //}, 1000);
        };


        ////////////////////////////////////////
        // Layout Methods
        ////////////////////////////////////////

        $scope.hideNavBar = function() {
            document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
        };

        $scope.showNavBar = function() {
            document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
        };

        $scope.noHeader = function() {
            var content = document.getElementsByTagName('ion-content');
            for (var i = 0; i < content.length; i++) {
                if (content[i].classList.contains('has-header')) {
                    content[i].classList.toggle('has-header');
                }
            }
        };

        $scope.setExpanded = function(bool) {
            $scope.isExpanded = bool;
        };

        $scope.setHeaderFab = function(location) {
            var hasHeaderFabLeft = false;
            var hasHeaderFabRight = false;

            switch (location) {
                case 'left':
                    hasHeaderFabLeft = true;
                    break;
                case 'right':
                    hasHeaderFabRight = true;
                    break;
            }

            $scope.hasHeaderFabLeft = hasHeaderFabLeft;
            $scope.hasHeaderFabRight = hasHeaderFabRight;
        };

        $scope.hasHeader = function() {
            var content = document.getElementsByTagName('ion-content');
            for (var i = 0; i < content.length; i++) {
                if (!content[i].classList.contains('has-header')) {
                    content[i].classList.toggle('has-header');
                }
            }

        };

        $scope.hideHeader = function() {
            $scope.hideNavBar();
            $scope.noHeader();
        };

        $scope.showHeader = function() {
            $scope.showNavBar();
            $scope.hasHeader();
        };

        $scope.clearFabs = function() {
            var fabs = document.getElementsByClassName('button-fab');
            if (fabs.length && fabs.length > 1) {
                fabs[0].remove();
            }
        };

        $scope.showHeader();
        ionic.material.ink.displayEffect();

    })

    .controller('LoginCtrl', function($scope, $timeout, $stateParams) {
        //$scope.$parent.clearFabs();
        $timeout(function() {
            $scope.$parent.hideHeader();
        }, 0);
        ionic.material.ink.displayEffect();
        $scope.login = function(){
            //alert("demo");
            $scope.showNavBar();
        };
    })

    .controller('GalleryCtrl', function($scope, $stateParams, $timeout) {
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(false);

        // Activate ink for controller
        ionic.material.ink.displayEffect();

        ionic.material.motion.pushDown({
            selector: '.push-down'
        });
        ionic.material.motion.fadeSlideInRight({
            selector: '.animate-fade-slide-in .item'
        });

    })

    .controller('ProfileCtrl', function($scope, $stateParams, $timeout) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(true);

        // Set Motion
        $timeout(function() {
            ionic.material.motion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionic.material.motion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionic.material.ink.displayEffect();
    })

    .controller('SearchCtrl', function($scope, $stateParams, $timeout) {
        $scope.$parent.showHeader();
    })

    .controller('MapCtrl', function($scope) {
        $scope.i = 0;
        var svg = d3.select("svg");
        var points = [[50, 50]];
        var dragged = null;
        var selected = points[0];
        var height = 0;
        var width = 0;

        svg.attr("tabindex", 1);

        if(svg[0][0].attributes.height) {
            height = svg[0][0].attributes.height.value;
        }
        if(svg[0][0].attributes.width){
            width = svg[0][0].attributes.width.value;
        }

        svg.on("click", clickSVG)
            .on("mouseup", mouseup)
            .on("keydown", keydown)
            .on("mousedown", mousedown)
            .on("mousemove", mouseCoordenates)
        ;
        svg.node().focus();

        //*-----------------------------------------
        //*EVENTS
        //*-----------------------------------------
        function clickSVG(data) {
            // Ignore the click event if it was suppressed
            if (d3.event.defaultPrevented) {
                return;
            }
            if ($scope.edit) {
                var point = d3.mouse(this);
                addBlockMark(point[0], point[1]);
            }
            //addPolygon(p.x, p.y);
        }

        function mouseCoordenates() {
            var point = d3.mouse(this);
            svg.select("#coords").remove();
            svg.append("text").text(point[0] + ":" + point[1])
                .attr("id", "coords")
                .attr("x", 20)
                .attr("y", 20)
                .attr("font-family", "sans-serif")
                .attr("font-size", "15px")
                .attr("fill", "red");
        }

        function mousedown() {
            points.push(selected = dragged = d3.mouse(svg.node()));
            redraw();
        }

        function redraw() {
            var circle = svg.selectAll("circle")
                .data(points, function(d) {
                    return d;
                });

            circle.enter().append("circle")
                .attr("r", 1e-6)
                .on("mousedown", function(d) {
                    selected = dragged = d;
                    redraw();
                })
                .transition()
                .duration(750)
                .ease("elastic")
                .attr("r", 4.5);

            circle
                .classed("selected", function(d) {
                    return d === selected;
                })
                .attr("cx", function(d) {
                    return d[0];
                })
                .attr("cy", function(d) {
                    return d[1];
                });

            circle.exit().remove();

            if (d3.event) {
                d3.event.preventDefault();
                d3.event.stopPropagation();
            }
        }

        function mousemove() {
            if (!dragged){
                return;
            }
            var m = d3.mouse(svg.node());
            dragged[0] = Math.max(0, Math.min(width, m[0]));
            dragged[1] = Math.max(0, Math.min(height, m[1]));
            redraw();
        }

        function mouseup() {
            if (!dragged){
                return;
            }
            console.log("mouse up");
            //mouseCoordenates();
            dragged = null;
        }

        function keydown() {
            console.log(selected,d3.event.keyCode);
            if (!selected){
                return;
            }
            switch (d3.event.keyCode) {
                case 8: // backspace
                case 46:
                { // delete
                    var i = points.indexOf(selected);
                    points.splice(i, 1);
                    selected = points.length ? points[i > 0 ? i - 1 : 0] : null;
                    redraw();
                    break;
                }
            }
        }

        function addPolygon(x, y) {
            svg.append("polygon").attr("points", "100,50, 200,150, 300,50")
                //.data([{ wasDragged: true, id:$scope.i}])
                //.attr("r", "10")
                .attr("transform", "translate(" + x + "," + y + ")")
                .attr("class", "blockmark")
                .call(dragBehavior)
                .on('click', clickCircle);
            $scope.i++;
        }

        function addBlockMark(x, y) {
            if(!$scope.clickInCicle){
                svg.append("circle")
                    .data([{wasDragged: false, id: $scope.i}])
                    .attr("r", "10")
                    .attr("id", $scope.i)
                    .attr("transform", "translate(" + x + "," + y + ")")
                    .attr("class", "blockmark")
                    .call(dragBehavior)
                    .on('click', clickCircle);
                $scope.i++;
            }else{
                $scope.clickInCicle = false;
            }
        }

        var dragBehavior = d3.behavior.drag()
            //.on('dragend', onDragStart)
            .on('drag', onDrag)
        //.on('dragend', onDragEnd);

        function onDragStart() {
            console.log('onDragStart');
        }

        function onDrag(data) {
            //console.log('onDrag');
            if ($scope.edit) {
                var x = d3.event.x;
                var y = d3.event.y;
                d3.select(this).attr("transform", "translate(" + x + "," + y + ")");

                data.wasDragged = true;
            }
        }

        function onDragEnd(d) {
            if (d.wasDragged === true) {
                console.log('onDragEnd');
            }

            d.wasDragged = false;
        }

        // Define drag beavior
        //var drag = d3.behavior.drag().on("drag", function (d){
        //	var x = d3.event.x;
        //	var y = d3.event.y;
        //	d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
        //});

        // Define drag beavior
        function clickCircle(data) {
            if (d3.event.defaultPrevented === false) {
                console.log(data.id);
                $scope.clickInCicle = true;
                var x,y;
                x = d3.transform($("#"+data.id).attr("transform")).translate[0];
                y = d3.transform($("#"+data.id).attr("transform")).translate[1];
                selected = [x,y];
            }
        };

        //svg.append("svg:image").attr("xlink:href", "images/plano_u.png").attr("width",800).attr("height",800).style("stroke-opacity", 0.5);

    })
;