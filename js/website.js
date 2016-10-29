(function () {
'use strict';

angular.module('website', ['ngRoute'])
    .controller('ProdottiCtrl', ProdottiCtrl)
    .controller('ChisiamoCtrl', ChisiamoCtrl)
    .controller('HomeCtrl', HomeCtrl)
    .controller('FooterCtrl', FooterCtrl)
    .service('HomeService', HomeService)
    .service('ChisiamoService', ChisiamoService)
    .service('ProdottiService', ProdottiService)
    .service('StateService', StateService)
    .service('FooterService', FooterService)
    .config(function ($routeProvider) {
        $routeProvider.
            when('/prodotti', {templateUrl: 'partials/prodotti.html', controller: 'ProdottiCtrl'}).
            when('/chisiamo', {templateUrl: 'partials/chisiamo.html', controller: 'ChisiamoCtrl'}).
            when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'}).
            otherwise({redirectTo: '/home'});
    })
    .directive('experiment', ExperimentDirective);

    function ExperimentDirective() {
        var linker = function (scope, element, attrs) {
            element.on('click', function(){
                scope.doExperiment();
            })
        };

        var controller =  function($scope) {
            $scope.doExperiment = function() {
                $scope.$apply(function(){
                    $scope.experiment.completed++;
                });
            };
        };

        return {
            scope: true,
            restrict: 'E',
            templateUrl: 'directives/productDetail.html',
            link: linker,
            controller: controller
        }
    }

    HomeCtrl.$inject = ['HomeService'];
    function HomeCtrl(HomeService) {
        var listaNotizie = this;

        listaNotizie.notizie = HomeService.getNotizie();
    }

    ProdottiCtrl.$inject = ['ProdottiService'];
    function ProdottiCtrl(ProdottiService) {
        var listaProdotti = this;

        listaProdotti.prodotti = ProdottiService.getProdotti();
    }

    ChisiamoCtrl.$inject = ['$scope', 'StateService', 'ChisiamoService'];
    function ChisiamoCtrl($scope, StateService, ChisiamoService) {
        $scope.title = "L'Olio è la nostra vita";
        $scope.body = "Informazione sull'azienda";

        console.log(StateService);
        console.log(ChisiamoService);

        $scope.message = StateService.getMessage();
        $scope.experiments = ChisiamoService.getExperiments();

        $scope.updateMessage = function (m) {
            StateService.setMessage(m);
        };
    }

    FooterCtrl.$inject = ['FooterService'];
    function FooterCtrl(FooterService) {
        var footerList = this;

        footerList.footers = FooterService.getFooters();
    }

    function StateService() {
        var message = 'Hello Message';
        var getMessage = function () {
            return message;
        };
        var setMessage = function (m) {
            message = m;
        };

        return {
            getMessage: getMessage,
            setMessage: setMessage
        }
    }

    function HomeService() {
        var service = this;
        var notizie = [
            { titolo: "Notizia più recente", testo: "Questa notizia è la più recente" },
            { titolo: "Seconda notizia più recente", testo: "Questa notizia è meno recente della prima" },
            { titolo: "Notizia meno recente", testo: "Questa è la notizia meno recente delle 3" }
        ];

        service.getNotizie = function () {
            return notizie;
        }
    }
    
    function ChisiamoService() {
        var service = this;
        var experiments = [
            {name: 'Experiment 1', description: 'This is an experiment', completed: 0},
            {name: 'Experiment 2', description: 'This is an experiment', completed: 0}
        ];

        service.getExperiments = function() {
            return experiments;
        };
    }


    function ProdottiService() {
        var service = this;
        var prodotti = [
            { nome: "Nome p1", descrizione: "breve descrizione p1", imgSrc: "images/olio1.jpeg" },
            { nome: "Nome p2", descrizione: "breve descrizione p2", imgSrc: "images/olio1.jpeg" },
            { nome: "Nome p3", descrizione: "breve descrizione p3", imgSrc: "images/olio1.jpeg" },
            { nome: "Nome p4", descrizione: "breve descrizione p4", imgSrc: "images/olio1.jpeg" }
        ];

        service.getProdotti = function() {
            return prodotti;
        };
    }

    function FooterService() {
        var service = this;
        var footers = [
            { titolo: "Dove siamo", testo: "indirizzo" },
            { titolo: "Contattaci", testo: "Recapito email" },
            { titolo: "Dettagli azienda", testo: "Nome azienda e P. Iva" },
            { titolo: "Seguici sui social network", testo: "Pagina fb, twitter, ..."}
        ];

        service.getFooters = function() {
            return footers;
        }
    }

})();