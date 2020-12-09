/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('yAnnouncementBoardTestModule', [
        'smarteditServicesModule',
    ])
    .controller('customViewController', function(announcementService) {

        this.showSimpleAnnouncement = function() {
            announcementService.showAnnouncement({
                messageTitle: 'This is the message title',
                message: 'This is a simple announcement',
                timeout: 7000
            });
        };

        this.showNonCloseableAnnouncement = function() {
            announcementService.showAnnouncement({
                template: '<div>This is a non closeable announcement</div>',
                closeable: false,
                timeout: 5000
            });
        };

        this.showTemplateBasedAnnouncement = function() {
            announcementService.showAnnouncement({
                template: '<div>{{$announcementCtrl.taskName}}<br/>{{$announcementCtrl.pageDetails}}<br/><br/>{{$announcementCtrl.body}}</div>',
                controller: function ctrl() {
                    'ngInject';
                    this.taskName = 'Translation (DE)';
                    this.pageDetails = 'Electronics Staged | Homepage';
                    this.body = 'This is a template based announcement';
                },
                closeable: true,
            });
        };

        this.showTemplateUrlBasedAnnouncement = function() {
            announcementService.showAnnouncement({
                templateUrl: 'sampleAnnouncement1template.html',
                closeable: true,
            });
        };

        this.showTemplateUrlBasedWithCustomControllerAnnouncement = function() {
            announcementService.showAnnouncement({
                templateUrl: 'sampleAnnouncement2template.html',
                controller: function ctrl() {
                    'ngInject';
                    this.data = 'This is the data coming from a custom controller';
                },
                closeable: true,
            });
        };
    })
    .component('yAnnouncementBoardTest', {
        controller: 'customViewController',
        templateUrl: '/test/e2e/yAnnouncement/customView.html'
    });

angular.module('smarteditcontainer').requires.push('yAnnouncementBoardTestModule');
