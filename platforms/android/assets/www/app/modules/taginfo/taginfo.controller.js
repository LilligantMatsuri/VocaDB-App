(function() {
    'use strict';

    angular
        .module('app.taginfo')
        .controller('TagInfoController', TagInfoController);

    TagInfoController.$inject = ['logger','$stateParams','albumservice','songservice','artistservice','$ionicScrollDelegate'];

    function TagInfoController(logger,$stateParams,albumservice,songservice,artistservice,$ionicScrollDelegate) {
       
        /*jshint validthis: true */
        var vm = this;
        vm.tag = $stateParams.Name;
        vm.title = "#" + vm.tag;
        vm.tags = {songs: [], artists: [], albums: []};
        vm.querySongByTag = querySongByTag;
        vm.queryArtistByTag = queryArtistByTag;
        vm.queryAlbumByTag = queryAlbumByTag;
        
        init();
        
        function init() {
            querySongByTag();
            queryArtistByTag();
            queryAlbumByTag();
        }
        
        function querySongByTag() {
            return songservice.querySongByTag(vm.tag).then(function(data) {
                vm.tags.songs = data.items;
                $ionicScrollDelegate.resize();
                return data;
            });
        }
        
        function queryArtistByTag() {
            return artistservice.queryArtistByTag(vm.tag).then(function(data) {
                vm.tags.artists = data.items;
                $ionicScrollDelegate.resize();
                return data;
            });
        }
        
        function queryAlbumByTag() {
            return albumservice.queryAlbumByTag(vm.tag).then(function(data) {
                vm.tags.albums = data.items;
                $ionicScrollDelegate.resize();
                return data;
            });
        }
    }
})();