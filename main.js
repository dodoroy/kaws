$(function () {
    // 切换语言
    $('#language').change(function () {
        if ($(this).is(":checked")) {
            $('.ch').addClass('show');
            $('.projects-previews').addClass('chinese');
            $('.en').removeClass('show');
            window.location.hash = 'ch';
        } else {
            $('.ch').removeClass('show');
            $('.projects-previews').removeClass('chinese');
            $('.en').addClass('show');
            window.location.hash = 'en';
        }
    });

    var url = window.location.href.split("?");
    if (url[1] && url[1].includes("ch")) {
        $('#language').attr('checked', true);
        $('.ch').addClass('show');
        $('.en').removeClass('show');
    }

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit

    //cache DOM elements
    var projectsContainer = $('.projects-container'),
        projectsPreviewWrapper = projectsContainer.find('.projects-previews'),
        projectPreviews = projectsPreviewWrapper.children('li'),
        projects = projectsContainer.find('.projects'),
        navigationTrigger = $('.close-trigger'),
        // navigation = $('.cd-primary-nav'),
        langSwitch = $('.lang-switch'),
        mobileMasthead = $('.landing-masthead-mobile'),
        mobileMastheadOpen = $('.landing-masthead-mobile-open'),
        exhibitionInfo = $('#exhi-content'),
        //if browser doesn't support CSS transitions...
        transitionsNotSupported = ($('.no-csstransitions').length > 0);


    var animating = false,
        //will be used to extract random numbers for projects slide up/slide down effect
        numRandoms = projects.find('li').length,
        uniqueRandoms = [];


    // hover transforms
    $('.projects-previews li:nth-of-type(1) a').hover(function () {
        $('.projects li:nth-of-type(1) .preview-image').css('transform', 'scale(1.05)');
    }, function () {
        $('.projects li:nth-of-type(1) .preview-image').css('transform', 'scale(1)');
    });

    $('.projects-previews li:nth-of-type(2) a').hover(function () {
        $('.projects li:nth-of-type(2) .preview-image').css('transform', 'scale(1.05)');
    }, function () {
        $('.projects li:nth-of-type(2) .preview-image').css('transform', 'scale(1)');
    });

    $('.projects-previews li:nth-of-type(3) a').hover(function () {
        $('.projects li:nth-of-type(3) .preview-image').css('transform', 'scale(1.05)');
    }, function () {
        $('.projects li:nth-of-type(3) .preview-image').css('transform', 'scale(1)');
    });

    //open project
    projectsPreviewWrapper.on('click', 'a', function (event) {

        event.preventDefault();

        if (animating == false) {
            animating = true;
            navigationTrigger.add(projectsContainer).addClass('project-open'); //add 用法
            openProject($(this).parent('li'));
            navigationTrigger.addClass('show');
            langSwitch.removeClass('show');
            mobileMasthead.removeClass('show');
        }
    });
    navigationTrigger.on('click', function (event) {
        event.preventDefault();

        if (animating == false) {
            animating = true;
            if (navigationTrigger.hasClass('project-open')) {
                //close visible project
                navigationTrigger.add(projectsContainer).removeClass('project-open');
                navigationTrigger.removeClass('show');
                langSwitch.removeClass('show');
                mobileMasthead.removeClass('show');
                closeProject();
            } else if (navigationTrigger.hasClass('nav-visible')) {
                //close main navigation
                navigationTrigger.removeClass('nav-visible');
                // navigation.removeClass('nav-clickable nav-visible');
                if (transitionsNotSupported) projectPreviews.removeClass('slide-out');
                else slideToggleProjects(projectsPreviewWrapper.children('li'), -1, 0, false);
            } else {
                //open main navigation
                navigationTrigger.addClass('nav-visible');
                // navigation.addClass('nav-visible');
                if (transitionsNotSupported) projectPreviews.addClass('slide-out');
                else slideToggleProjects(projectsPreviewWrapper.children('li'), -1, 0, true);
            }
        }

        if (transitionsNotSupported) animating = false;
    });

    $('#scroll').click(function () { //#A_ID is an example. Use the id of your Anchor
        $('html, body').animate({
            scrollTop: $('#exhi-content').offset().top - 100
            //#DIV_ID is an example. Use the id of your destination on the page
        }, 'slow');
    });


    function openProject(projectPreview) {
        exhibitionInfo.addClass('show');
        if (exhibitionInfo.hasClass("grey")) {
            $('#main').css('background-color', '#B2B0B3');
        } else if (exhibitionInfo.hasClass("pink")) {
            $('#main').css('background-color', '#FFADCD');
        }

        $('.projects-previews').removeClass('landing-masthead');
        //$('.landing-masthead').fadeOut('fast');

        setTimeout(function () {
            $('.landing-masthead-open').fadeIn('slow');
            mobileMastheadOpen.fadeIn('slow');
        }, 250);
        $('#scroll').addClass('show');
        var projectIndex = projectPreview.index();
        projects.children('li').eq(projectIndex).add(projectPreview).addClass('selected');
        $('.projects li:not(.selected)').addClass('turn-off');


        if (transitionsNotSupported) {
            projectPreviews.addClass('slide-out').removeClass('selected');
            projects.children('li').eq(projectIndex).addClass('content-visible');
            animating = false;
        } else {
            slideToggleProjects(projectPreviews, projectIndex, 0, true);
        }
    }
    $('#bff-blue').click(function () {
        exhibitionInfo.addClass('blue');
        exhibitionInfo.removeClass('pink');
        exhibitionInfo.removeClass('grey');
    });

    $('#bff-pink').click(function () {
        exhibitionInfo.addClass('pink');
        exhibitionInfo.removeClass('blue');
        exhibitionInfo.removeClass('grey');
    });

    $('#companion').click(function () {
        exhibitionInfo.addClass('grey');
        exhibitionInfo.removeClass('pink');
        exhibitionInfo.removeClass('blue');
    });

    function closeProject() {
        exhibitionInfo.removeClass('show');
        langSwitch.addClass('show');
        mobileMasthead.addClass('show');
        mobileMastheadOpen.fadeOut('fast');//????fadeout 不起作用
        mobileMastheadOpen.hide();
        $('#main').css('background-color', '#0E3DC1');
        setTimeout(function () {
            //$('.landing-masthead').fadeIn('fast');
            $('.projects-previews').addClass('landing-masthead');
        }, 250);
        $('.landing-masthead-open').fadeOut('fast');
        $('.landing-masthead-open').hide()
        setTimeout(function () {
            $('.projects li.turn-off').fadeIn('fast');
            $('.projects li.turn-off').removeClass('turn-off');
        }, 100);
        projects.find('.selected').removeClass('selected').on(
            'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
            function () {
                $(this).removeClass('content-visible').off(
                    'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
                slideToggleProjects(projectsPreviewWrapper.children('li'), -1, 0, false);
            });

        //if browser doesn't support CSS transitions...
        if (transitionsNotSupported) {
            projectPreviews.removeClass('slide-out');
            projects.find('.content-visible').removeClass('content-visible');
            animating = false;
        }
    }


    function slideToggleProjects(projectsPreviewWrapper, projectIndex, index, bool) {

        if (index == 0) createArrayRandom();
        if (projectIndex != -1 && index == 0) index = 1;

        var randomProjectIndex = makeUniqueRandom();
        if (randomProjectIndex == projectIndex) randomProjectIndex = makeUniqueRandom();

        if (index < numRandoms - 1) {
            projectsPreviewWrapper.eq(randomProjectIndex).toggleClass('slide-out', bool);
            setTimeout(function () {
                //animate next preview project
                slideToggleProjects(projectsPreviewWrapper, projectIndex, index + 1, bool);
            }, 0);
        } else if (index == numRandoms - 1) {
            //this is the last project preview to be animated
            projectsPreviewWrapper.eq(randomProjectIndex).toggleClass('slide-out', bool).one(
                'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
                function () {
                    if (projectIndex != -1) {
                        projects.children('li.selected').addClass('content-visible');
                        $('.projects li:not(.selected)').addClass('turn-off');
                        $('.projects li.turn-off').fadeOut('slow');
                        projectsPreviewWrapper.eq(projectIndex).addClass('slide-out').removeClass('selected');
                    }
                    // else if (navigation.hasClass('nav-visible') && bool) {
                    //     navigation.addClass('nav-clickable');
                    // }
                    projectsPreviewWrapper.eq(randomProjectIndex).off(
                        'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
                    animating = false;
                });
        }
    }
    //http://stackoverflow.com/questions/19351759/javascript-random-number-out-of-5-no-repeat-until-all-have-been-used
    function makeUniqueRandom() {
        var index = Math.floor(Math.random() * uniqueRandoms.length);
        var val = uniqueRandoms[index];
        // now remove that value from the array
        uniqueRandoms.splice(index, 1);
        return val;
    }

    function createArrayRandom() {
        //reset array
        uniqueRandoms.length = 0;
        for (var i = 0; i < numRandoms; i++) {
            uniqueRandoms.push(i);
        }
    }
});
