'use strict';

angular.module('yaru22.angular-timeago').config(function(timeAgoSettings) {
    timeAgoSettings.strings['ar_AR'] = {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: '',
        suffixFromNow: 'الآن',
        seconds: 'أقل من دقيقة',
        minute: 'منذ دقيقة',
        minutes: '%d دقائق',
        hour: 'منذ ساعة',
        hours: 'منذ %d ساعات',
        day: 'يوم',
        days: '%d أيام',
        month: 'منذ شهر ',
        months: '%d أشهر',
        year: 'منذ سنة',
        years: '%d سنوات',
        numbers: []
    };
});