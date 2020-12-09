/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module("positionRegistryModule", ['yjqueryModule'])
    /*
     * Service aimed at determining the list of registered DOM elements that have been repositioned, regardless of how, since it was last queried
     */
    .service("positionRegistry", function(yjQuery) {

        var positionRegistry = [];

        function _floor(val) {
            return Math.floor(val * 100) / 100;
        }

        var _calculatePositionHash = function(element) {
            var rootPosition = yjQuery('body')[0].getBoundingClientRect();
            var position = element.getBoundingClientRect();
            return _floor(position.top - rootPosition.top) + "_" + _floor(position.left - rootPosition.left);
        };

        /*
         * registers a given node in the repositioning registry
         */
        this.register = function(element) {
            this.unregister(element);
            positionRegistry.push({
                element: element,
                position: _calculatePositionHash(element)
            });
        }.bind(this);

        /*
         * unregisters a given node from the repositioning registry
         */
        this.unregister = function(element) {
            var entryToBeRemoved = positionRegistry.find(function(entry) {
                return entry.element === element;
            });

            var index = positionRegistry.indexOf(entryToBeRemoved);
            if (index > -1) {
                positionRegistry.splice(index, 1);
            }
        };

        /*
         * Method returning the list of nodes having been repositioned since last query
         */
        this.getRepositionedComponents = function() {
            return positionRegistry
                .filter(function(entry) {
                    //to ignore elements that would keep showing here because of things like display table-inline
                    return yjQuery(entry.element).height() !== 0;
                })
                .filter(function(entry) {
                    var element = entry.element;
                    var newPosition = _calculatePositionHash(element);
                    if (newPosition !== entry.position) {
                        entry.position = newPosition;
                        return true;
                    } else {
                        return false;
                    }
                }).map(function(entry) {
                    return entry.element;
                });
        };


        /*
         * unregisters all nodes and cleans up
         */
        this.dispose = function() {
            positionRegistry = [];
        };

        /*
         * for e2e test purposes
         */
        this._listenerCount = function() {
            return positionRegistry.length;
        };


    });
