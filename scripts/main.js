var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

var LEFT_BUTTON_SELECTOR = '[data-image-role="left_button"]';
var RIGHT_BUTTON_SELECTOR = '[data-image-role="right_button"]';


function setDetails(imageUrl, titleText, index) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    detailImage.setAttribute('image_index', index);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function indexFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-index');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail), indexFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function getLeftButton() {
    'use strict';
    var leftButtons = document.querySelectorAll(LEFT_BUTTON_SELECTOR);
    var leftButtonsArray = [].slice.call(leftButtons);
    return leftButtonsArray;
}

function getRightButton() {
    'use strict';
    var rightButtons = document.querySelectorAll(RIGHT_BUTTON_SELECTOR);
    var rightButtonsArray = [].slice.call(rightButtons);
    return rightButtonsArray;
}

function addLeftButtonClickHandler(button) {
    'use strict';
    button.addEventListener('click', function (event) {
        event.preventDefault();

        var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
        var index = parseInt(detailImage.getAttribute('image_index'), 10);

        index = index - 1;
        if (index < 1) {
            index = 10;
        }
        var thumbnailArray = getThumbnailsArray();

        setDetailsFromThumb(thumbnailArray[index - 1]);
        showDetails();

    });
}

function addRightButtonClickHandler(button) {
    'use strict';
    button.addEventListener('click', function (event) {
        event.preventDefault();

        var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
        var index = parseInt(detailImage.getAttribute('image_index'), 10);

        index = index + 1;
        if (index > 10) {
            index = 1;
        }

        var thumbnailArray = getThumbnailsArray();

        setDetailsFromThumb(thumbnailArray[index - 1]);
        showDetails();

    });
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();

    var leftButtons = getLeftButton();
    leftButtons.forEach(addLeftButtonClickHandler);

    var rightButtons = getRightButton();
    rightButtons.forEach(addRightButtonClickHandler);
}


initializeEvents();