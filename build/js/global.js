(function () {
  'use strict';

  var $ = jQuery.noConflict();

  var $document = $(document);
  var $window = $(window);
  var $html = $(document.documentElement);
  var $body = $(document.body);

  var $$1 = jQuery.noConflict();
  var wrapper = $$1('.l-main');
  var footer = $$1('.l-footer');
  var footer_inner = $$1('.l-footer__inner');

  var helper = {

    breakpoint: {
      small: window.matchMedia('(min-width: 580px)'),
      medium: window.matchMedia('(min-width: 769px)'),
      large: window.matchMedia('(min-width: 1025px)'),
      xlarge: window.matchMedia('(min-width: 1501px)')
    },

    touch_support: Modernizr.touch,

    set_padding: function set_padding(callback, elem) {

      var self = this,
        elem_offset_left = $$1(elem).offset().left,
        padding_left_l_up = $$1('.padding--left'),
        padding_right_l_up = $$1('.padding--right');

      padding_left_l_up.each(function () {
        $$1(this).css('padding-left', elem_offset_left + 'px');
      });

      padding_right_l_up.each(function () {
        $$1(this).css('padding-right', elem_offset_left + 'px');
      });

      callback();
    },
    shuffle_array: function shuffle_array(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var _ref = [array[j], array[i]];
        array[i] = _ref[0];
        array[j] = _ref[1];
      }
    },
    sticky_footer: function sticky_footer() {

      var footer_height = footer_inner.outerHeight();

      if (helper.breakpoint.large.matches) {
        wrapper.css('margin-bottom', footer_height + 'px');
        footer.css('height', footer_height + 'px');
      } else {
        wrapper.css('margin-bottom', 0);
        footer.css('height', 'auto');
      }
    },
    sticky_footer_animation: function sticky_footer_animation() {

      var self = this,
        footer_height = footer_inner.outerHeight(),
        footer_top = $$1('.l-main').outerHeight(true),
        trigger_point = $document.height() - $window.height() - footer_height;

      if (helper.breakpoint.large.matches) {

        if ($window.scrollTop() > trigger_point) {

          var opacity = (footer_top - $window.height() - $window.scrollTop() + self.calc_padding_top()) / footer_height / 10 * 12;
          var transform = (footer_top - $window.height() - $window.scrollTop() + self.calc_padding_top()) / 3;

          footer_inner.css({
            'transform': 'translate3d(0,' + transform + 'px, 0)',
            '-webkit-transform': 'translate3d(0, ' + transform + 'px, 0)',
            'opacity': 1 - opacity
          });
        }
      }
    },
    calc_padding_top: function calc_padding_top() {

      var reveal_slides_count = $document.find('.reveal-slider__slide').length;

      if (reveal_slides_count > 0) return $window.height() * reveal_slides_count;
      else return 0;
    },
    home_padding_top: function home_padding_top() {

      var self = this;

      if (!bowser.msie) $$1('.site .home').css('padding-top', self.calc_padding_top() + 'px');
    },
    scroll_disable: function scroll_disable() {
      // $window.disablescroll();

      $$1('.site').css('top', -$$1(window).scrollTop());
      $$1('html').addClass('scroll-lock');
    },
    scroll_enable: function scroll_enable() {
      // $window.disablescroll('undo');

      if ($$1('html').hasClass('scroll-lock')) {

        var reset_scroll = parseInt($$1('.site').css('top')) * -1;

        $$1('html').removeClass('scroll-lock');
        $$1('.site').css('top', 'auto');
        $$1('html, body').animate({
          scrollTop: reset_scroll
        }, 0);
      }
    }
  };

  var wait_for_final_event = function () {

    var timers = {};

    return function (callback, ms, uniqueId) {
      if (!uniqueId) {
        // don't call this twice without a uniqueID
        uniqueId = Math.random() * 1000;
      }
      if (timers[uniqueId]) {
        clearTimeout(timers[uniqueId]);
      }
      timers[uniqueId] = setTimeout(callback, ms);
    };
  }();

  var $$2 = jQuery.noConflict();

  var ajax = {
    init: function init() {
      this.load_maker();
    },
    load_maker: function load_maker() {

      $$2('[data-maker]').on('click', function () {

        var $id = $$2(this).data('id'),
          $prev_id = $$2(this).data('prev-id'),
          $next_id = $$2(this).data('next-id');

        $$2.ajax({
          type: 'POST',
          url: six.ajaxurl,
          cache: false,
          data: {
            action: 'create_maker_profile',
            id: $id,
            prev_id: $prev_id,
            next_id: $next_id
          },
          beforeSend: function beforeSend() {
            $$2('#maker-name').hide();
            $$2('.c-maker').removeClass('semi-opaque');
            $$2('#preloader').addClass('animate--fade-in-init');
            $body.css('cursor', 'progress');
            $$2('.search-overlay').addClass('active');
          },
          success: function success(response) {
            $$2('#maker-profile').html(response);
            $$2('.search-overlay').removeClass('active');
            $$2('.c-profile').delay(100).queue(function (next) {
              $$2(this).addClass('c-profile--active');
              $body.css('cursor', 'default');
              helper.scroll_disable();
              $$2('.c-profile').disablescroll('undo');
              next();
            });
          },
          error: function error(_error) {
            console.error(_error);
          }
        });
      });
    }
  };

  var $$3 = jQuery.noConflict();

  var layout = new function () {
    var _this = this;

    var width;

    function setUpWidth() {
      width = $$3('body').width();
    }

    $$3(window).resize(setUpWidth);

    this.init = function () {
      setUpWidth();
    };

    this.Breakpoints = new function () {
      this.xs = 0;
      this.sm = 420;
      this.md = 740;
      this.lg = 992;
      this.xl = 1374;
      this.xxl = 1732;
    }();

    this.Grid = new function () {

      var COLUMNS_NUMBER = 24;

      this.marginWidth = function () {
        if (width < _this.Breakpoints.sm) {
          return 20;
        } else if (width < _this.Breakpoints.xl) {
          return 0.05 * width;
        } else return 0.07 * width;
      };

      this.containerWidth = function () {
        return width - this.marginWidth() * 2;
      };

      this.gutterWidth = function () {
        if (width < _this.Breakpoints.xl) {
          return 35;
        }
        return 20;
      };

      this.columnWidth = function () {
        return (this.containerWidth() - (COLUMNS_NUMBER - 1) * this.gutterWidth()) / COLUMNS_NUMBER;
      };

      this.cols = function (n) {
        return this.columnWidth() * n + this.gutterWidth() * (n - 1);
      };
    }();

    var scrollBarWidthCached;

    this.getScrollbarWidth = function () {

      if (scrollBarWidthCached !== undefined) {
        return scrollBarWidthCached;
      }

      var inner = document.createElement('p');
      inner.style.width = "100%";
      inner.style.height = "200px";

      var outer = document.createElement('div');
      outer.style.position = "absolute";
      outer.style.top = "0px";
      outer.style.left = "0px";
      outer.style.visibility = "hidden";
      outer.style.width = "200px";
      outer.style.height = "150px";
      outer.style.overflow = "hidden";
      outer.appendChild(inner);

      document.body.appendChild(outer);
      var w1 = inner.offsetWidth;
      outer.style.overflow = 'scroll';
      var w2 = inner.offsetWidth;
      if (w1 == w2) w2 = outer.clientWidth;

      document.body.removeChild(outer);

      scrollBarWidthCached = w1 - w2;
      return scrollBarWidthCached;
    };
  }();

  var $$4 = jQuery.noConflict();

  var ContentLoader = function ContentLoader(loadMoreItem, onLoadMoreCallback) {

    // var onScrollCallback = void 0;
    // var loadMoreAPICall = void 0;
    // var nextPage = void 0;

    // this.init = function () {
    //     nextPage = 2;

    //     var pageFromURL = URI(document.location.href).query(true).page;
    //     if (pageFromURL) {
    //         nextPage = parseInt(pageFromURL) + 1;
    //     }
    // };

    // this.enable = function () {

    //     loadMoreItem.show();

    //     onScrollCallback = function onScrollCallback() {

    //         if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - window.innerHeight * 3) {

    //             if (loadMoreAPICall) {
    //                 return;
    //             }

    //             var newUrl = URI(document.location.href).removeQuery("page").addQuery("page", nextPage);

    //             history.replaceState({}, null, newUrl.toString());

    //             newUrl.addQuery("ajax", true);

    //             loadMoreAPICall = $$4.get({
    //                 url: newUrl.toString(),
    //                 cache: false,
    //                 success: function success(response, status, xhr) {

    //                     loadMoreAPICall = undefined;
    //                     nextPage++;

    //                     onLoadMoreCallback(response, status, xhr);
    //                 },
    //                 error: function error() {
    //                     console.error('API call for more items error');
    //                 },
    //                 dataType: "html"
    //             });
    //         }
    //     };

    //     $$4(window).scroll(onScrollCallback);
    // };

    // this.disable = function () {
    //     loadMoreItem.hide();
    //     $window.off('scroll', onScrollCallback);
    // };

    // this.deinit = function () {
    //     $window.off('scroll', onScrollCallback);
    // };
  };

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };


  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();


  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var $$5 = jQuery.noConflict();

  var IrregularGrid = function () {
    function IrregularGrid(section) {
      classCallCheck(this, IrregularGrid);

      this.section = section;
    }

    createClass(IrregularGrid, [{
      key: 'init',
      value: function init() {
        var _this2 = this;

        if (this.section.length == 0) {
          return;
        }

        this._onResizeCallback = function () {
          _this2._showUnrenderedItems();
        };

        $window.resize(this._onResizeCallback);

        // If there are more items to load
        // var loadMoreItem = this.section.find('.LoadMore');
        // if (loadMoreItem.length > 0) {

        //     this.contentLoader = new ContentLoader(loadMoreItem, function (response, status, xhr) {

        //         var parsed = $$5(response);
        //         var newItems = parsed.find('.mobile-container .items > *');

        //         _this2.addItems(newItems);

        //         // initContentLoader again
        //         if (parsed.find('section.irregular-grid .LoadMore').length === 0) {
        //             _this2.contentLoader.disable();
        //         }
        //     });

        //     this.contentLoader.init();
        //     this.contentLoader.enable();
        // }

        // Let's split items into parts (2 column groups and featured);
        this.parts = [];
        this.part = undefined;

        this._initItems(this.section.find('.items').children());
        this._showUnrenderedItems();

        this.section.addClass('visible');
      }
    }, {
      key: 'deinit',
      value: function deinit() {
        if (this.contentLoader) {
          this.contentLoader.deinit();
        }
        // $window.off('scroll', this._onScrollCallback);
        $window.off('resize', this._onResizeCallback);
      }
    }, {
      key: 'addItems',
      value: function addItems(items) {

        this.section.find('.mobile-container .items').append(items);

        this._initItems(items);
        this._showUnrenderedItems();
      }
    }, {
      key: '_initItems',
      value: function _initItems(items) {
        var _this = this;

        // If items are not a first portion of items added to a grid, we must be prepared that new items will continue non featured part.
        var lastPart = _this.parts[_this.parts.length - 1];

        if (typeof lastPart !== 'undefined' && lastPart.featured === false) {
          _this.part = _this.parts.pop();
        }

        items.each(function (item, index) {
          // $(this).find('.inner').css('padding-bottom', (Math.random() < 0.5 || $(this).hasClass('featured')) ? '80%' : '125%');

          if ($$5(this).hasClass('featured')) {

            if (typeof _this.part !== 'undefined') {
              _this.parts.push(_this.part);
              _this.part = undefined;
            }

            _this.parts.push({
              featured: true,
              left: true,
              elem: {
                rendered: false,
                item: $$5(this)
              }
            });
          } else {
            if (typeof _this.part !== 'undefined') {
              _this.part.elems.push({
                rendered: false,
                item: $$5(this)
              });
            } else {
              _this.part = {
                featured: false,
                elems: [{
                  item: $$5(this),
                  rendered: false
                }],
                left: {
                  snapped: false,
                  even: true,
                  bottom: 0
                },
                right: {
                  snapped: true,
                  even: true,
                  bottom: 0
                }
              };
            }
          }
        });

        if (typeof _this.part !== 'undefined') {
          _this.parts.push(_this.part);
          _this.part = undefined;
        }
      }
    }, {
      key: '_showUnrenderedItems',
      value: function _showUnrenderedItems() {

        if (window.innerWidth < layout.Breakpoints.lg) {
          this.section.find('.lazy-container img').addClass('lazyload');
          return;
        }

        var previousPart;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var part = _step.value;


            /** FEATURED */
            if (part.featured) {

              // If featured element already rendered, just pass
              if (part.elem.rendered) {
                continue;
              }

              var container = $$5('<div class="grid__row"><div class="item featured"><div class="item-inner"></div></div></div>');
              container.appendTo(this.section.find('.desktop-container'));

              var item = container.find('.item');

              console.log('featured');
              if (typeof previousPart !== 'undefined') {
                if (previousPart.featured && previousPart.left) {
                  part.left = false;
                } else if (!previousPart.featured && previousPart.left.bottom > previousPart.right.bottom) {
                  part.left = false;
                }
                console.log('not first');
              } else {
                console.log('first');

                // if (typeof previousPart === 'undefined') {
                item.addClass('first'); // first section out of all grid sections
                // }
              }

              item.addClass(part.left ? 'left' : 'right');

              part.elem.item.clone().appendTo(item.find('.item-inner'));
              part.elem.rendered = true;
            }
            /** STANDARD */
            else {

              // If this container was never rendered, render it, if it was, just let's algorithm continue
              if (typeof part.left.container === 'undefined') {
                var container = $$5('<div class="grid__row two-cols-container"><div class="col-left"><div class="grid__row"></div></div><div class="col-right"><div class="grid__row"></div></div></div>');
                container.appendTo(this.section.find('.desktop-container'));

                part.left.container = container.find('.col-left');
                part.right.container = container.find('.col-right');
              }

              for (var index = 0; index < part.elems.length; index++) {
                var elem = part.elems[index];

                // If this item was already rendered, just continue
                if (elem.rendered) {
                  continue;
                }

                elem.rendered = true;

                if (part.left.bottom <= part.right.bottom) {
                  var params = part.left;
                } else {
                  var params = part.right;
                }

                var item = $$5('<div class="item"><div class="item-inner"></div></div>');
                if (params.even) {
                  item.addClass('even');
                } else {
                  item.addClass('odd');
                }

                if (typeof previousPart === 'undefined') {
                  item.addClass('first'); // first section out of all grid sections
                }

                if (params.snapped) {
                  item.addClass('snapped');
                }

                elem.item.clone().appendTo(item.find('.item-inner'));

                params.container.find('.grid__row').append(item);

                params.bottom = item.offset().top + item.outerHeight();
                params.even = !params.even;
                params.snapped = !params.snapped;
              }
            }

            previousPart = part;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (window.innerWidth >= layout.Breakpoints.lg) {
          this.section.find('.desktop-container .lazy-container img').addClass('lazyload');
          return;
        }
      }
    }]);
    return IrregularGrid;
  }();

  var $$6 = jQuery.noConflict();

  var PhotosGrid = function () {
    function PhotosGrid(section) {
      classCallCheck(this, PhotosGrid);

      this.section = section;
    }

    createClass(PhotosGrid, [{
      key: 'init',
      value: function init() {
        var _this = this;

        if (this.section.length == 0) {
          return;
        }

        // If there are more items to load
        var loadMoreItem = this.section.find('.LoadMore');
        if (loadMoreItem.length > 0) {

          this.contentLoader = new ContentLoader(loadMoreItem, function (response, status, xhr) {

            var parsed = $$6(response);
            var newItems = parsed.find('.SectionPhotosGrid .SectionPhotosGrid__item');

            newItems.appendTo($$6('.SectionPhotosGrid .row'));

            // initContentLoader again
            if (parsed.find('.SectionPhotosGrid .LoadMore').length === 0) {
              _this.contentLoader.disable();
            }
          });

          this.contentLoader.init();
          this.contentLoader.enable();
        }

        this.section.addClass('visible');

        var hugeTitleContainer = $$6('.HugeProjectTitle');
        var hugeTitle = $$6('.HugeProjectTitle__title');

        var timer;

        if (bowser.mobile || bowser.touch) {
          hugeTitleContainer.remove();
        } else {
          this.section.on('mouseover', '.js-photos-grid-item', function () {

            clearTimeout(timer);

            hugeTitle.text($$6(this).data('title'));
            hugeTitleContainer.addClass('active');

            $$6('.js-photos-grid-item').addClass('inactive');
            $$6(this).removeClass('inactive');
          });

          this.section.on('mouseout', '.js-photos-grid-item', function () {

            clearTimeout(timer);

            timer = setTimeout(function () {
              hugeTitleContainer.removeClass('active');
              $$6('.js-photos-grid-item').removeClass('inactive');
            }, 300);
          });
        }
      }
    }, {
      key: 'deinit',
      value: function deinit() {
        if (this.contentLoader) {
          this.contentLoader.deinit();
        }
      }
    }]);
    return PhotosGrid;
  }();

  var $$7 = jQuery.noConflict();

  var Accordion = {
    $component: $$7('.js-accordion'),

    init: function init() {
      if (!this.$component.length) {
        return;
      }

      var $accordionElement = this.$component.find('.js-accordion-element');
      var $accordionElementHead = this.$component.find('.js-accordion-head');
      var $accordionElementBody = this.$component.find('.js-accordion-body');

      $accordionElementHead.on('click', function () {
        Accordion.toggle($$7(this).parent());
      });
    },
    updateDynamicTitle: function updateDynamicTitle($accordionElement, text) {
      $accordionElement.find('.js-accordion-dynamic-title').html(text);
    },
    clearDynamicTitle: function clearDynamicTitle($accordionElement) {
      $accordionElement.find('.js-accordion-dynamic-title').empty();
    },
    toggle: function toggle($accordionElement) {
      $accordionElement.toggleClass('is-closed');
    },
    close: function close($accordionElement) {
      $accordionElement.addClass('is-closed');
    }
  };

  var $$8 = jQuery.noConflict();

  var drawer = {
    $component: $$8('.js-drawer'),
    $content: $$8('.js-drawer-content'),
    $closeDarwerHook: $$8('.js-close-drawer-hook'),
    activeClass: 'is-opened',
    preCloseAnimationClass: 'is-ready-to-close',
    callbacks: [],

    /**
     * Init function
     * define component behavior,
     * adds event listeners etc.
     */
    init: function init() {
      var _this = this;

      if (!this.$component.length) {
        return;
      }

      $$8('[data-open-drawer]').on('click', function () {
        drawer.open($$8(this).data('open-drawer'));
      });

      this.$component.find('.c-drawer__background').click(function () {
        var id = $$8(this).parent().attr('id');
        drawer.close('#' + id);
      });

      // this.$component.on('click', function(e) {
      //     e.stopPropagation();
      //     drawer.close(`#${this.id}`);
      // });

      this.$component.find('.c-drawer__background').hover(function () {
        $$8($$8(this).parent().find('.c-drawer__wrapper')[0]).addClass('peaking-out');
      }, function () {
        $$8($$8(this).parent().find('.c-drawer__wrapper')[0]).removeClass('peaking-out');
      });

      // prevent propagating events when they are fired on content layer
      this.$content.on('click', function (e) {
        e.stopPropagation();
      });

      this.$closeDarwerHook.on('click', function (e) {
        e.stopPropagation();
        _this.close(this.dataset.id);
      });
    },


    /**
     * Moves content wrapper slighty to the right
     */
    _addPreCloseAnimation: function _addPreCloseAnimation() {
      this.$component.addClass(this.preCloseAnimationClass);
    },


    /**
     * Resets content wrapper position
     */
    _removePreCloseAnimation: function _removePreCloseAnimation() {
      this.$component.removeClass(this.preCloseAnimationClass);
    },


    /**
     * Opens drawer
     */
    open: function open(id) {
      if (bowser.mobile) {
        setTimeout(function () {
          if (!$$8('body').hasClass('is-scrolling')) {
            $$8(id).addClass(drawer.activeClass);
            $$8('body').addClass('has-drawer-opened');
          } else {
            return;
          }
        }, 150);
      } else {
        $$8(id).addClass(drawer.activeClass);
        $$8('body').addClass('has-drawer-opened');
      }

      $body.addClass('noscroll');
    },


    /**
     * Closes drawer
     */
    close: function close(id) {
      $$8(id).removeClass(this.activeClass);
      $body.removeClass('noscroll');

      // If we close drawer, we close all other drawers inside that drawer
      var _this = this;

      $$8(id).find('.c-drawer').each(function () {
        _this.close('#' + $$8(this).attr('id'));
      });
    }
  };

  var $$9 = jQuery.noConflict();

  var ProjectsFilters = {
    $forms: $$9('.js-projects-filters'),
    $mobileComponent: $$9('.js-projects-filters-mobile'),
    $desktopComponent: $$9('.js-projects-filters-desktop'),
    $toggleComponent: $$9('.js-projects-filters-open'),
    $toggleComponentTarget: $$9('.js-projects-filters-toggle-target'),
    $grid: $$9('.js-projects-grid'),
    $resetButton: $$9('.js-projects-filters-reset'),
    $submitButton: $$9('.js-projects-filters-submit'),

    $desktopFilterOpener: $$9('.js-projects-filters-header-desktop'),
    $desktopFilter: $$9('[data-desktop-filter]'),

    $filterLabels: $$9('.js-projects-filters-label'),

    $categoriesBackground: $$9('.js-categories-background'),
    $categoriesBackgroundUnclick: $$9('.js-categories-background-unclick'),

    $switchGridBigButton: $$9('.js-switch-grid-big'),
    $switchGridSmallButton: $$9('.js-switch-grid-small'),

    response: [],
    componentOpenedScrollPosition: 0,
    xhr: undefined,
    irregularGrid: undefined,
    photosGrid: undefined,
    initializing: true,
    isSmallGrid: undefined,
    state: {},

    init: function init() {
      var componentsExist = !!this.$forms.length;

      if (!componentsExist) {
        return;
      }

      if ($$9('.irregular-grid').length > 0) {
        this.isSmallGrid = false;
        this.irregularGrid = new IrregularGrid($$9('.irregular-grid'));
        this.irregularGrid.init();
      } else {
        this.photosGrid = new PhotosGrid($$9('.SectionPhotosGrid'));
        this.photosGrid.init();
      }

      this._stateInit();

      this._addEventListeners();

      this._updateDOMFromState();
    },
    _getCuteNameForFilter: function _getCuteNameForFilter(key, value) {
      return this.$desktopComponent.find('input[name=' + key + '][value=' + value + ']').parent().find('.js-projects-filters-title').html().trim();
    },
    _stateInit: function _stateInit() {
      var _this2 = this;

      var serializedForm = this.$desktopComponent.serializeArray();

      serializedForm.forEach(function (option, index) {
        _this2._stateAddValue(option.name, option.value);
      });
    },
    _stateReset: function _stateReset() {
      this.state = {};
    },
    _stateAddValue: function _stateAddValue(key, value) {
      if (!this.state[key]) {
        this.state[key] = [];
      }

      if (this.state[key].indexOf(value) === -1) {
        this.state[key].push(value);
      }
    },
    _stateRemoveValue: function _stateRemoveValue(key, value) {
      if (!this.state[key]) {
        return;
      }

      var index = this.state[key].indexOf(value);
      if (index > -1) {
        this.state[key].splice(index, 1);
      }

      if (this.state[key].length === 0) {
        delete this.state[key];
      }
    },
    _updateDOMFromState: function _updateDOMFromState() {
      var _this3 = this;

      // Update input values
      this.$forms.find('input').each(function (index, item) {
        var key = $$9(item).attr('name');
        var value = $$9(item).attr('value');

        if (_this3.state[key] && _this3.state[key].indexOf(value) > -1) {
          $$9(item).attr('checked', true);
        } else {
          $$9(item).removeAttr('checked');
        }
      });

      // Update filter titles
      var totalCount = 0;

      this.$filterLabels.each(function (index, labelNode) {

        labelNode = $$9(labelNode);

        var key = labelNode.data('id');

        var count = _this3.state[key] ? _this3.state[key].length : 0;

        if (count == 0) {
          labelNode.html(labelNode.data('default'));
        } else if (count == 1) {
          labelNode.html(_this3._getCuteNameForFilter(key, _this3.state[key][0]));
        } else {
          labelNode.html(labelNode.data('default') + "<span class='count'>" + count + "</sup>");
        }

        totalCount += count;
      });

      totalCount /= 2; // mobile and destkop counted!

      // Reset and submit button
      if (totalCount > 0) {
        this.$resetButton.removeAttr('disabled');
        // this.$submitButton.removeAttr('disabled');
      } else {
        this.$resetButton.attr('disabled', true);
        // this.$submitButton.attr('disabled', true);
      }

      // Mobile indicator of number of items
      this.$toggleComponent.find('[data-selected-options-num]').attr('data-selected-options-num', totalCount);
    },
    _addEventListeners: function _addEventListeners() {
      var _this4 = this;

      $window.on('resize', function () {
        _this4._handleResize();
      });

      $window.on('scroll', function () {
        _this4._handleScroll();
      });

      // Opening and closing desktop filters
      // $body.on('click', function () {
      //     ProjectsFilters.closeDesktopFilter();
      // });

      this.$categoriesBackgroundUnclick.on('click', function (e) {
        e.stopPropagation();
        ProjectsFilters.closeDesktopFilter();
      });

      this.$desktopComponent.on('click', function (e) {
        e.stopPropagation();
      });

      this.$desktopFilterOpener.on('click', function (e) {
        e.stopPropagation();

        if ($$9(this).hasClass('is-selected')) {
          ProjectsFilters.closeDesktopFilter();
        } else {
          ProjectsFilters.openDesktopFilter($$9(this).data('id'));
        }
      });

      this.$forms.on('reset', function (e) {
        ProjectsFilters._handleReset(e);
        ProjectsFilters.closeDesktopFilter();
        ProjectsFilters._fetchData();
      });

      this.$forms.on('submit', function (e) {
        e.preventDefault();

        ProjectsFilters._fetchData();
      });

      this.$switchGridBigButton.on('click', function () {
        _this4._fetchData(false);
      });

      this.$switchGridSmallButton.on('click', function () {
        _this4._fetchData(true);
      });

      this.$forms.on('change', 'input', function (ev) {

        if (!ev) {
          return;
        } // if change not done by clicking, just ignore, it's update DOM from state

        var key = $$9(ev.target).attr('name');
        var value = $$9(ev.target).attr('value');
        var checked = $$9(ev.target).is(':checked');

        if (checked) {
          _this4._stateAddValue(key, value);
        } else {
          _this4._stateRemoveValue(key, value);
        }

        _this4._updateDOMFromState();

        ProjectsFilters.closeDesktopFilter();

        // For desktop reload after change
        if (window.innerWidth > 1374) {
          ProjectsFilters._fetchData();
        }
      });

      this.$desktopComponent.addClass('visible');
    },
    openDesktopFilter: function openDesktopFilter(filterId) {

      this.closeDesktopFilter();

      $$9('.js-projects-filters-header-desktop[data-id=' + filterId + ']').addClass('is-selected');

      var category = $$9('[data-desktop-filter="' + filterId + '"]');
      category.addClass('is-opened');
      // this.$categoriesBackground.parent().css('height', '100vw');
      this.$categoriesBackground.css('transform', 'translateY(' + category.outerHeight() + 'px)');

      this.$desktopComponent.addClass('is-opened');
      this.componentOpenedScrollPosition = $document.scrollTop();
    },
    closeDesktopFilter: function closeDesktopFilter() {
      this.$desktopComponent.removeClass('is-opened');
      this.$desktopFilter.removeClass('is-opened');
      this.$categoriesBackground.css('transform', 'none');
      // this.$categoriesBackground.parent().height(0);

      this.$desktopFilterOpener.removeClass('is-selected');
    },
    _fetchData: function _fetchData(loadSmallGrid) {
      var _this5 = this;

      if (typeof loadSmallGrid === 'undefined') {
        loadSmallGrid = window.location.href.indexOf('smallgrid') !== -1;
      }

      this.$switchGridBigButton.hide();
      this.$switchGridSmallButton.hide();

      if (loadSmallGrid) {
        this.$switchGridBigButton.show();
      } else {
        this.$switchGridSmallButton.show();
      }

      this._abortCurrentFetch();

      var url = URI(window.location.href).query({}).toString();

      var queryString = "";

      for (var key in this.state) {
        if (this.state.hasOwnProperty(key)) {

          this.state[key].forEach(function (val) {
            if (queryString.length > 0) {
              queryString += "&";
            }
            queryString = queryString + key + "[]=" + val;
          });
        }
      }

      // small grid
      if (loadSmallGrid) {
        if (queryString.length > 0) {
          queryString += "&";
        }
        queryString += "smallgrid";
      }

      if (queryString.length > 0) {
        url = url + "?" + queryString;
      }

      history.replaceState({}, null, url);

      this.$grid.removeClass('visible');
      this.$grid.css('pointer-events', 'none');
      $body.addClass('is-waiting');

      setTimeout(function () {
        return $window.scrollTop(0);
      }, 300);

      this.xhr = $$9.ajax({
        type: 'get',
        url: window.location,
        cache: false,
        data: ProjectsFilters.$mobileComponent.attr('action')
      }).done(function (response) {
        ProjectsFilters.response = response;
        // ProjectsFilters.filteredElementsNum = $(response).find('.js-projects-filters-project').length;
        // ProjectsFilters.updateFilteredItemsNum();

        var $html$$1 = $$9(ProjectsFilters.response);

        if ($$9('.irregular-grid').length > 0) {
          _this5.irregularGrid.deinit();
        } else {
          _this5.photosGrid.deinit();
        }

        var newGrid = void 0;
        if ($html$$1.find('.irregular-grid').length > 0) {
          newGrid = $html$$1.find('.irregular-grid');
        } else {
          newGrid = $html$$1.find('.SectionPhotosGrid');
        }

        _this5.$grid.replaceWith(newGrid);
        _this5.$grid = newGrid;

        if ($$9('.irregular-grid').length > 0) {
          _this5.irregularGrid = new IrregularGrid(newGrid);
          _this5.irregularGrid.init();
        } else {
          _this5.photosGrid = new PhotosGrid(newGrid);
          _this5.photosGrid.init();
        }

        _this5.$grid.removeClass('visible');

        setTimeout(function () {
          _this5.$grid.addClass('visible');
          $body.removeClass('is-waiting');
        }, 200);

        // const newGrid = $html.find('section.irregular-grid');
        //
        //     this.irregularGrid.deinit();
        //
        //     this.$grid.replaceWith(newGrid);
        //     this.$grid = newGrid;
        //
        //     this.irregularGrid = new IrregularGrid(newGrid);
        //     this.irregularGrid.init();
        //
        //     this.$grid.removeClass('visible');
        //
        //     setTimeout(() => {
        //         this.$grid.addClass('visible')
        //         $body.removeClass('is-waiting');
        //     }, 200);
        //
        // }
        // else {
        //
        //     const newGrid = $html.find('.SectionPhotosGrid');
        //
        //     console.log('NEWGRID', newGrid);
        //
        //     this.photosGrid.deinit();
        //
        //     this.$grid.replaceWith(newGrid);
        //     this.$grid = newGrid;
        //
        //     this.photosGrid = new PhotosGrid(newGrid);
        //     this.photosGrid.init();
        //
        //     this.$grid.removeClass('visible');
        //
        //     setTimeout(() => {
        //         this.$grid.addClass('visible')
        //         $body.removeClass('is-waiting');
        //     }, 200);
        //
        // }

      });

      drawer.close('#projects-filters-mobile');
    },
    _abortCurrentFetch: function _abortCurrentFetch() {
      this.xhr && this.xhr.abort();
    },
    _handleReset: function _handleReset() {
      this._stateReset();
      this._updateDOMFromState();

      drawer.close('#projects-filters-mobile');
    },
    _handleResize: function _handleResize() {
      if (window.innerWidth <= 1374) {
        this.closeDesktopFilter();
      }
    },
    _handleScroll: function _handleScroll() {
      var position = $document.scrollTop();
      if (!window.innerWidth > 1374 || !this.$desktopComponent.hasClass('is-opened')) {
        return;
      }
      var scrolledDistance = Math.abs(position - this.componentOpenedScrollPosition);
      if (scrolledDistance > 200) {
        this.closeDesktopFilter();
      }
    }
  };

  // ==ClosureCompiler==
  // @compilation_level ADVANCED_OPTIMIZATIONS
  // @externs_url http://closure-compiler.googlecode.com/svn/trunk/contrib/externs/maps/google_maps_api_v3_3.js
  // ==/ClosureCompiler==

  /**
   * @name MarkerClusterer for Google Maps v3
   * @version version 1.0.1
   * @author Luke Mahe
   * @fileoverview
   * The library creates and manages per-zoom-level clusters for large amounts of
   * markers.
   */

  /**
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * A Marker Clusterer that clusters markers.
   *
   * @param {google.maps.Map} map The Google map to attach to.
   * @param {Array.<google.maps.Marker>=} opt_markers Optional markers to add to
   *   the cluster.
   * @param {Object=} opt_options support the following options:
   *     'gridSize': (number) The grid size of a cluster in pixels.
   *     'maxZoom': (number) The maximum zoom level that a marker can be part of a
   *                cluster.
   *     'zoomOnClick': (boolean) Whether the default behaviour of clicking on a
   *                    cluster is to zoom into it.
   *     'imagePath': (string) The base URL where the images representing
   *                  clusters will be found. The full URL will be:
   *                  {imagePath}[1-5].{imageExtension}
   *                  Default: '../images/m'.
   *     'imageExtension': (string) The suffix for images URL representing
   *                       clusters will be found. See _imagePath_ for details.
   *                       Default: 'png'.
   *     'averageCenter': (boolean) Whether the center of each cluster should be
   *                      the average of all markers in the cluster.
   *     'minimumClusterSize': (number) The minimum number of markers to be in a
   *                           cluster before the markers are hidden and a count
   *                           is shown.
   *     'styles': (object) An object that has style properties:
   *       'url': (string) The image url.
   *       'height': (number) The image height.
   *       'width': (number) The image width.
   *       'anchor': (Array) The anchor position of the label text.
   *       'textColor': (string) The text color.
   *       'textSize': (number) The text size.
   *       'backgroundPosition': (string) The position of the backgound x, y.
   * @constructor
   * @extends google.maps.OverlayView
   */
  function MarkerClusterer(map, opt_markers, opt_options) {
    // MarkerClusterer implements google.maps.OverlayView interface. We use the
    // extend function to extend MarkerClusterer with google.maps.OverlayView
    // because it might not always be available when the code is defined so we
    // look for it at the last possible moment. If it doesn't exist now then
    // there is no point going ahead :)
    this.extend(MarkerClusterer, google.maps.OverlayView);
    this.map_ = map;

    /**
     * @type {Array.<google.maps.Marker>}
     * @private
     */
    this.markers_ = [];

    /**
     *  @type {Array.<Cluster>}
     */
    this.clusters_ = [];

    this.sizes = [53, 56, 66, 78, 90];

    /**
     * @private
     */
    this.styles_ = [];

    /**
     * @type {boolean}
     * @private
     */
    this.ready_ = false;

    var options = opt_options || {};

    /**
     * @type {number}
     * @private
     */
    this.gridSize_ = options['gridSize'] || 60;

    /**
     * @private
     */
    this.minClusterSize_ = options['minimumClusterSize'] || 2;

    /**
     * @type {?number}
     * @private
     */
    this.maxZoom_ = options['maxZoom'] || null;

    this.styles_ = options['styles'] || [];

    /**
     * @type {string}
     * @private
     */
    this.imagePath_ = options['imagePath'] || this.MARKER_CLUSTER_IMAGE_PATH_;

    /**
     * @type {string}
     * @private
     */
    this.imageExtension_ = options['imageExtension'] || this.MARKER_CLUSTER_IMAGE_EXTENSION_;

    /**
     * @type {boolean}
     * @private
     */
    this.zoomOnClick_ = true;

    if (options['zoomOnClick'] != undefined) {
      this.zoomOnClick_ = options['zoomOnClick'];
    }

    /**
     * @type {boolean}
     * @private
     */
    this.averageCenter_ = false;

    if (options['averageCenter'] != undefined) {
      this.averageCenter_ = options['averageCenter'];
    }

    this.setupStyles_();

    this.setMap(map);

    /**
     * @type {number}
     * @private
     */
    this.prevZoom_ = this.map_.getZoom();

    // Add the map event listeners
    var that = this;
    google.maps.event.addListener(this.map_, 'zoom_changed', function () {
      // Determines map type and prevent illegal zoom levels
      var zoom = that.map_.getZoom();
      var minZoom = that.map_.minZoom || 0;
      var maxZoom = Math.min(that.map_.maxZoom || 100, that.map_.mapTypes[that.map_.getMapTypeId()].maxZoom);
      zoom = Math.min(Math.max(zoom, minZoom), maxZoom);

      if (that.prevZoom_ != zoom) {
        that.prevZoom_ = zoom;
        that.resetViewport();
      }
    });

    google.maps.event.addListener(this.map_, 'idle', function () {
      that.redraw();
    });

    // Finally, add the markers
    if (opt_markers && (opt_markers.length || Object.keys(opt_markers).length)) {
      this.addMarkers(opt_markers, false);
    }
  }

  /**
   * The marker cluster image path.
   *
   * @type {string}
   * @private
   */
  MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ = '../images/m';

  /**
   * The marker cluster image path.
   *
   * @type {string}
   * @private
   */
  MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_ = 'png';

  /**
   * Extends a objects prototype by anothers.
   *
   * @param {Object} obj1 The object to be extended.
   * @param {Object} obj2 The object to extend with.
   * @return {Object} The new extended object.
   * @ignore
   */
  MarkerClusterer.prototype.extend = function (obj1, obj2) {
    return function (object) {
      for (var property in object.prototype) {
        this.prototype[property] = object.prototype[property];
      }
      return this;
    }.apply(obj1, [obj2]);
  };

  /**
   * Implementaion of the interface method.
   * @ignore
   */
  MarkerClusterer.prototype.onAdd = function () {
    this.setReady_(true);
  };

  /**
   * Implementaion of the interface method.
   * @ignore
   */
  MarkerClusterer.prototype.draw = function () {};

  /**
   * Sets up the styles object.
   *
   * @private
   */
  MarkerClusterer.prototype.setupStyles_ = function () {
    if (this.styles_.length) {
      return;
    }

    for (var i = 0, size; size = this.sizes[i]; i++) {
      this.styles_.push({
        url: this.imagePath_ + (i + 1) + '.' + this.imageExtension_,
        height: size,
        width: size
      });
    }
  };

  /**
   *  Fit the map to the bounds of the markers in the clusterer.
   */
  MarkerClusterer.prototype.fitMapToMarkers = function () {
    var markers = this.getMarkers();
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, marker; marker = markers[i]; i++) {
      bounds.extend(marker.getPosition());
    }

    this.map_.fitBounds(bounds);
  };

  /**
   *  Sets the styles.
   *
   *  @param {Object} styles The style to set.
   */
  MarkerClusterer.prototype.setStyles = function (styles) {
    this.styles_ = styles;
  };

  /**
   *  Gets the styles.
   *
   *  @return {Object} The styles object.
   */
  MarkerClusterer.prototype.getStyles = function () {
    return this.styles_;
  };

  /**
   * Whether zoom on click is set.
   *
   * @return {boolean} True if zoomOnClick_ is set.
   */
  MarkerClusterer.prototype.isZoomOnClick = function () {
    return this.zoomOnClick_;
  };

  /**
   * Whether average center is set.
   *
   * @return {boolean} True if averageCenter_ is set.
   */
  MarkerClusterer.prototype.isAverageCenter = function () {
    return this.averageCenter_;
  };

  /**
   *  Returns the array of markers in the clusterer.
   *
   *  @return {Array.<google.maps.Marker>} The markers.
   */
  MarkerClusterer.prototype.getMarkers = function () {
    return this.markers_;
  };

  /**
   *  Returns the number of markers in the clusterer
   *
   *  @return {Number} The number of markers.
   */
  MarkerClusterer.prototype.getTotalMarkers = function () {
    return this.markers_.length;
  };

  /**
   *  Sets the max zoom for the clusterer.
   *
   *  @param {number} maxZoom The max zoom level.
   */
  MarkerClusterer.prototype.setMaxZoom = function (maxZoom) {
    this.maxZoom_ = maxZoom;
  };

  /**
   *  Gets the max zoom for the clusterer.
   *
   *  @return {number} The max zoom level.
   */
  MarkerClusterer.prototype.getMaxZoom = function () {
    return this.maxZoom_;
  };

  /**
   *  The function for calculating the cluster icon image.
   *
   *  @param {Array.<google.maps.Marker>} markers The markers in the clusterer.
   *  @param {number} numStyles The number of styles available.
   *  @return {Object} A object properties: 'text' (string) and 'index' (number).
   *  @private
   */
  MarkerClusterer.prototype.calculator_ = function (markers, numStyles) {
    var index = 0;
    var count = markers.length;
    var dv = count;
    while (dv !== 0) {
      dv = parseInt(dv / 10, 10);
      index++;
    }

    index = Math.min(index, numStyles);
    return {
      text: count,
      index: index
    };
  };

  /**
   * Set the calculator function.
   *
   * @param {function(Array, number)} calculator The function to set as the
   *     calculator. The function should return a object properties:
   *     'text' (string) and 'index' (number).
   *
   */
  MarkerClusterer.prototype.setCalculator = function (calculator) {
    this.calculator_ = calculator;
  };

  /**
   * Get the calculator function.
   *
   * @return {function(Array, number)} the calculator function.
   */
  MarkerClusterer.prototype.getCalculator = function () {
    return this.calculator_;
  };

  /**
   * Add an array of markers to the clusterer.
   *
   * @param {Array.<google.maps.Marker>} markers The markers to add.
   * @param {boolean=} opt_nodraw Whether to redraw the clusters.
   */
  MarkerClusterer.prototype.addMarkers = function (markers, opt_nodraw) {
    if (markers.length) {
      for (var i = 0, marker; marker = markers[i]; i++) {
        this.pushMarkerTo_(marker);
      }
    } else if (Object.keys(markers).length) {
      for (var marker in markers) {
        this.pushMarkerTo_(markers[marker]);
      }
    }
    if (!opt_nodraw) {
      this.redraw();
    }
  };

  /**
   * Pushes a marker to the clusterer.
   *
   * @param {google.maps.Marker} marker The marker to add.
   * @private
   */
  MarkerClusterer.prototype.pushMarkerTo_ = function (marker) {
    marker.isAdded = false;
    if (marker['draggable']) {
      // If the marker is draggable add a listener so we update the clusters on
      // the drag end.
      var that = this;
      google.maps.event.addListener(marker, 'dragend', function () {
        marker.isAdded = false;
        that.repaint();
      });
    }
    this.markers_.push(marker);
  };

  /**
   * Adds a marker to the clusterer and redraws if needed.
   *
   * @param {google.maps.Marker} marker The marker to add.
   * @param {boolean=} opt_nodraw Whether to redraw the clusters.
   */
  MarkerClusterer.prototype.addMarker = function (marker, opt_nodraw) {
    this.pushMarkerTo_(marker);
    if (!opt_nodraw) {
      this.redraw();
    }
  };

  /**
   * Removes a marker and returns true if removed, false if not
   *
   * @param {google.maps.Marker} marker The marker to remove
   * @return {boolean} Whether the marker was removed or not
   * @private
   */
  MarkerClusterer.prototype.removeMarker_ = function (marker) {
    var index = -1;
    if (this.markers_.indexOf) {
      index = this.markers_.indexOf(marker);
    } else {
      for (var i = 0, m; m = this.markers_[i]; i++) {
        if (m == marker) {
          index = i;
          break;
        }
      }
    }

    if (index == -1) {
      // Marker is not in our list of markers.
      return false;
    }

    marker.setMap(null);

    this.markers_.splice(index, 1);

    return true;
  };

  /**
   * Remove a marker from the cluster.
   *
   * @param {google.maps.Marker} marker The marker to remove.
   * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
   * @return {boolean} True if the marker was removed.
   */
  MarkerClusterer.prototype.removeMarker = function (marker, opt_nodraw) {
    var removed = this.removeMarker_(marker);

    if (!opt_nodraw && removed) {
      this.resetViewport();
      this.redraw();
      return true;
    } else {
      return false;
    }
  };

  /**
   * Removes an array of markers from the cluster.
   *
   * @param {Array.<google.maps.Marker>} markers The markers to remove.
   * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
   */
  MarkerClusterer.prototype.removeMarkers = function (markers, opt_nodraw) {
    // create a local copy of markers if required
    // (removeMarker_ modifies the getMarkers() array in place)
    var markersCopy = markers === this.getMarkers() ? markers.slice() : markers;
    var removed = false;

    for (var i = 0, marker; marker = markersCopy[i]; i++) {
      var r = this.removeMarker_(marker);
      removed = removed || r;
    }

    if (!opt_nodraw && removed) {
      this.resetViewport();
      this.redraw();
      return true;
    }
  };

  /**
   * Sets the clusterer's ready state.
   *
   * @param {boolean} ready The state.
   * @private
   */
  MarkerClusterer.prototype.setReady_ = function (ready) {
    if (!this.ready_) {
      this.ready_ = ready;
      this.createClusters_();
    }
  };

  /**
   * Returns the number of clusters in the clusterer.
   *
   * @return {number} The number of clusters.
   */
  MarkerClusterer.prototype.getTotalClusters = function () {
    return this.clusters_.length;
  };

  /**
   * Returns the google map that the clusterer is associated with.
   *
   * @return {google.maps.Map} The map.
   */
  MarkerClusterer.prototype.getMap = function () {
    return this.map_;
  };

  /**
   * Sets the google map that the clusterer is associated with.
   *
   * @param {google.maps.Map} map The map.
   */
  MarkerClusterer.prototype.setMap = function (map) {
    this.map_ = map;
  };

  /**
   * Returns the size of the grid.
   *
   * @return {number} The grid size.
   */
  MarkerClusterer.prototype.getGridSize = function () {
    return this.gridSize_;
  };

  /**
   * Sets the size of the grid.
   *
   * @param {number} size The grid size.
   */
  MarkerClusterer.prototype.setGridSize = function (size) {
    this.gridSize_ = size;
  };

  /**
   * Returns the min cluster size.
   *
   * @return {number} The grid size.
   */
  MarkerClusterer.prototype.getMinClusterSize = function () {
    return this.minClusterSize_;
  };

  /**
   * Sets the min cluster size.
   *
   * @param {number} size The grid size.
   */
  MarkerClusterer.prototype.setMinClusterSize = function (size) {
    this.minClusterSize_ = size;
  };

  /**
   * Extends a bounds object by the grid size.
   *
   * @param {google.maps.LatLngBounds} bounds The bounds to extend.
   * @return {google.maps.LatLngBounds} The extended bounds.
   */
  MarkerClusterer.prototype.getExtendedBounds = function (bounds) {
    var projection = this.getProjection();

    // Turn the bounds into latlng.
    var tr = new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng());
    var bl = new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng());

    // Convert the points to pixels and the extend out by the grid size.
    var trPix = projection.fromLatLngToDivPixel(tr);
    trPix.x += this.gridSize_;
    trPix.y -= this.gridSize_;

    var blPix = projection.fromLatLngToDivPixel(bl);
    blPix.x -= this.gridSize_;
    blPix.y += this.gridSize_;

    // Convert the pixel points back to LatLng
    var ne = projection.fromDivPixelToLatLng(trPix);
    var sw = projection.fromDivPixelToLatLng(blPix);

    // Extend the bounds to contain the new bounds.
    bounds.extend(ne);
    bounds.extend(sw);

    return bounds;
  };

  /**
   * Determins if a marker is contained in a bounds.
   *
   * @param {google.maps.Marker} marker The marker to check.
   * @param {google.maps.LatLngBounds} bounds The bounds to check against.
   * @return {boolean} True if the marker is in the bounds.
   * @private
   */
  MarkerClusterer.prototype.isMarkerInBounds_ = function (marker, bounds) {
    return bounds.contains(marker.getPosition());
  };

  /**
   * Clears all clusters and markers from the clusterer.
   */
  MarkerClusterer.prototype.clearMarkers = function () {
    this.resetViewport(true);

    // Set the markers a empty array.
    this.markers_ = [];
  };

  /**
   * Clears all existing clusters and recreates them.
   * @param {boolean} opt_hide To also hide the marker.
   */
  MarkerClusterer.prototype.resetViewport = function (opt_hide) {
    // Remove all the clusters
    for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
      cluster.remove();
    }

    // Reset the markers to not be added and to be invisible.
    for (var i = 0, marker; marker = this.markers_[i]; i++) {
      marker.isAdded = false;
      if (opt_hide) {
        marker.setMap(null);
      }
    }

    this.clusters_ = [];
  };

  /**
   *
   */
  MarkerClusterer.prototype.repaint = function () {
    var oldClusters = this.clusters_.slice();
    this.clusters_.length = 0;
    this.resetViewport();
    this.redraw();

    // Remove the old clusters.
    // Do it in a timeout so the other clusters have been drawn first.
    window$1.setTimeout(function () {
      for (var i = 0, cluster; cluster = oldClusters[i]; i++) {
        cluster.remove();
      }
    }, 0);
  };

  /**
   * Redraws the clusters.
   */
  MarkerClusterer.prototype.redraw = function () {
    this.createClusters_();
  };

  /**
   * Calculates the distance between two latlng locations in km.
   * @see http://www.movable-type.co.uk/scripts/latlong.html
   *
   * @param {google.maps.LatLng} p1 The first lat lng point.
   * @param {google.maps.LatLng} p2 The second lat lng point.
   * @return {number} The distance between the two points in km.
   * @private
   */
  MarkerClusterer.prototype.distanceBetweenPoints_ = function (p1, p2) {
    if (!p1 || !p2) {
      return 0;
    }

    var R = 6371; // Radius of the Earth in km
    var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
    var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  };

  /**
   * Add a marker to a cluster, or creates a new cluster.
   *
   * @param {google.maps.Marker} marker The marker to add.
   * @private
   */
  MarkerClusterer.prototype.addToClosestCluster_ = function (marker) {
    var distance = 40000; // Some large number
    var clusterToAddTo = null;
    var pos = marker.getPosition();
    for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
      var center = cluster.getCenter();
      if (center) {
        var d = this.distanceBetweenPoints_(center, marker.getPosition());
        if (d < distance) {
          distance = d;
          clusterToAddTo = cluster;
        }
      }
    }

    if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
      clusterToAddTo.addMarker(marker);
    } else {
      var cluster = new Cluster(this);
      cluster.addMarker(marker);
      this.clusters_.push(cluster);
    }
  };

  /**
   * Creates the clusters.
   *
   * @private
   */
  MarkerClusterer.prototype.createClusters_ = function () {
    if (!this.ready_) {
      return;
    }

    // Get our current map view bounds.
    // Create a new bounds object so we don't affect the map.
    var mapBounds = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(), this.map_.getBounds().getNorthEast());
    var bounds = this.getExtendedBounds(mapBounds);

    for (var i = 0, marker; marker = this.markers_[i]; i++) {
      if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
        this.addToClosestCluster_(marker);
      }
    }
  };

  /**
   * A cluster that contains markers.
   *
   * @param {MarkerClusterer} markerClusterer The markerclusterer that this
   *     cluster is associated with.
   * @constructor
   * @ignore
   */
  function Cluster(markerClusterer) {
    this.markerClusterer_ = markerClusterer;
    this.map_ = markerClusterer.getMap();
    this.gridSize_ = markerClusterer.getGridSize();
    this.minClusterSize_ = markerClusterer.getMinClusterSize();
    this.averageCenter_ = markerClusterer.isAverageCenter();
    this.center_ = null;
    this.markers_ = [];
    this.bounds_ = null;
    this.clusterIcon_ = new ClusterIcon(this, markerClusterer.getStyles(), markerClusterer.getGridSize());
  }

  /**
   * Determins if a marker is already added to the cluster.
   *
   * @param {google.maps.Marker} marker The marker to check.
   * @return {boolean} True if the marker is already added.
   */
  Cluster.prototype.isMarkerAlreadyAdded = function (marker) {
    if (this.markers_.indexOf) {
      return this.markers_.indexOf(marker) != -1;
    } else {
      for (var i = 0, m; m = this.markers_[i]; i++) {
        if (m == marker) {
          return true;
        }
      }
    }
    return false;
  };

  /**
   * Add a marker the cluster.
   *
   * @param {google.maps.Marker} marker The marker to add.
   * @return {boolean} True if the marker was added.
   */
  Cluster.prototype.addMarker = function (marker) {
    if (this.isMarkerAlreadyAdded(marker)) {
      return false;
    }

    if (!this.center_) {
      this.center_ = marker.getPosition();
      this.calculateBounds_();
    } else {
      if (this.averageCenter_) {
        var l = this.markers_.length + 1;
        var lat = (this.center_.lat() * (l - 1) + marker.getPosition().lat()) / l;
        var lng = (this.center_.lng() * (l - 1) + marker.getPosition().lng()) / l;
        this.center_ = new google.maps.LatLng(lat, lng);
        this.calculateBounds_();
      }
    }

    marker.isAdded = true;
    this.markers_.push(marker);

    var len = this.markers_.length;
    if (len < this.minClusterSize_ && marker.getMap() != this.map_) {
      // Min cluster size not reached so show the marker.
      marker.setMap(this.map_);
    }

    if (len == this.minClusterSize_) {
      // Hide the markers that were showing.
      for (var i = 0; i < len; i++) {
        this.markers_[i].setMap(null);
      }
    }

    if (len >= this.minClusterSize_) {
      marker.setMap(null);
    }

    this.updateIcon();
    return true;
  };

  /**
   * Returns the marker clusterer that the cluster is associated with.
   *
   * @return {MarkerClusterer} The associated marker clusterer.
   */
  Cluster.prototype.getMarkerClusterer = function () {
    return this.markerClusterer_;
  };

  /**
   * Returns the bounds of the cluster.
   *
   * @return {google.maps.LatLngBounds} the cluster bounds.
   */
  Cluster.prototype.getBounds = function () {
    var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    var markers = this.getMarkers();
    for (var i = 0, marker; marker = markers[i]; i++) {
      bounds.extend(marker.getPosition());
    }
    return bounds;
  };

  /**
   * Removes the cluster
   */
  Cluster.prototype.remove = function () {
    this.clusterIcon_.remove();
    this.markers_.length = 0;
    delete this.markers_;
  };

  /**
   * Returns the number of markers in the cluster.
   *
   * @return {number} The number of markers in the cluster.
   */
  Cluster.prototype.getSize = function () {
    return this.markers_.length;
  };

  /**
   * Returns a list of the markers in the cluster.
   *
   * @return {Array.<google.maps.Marker>} The markers in the cluster.
   */
  Cluster.prototype.getMarkers = function () {
    return this.markers_;
  };

  /**
   * Returns the center of the cluster.
   *
   * @return {google.maps.LatLng} The cluster center.
   */
  Cluster.prototype.getCenter = function () {
    return this.center_;
  };

  /**
   * Calculated the extended bounds of the cluster with the grid.
   *
   * @private
   */
  Cluster.prototype.calculateBounds_ = function () {
    var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
  };

  /**
   * Determines if a marker lies in the clusters bounds.
   *
   * @param {google.maps.Marker} marker The marker to check.
   * @return {boolean} True if the marker lies in the bounds.
   */
  Cluster.prototype.isMarkerInClusterBounds = function (marker) {
    return this.bounds_.contains(marker.getPosition());
  };

  /**
   * Returns the map that the cluster is associated with.
   *
   * @return {google.maps.Map} The map.
   */
  Cluster.prototype.getMap = function () {
    return this.map_;
  };

  /**
   * Updates the cluster icon
   */
  Cluster.prototype.updateIcon = function () {
    var zoom = this.map_.getZoom();
    var mz = this.markerClusterer_.getMaxZoom();

    if (mz && zoom > mz) {
      // The zoom is greater than our max zoom so show all the markers in cluster.
      for (var i = 0, marker; marker = this.markers_[i]; i++) {
        marker.setMap(this.map_);
      }
      return;
    }

    if (this.markers_.length < this.minClusterSize_) {
      // Min cluster size not yet reached.
      this.clusterIcon_.hide();
      return;
    }

    var numStyles = this.markerClusterer_.getStyles().length;
    var sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
    this.clusterIcon_.setCenter(this.center_);
    this.clusterIcon_.setSums(sums);
    this.clusterIcon_.show();
  };

  /**
   * A cluster icon
   *
   * @param {Cluster} cluster The cluster to be associated with.
   * @param {Object} styles An object that has style properties:
   *     'url': (string) The image url.
   *     'height': (number) The image height.
   *     'width': (number) The image width.
   *     'anchor': (Array) The anchor position of the label text.
   *     'textColor': (string) The text color.
   *     'textSize': (number) The text size.
   *     'backgroundPosition: (string) The background postition x, y.
   * @param {number=} opt_padding Optional padding to apply to the cluster icon.
   * @constructor
   * @extends google.maps.OverlayView
   * @ignore
   */
  function ClusterIcon(cluster, styles, opt_padding) {
    cluster.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView);

    this.styles_ = styles;
    this.padding_ = opt_padding || 0;
    this.cluster_ = cluster;
    this.center_ = null;
    this.map_ = cluster.getMap();
    this.div_ = null;
    this.sums_ = null;
    this.visible_ = false;

    this.setMap(this.map_);
  }

  /**
   * Triggers the clusterclick event and zoom's if the option is set.
   */
  ClusterIcon.prototype.triggerClusterClick = function () {
    var markerClusterer = this.cluster_.getMarkerClusterer();

    // Trigger the clusterclick event.
    google.maps.event.trigger(markerClusterer.map_, 'clusterclick', this.cluster_);

    if (markerClusterer.isZoomOnClick()) {
      // Zoom into the cluster.
      this.map_.fitBounds(this.cluster_.getBounds());
    }
  };

  /**
   * Adding the cluster icon to the dom.
   * @ignore
   */
  ClusterIcon.prototype.onAdd = function () {
    this.div_ = document.createElement('DIV');
    if (this.visible_) {
      var pos = this.getPosFromLatLng_(this.center_);
      this.div_.style.cssText = this.createCss(pos);
      this.div_.innerHTML = this.sums_.text;
    }

    var panes = this.getPanes();
    panes.overlayMouseTarget.appendChild(this.div_);

    var that = this;
    google.maps.event.addDomListener(this.div_, 'click', function () {
      that.triggerClusterClick();
    });
  };

  /**
   * Returns the position to place the div dending on the latlng.
   *
   * @param {google.maps.LatLng} latlng The position in latlng.
   * @return {google.maps.Point} The position in pixels.
   * @private
   */
  ClusterIcon.prototype.getPosFromLatLng_ = function (latlng) {
    var pos = this.getProjection().fromLatLngToDivPixel(latlng);
    pos.x -= parseInt(this.width_ / 2, 10);
    pos.y -= parseInt(this.height_ / 2, 10);
    return pos;
  };

  /**
   * Draw the icon.
   * @ignore
   */
  ClusterIcon.prototype.draw = function () {
    if (this.visible_) {
      var pos = this.getPosFromLatLng_(this.center_);
      this.div_.style.top = pos.y + 'px';
      this.div_.style.left = pos.x + 'px';
      this.div_.style.zIndex = google.maps.Marker.MAX_ZINDEX + 1;
    }
  };

  /**
   * Hide the icon.
   */
  ClusterIcon.prototype.hide = function () {
    if (this.div_) {
      this.div_.style.display = 'none';
    }
    this.visible_ = false;
  };

  /**
   * Position and show the icon.
   */
  ClusterIcon.prototype.show = function () {
    if (this.div_) {
      var pos = this.getPosFromLatLng_(this.center_);
      this.div_.style.cssText = this.createCss(pos);
      this.div_.style.display = '';
    }
    this.visible_ = true;
  };

  /**
   * Remove the icon from the map
   */
  ClusterIcon.prototype.remove = function () {
    this.setMap(null);
  };

  /**
   * Implementation of the onRemove interface.
   * @ignore
   */
  ClusterIcon.prototype.onRemove = function () {
    if (this.div_ && this.div_.parentNode) {
      this.hide();
      this.div_.parentNode.removeChild(this.div_);
      this.div_ = null;
    }
  };

  /**
   * Set the sums of the icon.
   *
   * @param {Object} sums The sums containing:
   *   'text': (string) The text to display in the icon.
   *   'index': (number) The style index of the icon.
   */
  ClusterIcon.prototype.setSums = function (sums) {
    this.sums_ = sums;
    this.text_ = sums.text;
    this.index_ = sums.index;
    if (this.div_) {
      this.div_.innerHTML = sums.text;
    }

    this.useStyle();
  };

  /**
   * Sets the icon to the the styles.
   */
  ClusterIcon.prototype.useStyle = function () {
    var index = Math.max(0, this.sums_.index - 1);
    index = Math.min(this.styles_.length - 1, index);
    var style = this.styles_[index];
    this.url_ = style['url'];
    this.height_ = style['height'];
    this.width_ = style['width'];
    this.textColor_ = style['textColor'];
    this.anchor_ = style['anchor'];
    this.textSize_ = style['textSize'];
    this.backgroundPosition_ = style['backgroundPosition'];
  };

  /**
   * Sets the center of the icon.
   *
   * @param {google.maps.LatLng} center The latlng to set as the center.
   */
  ClusterIcon.prototype.setCenter = function (center) {
    this.center_ = center;
  };

  /**
   * Create the css text based on the position of the icon.
   *
   * @param {google.maps.Point} pos The position.
   * @return {string} The css style text.
   */
  ClusterIcon.prototype.createCss = function (pos) {
    var style = [];
    style.push('background-image:url(' + this.url_ + ');');
    var backgroundPosition = this.backgroundPosition_ ? this.backgroundPosition_ : '0 0';
    style.push('background-position:' + backgroundPosition + ';');

    if (_typeof(this.anchor_) === 'object') {
      if (typeof this.anchor_[0] === 'number' && this.anchor_[0] > 0 && this.anchor_[0] < this.height_) {
        style.push('height:' + (this.height_ - this.anchor_[0]) + 'px; padding-top:' + this.anchor_[0] + 'px;');
      } else {
        style.push('height:' + this.height_ + 'px; line-height:' + this.height_ + 'px;');
      }
      if (typeof this.anchor_[1] === 'number' && this.anchor_[1] > 0 && this.anchor_[1] < this.width_) {
        style.push('width:' + (this.width_ - this.anchor_[1]) + 'px; padding-left:' + this.anchor_[1] + 'px;');
      } else {
        style.push('width:' + this.width_ + 'px; text-align:center;');
      }
    } else {
      style.push('height:' + this.height_ + 'px; line-height:' + this.height_ + 'px; width:' + this.width_ + 'px; text-align:center;');
    }

    var txtColor = this.textColor_ ? this.textColor_ : 'black';
    var txtSize = this.textSize_ ? this.textSize_ : 11;

    style.push('cursor:pointer; top:' + pos.y + 'px; left:' + pos.x + 'px; color:' + txtColor + '; position:absolute; font-size:' + txtSize + 'px;');
    return style.join('');
  };

  // Export Symbols for Closure
  // If you are not going to compile with closure then you can remove the
  // code below.
  var window$1 = window$1 || {};
  window$1['MarkerClusterer'] = MarkerClusterer;
  MarkerClusterer.prototype['addMarker'] = MarkerClusterer.prototype.addMarker;
  MarkerClusterer.prototype['addMarkers'] = MarkerClusterer.prototype.addMarkers;
  MarkerClusterer.prototype['clearMarkers'] = MarkerClusterer.prototype.clearMarkers;
  MarkerClusterer.prototype['fitMapToMarkers'] = MarkerClusterer.prototype.fitMapToMarkers;
  MarkerClusterer.prototype['getCalculator'] = MarkerClusterer.prototype.getCalculator;
  MarkerClusterer.prototype['getGridSize'] = MarkerClusterer.prototype.getGridSize;
  MarkerClusterer.prototype['getExtendedBounds'] = MarkerClusterer.prototype.getExtendedBounds;
  MarkerClusterer.prototype['getMap'] = MarkerClusterer.prototype.getMap;
  MarkerClusterer.prototype['getMarkers'] = MarkerClusterer.prototype.getMarkers;
  MarkerClusterer.prototype['getMaxZoom'] = MarkerClusterer.prototype.getMaxZoom;
  MarkerClusterer.prototype['getStyles'] = MarkerClusterer.prototype.getStyles;
  MarkerClusterer.prototype['getTotalClusters'] = MarkerClusterer.prototype.getTotalClusters;
  MarkerClusterer.prototype['getTotalMarkers'] = MarkerClusterer.prototype.getTotalMarkers;
  MarkerClusterer.prototype['redraw'] = MarkerClusterer.prototype.redraw;
  MarkerClusterer.prototype['removeMarker'] = MarkerClusterer.prototype.removeMarker;
  MarkerClusterer.prototype['removeMarkers'] = MarkerClusterer.prototype.removeMarkers;
  MarkerClusterer.prototype['resetViewport'] = MarkerClusterer.prototype.resetViewport;
  MarkerClusterer.prototype['repaint'] = MarkerClusterer.prototype.repaint;
  MarkerClusterer.prototype['setCalculator'] = MarkerClusterer.prototype.setCalculator;
  MarkerClusterer.prototype['setGridSize'] = MarkerClusterer.prototype.setGridSize;
  MarkerClusterer.prototype['setMaxZoom'] = MarkerClusterer.prototype.setMaxZoom;
  MarkerClusterer.prototype['onAdd'] = MarkerClusterer.prototype.onAdd;
  MarkerClusterer.prototype['draw'] = MarkerClusterer.prototype.draw;

  Cluster.prototype['getCenter'] = Cluster.prototype.getCenter;
  Cluster.prototype['getSize'] = Cluster.prototype.getSize;
  Cluster.prototype['getMarkers'] = Cluster.prototype.getMarkers;

  ClusterIcon.prototype['onAdd'] = ClusterIcon.prototype.onAdd;
  ClusterIcon.prototype['draw'] = ClusterIcon.prototype.draw;
  ClusterIcon.prototype['onRemove'] = ClusterIcon.prototype.onRemove;

  Object.keys = Object.keys || function (o) {
    var result = [];
    for (var name in o) {
      if (o.hasOwnProperty(name)) result.push(name);
    }
    return result;
  };

  var $$10 = jQuery.noConflict();

  var GoogleMap = new function () {
    var $map = $$10('#map');
    var $seeOnGoogleMaps = $$10('#see-on-google-maps');
    var $updateMarker = $$10('.js-google-map-marker-trigger');
    var $zoomIn = $$10('.js-googlemaps-zoom-in');
    var $zoomOut = $$10('.js-googlemaps-zoom-out');
    var initPosition;

    var googleMapsLink = '#0';

    this.init = function () {
      var _this2 = this;

      if (window.GOOGLEMAPS_LOADED) {
        this.realInit();
      } else {
        setTimeout(function () {
          _this2.init();
        }, 500);
      }
    };

    this.realInit = function () {
      var _this3 = this;

      initPosition = {
        lat: 51.5201555,
        lng: -0.1403385
      };

      // This is run when user clicks on map pointer;
      $updateMarker.on('click', function (ev) {

        _this3.showMap();

        var lat = $updateMarker.data('latitude'),
          lng = $updateMarker.data('longitude');

        $updateMarker.data('longitude');

        $seeOnGoogleMaps.attr('href', $updateMarker.data('google-maps-link') || '#0');
        googleMapsLink = $updateMarker.data('google-maps-link') || '#0';

        if ($$10('.c-box-big').length < 1) {
          _this3.changeMarkerPosition(lat, lng);
        }
      });

      $zoomIn.on('click', function () {
        _this3.zoomIn();
      });
      $zoomOut.on('click', function () {
        _this3.zoomOut();
      });
    };

    this.showMap = function () {

      var _this = this;

      if ($map.length == 0) {
        return;
      }

      if (this.map) {
        return;
      }

      this.map = new google.maps.Map($map[0], {
        center: initPosition,
        zoom: 17,
        disableDefaultUI: true,
        // styles: [{
        //     "featureType": "water",
        //     "elementType": "geometry",
        //     "stylers": [{
        //         "color": "#e9e9e9"
        //     }, {
        //         "lightness": 17
        //     }]
        // }, {
        //     "featureType": "landscape",
        //     "elementType": "geometry",
        //     "stylers": [{
        //         "color": "#f5f5f5"
        //     }, {
        //         "lightness": 20
        //     }]
        // }, {
        //     "featureType": "road.highway",
        //     "elementType": "geometry.fill",
        //     "stylers": [{
        //         "color": "#ffffff"
        //     }, {
        //         "lightness": 17
        //     }]
        // }, {
        //     "featureType": "road.highway",
        //     "elementType": "geometry.stroke",
        //     "stylers": [{
        //         "color": "#ffffff"
        //     }, {
        //         "lightness": 29
        //     }, {
        //         "weight": 0.2
        //     }]
        // }, {
        //     "featureType": "road.arterial",
        //     "elementType": "geometry",
        //     "stylers": [{
        //         "color": "#ffffff"
        //     }, {
        //         "lightness": 18
        //     }]
        // }, {
        //     "featureType": "road.local",
        //     "elementType": "geometry",
        //     "stylers": [{
        //         "color": "#ffffff"
        //     }, {
        //         "lightness": 16
        //     }]
        // }, {
        //     "featureType": "poi",
        //     "elementType": "geometry",
        //     "stylers": [{
        //         "color": "#f5f5f5"
        //     }, {
        //         "lightness": 21
        //     }]
        // }, {
        //     "featureType": "poi.park",
        //     "elementType": "geometry",
        //     "stylers": [{
        //         "color": "#dedede"
        //     }, {
        //         "lightness": 21
        //     }]
        // }, {
        //     "elementType": "labels.text.stroke",
        //     "stylers": [{
        //         "visibility": "on"
        //     }, {
        //         "color": "#ffffff"
        //     }, {
        //         "lightness": 16
        //     }]
        // }, {
        //     "elementType": "labels.text.fill",
        //     "stylers": [{
        //         "saturation": 36
        //     }, {
        //         "color": "#333333"
        //     }, {
        //         "lightness": 40
        //     }]
        // }, {
        //     "elementType": "labels.icon",
        //     "stylers": [{
        //         "visibility": "off"
        //     }]
        // }, {
        //     "featureType": "transit",
        //     "elementType": "geometry",
        //     "stylers": [{
        //         "color": "#f2f2f2"
        //     }, {
        //         "lightness": 19
        //     }]
        // }, {
        //     "featureType": "administrative",
        //     "elementType": "geometry.fill",
        //     "stylers": [{
        //         "color": "#fefefe"
        //     }, {
        //         "lightness": 20
        //     }]
        // }, {
        //     "featureType": "administrative",
        //     "elementType": "geometry.stroke",
        //     "stylers": [{
        //         "color": "#fefefe"
        //     }, {
        //         "lightness": 17
        //     }, {
        //         "weight": 1.2
        //     }]
        // }]
      });

      if ($$10('.js-az-side-panel-cover').length) {

        this.map.setZoom(3);

        var locations = [];

        $$10('#see-on-google-maps').hide();

        $$10('.c-projects-list-side-panel__right .js-az-side-panel-cover').each(function (index) {
          var id = $$10(this).data('project-id'),
            lat = $$10(this).data('lat'),
            lng = $$10(this).data('lng'),
            title = $$10(this).text(),
            sector = $$10(this).data('sector'),
            img = $$10("[data-panel-id='project-" + id + "']").find('img').data('srcset').split(',')[1].split(' ')[0],
            link = $$10(this)[0].href;

          if (lat && lng) {
            locations.push({
              id: id,
              lat: lat,
              lng: lng,
              title: title,
              sector: sector,
              img: img,
              link: link
            });
          }
        });

        //console.log(locations);

        var styles = [
          [{
            url: '/img/svg/circle.svg',
            height: 50,
            width: 50,
            textColor: '#fff',
            textSize: 16
          }]
        ];

        var markers = locations.map(function (location, i) {
          var newMarker = new google.maps.Marker({
            position: {
              lat: location.lat,
              lng: location.lng
            },
            icon: {
              path: 'M6.5 0A6.52 6.52 0 0 0 0 6.53C0 10.14 6.5 17 6.5 17S13 10.14 13 6.53A6.52 6.52 0 0 0 6.5 0zm0 9.7A3.7 3.7 0 1 1 10.19 6 3.71 3.71 0 0 1 6.5 9.7z',
              strokeColor: '#F00',
              fillColor: '#F00',
              fillOpacity: 1,
              size: new google.maps.Size(15, 19),
              scale: 2,
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(7, 19)
            },
            map: _this.map
          });

          var contentString = '<a id="content" class="c-infowindow__content" href="' + location.link + '">\n                    <div class="c-infowindow__img" style="background-image: url(\'' + location.img + '\');"></div>\n                    <div class="c-infowindow__txt text"><div class="text--bold">' + location.title + '</div>' + location.sector + '</div></a>';

          var newInfoWindow = new google.maps.InfoWindow({
            content: contentString
          });

          newMarker.addListener('click', function () {
            window.location.href = location.link;
          });

          newMarker.addListener('mouseover', function () {
            newInfoWindow.open(map, newMarker);

            // $('.gm-style-iw').parent().each(function( index ) {
            //     $(this).addClass('c-infowindow');
            // });
          });

          newMarker.addListener('mouseout', function () {
            newInfoWindow.close(map, newMarker);

            // $('.gm-style-iw').parent().each(function( index ) {
            //     $(this).addClass('c-infowindow');
            // });
          });

          // _this.map.addListener('click', function(event) {
          //   newInfoWindow.close(map, newMarker);
          // });

          return newMarker;
        });

        var markerCluster = new MarkerClusterer(this.map, markers, {
          styles: styles[0]
        });
      }

      if ($$10('.c-box-big').length < 1) {

        this.marker = new google.maps.Marker({
          position: initPosition,
          icon: {
            path: 'M6.5 0A6.52 6.52 0 0 0 0 6.53C0 10.14 6.5 17 6.5 17S13 10.14 13 6.53A6.52 6.52 0 0 0 6.5 0zm0 9.7A3.7 3.7 0 1 1 10.19 6 3.71 3.71 0 0 1 6.5 9.7z',
            strokeColor: '#F00',
            fillColor: '#F00',
            fillOpacity: 1,
            size: new google.maps.Size(15, 19),
            scale: 2,
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(7, 19)
          },
          map: _this.map
        });

        this.marker.addListener('click', function () {
          if (googleMapsLink === '#0') {
            return;
          }

          window.open($seeOnGoogleMaps.attr('href'), '_blank');
        });
      }
    };

    this.zoomIn = function () {
      this.map.setZoom(this.map.getZoom() + 1);
    };

    this.zoomOut = function () {
      this.map.setZoom(this.map.getZoom() ? this.map.getZoom() - 1 : 0);
    };

    this.changeMarkerPosition = function (lat, lng) {

      var latLng = {
        lat: lat,
        lng: lng
      };

      this.marker.setPosition(latLng);
      this.map.setCenter(latLng);
    };
  }();

  var $$11 = jQuery.noConflict();

  var $$12 = jQuery.noConflict();

  var dragCursor = {
    init: function init(dragSpace) {

      var cursor,
        cursorPos = {};

      cursor = {
        elem: dragSpace.siblings('.c-drag-cursor'),
        space: dragSpace,
        tillFirstClick: true
      };

      function setImagePosition() {
        if (typeof cursor === 'undefined') {
          return;
        }

        var left = cursorPos.x - 50;
        var top = cursorPos.y - 35;

        // console.log(cursor.elem);
        cursor.elem.css('transform', 'translateX(' + left + 'px) translateY(' + top + 'px)');
      }

      function getCursorPosition() {
        cursorPos.x = event.pageX;
        cursorPos.y = event.pageY - $$12(window).scrollTop();
      }

      $$12('body').mousemove(function (event) {
        if (cursor.tillFirstClick) {
          getCursorPosition();
          // If item is visible
          setImagePosition(cursor);
        }
      });

      cursor.space.hover(function () {
        if (cursor.tillFirstClick) {
          cursor.elem.addClass('visible');
          cursor.space.on('click', function () {
            cursor.tillFirstClick = false;
            cursor.elem.removeClass('visible');
          });
        }
      }, function () {
        cursor.elem.removeClass('visible');
      });
    }
  };

  var $$13 = jQuery.noConflict();

  var box = {
    matchBoxTextHeightInRow: function matchBoxTextHeightInRow(boxes) {
      var boxes_in_row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


      function _matchBoxTextHeight(rows_of_boxes) {
        for (var i = 0; i < rows_of_boxes.length; i++) {
          //$(rows_of_boxes[i]).find('.c-box__wrapper-text').css('height', 'auto');
        }
        for (var i = 0; i < rows_of_boxes.length; i++) {

          $$13(rows_of_boxes[i]).find('.c-box__wrapper-text').each(function () {
            var element_height = $$13(this).outerHeight();

          });
        }
        for (var i = 0; i < rows_of_boxes.length; i++) {
          //$(rows_of_boxes[i]).find('.c-box__wrapper-text').css('height', max_height);
        }
      }

      if (boxes_in_row == 0) {
        // infinite

        _matchBoxTextHeight([boxes]);
      } else if (boxes_in_row == 1) {

        $$13(boxes).find('.c-box__wrapper-text').css('height', 'auto');

        return;
      } else {

        var rows = [
          []
        ];

        var i = boxes_in_row;
        var j = 0;

        boxes.each(function () {
          (function (box) {
            rows[j].push(box);
          })($$13(this));
          i--;
          if (i == 0) {
            j++;
            rows[j] = [];
            i = boxes_in_row;
          }
        });
        for (var i = 0; i < rows.length; i++) {
          _matchBoxTextHeight(rows[i]);
        }
      }
    }
  };

  var _multi;
  var _gallery;
  var _mixed;
  var _single;

  var $$14 = jQuery.noConflict();
  var carousel_mixed_image_wrap = $$14('.carousel--mixed .carousel__item-inner .image-wrap');

  var options = {

    multi: (_multi = {
      freeScroll: true,
      cellAlign: 'left',
      contain: true,
      pageDots: false,
      prevNextButtons: false,
      imagesLoaded: true,
      lazyLoad: true
    }, defineProperty(_multi, 'lazyLoad', 2), defineProperty(_multi, 'selectedAttraction', 0.01), defineProperty(_multi, 'friction', 0.15), _multi),

    gallery: (_gallery = {
      pageDots: true,
      prevNextButtons: false,
      imagesLoaded: true,
      lazyLoad: true
    }, defineProperty(_gallery, 'lazyLoad', 1), defineProperty(_gallery, 'wrapAround', true), _gallery),

    mixed: (_mixed = {
      imagesLoaded: true,
      wrapAround: true,
      pageDots: false,
      prevNextButtons: false,
      lazyLoad: true
    }, defineProperty(_mixed, 'lazyLoad', 2), defineProperty(_mixed, 'percentPosition', false), defineProperty(_mixed, 'cellAlign', 'center'), _mixed),

    single: (_single = {
      imagesLoaded: true,
      wrapAround: false,
      pageDots: true,
      prevNextButtons: false,
      lazyLoad: true
    }, defineProperty(_single, 'lazyLoad', 1), defineProperty(_single, 'percentPosition', false), defineProperty(_single, 'cellAlign', 'center'), _single)

  };

  var slider = {
    init: function init() {
      this.multi();
      this.gallery();
      this.mixed();
      this.single();
      this.reveal();
      this.set_mixed_height();
      this.set_margin_bottom();
      this.disable_multi_drag();
    },
    resize: function resize() {
      this.single();
      this.set_mixed_height();
      this.set_margin_bottom();
      this.disable_multi_drag();
    },
    gallery: function gallery() {

      $$14('.carousel--gallery').flickity(options.gallery);
    },
    disable_multi_drag: function disable_multi_drag() {

      var carousel = $$14('.carousel--multi').flickity(options.multi),
        item = $$14('.carousel--multi .carousel__item');

      if (window.matchMedia('(min-width: 740px)').matches && item.length < 4) {
        carousel.flickity('unbindDrag');
      } else {
        dragCursor.init($$14('.carousel--multi'));
        carousel.flickity('bindDrag');
      }
    },
    multi: function multi() {

      var carousel = $$14('.carousel--multi').flickity(options.multi);

      function setCarouselTextHeight() {

        $$14('.carousel--multi').each(function () {

          box.matchBoxTextHeightInRow($$14(this).find('.c-box'));
        });
      }

      if (carousel.length != 0) {
        setCarouselTextHeight();
        $$14(window).resize(setCarouselTextHeight);
      }
    },
    mixed: function mixed() {

      var carousel = $$14('.carousel--mixed').flickity(options.mixed);

      dragCursor.init($$14('.carousel--mixed'));

      carousel.on('staticClick.flickity', function (event, pointer, cellElement, cellIndex) {
        if (typeof cellIndex == 'number') {
          carousel.flickity('selectCell', cellIndex);
        }
      });

      carousel.on('dragStart.flickity', function (event, pointer, cellElement, cellIndex) {
        $$14(this).addClass('is-drag');
      });

      carousel.on('dragEnd.flickity', function (event, pointer, cellElement, cellIndex) {
        $$14(this).removeClass('is-drag');
      });
    },
    set_mixed_height: function set_mixed_height() {

      var max_height = -1;

      carousel_mixed_image_wrap.each(function () {
        max_height = max_height > $$14(this).height() ? max_height : $$14(this).height();
      });

      carousel_mixed_image_wrap.each(function () {

        if ($$14(this).height() != max_height) {
          $$14(this).height(max_height);
        }
      });
    },
    set_margin_bottom: function set_margin_bottom() {

      carousel_mixed_image_wrap.each(function () {

        var image = $$14(this).find('.image--visible-on-desktop img');

        if (window.matchMedia('(max-width: 790px)').matches) {
          image = $$14(this).find('.image--visible-on-mobile img');
        }

        var diff = ($$14(this).height() - image.height()) / 2,
          caption = $$14(this).next('.carousel__item-caption');

        if (caption.length > 0 && image.height() < $$14(this).height()) {
          $$14(this).css('margin-bottom', -diff + 'px');
        }
      });
    },
    reveal: function reveal() {

      $$14('.carousel--reveal').flickity(options.gallery);
    },


    // initialised after ajax call
    instafeed: function instafeed() {

      $$14('#instafeed').flickity(options.multi);
    },
    single: function single() {

      var carousel = $$14('.carousel--single').flickity(options.single),
        is_flickity = true;

      if (is_flickity) {

        if (window.matchMedia('(min-width: 770px)').matches) {
          $$14('.carousel--single').flickity('destroy');
        } else {
          carousel.flickity();
        }
      }

      is_flickity = !is_flickity;
    }
  };

  var $$15 = jQuery.noConflict();

  var headroom_classes = {
    // when element is initialised
    initial: "header--headroom",
    // when scrolling up
    pinned: "header--pinned",
    // when scrolling down
    unpinned: "header--unpinned",
    // when above offset
    top: "header--top",
    // when below offset
    notTop: "header--not-top",
    // when at bottom of scoll area
    bottom: "header--bottom",
    // when not at bottom of scroll area
    notBottom: "header--not-bottom"
  };

  var plugins = {
    init: function init() {
      this.matchHeight();
      this.lazysizes();
      this.headroom();
      this.home_headroom();
    },
    resize: function resize() {
      this.headroom();
      this.home_headroom();
    },
    matchHeight: function matchHeight(callback) {
      $$15('[data-mh]').matchHeight();
    },
    lazysizes: function lazysizes() {
      // window.lazySizesConfig = window.lazySizesConfig || {};

      // window.lazySizesConfig.expand = 10; //default 360-500
      // lazySizesConfig. expFactor = 1.5; //default: 1.7
    },
    headroom: function headroom() {

      var header = $$15('.l-header--int'),
        offset = void 0,
        elemTop = void 0,
        elemHeight = void 0;

      if ($$15('.two-cols-first-sticky').length) {
        elemTop = $$15('.two-cols-first-sticky').position().top;
        elemHeight = $$15('.two-cols-first-sticky').height();
        offset = elemTop + elemHeight - 140;
      } else if ($$15('.media-awards').length) {
        elemTop = $$15('.media-awards').position().top;
        elemHeight = $$15('.media-awards').height();
        offset = elemTop + elemHeight;
      } else if ($$15('.media-publications').length) {
        elemTop = $$15('.media-publications').last().position().top;
        elemHeight = $$15('.media-publications').last().height();
        offset = elemTop + elemHeight;
      } else if (window.matchMedia('(min-width: 581px)').matches) {
        offset = $window.height() - 84;
      } else {
        offset = $window.height() - 140;
      }

      if (header.length > 0) {
        header.headroom({
          offset: offset,
          classes: headroom_classes
        });
      }
    },
    home_headroom: function home_headroom() {

      var header = $$15('.l-header--home'),
        total_height = 0,
        header_height = 84,
        slides = $document.find('.reveal-slider__slide');

      if (window.matchMedia('(max-width: 580px)').matches) {
        header_height = 70;
      } else if (window.matchMedia('(max-width: 1374px)').matches) {
        header_height = 80;
      } else {
        header_height = 84;
      }

      if (header.length > 0) {
        slides.each(function () {
          total_height += $$15(this).outerHeight();
        });

        var offset = total_height;

        if (helper.breakpoint.large.matches) {
          header.headroom({
            offset: offset,
            classes: headroom_classes
          });
        } else {
          header.headroom({
            offset: $window.height() - header_height,
            classes: headroom_classes
          });
        }
      }
    }
  };

  var $$16 = jQuery.noConflict();
  var menu = $$16('.l-nav');
  var header = $$16('.l-header');
  var visible_class = 'visible';
  var timer = void 0;
  var myVar = [];
  var z_index = 0;

  var nav = {
    init: function init() {
      this.open_sub_menu();
      this.close_sub_menu();
      this.stop_sub_menu_prop();
      this.switch_class();
      this.toggle_mobile_nav();
      this.open_mobile_sub_menu();
      this.close_mobile_sub_menu();
      this.menu_image_fade();
    },
    loadImages: function loadImages() {

      if (this.imagesLoaded) {
        return;
      }

      this.imagesLoaded = true;
      $$16('header').find('.lazy-container img').addClass('lazyload');
    },
    resize: function resize() {
      this.switch_class();
    },
    open_sub_menu: function open_sub_menu() {
      var self = this;

      var animating = 0;

      $$16('.l-nav--main .menu-item-has-children > a').on('click', function (e) {

        self.loadImages();

        z_index = 0;

        myVar.forEach(function (timer) {
          clearTimeout(timer);
        });

        if (animating == 1) return;

        animating = 1;

        var sub_menu = $$16(this).next('.sub-menu'),
          first_li = sub_menu.find('.menu-item').first().find('.menu-image-hover-wrapper'),
          sub_menu_titles = sub_menu.find('.menu-image-title');

        first_li.css('opacity', 1);

        $$16('.menu-image-title').not(sub_menu_titles).removeClass('current');

        $$16('.sub-menu').not(sub_menu).delay(200).queue(function (next) {
          $$16(this).removeClass(visible_class);
          $$16(this).parent().removeClass(visible_class);
          next();
          animating = 0;
        });

        sub_menu_titles.each(function (index) {
          var li = $$16(this);
          timer = myVar.push(setTimeout(function () {
            li.addClass('current');
          }, index * 80));
        });

        sub_menu.addClass(visible_class);
        sub_menu.parent().addClass(visible_class);
        header.addClass('l-header--invert');

        e.preventDefault();

        helper.scroll_disable();
      });
    },
    close_sub_menu: function close_sub_menu() {

      $$16('.sub-menu').on('click', function () {

        z_index = 0;

        myVar.forEach(function (timer) {
          clearTimeout(timer);
        });

        $$16('.menu-image-title').removeClass(visible_class);
        $$16('.sub-menu').removeClass(visible_class);
        $$16('.sub-menu').parent().removeClass(visible_class);
        $$16('.sub-menu').find('.menu-image-title').removeClass('current');
        header.removeClass('l-header--invert');

        $$16('.menu-image-hover-wrapper').css({
          'opacity': 1,
          'transform': 'scale(1)'
        });

        helper.scroll_enable();
      });
    },
    stop_sub_menu_prop: function stop_sub_menu_prop() {

      $$16('.sub-menu li').on('click', function (e) {
        e.stopPropagation();
      });
    },
    switch_class: function switch_class() {

      if (window.matchMedia('(min-width: 1375px)').matches) {
        menu.removeClass('l-nav--mobile open').addClass('l-nav--main');
      } else {
        menu.removeClass('l-nav--main open').addClass('l-nav--mobile');
      }

      $$16('.site').removeClass('nav-open');
      header.removeClass('l-header--invert');
      $$16('#mobile-nav-toggle').removeClass('active');
      $document.find('.sub-nav-open').removeClass('sub-nav-open');
      $$16('.sub-menu').removeClass(visible_class);
      helper.scroll_enable();
    },
    toggle_mobile_nav: function toggle_mobile_nav() {

      $$16('#mobile-nav-toggle').on('click', function () {

        if (menu.hasClass('open')) {
          helper.scroll_enable();
          $$16(this).removeClass('active');
          menu.removeClass('open');
          $$16('.site').removeClass('nav-open');
          $$16('.sub-nav-open').removeClass('sub-nav-open');
          $$16('.sub-menu').removeClass(visible_class);
          header.removeClass('l-header--invert');
          $$16('.sibling-sub-nav-open').removeClass('sibling-sub-nav-open');
        } else {
          helper.scroll_disable();
          $$16(this).addClass('active');
          menu.addClass('open');
          $$16('.site').addClass('nav-open');
        }
      });
    },
    open_mobile_sub_menu: function open_mobile_sub_menu() {

      $document.on('click', '.l-nav--mobile .menu-item-has-children', function () {
        $$16('.site').addClass('sub-nav-open');
        $$16(this).addClass('sub-nav-open');
        $$16(this).siblings().addClass('sibling-sub-nav-open');
      });
    },
    close_mobile_sub_menu: function close_mobile_sub_menu() {

      $$16('.l-nav__m-back').on('click', function () {
        $$16('.sub-nav-open').removeClass('sub-nav-open');
        $$16('.sub-menu').removeClass(visible_class);
        $$16('.sibling-sub-nav-open').removeClass('sibling-sub-nav-open');
      });
    },
    menu_image_fade: function menu_image_fade() {

      $$16('.l-nav--main .sub-menu .menu-image-title').on('mouseover', function () {

        z_index = z_index + 1;

        var image = $$16(this).next('.menu-image-hover-wrapper');

        $$16('.menu-image-hover-wrapper').not(image).css({
          'z-index': 1,
          'opacity': 0,
          'transform': 'scale(1)'
        });

        image.css({
          'z-index': z_index,
          'opacity': 1,
          'transform': 'scale(1.01)'
        });
      });
    }
  };

  var $$17 = jQuery.noConflict();

  var sticky = {
    init: function init() {
      this.article();
      this.enable_disable();
    },
    resize: function resize() {
      this.enable_disable();
    },
    default: function _default() {

      var sticky_elem = $$17('[data-sticky]');

      sticky_elem.stick_in_parent({
        offset_top: 120
      });

      sticky_elem.on('sticky_kit:bottom', function (e) {
        $$17(this).parent().css('position', 'static');
      }).on('sticky_kit:unbottom', function (e) {
        $$17(this).parent().css('position', 'relative');
      });
    },
    article: function article() {
      $$17('#article-info').stick_in_parent({
        offset_top: 0
      });
    },
    enable_disable: function enable_disable() {

      var self = this;

      if (window.matchMedia('(max-width: 768px)').matches) {

        $$17('[data-sticky]').trigger('sticky_kit:detach');
      } else {

        self.default();
      }
    }
  };

  var $$18 = jQuery.noConflict();

  var row = {
    init: function init() {
      this.set_height();
    },
    resize: function resize() {
      this.set_height();
    },
    set_height: function set_height() {

      var row = $$18('.l-row--set-height'),
        text = row.find('.container'),
        image = row.find('img'),
        image_height = image.height() - 135,
        elem_height = image_height + text.height();

      if (row.length > 0) {
        row.css('height', elem_height);
      }
    }
  };

  var $$19 = jQuery.noConflict();
  var timer$1 = void 0;
  var myVar$1 = [];

  var maker = {
    init: function init() {
      this.show_name();
      this.show_image();
      this.hide_image();
      this.close_profile();
      this.hide_name();
      this.sticky_name();
    },
    sticky_name: function sticky_name() {

      var sticky_elem = $$19('[data-sticky-maker]');

      sticky_elem.stick_in_parent();
    },
    show_name: function show_name() {

      $$19('#maker-name').show();

      $$19('.c-maker').on('mouseover', function () {

        myVar$1.forEach(function (timer) {
          clearTimeout(timer);
        });

        $$19('#maker-name').show();
        $$19('#maker-name').html($$19(this).attr('data-name'));
        $$19('.c-maker').not($$19(this)).addClass('semi-opaque');
        $$19(this).removeClass('semi-opaque');
      });
    },
    hide_name: function hide_name() {

      $$19('.c-maker').on('mouseleave', function () {

        timer$1 = myVar$1.push(setTimeout(function () {
          $$19('#maker-name').hide();
          $$19('.c-maker').removeClass('semi-opaque');
        }, 200));
      });
    },
    show_image: function show_image() {

      $$19('[data-maker]').on('mouseover', function () {

        var id = $$19(this).data('id'),
          img = $$19('#maker-image .lazy-container').hasClass(id);

        $$19('.lazy-container.' + id).css('display', 'block');
      });
    },
    hide_image: function hide_image() {

      $$19('[data-maker]').on('mouseleave', function () {

        $$19('#maker-image .lazy-container').css('display', 'none');
      });
    },
    close_profile: function close_profile() {

      $document.on('click', '#close-profile', function () {
        $$19('.c-profile').removeClass('c-profile--active');
        $$19('#maker-profile').delay(800).queue(function (next) {
          $$19(this).html('');
          helper.scroll_enable();
          next();
        });
      });
    }
  };

  var $$20 = jQuery.noConflict();

  var animate = {
    load: function load() {
      this.fade_in();
    },
    fade_in: function fade_in() {

      var elem = $$20('.fade-on-load');

      if (elem.length > 0) {
        elem.addClass('animate--fade-in-slow-init');
      }
    }
  };

  var $$21 = jQuery.noConflict();

  var project = {
    init: function init() {
      this.calc_offset_left();
      this.adjacent_images();
    },
    resize: function resize() {
      this.init();
    },
    set_widths: function set_widths() {

      var offset = $$21('.container').offset().left;

      // grid item 6
      $$21('.sgrid--project__item-6').each(function () {
        $$21(this).css('width', $$21('.sgrid--project__item-1').width() + offset + 'px');
      });

      // grid item 10
      $$21('.sgrid--project__item-10').each(function () {
        $$21(this).css('width', $$21('.sgrid--project__item-3').width() + offset + 'px');
      });
    },
    calc_offset_left: function calc_offset_left() {

      var offset_left = $$21('.sgrid--project__item-1').width() - $$21('.sgrid--project__item-3').width();

      $$21('.sgrid--project__item.offset--left').each(function () {
        $$21(this).css('left', offset_left + 'px');
      });
    },
    adjacent_images: function adjacent_images() {

      var adjacent_images = $$21('[data-adjacent-images]');

      if (adjacent_images.length > 0) {

        adjacent_images.each(function () {

          var img_left = $$21(this).find('.image-left'),
            img_right = $$21(this).find('.image-right'),
            a = img_left.height(),
            b = img_right.height(),
            tallest = Math.max(a, b),
            shortest = Math.min(a, b),
            diff = Math.round(tallest - shortest),
            offset = diff / 2;

          if (a === b) return;

          if (helper.breakpoint.large.matches) {

            if (a > b) {
              img_right.css('padding-top', offset + 'px');
            } else {
              img_left.css('padding-top', offset + 'px');
            }
          } else {

            img_left.css('padding-top', 0);
            img_right.css('padding-top', 0);
          }
        });
      }
    }
  };

  // Plugin Functions

  var $$22 = jQuery.noConflict();

  var pushy = {

    /**
     * Cache
     *
     * Caches common objects and vars
     */
    cache: function cache() {

      pushy.els = {};
      pushy.vars = {};
      pushy.fallback = {};

      // common elements
      pushy.els.body = $$22('body');
      pushy.els.html = $$22('html');
      pushy.els.items = $$22('[data-pushy]');
      pushy.els.overlay = $$22('.site-overlay');

      // common vars
      pushy.vars.css_transforms_3d = pushy.css_transforms_3d();
      pushy.vars.classes = {
        active_item: 'pushy-active-item',
        left: {
          item: 'pushy-left--open',
          active: 'pushy-active pushy-left-active'
        },
        right: {
          item: 'pushy-right--open',
          active: 'pushy-active pushy-right-active'
        }
      };

      // fallback vars
      pushy.fallback.item_showing = false;
      pushy.fallback.speed = 200;
    },

    /**
     * Document Ready
     */
    init: function init() {

      pushy.cache();
      pushy.setup_pushy();
    },

    /**
     * Setup Pushy
     */
    setup_pushy: function setup_pushy() {

      pushy.setup_items();
      pushy.setup_triggers();
      pushy.setup_overlay();
    },

    /**
     * Setup Pushy Items
     */
    setup_items: function setup_items() {

      if (pushy.els.items.length <= 0) {
        return;
      }

      pushy.els.items.each(function (index, item) {

        var $item = $$22(item),
          item_data = $item.data('pushy'),
          item_width = $item.width(),
          item_active_class = 'pushy--' + $item.context.id;

        $item.addClass('pushy-' + item_data.direction);

        $item.data('pushy-direction', item_data.direction);
        $item.data('pushy-width', item_width);
        $item.data('pushy-element-helper', item_active_class);

        // Fallback

        if (!pushy.vars.css_transforms_3d) {

          var args = {};
          args[item_data.direction] = -item_width + 'px';

          $item.css(args);
        }
      });
    },

    /**
     * Setup Pushy Trigger
     */
    setup_triggers: function setup_triggers() {

      $$22('[data-pushy-trigger]').on('click', function () {

        var $trigger = $$22(this),
          item_id = $trigger.data('pushy-trigger'),
          $item = $$22('#' + item_id);

        if ($item.length <= 0) {
          return false;
        }

        $trigger.data('pushy-item', $$22('#' + item_id));

        pushy.toggle($item, $trigger);

        return false;
      });
    },

    /**
     * Setup Pushy Overlay
     */
    setup_overlay: function setup_overlay() {

      pushy.els.overlay.on('click', function () {

        var $overlay = $$22(this),
          $item = $$22('.' + pushy.vars.classes.active_item);

        pushy.toggle($item);
      });
    },

    /**
     * Toggle Pushy
     *
     * @param obj $item
     * @param obj $trigger
     */
    toggle: function toggle($item, $trigger) {

      // if element active is set and they dont equal each other
      if (pushy.els.body.hasClass('pushy-active') && pushy.els.active !== $item.selector && pushy.els.active.selector !== $item.selector && $item.selector !== '.pushy-active-item') {

        // Close currently active item before activating the clicked version
        pushy.toggle_item($$22(pushy.els.active));
      }

      // Toggle hide/show clicked
      pushy.toggle_item($item);

      // Re set active classes depending if pushy is active
      if (pushy.els.body.hasClass('pushy-active')) {
        pushy.els.active = $item;
      } else {
        pushy.els.active = false;
      }
    },

    /**
     * Toggle Item
     *
     * @param obj $item
     */
    toggle_item: function toggle_item($item) {

      pushy.els.body.toggleClass(pushy.vars.classes[$item.data('pushy-direction')].active);
      pushy.els.html.toggleClass(pushy.vars.classes[$item.data('pushy-direction')].active);

      pushy.els.body.toggleClass($item.data('pushy-element-helper'));
      pushy.els.html.toggleClass($item.data('pushy-element-helper'));

      $item.toggleClass(pushy.vars.classes[$item.data('pushy-direction')].item).toggleClass(pushy.vars.classes.active_item);

      // Fallback

      if (!pushy.vars.css_transforms_3d) {

        var item_args = {};

        if (pushy.fallback.item_showing) {

          item_args[$item.data('pushy-direction')] = -$item.data('pushy-width') + 'px';

          pushy.fallback.item_showing = false;
        } else {

          item_args[$item.data('pushy-direction')] = '0px';

          pushy.fallback.item_showing = true;
        }

        $item.animate(item_args, pushy.fallback.speed);
      }
    },

    /**
     * Helper: CSS Transforms 3D
     *
     * checks if 3d transforms are supported removing the modernizr dependency
     */
    css_transforms_3d: function css_transforms_3d() {

      // return false;

      var el = document.createElement('p'),
        supported = false,
        transforms = {
          'webkitTransform': '-webkit-transform',
          'OTransform': '-o-transform',
          'msTransform': '-ms-transform',
          'MozTransform': '-moz-transform',
          'transform': 'transform'
        };

      // Add it to the body to get the computed style
      document.body.insertBefore(el, null);

      for (var t in transforms) {
        if (el.style[t] !== undefined) {
          el.style[t] = 'translate3d(1px,1px,1px)';
          supported = window.getComputedStyle(el).getPropertyValue(transforms[t]);
        }
      }

      document.body.removeChild(el);

      return supported !== undefined && supported.length > 0 && supported !== "none";
    }

  };

  var $$23 = jQuery.noConflict();
  var position = 0;
  var preloader = $$23('.preloader');
  var preloader_logo = $$23('.preloader__logo');
  var home_logo = $$23('.l-header__logo--home');

  var scroll = {
    init: function init() {
      this.title_switcher();
      this.translate_header();
      if (!bowser.msie) this.slide_reveal();
      this.toggle_slider_dots();
      this.scroll_to_section();
      this.scale_logo();
    },
    translate_header: function translate_header() {

      var trans_header = $$23('.translate-header');

      if (trans_header.length > 0) {

        if (helper.breakpoint.large.matches) {

          trans_header.each(function () {

            var header = $$23(this),
              text = header.find('.translate-header__text');

            header.css({
              'transform': 'translate3d(' + $window.scrollTop() / 4 + 'px, 0)',
              '-webkit-transform': 'translate3d(0, ' + $window.scrollTop() / 4 + 'px, 0)'
            });

            text.css({
              'transform': 'translate3d(0, -' + $window.scrollTop() / 4 + 'px, 0)',
              '-webkit-transform': 'translate3d(0, -' + $window.scrollTop() / 4 + 'px, 0)',
              'opacity': (100 - $window.scrollTop() / 7) / 100
            });
          });
        }
      }
    },
    invert_background: function invert_background(ot) {

      var trigger = $$23('.invert-background').first(),
        scroll_top = $document.scrollTop();

      if (trigger.length <= 0) return;

      $$23('.site').toggleClass('invert-background', ot < scroll_top);
    },
    slide_reveal: function slide_reveal() {

      var slides = $document.find('.reveal-slider__slide');

      if (slides.length > 0) {

        var slide_text = $document.find('.reveal-slider__slide-text'),
          scroll_top = $window.scrollTop(),
          elem_height = $window.height(),
          max_height = elem_height,
          total_height = 0;

        slides.each(function () {
          total_height += elem_height;
        });

        for (var $i = 0; $i <= slides.length; $i++) {

          $$23(slide_text[$i]).css({
            'top': elem_height * $i + 'px',
            'transform': 'translate3d(0, -' + scroll_top + 'px, 0)',
            '-webkit-transform': 'translate3d(0, -' + scroll_top + 'px, 0)'
          });

          $$23(slides[$i]).css({
            'max-height': elem_height * ($i + 1) + 'px',
            'z-index': ($i - ($i + 1)) * $i
          });

          var scroll_distance = elem_height * ($i + 1);

          if (scroll_top + elem_height >= scroll_distance) {

            $$23(slides).removeClass('current');
            $$23(slides).css('max-height', 0);

            $$23(slides[$i]).addClass('current');
            $$23('.reveal-slider__slide .reveal-slider__scale .lazy-container').css('transform', 'translate3d(0,0,0)');
          }

          if (scroll_top + elem_height >= scroll_distance - elem_height / 2) {

            $$23(slides).removeClass('active-dot');
            $$23(slides[$i]).addClass('active-dot');
          }

          if ($$23(slides[$i]).hasClass('current')) {

            max_height = elem_height - elem_height / 2 * scroll_top / (elem_height / 2) + elem_height * $i;
            $$23('.reveal-slider__slide.current .reveal-slider__scale .lazy-container').css({
              'transform': 'translate3d(0, -' + (scroll_top - elem_height * $i) / 6 + 'px, 0)',
              '-webkit-transform': 'translate3d(0, -' + (scroll_top - elem_height * $i) / 6 + 'px, 0)'
            });
          }

          if (scroll_top >= total_height + $window.height() * 2) {
            $$23('.reveal-slider__skip').removeClass('visible');
          } else {
            $$23('.reveal-slider__skip').addClass('visible');
          }
        }

        $$23('.reveal-slider__slide.current').css({
          'max-height': max_height + 'px'
        });
      }
    },
    title_switcher: function title_switcher() {

      var project = $$23('.featured-project');

      if (project.length > 0) {

        var title_span = $$23('[data-title-span]'),
          container = $$23('[data-featured-container]'),
          container_height = container.outerHeight();

        project.each(function () {

          var project_top = $$23(this).offset().top,
            title = $$23(this).attr('aria-label');

          if (project_top <= $window.scrollTop() + $window.height() / 2) {
            title_span.text(title);
          }
        });

        if ($$23('.featured-project--1').offset().top - $window.scrollTop() <= $window.height() / 2) {
          title_span.show();
        } else {
          title_span.hide();
        }

        if ($window.scrollTop() >= $document.height() - ($window.height() + $$23('.l-footer').height())) {
          title_span.hide();
        }
      }
    },
    toggle_slider_dots: function toggle_slider_dots() {

      var dots = $$23('.carousel--reveal').find('.flickity-page-dots');

      if (dots.length <= 0) return;

      if ($window.scrollTop() >= $window.height() / 2 && $window.scrollTop() < $window.height()) {
        dots.css('opacity', '1');
      } else {
        dots.css('opacity', '0');
      }
    },
    scroll_to_section: function scroll_to_section() {

      var trigger = $$23('[data-scroll-to]');

      if (trigger.length > 0) {

        trigger.each(function () {

          var target = $$23(this).attr('data-target');

          $$23(this).on('click', function (e) {
            e.preventDefault();
            $$23(target).velocity('scroll', {
              duration: 1000,
              easing: [.81, .13, .42, .92],
              mobileHA: false
            }).stop();
          });

          // for slide reveal
          if ($$23(target).prev().hasClass('active-dot')) {
            $$23('.dot').removeClass('active');
            $$23(this).addClass('active');
          }
        });
      }
    },
    detect_scroll_direction: function detect_scroll_direction() {

      if ($$23('.full-bleed-header').length > 0) {

        var header = $$23('.l-header'),
          _scroll = $window.scrollTop(),
          home_offset = $$23('div.home').css('padding-top'),
          offset = $$23('body').hasClass('home') ? parseInt(home_offset, 10) : $window.height();

        if (_scroll > position && position <= offset + 84) {
          header.addClass('down');
        }

        position = _scroll;
      }
    },
    scale_logo: function scale_logo() {

      if (preloader.length > 0) {

        var max_height = window.innerHeight - $window.scrollTop();

        preloader.css({
          'max-height': max_height + 'px'
        });

        var where_to_finish = window.innerHeight - 84;
        // target / origin = scale fin
        var scale_stop = void 0;

        if (helper.breakpoint.xlarge.matches) {
          scale_stop = 98 / 580;
        } else {
          scale_stop = 98 / 480;
        }

        var new_where_to_finish = where_to_finish / (1 - scale_stop);
        var scale = 1 - $window.scrollTop() / new_where_to_finish;

        if (scale > scale_stop) {

          preloader_logo.css({
            'transform': 'scale( ' + scale + ') translate3d(0, -50%, 0)',
            '-webkit-transform': 'scale( ' + scale + ') translate3d(0, -50%, 0)',
            'visibility': 'visible'
          });

          if (helper.breakpoint.large.matches) {
            home_logo.css('display', 'none');
          } else {
            home_logo.css('display', 'block');
          }
        } else {

          preloader_logo.css({
            'transform': 'scale( ' + scale_stop + ') translate3d(0, -50%, 0)',
            '-webkit-transform': 'scale( ' + scale_stop + ') translate3d(0, -50%, 0)',
            'visibility': 'hidden'
          });

          home_logo.css('display', 'block');
        }
      }
    }
  };

  var $$24 = jQuery.noConflict();

  var $$25 = jQuery.noConflict();

  var VerticalScrollDetector = new function () {

    var initScroll;
    var isScrolling = false;

    $$25(window).on("touchstart", function (ev) {
      initScroll = $$25(window).scrollTop();
    });

    $$25(window).on("touchmove", function (ev) {
      if (!isScrolling) {
        var scroll = $$25(window).scrollTop();

        if (scroll != initScroll) {
          isScrolling = true;
        }
      }
    });

    $$25(window).on("touchend", function (ev) {
      isScrolling = false;
    });

    this.isScrolling = function () {
      return isScrolling;
    };
  }();

  var AbstractSwiper = function AbstractSwiper(optionsArg) {
    var _this = this;

    /**
     * Resolve options
     */
    if (typeof optionsArg === 'undefined') {
      optionsArg = {};
    }

    var defaultOptions = {
      name: undefined, // must be unique

      direction: AbstractSwiper.HORIZONTAL,

      animationEase: Expo.easeOut,
      animationTime: 0.6,

      count: undefined,

      containerSize: function containerSize() {
        throw "AbstractSwiper: undefined containerSize function!";
      }, // relativeX is relatively to this size!!!
      // initMarginSize: function() { return 0; }, // function!
      slideMarginSize: function slideMarginSize() {
        return 0;
      }, // function!
      slideSize: function slideSize() {
        throw "AbstractSwiper: undefined slideSize function!";
      }, // function!
      snapOffset: function snapOffset() {
        return 0;
      },

      // callbacks - all deprecated
      // Use .on method instead
      onMove: function onMove() {},
      onPanStart: function onPanStart() {},
      onPanEnd: function onPanEnd() {},
      onStillChange: function onStillChange() {},
      onActiveSlidesChange: function onActiveSlidesChange() {},

      // miscellaneous
      numberOfItemsMovedAtOneAction: null, //function() { return 1; },
      // numberOfActiveSlides: 1,
      // shouldShowSingleDot: false,

      counterTransformer: function counterTransformer(num) {
        return "" + num;
      },

      autoLayoutOnResize: true,

      infinite: false,

      snapOnlyToAdjacentSlide: true,

      freefloat: false
    };

    this._options = defaultOptions;

    for (var key in optionsArg) {
      if (!optionsArg.hasOwnProperty(key)) {
        continue;
      }
      this._options[key] = optionsArg[key];
    }

    /**
     *  Set up slide widths and snap points
     */

    this._pos = 0; // current position of slider (whole container)
    this._relativePos = 0; // this is kept only for the purpose of changing number of items. It's important to keep old relativePos to keep old position right in new layout.
    this._slideState = {}; // 1 - normal, -1 moved to the back

    this._onResizeCallback = function () {
      // clearTimeout(resizeTimeout);

      // setTimeout(function() {
      //   _this.layout();
      // }, 1000);

      this.layout();
    };

    window.addEventListener('resize', function () {
      if (!_this._options.autoLayoutOnResize) {
        return;
      }

      _this._onResizeCallback();
    });

    /**
     * Others
     */
    this._isTouched = false; // true if touch gesture is in progress
    this._isStill = true; // true if at peace - this means that slider is still and there's no touch event active.

    this._animations = [];

    this._panStartPos = 0;
    this._enabled = false;

    /**
     * Listeners object
     */
    this.listeners = {};

    this._resetCache();
  };

  AbstractSwiper.HORIZONTAL = 0;
  AbstractSwiper.VERTICAL = 1;

  /** CACHE MANAGEMENT */
  AbstractSwiper.prototype._getValueFromOptions = function (key, arg1) {

    if (key == 'containerSize') {
      // no arguments
      if (typeof this._CACHE[key] === 'undefined') {
        this._CACHE[key] = this._options[key]();
      }
      return this._CACHE[key];
    } else {
      // single argument

      if (typeof this._CACHE[key][arg1] === 'undefined') {
        this._CACHE[key][arg1] = this._options[key](arg1);
      }
      return this._CACHE[key][arg1];
    }
  };

  AbstractSwiper.prototype._resetCache = function (key) {
    this._CACHE = {
      'containerSize': undefined,
      'slideMarginSize': {},
      'slideSize': {},
      'snapOffset': {},
      'snapOffsetRight': {}
    };
  };

  /** Helper methods */
  AbstractSwiper.prototype._getSelectorForComponent = function (component) {
    return '.swiper-' + component + '[data-swiper="' + this._options.name + '"]';
  };

  // Helper layout functions!
  AbstractSwiper.prototype._getSlideableWidth = function () {
    var result = 0;
    for (var i = 0; i < this._options.count; i++) {
      // get full _width and _snapPoints

      result += this._getValueFromOptions('slideSize', i);

      if (i == this._options.count - 1 && !this._options.infinite) {

        // result += this._getValueFromOptions('snapOffsetRight', i);
        break;
      } // total slideable width can't include right margin of last element unless we are at infinite scrolling!

      result += this._getValueFromOptions('slideMarginSize', i);
    }

    return result;
  };

  AbstractSwiper.prototype._getSlideInitPos = function (slide) {
    var result = 0;
    for (var i = 0; i < slide; i++) {
      // get full _width and _snapPoints
      result += this._getValueFromOptions('slideSize', i);
      result += this._getValueFromOptions('slideMarginSize', i);
    }

    return result;
  };

  AbstractSwiper.prototype._getMaxPos = function () {
    if (this._options.infinite) {
      throw "_getMaxPos method not available in infinite mode";
    }

    return Math.max(0, this._getSlideableWidth() - this._getValueFromOptions('containerSize') + this._getValueFromOptions('snapOffset') + this._getValueFromOptions('snapOffsetRight'));
  };

  AbstractSwiper.prototype._getSlideSnapPos = function (slide) {
    if (this._options.infinite) {
      return this._getSlideInitPos(slide);
    } // in case of infinite, snap position is always slide position

    return Math.min(this._getSlideInitPos(slide), this._getMaxPos());
  };

  AbstractSwiper.prototype._getMaxTargetSlide = function () {
    if (this._options.infinite) {
      throw "_getMaxTargetSlide method not available in infinite mode";
    }

    if (this._options.length == 1) {
      return 0;
    } // if 1 slide, then its max target slide

    for (var i = 1; i < this._options.length; i++) {
      if (this._getSlideSnapPos(i) == this._getMaxPos()) {
        return i;
      }
    }

    return this._options.count - 1; // last by default
  };

  AbstractSwiper.prototype.layout = function () {

    this._killAnimations(); // stop all ongoing animations after resize!

    this._resetCache(); // Reset cache

    // There's a chance that number of items was changed, so let's normalize position.
    var newPos = this._relativePos * this._getValueFromOptions('containerSize');

    // For finite sliders, we can't exceed max position
    if (!this._options.infinite && newPos > this._getMaxPos()) {
      newPos = this._getMaxPos();
    }

    // For no freefloat, we must snap!
    if (!this._options.freefloat) {
      newPos = this._getClosestSnappedPosition(newPos);
    }

    this._updatePos(newPos);
  };

  /**
   * Get array of -1, 1, 0 values, which mean that either element is on the left of edge, on the right, or active -> let's call it "orientation".
   */
  AbstractSwiper.prototype.getSlideOrientation = function (i) {
    var leftEdge = this.getSlidePosition(i);
    var rightEdge = leftEdge + this._getValueFromOptions('slideSize', i);

    var leftContainerEdge = 0;
    var rightContainerEdge = this._getValueFromOptions('containerSize');

    if (rightEdge < leftContainerEdge) {
      return -1;
    } else if (leftEdge > rightContainerEdge) {
      return 1;
    } else if (leftEdge <= leftContainerEdge && rightEdge >= rightContainerEdge) {
      return 0;
    } else if (leftEdge >= leftContainerEdge && rightEdge <= rightContainerEdge) {
      return 0;
    } else if (leftEdge <= leftContainerEdge) {
      return -1;
    } else if (rightEdge >= rightContainerEdge) {
      return 1;
    }
  };

  /**
   * Get array of how much visible in container is each slide.
   */
  AbstractSwiper.prototype.getSlidePercentOfVisibility = function (i) {

    var leftEdge = this.getSlidePosition(i);
    var rightEdge = leftEdge + this._getValueFromOptions('slideSize', i);

    var leftContainerEdge = 0;
    var rightContainerEdge = this._getValueFromOptions('containerSize');

    if (rightEdge < leftContainerEdge) {
      return 0;
    } else if (leftEdge > rightContainerEdge) {
      return 0;
    } else if (leftEdge <= leftContainerEdge && rightEdge >= rightContainerEdge) {
      return 1;
    } else if (leftEdge >= leftContainerEdge && rightEdge <= rightContainerEdge) {
      return 1;
    } else if (leftEdge <= leftContainerEdge) {
      return (rightEdge - leftContainerEdge) / this._getValueFromOptions('slideSize', i);
    } else if (rightEdge >= rightContainerEdge) {
      return (rightContainerEdge - leftEdge) / this._getValueFromOptions('slideSize', i);
    }
  };

  AbstractSwiper.prototype.getSlidePosition = function (i) {
    return -this._pos + this._getValueFromOptions('snapOffset', i) + this._slideState[i] * this._getSlideableWidth() + this._getSlideInitPos(i);
  };

  AbstractSwiper.prototype.isSlideActive = function (i) {
    return this.getActiveSlides().indexOf(i) > -1;
  };

  AbstractSwiper.prototype._getClosestSnappedPosition = function (pos, side) {

    // Side means if we snap to specific side. If 0, to the closest, -1 to the left, 1 to the right.
    if (typeof side === 'undefined') {
      side = 0;
    }

    var normalizedPos = this._normalizePos(pos);

    var minDistance, index;

    // Let's find slide which distance to normalisedPos is minimum
    for (var i = 0; i < this._options.count; i++) {

      var distance = normalizedPos - this._getSlideInitPos(i);

      if (Math.abs(distance) < Math.abs(minDistance) || minDistance === undefined) {
        index = i;
        minDistance = distance;
      }
    }

    // In case of infinite slider let's just adjust real position (not normalized) with calculated delta to closest snapped position.
    if (this._options.infinite) {
      var result = pos - minDistance;
    } else {
      // In case of finite slide, we can safely just takie initial position of found slide.
      var result = this._getSlideInitPos(index);
    }

    // If side is not default, we want to assure that closest snapped position is on the right hand side of current position.
    // If result is < pos, then we don't have to nothing because condition is already met. In other case,
    // we need to take next slide instead of current one.
    if (side == 1 && result < pos) {

      // We change position to next slide position.
      var newResult = result - this._getSlideInitPos(index) + this._getSlideInitPos(this._getSlideFromOffset(1));

      // In case of infinite sliders next slide position may be smaller than current because of wrapping. Below we take care of this case.
      if (newResult < result) {
        newResult += this._getSlideableWidth();
      }
    }
    // This condition is analogous to the above one.
    else if (side == -1 && result > pos) {
      var newResult = result - this._getSlideInitPos(index) + this._getSlideInitPos(this._getSlideFromOffset(-1));

      if (newResult > result) {
        newResult -= this._getSlideableWidth();
      }
    } else {
      newResult = result;
    }

    // If slider is not infinite, we must normalise calculated position so that it doesn't exceed minimum and maximum position.
    if (!this._options.infinite) {
      newResult = this._normalizePos(newResult, false);

      // newResult = Math.min(this._getMaxPos(), newResult);
      // newResult = Math.max(0, newResult);
    }

    return newResult;
  };

  /**
   * 1. There's always at least one active slide
   * 2. Active slides are always the ones that are at least 50% visible in container!
   */
  AbstractSwiper.prototype.getActiveSlides = function () {
    var _this = this;

    var newActiveSlides = [];

    for (var i = 0; i < this._options.count; i++) {
      if (this.getSlidePercentOfVisibility(i) >= 0.5) {
        newActiveSlides.push({
          index: i,
          pos: _this.getSlidePosition(i)
        });
      }
    }

    if (newActiveSlides.length == 0) {
      // If not a single active slide
      var visibilityPercentages = this.getSlidesVisibilityPercentages();

      var maxVisibility = 0,
        maxIndex = 0;
      for (var i = 0; i < this._options.count; i++) {
        if (visibilityPercentages[i] > maxVisibility) {
          maxIndex = i;
        }
      }

      return [maxIndex];
    }

    newActiveSlides.sort(function (a, b) {
      return a.pos > b.pos;
    });

    var result = newActiveSlides.map(function (x) {
      return x.index;
    });

    return result;
  };

  /**
   * Returns only ONE slide, the one which left edge is closest to "snapOffset" (starting position - assuming it's active place)
   * @return {[type]} [description]
   */
  AbstractSwiper.prototype.getActiveSlide = function () {

    var minDistance = 999999;
    var index;

    for (var i = 0; i < this._options.count; i++) {

      var diff = Math.abs(this.getSlidePosition(i) - this._getValueFromOptions('snapOffset', i));

      if (diff < minDistance) {
        minDistance = diff;
        index = i;
      }
    }

    return index;
  };

  AbstractSwiper.prototype.getSlidesVisibilityPercentages = function () {
    var visibilities = [];

    for (var i = 0; i < this._options.count; i++) {
      visibilities.push(this.getSlidePercentOfVisibility(i));
    }

    return visibilities;
  };

  AbstractSwiper.prototype.getSlidesOrientations = function () {
    var orientations = [];

    for (var i = 0; i < this._options.count; i++) {
      orientations.push(this.getSlideOrientation(i));
    }

    return orientations;
  };

  AbstractSwiper.prototype._killAnimations = function () {
    for (var i = 0; i < this._animations.length; i++) {
      this._animations[i].kill();
    }
    this._animations = [];
  };

  AbstractSwiper.prototype.getCount = function () {
    return this._options.count;
  };

  AbstractSwiper.prototype.setStill = function (status) {
    if (status == this._isStill) {
      return;
    }
    this._isStill = status;

    if (this._isStill) {
      this._unblockScrolling();
    } else {
      this._blockScrolling();
    }

    // events
    this._options.onStillChange(this._isStill); // deprecated
    this._invokeListeners('equilibriumChange', this._isStill); // new way
  };

  AbstractSwiper.prototype._blockScrolling = function () {
    if (this._mc) {
      this._mc.get('pan').set({
        direction: Hammer.DIRECTION_ALL
      });
      this._mc.get('swipe').set({
        direction: Hammer.DIRECTION_ALL
      });
    }
  };

  AbstractSwiper.prototype._unblockScrolling = function () {
    if (this._mc) {
      var hammerDirection = this._options.direction == AbstractSwiper.HORIZONTAL ? Hammer.DIRECTION_HORIZONTAL : Hammer.DIRECTION_VERTICAL;
      this._mc.get('pan').set({
        direction: hammerDirection
      });
      this._mc.get('swipe').set({
        direction: hammerDirection
      });
    }
  };

  AbstractSwiper.prototype.enable = function () {
    var _this = this;

    if (this._enabled) {
      return;
    }
    this._enabled = true;

    this._mc = new Hammer(document.querySelector(this._getSelectorForComponent('touch-space')), {
      domEvents: false
    });

    var swiped = false;

    var hammerDirection = this._options.direction == AbstractSwiper.HORIZONTAL ? Hammer.DIRECTION_HORIZONTAL : Hammer.DIRECTION_VERTICAL;

    this._mc.get('pan').set({
      direction: hammerDirection,
      threshold: 20
    });
    this._mc.get('swipe').set({
      direction: hammerDirection,
      threshold: 20
    });

    function onPanStart(ev) {

      if (!_this._isTouched) {

        // Events onPanStart
        _this._options.onPanStart();
        _this._invokeListeners('touchdown');

        _this._isTouched = true;
        swiped = false;

        _this._killAnimations();

        _this._panStartPos = _this._pos;

        _this.setStill(false);
      }
    }

    _this._mc.on("pan panup pandown panleft panright panstart panend swipe swipeleft swiperight swipeup swipedown", function (ev) {

      // Prevents weird Chrome bug (Android chrome too) with incorrect pan events showing up.
      // https://github.com/hammerjs/hammer.js/issues/1050
      if (ev.srcEvent.type == "pointercancel") {
        return;
      }

      var delta = _this._options.direction == AbstractSwiper.HORIZONTAL ? ev.deltaX : ev.deltaY;

      switch (ev.type) {
        case "swipeleft":
        case "swipeup":

          if (_this._isTouched) {
            var v = Math.abs(ev.velocityX) * 1000;
            var newPos = _this._getNextPositionFromVelocity(v);
            _this.moveTo(newPos);

            swiped = true;
          }

          break;

        case "swiperight":
        case "swipedown":

          if (_this._isTouched) {

            var v = -Math.abs(ev.velocityX) * 1000;
            var newPos = _this._getNextPositionFromVelocity(v);
            _this.moveTo(newPos);
            swiped = true;
          }

          break;
        case "panstart":
          break;

        case "panup":
        case "pandown":
          // this is important! When panning is in progress, we should enable panup pandown to avoid "jumping" of slider when sliding more vertically than horizontally.
          // However, if we gave up returning when _this._isTouched is false, Android would too eagerly start "panning" instaed of waiting for scroll.
          if (!_this._isTouched) {
            return;
          }

        case "panleft":
        case "panright":
          if (VerticalScrollDetector.isScrolling()) {
            break;
          } // if body is scrolling then not allow for horizontal movement
          onPanStart(ev); // onPanStart is on first panleft / panright, because its deferred until treshold is achieved

          if (_this._isTouched && !swiped) {
            _this._pan(delta, _this._panStartPos);
          }

          break;

        case "panend":

          if (_this._isTouched) {

            // Events
            _this._options.onPanEnd(); // deprecated
            _this._invokeListeners('touchup'); // new way

            _this._isTouched = false;

            if (!swiped) {

              var pos = _this._pos;

              if (_this._options.freefloat && !_this._options.infinite) {
                pos = this._normalizePos(pos, false);
              } else if (!_this._options.freefloat) {
                pos = _this._getClosestSnappedPosition(pos);
              }

              _this.moveTo(pos);
            }

            swiped = false;
          }
          break;
      }
    });
  };

  AbstractSwiper.prototype.disable = function () {
    if (!this._enabled) {
      return;
    }
    this._enabled = false;

    this._mc.destroy();
    this._mc = undefined;
  };

  AbstractSwiper.prototype.goToNext = function (animated) {

    if (this._options.numberOfItemsMovedAtOneAction == null) {
      this.moveTo(this._getClosestSnappedPosition(this._pos + this._getValueFromOptions('containerSize')));
      return;
    }

    this.goTo(this._getSlideFromOffset(this._options.numberOfItemsMovedAtOneAction()), animated, 1);
  };

  AbstractSwiper.prototype.goToPrevious = function (animated) {

    if (this._options.numberOfItemsMovedAtOneAction == null) {
      this.moveTo(this._getClosestSnappedPosition(this._pos - this._getValueFromOptions('containerSize')));
      return;
    }

    this.goTo(this._getSlideFromOffset(-this._options.numberOfItemsMovedAtOneAction()), animated, -1);
  };

  AbstractSwiper.prototype._getSlideFromOffset = function (offset) {

    var leftMostActiveSlide = this.getActiveSlide();
    var newSlide = leftMostActiveSlide + offset;

    if (this._options.infinite) {

      newSlide = newSlide % this._options.count;
      if (newSlide < 0) {
        newSlide += this._options.count;
      }
    } else {

      if (newSlide < 0) {
        newSlide = 0;
      } else if (newSlide > this._getMaxTargetSlide()) {
        newSlide = this._getMaxTargetSlide();
      }
    }

    return newSlide;
  };

  AbstractSwiper.prototype._getNextPositionFromVelocity = function (v) {

    // In case of freefloat just add s.

    var s = 0.2 * v * this._options.animationTime / 2;
    var targetPos = this._pos + s; // targetPos at this stage is not snapped to any slide.

    if (this._options.freefloat) {

      if (!this._options.infinite) {
        targetPos = this._normalizePos(targetPos, false);
      }

      return targetPos;
    }

    // If this options is true, we want to snap to as closest slide as possible and not further.
    // This is necessary because when you have slider when slide is 100% width, strong flick gestures
    // would make swiper move 2 or 3 positions to right / left which feels bad. This flag should be
    // disabled in case of "item swiper" when couple of items are visible in viewport at the same time.
    if (this._options.snapOnlyToAdjacentSlide) {
      targetPos = v < 0 ? this._pos - 1 : this._pos + 1;
    }

    return this._getClosestSnappedPosition(targetPos, v < 0 ? -1 : 1);
  };

  AbstractSwiper.prototype._normalizePos = function (position, overscroll) {

    if (this._options.infinite) {

      position = position % this._getSlideableWidth();
      if (position < 0) {
        position += this._getSlideableWidth();
      } // this is needed because Javascript is shit and doesn't correctly calculate modulo on negative numbers.

      return position;
    } else {

      // If overscroll is true, we run _overscrollFunction on position. If not, we simply limit min / max position.
      if (typeof overscroll === 'undefined') {
        overscroll = true;
      }

      if (overscroll) {
        if (position < 0) {
          var rest = -position / this._getValueFromOptions('containerSize');
          position = -this._overscrollFunction(rest) * this._getValueFromOptions('containerSize');
        }
        if (position > this._getMaxPos()) {
          var rest = (position - this._getMaxPos()) / this._getValueFromOptions('containerSize');
          position = this._getMaxPos() + this._overscrollFunction(rest) * this._getValueFromOptions('containerSize');
        }
      } else {
        if (position < 0) {
          position = 0;
        }
        if (position > this._getMaxPos()) {
          position = this._getMaxPos();
        }
      }

      return position;
    }
  };

  // Overfscroll function for noninfinite sliders. If it's f(x) = x it will be linear. x = 1 means entire container width movement.
  AbstractSwiper.prototype._overscrollFunction = function (val) {
    return 0.3 * Math.log(1 + val);
  };

  AbstractSwiper.prototype._pan = function (deltaX, startX) {
    this._updatePos(startX - deltaX);
  };

  AbstractSwiper.prototype._updatePos = function (pos) {
    var positions = {};
    var absolutePositions = {};

    var normalizedPos = this._normalizePos(pos);

    if (this._options.infinite) {

      this._pos = normalizedPos; // In case of infinite we enforce normalization

      // Wrap positions!
      for (var i = 0; i < this._options.count; i++) {

        var rightEdge = this._getSlideInitPos(i) - this._pos + this._getValueFromOptions('snapOffset', i) + this._getValueFromOptions('slideSize', i);

        // Every element which is totally hidden on the left hand side of container gets transferred to the right
        if (rightEdge < 0) {
          this._slideState[i] = 1;
        }
        // Every element which right edge is bigger then slideable width should be moved to the left
        else if (rightEdge > this._getSlideableWidth()) {
          this._slideState[i] = -1;
        } else {
          this._slideState[i] = 0;
        }

        positions[i] = -this._pos + this._getValueFromOptions('snapOffset', i) + this._slideState[i] * this._getSlideableWidth();
      }
    } else {

      this._pos = pos;

      for (var i = 0; i < this._options.count; i++) {
        this._slideState[i] = 0;

        positions[i] = -normalizedPos + this._getValueFromOptions('snapOffset', i);
      }
    }

    for (var i = 0; i < this._options.count; i++) {
      absolutePositions[i] = positions[i] + this._getSlideInitPos(i);
    }

    this._relativePos = this._pos / this._getValueFromOptions('containerSize');

    // Invoke callback if active slides changed
    var shouldUpdateComponents = false;

    var currentActiveSlides = this.getActiveSlides();

    var currentActiveSlide = this.getActiveSlide();

    if (typeof this._activeSlide === 'undefined' || this._activeSlide !== currentActiveSlide) {
      this._activeSlide = currentActiveSlide;

      this._invokeListeners('activeSlideChanged', this._activeSlide); // new way
      shouldUpdateComponents = true;
    }

    // if (typeof this._activeSlides === 'undefined' || currentActiveSlides.join(",") != this._activeSlides.join(",")) {

    //   this._activeSlides = currentActiveSlides;

    //   // events
    //   this._options.onActiveSlidesChange(this._activeSlides); // deprecated
    //   this._invokeListeners('activeSlidesChange', this._activeSlides); // new way

    //   shouldUpdateComponents = true;
    // }

    if (shouldUpdateComponents) {
      this._componentsUpdate();
    }

    // Callbacks
    this._options.onMove({
      positions: positions
    }); // deprecated
    this._invokeListeners('move', {
      positions: positions,
      absolutePositions: absolutePositions
    }); // new way

  };

  AbstractSwiper.prototype.moveTo = function (pos, animated) {

    if (typeof animated === 'undefined') {
      animated = true;
    }

    var _this = this;

    // Don't initiate animation if we're already in the same spot! It would wrongly set "Still" callback and "empty animation" would run.
    var diff = Math.abs(pos - this._pos);
    if (diff < 1) {
      return;
    }

    this._killAnimations();

    if (animated) {

      this.setStill(false);
      var tmp = {
        pos: _this._pos
      };

      var anim1 = TweenLite.to(tmp, this._options.animationTime, {
        pos: pos,
        ease: this._options.animationEase,
        onUpdate: function onUpdate() {

          _this._updatePos(tmp.pos);
        },
        onComplete: function onComplete() {

          _this._animations = [];
          _this.setStill(true);
        }
      });

      this._animations = [anim1];
    } else {
      _this._updatePos(pos);
    }
  };

  // If side = 0, shortest path, 1 -> always right, -1 always left
  AbstractSwiper.prototype.goTo = function (slide, animated, side) {
    var _this = this;

    if (typeof animated === 'undefined') {
      animated = true;
    }
    if (typeof side === 'undefined') {
      side = 0;
    }

    var pos = this._getSlideSnapPos(slide);

    // In case of infinite slider, we must take strategy of shortest path. So if we go from 10th slide (last) to 1st, we go one slide right, not 10 slides left.

    if (this._options.infinite) {

      if (side == 0) {
        // shortest path strategy

        if (Math.abs(pos - this._pos) > this._getSlideableWidth() / 2) {
          if (pos - this._pos > 0) {
            pos -= this._getSlideableWidth();
          } else {
            pos += this._getSlideableWidth();
          }
        }
      } else if (side == 1 && pos - this._pos < 0) {
        // force right movement
        pos += this._getSlideableWidth();
      } else if (side == -1 && pos - this._pos > 0) {
        // force left movement
        pos -= this._getSlideableWidth();
      }
    }

    if (animated) {
      _this.moveTo(pos);
    } else {
      _this._updatePos(pos);
    }
  };

  /**
   * LISTENERS
   */
  AbstractSwiper.prototype.on = function (event, listener) {
    if (typeof this.listeners[event] === 'undefined') {
      this.listeners[event] = [];
    }

    this.listeners[event].push(listener);
  };

  AbstractSwiper.prototype._invokeListeners = function (event, p1, p2, p3, p4) {
    if (typeof this.listeners[event] === 'undefined') {
      return;
    }

    this.listeners[event].forEach(function (listener) {
      listener(p1, p2, p3, p4);
    });
  };

  /**
   *
   * COMPONENTS
   *
   */
  AbstractSwiper.prototype.deinitComponents = function () {

    // Unbind clicks on next / previous
    if (this._clickSpaceNext) {
      this._clickSpaceNext.removeEventListener('click', this._clickSpaceNextOnClickListener);
    }

    if (this._clickSpacePrevious) {
      this._clickSpacePrevious.removeEventListener('click', this._clickSpacePreviousOnClickListener);
    }

    // Reset pager items to single item + remove listener

    if (this._pagerItems) {
      for (var i = 0; i < this._pagerItems.length; i++) {

        // Let's leave first element alive, just unbind listener
        if (i == 0) {
          this._pagerItems[i].removeEventListener('click', this._pagerItemsOnClickListeners[i]);
        } else {
          // rest elements -> out.
          this._pagerItems[i].remove();
        }
      }
    }
  };

  AbstractSwiper.prototype.initComponents = function () {

    this.deinitComponents();

    var _this = this;

    // Arrows
    this._clickSpacePrevious = document.querySelector(this._getSelectorForComponent('click-space-previous'));
    this._clickSpaceNext = document.querySelector(this._getSelectorForComponent('click-space-next'));

    if (this._clickSpaceNext) {

      this._clickSpaceNextOnClickListener = function (e) {
        e.preventDefault();

        if (_this._clickSpaceNext.classList.contains('active')) {
          _this.goToNext();
        }
      };

      _this._clickSpaceNext.addEventListener('click', this._clickSpaceNextOnClickListener);
    }

    if (this._clickSpacePrevious) {

      this._clickSpacePreviousOnClickListener = function (e) {
        e.preventDefault();

        if (_this._clickSpacePrevious.classList.contains("active")) {
          _this.goToPrevious();
        }
      };

      _this._clickSpacePrevious.addEventListener('click', this._clickSpacePreviousOnClickListener);
    }

    //Pager
    this._pagerItemTemplate = document.querySelector(this._getSelectorForComponent('pager-item'));

    if (this._pagerItemTemplate) {
      for (var i = 0; i < this._options.count - 1; i++) {
        var pagerItem = this._pagerItemTemplate.cloneNode(true);
        this._pagerItemTemplate.parentNode.insertBefore(pagerItem, this._pagerItemTemplate.nextSibling);
      }
    }

    this._pagerItems = document.querySelectorAll(this._getSelectorForComponent('pager-item'));
    this._pagerItemsOnClickListeners = [];

    for (var i = 0; i < this._pagerItems.length; i++) {

      (function (i) {

        _this._pagerItemsOnClickListeners[i] = function (e) {
          _this.goTo(i);
          e.preventDefault();
        };

        _this._pagerItems[i].addEventListener('click', _this._pagerItemsOnClickListeners[i]);
      })(i);
    }

    // Counter
    this._counterAll = document.querySelector(this._getSelectorForComponent('counter-all'));
    this._counterCurrent = document.querySelector(this._getSelectorForComponent('counter-current'));

    this._componentsUpdate();
  };

  AbstractSwiper.prototype._componentsUpdate = function () {

    // Arrows
    if (this._clickSpaceNext) {
      this._clickSpaceNext.classList.add('active');

      if (!this._options.infinite && this.getActiveSlide() == this._options.count - 1) {
        this._clickSpaceNext.classList.remove('active');
      }
    }

    if (this._clickSpacePrevious) {
      this._clickSpacePrevious.classList.add('active');

      if (!this._options.infinite && this.getActiveSlide() == 0) {
        this._clickSpacePrevious.classList.remove('active');
      }
    }

    // Pager items
    if (this._pagerItemTemplate) {
      for (var j = 0; j < this._pagerItems.length; j++) {
        this._pagerItems[j].classList.remove('active');

        if (this.isSlideActive(j)) {
          this._pagerItems[j].classList.add('active');
        }
      }
    }

    // Counter
    if (this._counterCurrent) {
      this._counterCurrent.innerHTML = this._options.counterTransformer(this.getActiveSlide() + 1);
    }

    if (this._counterAll) {
      this._counterAll.innerHTML = this._options.counterTransformer(this._options.count);
    }
  };

  //import {share} from './videojs-share';

  var $$26 = jQuery.noConflict();
  var autoplaying_class = 'auto-playing';

  var videoPlayer = {
    init: function init() {
      var _this = this;

      if (window.VIDEOJS_LOADED) {
        this.realInit();
      } else {
        setTimeout(function () {
          _this.init();
        }, 500);
      }
    },
    _getVideoPlayer: function _getVideoPlayer() {
      return this._container.find('.video-player');
    },
    _useNativePlayer: function _useNativePlayer() {
      // return true;
      return bowser.mobile;
    },
    _autoPlay: function _autoPlay() {

      this._videoJS.addClass(autoplaying_class);
      this._videoJS.play();
      this._videoJS.bigPlayButton.show();
    },
    _resetOnEnded: function _resetOnEnded(player) {

      player.on('ended', function () {
        player.currentTime(0);
        player.removeClass(autoplaying_class);
        player.muted(false);
      });
    },
    _playFromStart: function _playFromStart(player) {

      player.bigPlayButton.on('click', function () {

        if (player.hasClass(autoplaying_class)) {
          player.removeClass(autoplaying_class);
          player.currentTime(0);
          player.play();
          player.muted(false);
        }

        //console.log(player.cache_.src);

        if ($$26('body').hasClass('single')) {
          var vjsShareHTML = '\n                <div class="vjs-video-share">\n                    <!-- Twitter -->\n                    <a class="vjs-menu-button" href="https://twitter.com/share?url=' + player.cache_.src + '&amp;text=' + document.title + '&amp;hashtags=make" target="_blank">\n                        <svg width="15" height="17" viewbox="0 0 18 15" xmlns="http://www.w3.org/2000/svg">\n  <path d="M0 12.616a10.657 10.657 0 0 0 5.661 1.615c6.793 0 10.507-5.476 10.507-10.223 0-.156-.003-.31-.01-.464A7.38 7.38 0 0 0 18 1.684a7.461 7.461 0 0 1-2.12.564A3.621 3.621 0 0 0 17.503.262c-.713.411-1.505.71-2.345.871A3.739 3.739 0 0 0 12.462 0C10.422 0 8.77 1.607 8.77 3.59c0 .283.033.556.096.82A10.578 10.578 0 0 1 1.254.656a3.506 3.506 0 0 0-.5 1.807c0 1.246.65 2.346 1.642 2.99a3.731 3.731 0 0 1-1.673-.45v.046c0 1.74 1.274 3.193 2.962 3.523a3.756 3.756 0 0 1-.972.126c-.239 0-.47-.022-.695-.064.469 1.428 1.833 2.467 3.449 2.494A7.531 7.531 0 0 1 .88 12.665c-.298 0-.591-.014-.881-.049" fill="#FFF" fill-rule="evenodd"></path>\n</svg>\n\n                    </a>\n                 \n                    <!-- Facebook -->\n                    <a class="vjs-menu-button" href="http://www.facebook.com/sharer.php?u=' + player.cache_.src + '" target="_blank">\n                        <svg width="8" height="17" viewbox="0 0 8 16" xmlns="http://www.w3.org/2000/svg">\n  <path d="M5.937 2.752h1.891V.01L5.223 0c-2.893 0-3.55 2.047-3.55 3.353v1.829H0v2.824h1.673V16H5.19V8.006h2.375l.308-2.824H5.19v-1.66c0-.624.44-.77.747-.77" fill="#FFF" fill-rule="evenodd"></path>\n</svg>\n\n                    </a>\n\n                    <!-- Email -->\n                    <a class="vjs-menu-button" href="mailto:?Subject=' + document.title + '&amp;Body=' + player.cache_.src + '">\n                        <svg width="15" height="17" viewbox="0 0 15.8 11" xmlns="http://www.w3.org/2000/svg">\n  <path d="M15.5,0L7.9,5.5L0.3,0H15.5z M0,11V1.9l7.9,5.7l7.9-5.7V11H0z" fill="#fff"/>\n</svg>\n\n                    </a>\n                    \n                    <button class="vjs-menu-button vjs-share-toggle">\n                        <svg fill="#fff" height="20px" id="Layer_1" version="1.1" viewBox="0 0 64 64" width="20px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M48,39.26c-2.377,0-4.515,1-6.033,2.596L24.23,33.172c0.061-0.408,0.103-0.821,0.103-1.246c0-0.414-0.04-0.818-0.098-1.215  l17.711-8.589c1.519,1.609,3.667,2.619,6.054,2.619c4.602,0,8.333-3.731,8.333-8.333c0-4.603-3.731-8.333-8.333-8.333  s-8.333,3.73-8.333,8.333c0,0.414,0.04,0.817,0.098,1.215l-17.711,8.589c-1.519-1.609-3.666-2.619-6.054-2.619  c-4.603,0-8.333,3.731-8.333,8.333c0,4.603,3.73,8.333,8.333,8.333c2.377,0,4.515-1,6.033-2.596l17.737,8.684  c-0.061,0.407-0.103,0.821-0.103,1.246c0,4.603,3.731,8.333,8.333,8.333s8.333-3.73,8.333-8.333C56.333,42.99,52.602,39.26,48,39.26  z"/></svg>\n                    </button>\n                </div>';

          $$26('.vjs-control-bar').append(vjsShareHTML);

          $$26('.vjs-share-toggle').click(function () {
            $$26('.vjs-video-share').toggleClass("open");
          });
        }
      });
    },
    _getVideos: function _getVideos() {

      var videos = document.getElementsByTagName('video');

      for (var i = 0; i < videos.length; i++) {

        var video = videos[i];

        if (video.className.indexOf('video-js') > -1) {

          this._videoJS = videojs(video.id, {
            controls: true,
            autoplay: false,
            // preload: 'auto',
            controlBar: {
              children: ['progressControl', 'playToggle', 'muteToggle', 'currentTimeDisplay', 'timeDivider', 'durationDisplay', 'fullscreenToggle',
                // 'volumeBar',
                'volumeControl'
              ]
            }
          });

          // var shareOptions = {
          //   socials: ['fbFeed', 'tw', 'gp', 'messenger', 'linkedin', 'mail'],

          //   url: window.location.href,
          //   title: 'videojs-share',
          //   description: 'video.js share plugin',
          //   image: 'https://dummyimage.com/1200x630',

          //   // required for Facebook and Messenger
          //   fbAppId: '12345', 
          //   // optional for Facebook
          //   redirectUri: window.location.href + '#close',

          //   // optional for VK
          //   isVkParse: true,
          // }

          //this._videoJS.share();

          if ($$26(video).parent().hasClass('video-module')) {
            this._autoPlay();
            this._resetOnEnded(this._videoJS);
            this._playFromStart(this._videoJS);
          } else {
            this._videoJS.play();
          }
        }
      }
    },
    realInit: function realInit() {
      var _this2 = this;

      this._container = $$26('#video-player-container');

      if (this._useNativePlayer()) {
        this._getVideoPlayer().hide(); // prevents zoom-in / zoom-out animation of video player.
      } else {

        this._container.find('.video-player-close').click(function () {
          _this2.close();
        });

        this._getVideos();

        window.videoPlayer = this;

        this._videoJS.on('play', function () {
          _this2._getVideoPlayer().addClass('active');
        });
      }
    },
    open: function open(spec) {
      var _this3 = this;

      //console.log(spec);
      if (this._useNativePlayer()) {

        jQuery('#' + spec[0].id)[0].play();
      } else {
        this._videoJS.src(spec);
        this._container.addClass('active');

        // add title of current video in control-bar
        //this._container.find('.vjs-control-bar').append('<div class="vjs-video-title">' + spec[0].title + '</div>');


        var vjsShareHTML = '\n            <div class="vjs-video-share">\n                <!-- Twitter -->\n                <a class="vjs-menu-button" href="https://twitter.com/share?url=' + spec[0].src + '&amp;text=' + spec[0].title + '&amp;hashtags=make" target="_blank">\n                    <svg width="15" height="17" viewbox="0 0 18 15" xmlns="http://www.w3.org/2000/svg">\n  <path d="M0 12.616a10.657 10.657 0 0 0 5.661 1.615c6.793 0 10.507-5.476 10.507-10.223 0-.156-.003-.31-.01-.464A7.38 7.38 0 0 0 18 1.684a7.461 7.461 0 0 1-2.12.564A3.621 3.621 0 0 0 17.503.262c-.713.411-1.505.71-2.345.871A3.739 3.739 0 0 0 12.462 0C10.422 0 8.77 1.607 8.77 3.59c0 .283.033.556.096.82A10.578 10.578 0 0 1 1.254.656a3.506 3.506 0 0 0-.5 1.807c0 1.246.65 2.346 1.642 2.99a3.731 3.731 0 0 1-1.673-.45v.046c0 1.74 1.274 3.193 2.962 3.523a3.756 3.756 0 0 1-.972.126c-.239 0-.47-.022-.695-.064.469 1.428 1.833 2.467 3.449 2.494A7.531 7.531 0 0 1 .88 12.665c-.298 0-.591-.014-.881-.049" fill="#FFF" fill-rule="evenodd"></path>\n</svg>\n\n                </a>\n             \n                <!-- Facebook -->\n                <a class="vjs-menu-button" href="http://www.facebook.com/sharer.php?u=' + spec[0].src + '" target="_blank">\n                    <svg width="8" height="17" viewbox="0 0 8 16" xmlns="http://www.w3.org/2000/svg">\n  <path d="M5.937 2.752h1.891V.01L5.223 0c-2.893 0-3.55 2.047-3.55 3.353v1.829H0v2.824h1.673V16H5.19V8.006h2.375l.308-2.824H5.19v-1.66c0-.624.44-.77.747-.77" fill="#FFF" fill-rule="evenodd"></path>\n</svg>\n\n                </a>\n\n                <!-- Email -->\n                <a class="vjs-menu-button" href="mailto:?Subject=' + spec[0].title + '&amp;Body=' + spec[0].src + '">\n                    <svg width="15" height="17" viewbox="0 0 15.8 11" xmlns="http://www.w3.org/2000/svg">\n  <path d="M15.5,0L7.9,5.5L0.3,0H15.5z M0,11V1.9l7.9,5.7l7.9-5.7V11H0z" fill="#fff"/>\n</svg>\n\n                </a>\n                <button class="vjs-menu-button vjs-share-toggle">\n                    <svg fill="#fff" height="20px" id="Layer_1" version="1.1" viewBox="0 0 64 64" width="20px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M48,39.26c-2.377,0-4.515,1-6.033,2.596L24.23,33.172c0.061-0.408,0.103-0.821,0.103-1.246c0-0.414-0.04-0.818-0.098-1.215  l17.711-8.589c1.519,1.609,3.667,2.619,6.054,2.619c4.602,0,8.333-3.731,8.333-8.333c0-4.603-3.731-8.333-8.333-8.333  s-8.333,3.73-8.333,8.333c0,0.414,0.04,0.817,0.098,1.215l-17.711,8.589c-1.519-1.609-3.666-2.619-6.054-2.619  c-4.603,0-8.333,3.731-8.333,8.333c0,4.603,3.73,8.333,8.333,8.333c2.377,0,4.515-1,6.033-2.596l17.737,8.684  c-0.061,0.407-0.103,0.821-0.103,1.246c0,4.603,3.731,8.333,8.333,8.333s8.333-3.73,8.333-8.333C56.333,42.99,52.602,39.26,48,39.26  z"/></svg>\n                </button>\n            </div>';

        this._container.find('.vjs-control-bar').append(vjsShareHTML);

        $$26('.vjs-share-toggle').click(function () {
          $$26('.vjs-video-share').toggleClass("open");
        });

        //setTimeout - fix for safari:
        setTimeout(function () {
          _this3._videoJS.play();
        }, 300);
      }
    },
    close: function close() {
      var _this4 = this;

      if (this._useNativePlayer()) {
        this._getVideoPlayer()[0].stop();
      } else {

        this._videoJS.pause();
        this._container.removeClass('active');

        // remove title of current video in control-bar

        setTimeout(function () {
          _this4._getVideoPlayer().removeClass('active');
          // this._container.find('.vjs-video-title').remove();
        }, 300);

        setTimeout(function () {
          $$26('.vjs-video-share').remove();
        }, 500);
      }
    }
  };

  window.HELP_IMPROVE_VIDEOJS = false;

  var $$27 = jQuery.noConflict();

  var videosSlider = {
    init: function init() {

      var container = $$27('.videos-container');
      var containerInner = $$27('.videos-container-inner');
      var carousel = $$27('.videos-carousel');
      var videos = carousel.find('.video');
      var arrowSpace = container.find('.arrow-space');
      var arrowSpaceLeft = container.find('.arrow-space.left');
      var arrowSpaceRight = container.find('.arrow-space.right');

      if (carousel.length == 0) {
        return;
      }

      function isMobileVersion() {
        return window.innerWidth < layout.Breakpoints.sm;
      }

      function setContainerSize() {

        if (isMobileVersion()) {
          var padding = 10;
        } else {
          var padding = layout.Grid.columnWidth() + layout.Grid.gutterWidth();
        }

        containerInner.css('height', (bigSlideSize() - padding * 2) * 0.5625 + 'px');
        videos.css({
          width: bigSlideSize() + 'px',
          padding: '0 ' + padding + 'px'
        });

        arrowSpace.width((window.innerWidth - bigSlideSize()) / 2 - padding);
      }

      setContainerSize();
      $$27(window).resize(setContainerSize);

      // Init layout
      function smallSlideSize() {
        if (isMobileVersion()) {
          return bigSlideSize() * 0.5; // very small zoom on mobile
        }

        return window.innerWidth * 0.25;
      }

      function smallSnapOffset() {
        return (window.innerWidth - smallSlideSize()) / 2;
      }

      function bigSlideSize() {
        if (isMobileVersion()) {
          return layout.Grid.cols(24);
        }
        return layout.Grid.cols(20);
      }

      var swiper = new AbstractSwiper({
        name: 'videos',

        count: videos.length,

        // infinite: true,

        containerSize: function containerSize() {
          return window.innerWidth;
        },

        numberOfItemsMovedAtOneAction: function numberOfItemsMovedAtOneAction() {
          return 1;
        },

        slideSize: smallSlideSize,
        snapOffset: smallSnapOffset,
        snapOffsetRight: smallSnapOffset
      });

      var absolutePositions;

      function layoutSlides() {

        for (var i = 0; i < videos.length; i++) {
          var video = videos.eq(i);

          var x = (absolutePositions[i] - smallSnapOffset()) / smallSlideSize() * bigSlideSize() + (window.innerWidth - bigSlideSize()) * 0.5;

          var transform = 'translateX(' + x + 'px)'; //' scale(' + obj.scale + ')';

          video.css('transform', transform);
        }
      }

      swiper.on('move', function (coords) {
        absolutePositions = coords.absolutePositions;
        layoutSlides();
      });

      videos.find('.button').click(function () {
        if (carousel.hasClass('minified')) {
          return;
        }

        var sources = $$27(this).data('video-sources');

        videoPlayer.open(sources);
      });

      var timeout;

      function minify() {
        // return;
        clearTimeout(timeout);

        container.addClass('minified');
        carousel.css('transform', 'scale(' + smallSlideSize() / bigSlideSize() + ')');
      }

      function unminify() {
        if (!swiper._isStill) {
          return;
        }

        clearTimeout(timeout);

        // 0 timeout let's click event to be run before
        timeout = setTimeout(function () {
          container.removeClass('minified');
          carousel.css('transform', 'none');
        }, 300);
      }

      function pointerDown(e) {

        clearTimeout(timeout);

        if (e.which === 1) {
          // if left mouse button
          timeout = setTimeout(minify, 300);
        }
      }

      function pointerUp() {
        unminify();
      }

      carousel.on('mousedown', pointerDown);
      carousel.on('touchdown', pointerDown);

      carousel.on('mouseup', pointerUp);
      carousel.on('touchup', pointerUp);
      carousel.on('touchcancel', pointerUp);

      swiper.on('touchdown', function () {
        minify();
      });

      swiper.on('equilibriumChange', function (isInEquilibrium) {

        if (isInEquilibrium) {
          unminify();
          layoutSlides();
        }
      });

      swiper.on('activeSlideChanged', function (active) {

        videos.each(function (index) {
          if (index == active) {
            $$27(this).addClass('active');
          } else {
            $$27(this).removeClass('active');
          }
        });

        // videos.removeClass('active');
        // videos.eq(active).addClass('active');

        // Changing titles at the bottom of page
        container.find('.title').html(videos.eq(active).data('title'));
      });

      // Show carousel by fade in
      carousel.addClass('init');

      setTimeout(function () {
        if (!bowser.safari) {
          // Safari has buggy look of smooething movement
          carousel.addClass('smooth-movement');
        }
      }, 0);

      // Initialize swiper and components (arrows)
      swiper.layout();
      swiper.enable();
      swiper.initComponents();

      // drag cursor till first click init
      dragCursor.init(containerInner);

      // Keys
      document.onkeydown = function checkKey(e) {
        e = e || window.event;
        if (e.keyCode == '37') {
          swiper.goToPrevious();
        } else if (e.keyCode == '39') {
          swiper.goToNext();
        }
      };

      // There's a bug with keys hard to resolve. When you hit arrow and animation hasn't finished, try to drag. Videos go big altough they shouldn't.

    }
  };

  var $$28 = jQuery.noConflict();

  var section_media_awards = {
    init: function init() {

      if ($$28('html.touch').length != 0) {
        return;
      }

      var section = $$28('section.media-awards');

      var item,
        cursorPos = {};

      function setItemPosition() {
        if (typeof item === 'undefined') {
          return;
        }

        var left = cursorPos.x - item.w / 2;
        var bottom = cursorPos.y - $$28(window).innerHeight() - $$28(window).scrollTop() - 20;

        item.elem.css('transform', 'translateX(' + left + 'px) translateY(' + bottom + 'px)');
      }

      $body.mousemove(function (event) {
        cursorPos.x = event.pageX;
        cursorPos.y = event.pageY;

        // If item is visible
        setItemPosition(item);
      });

      $$28('.media-awards .award .project a').hover(function () {
        var elem = $$28(this).closest('.award').find('.project-image');

        item = {
          w: elem.width(),
          h: elem.height(),
          elem: elem
        };

        section.addClass('hover-on-project');
        elem.addClass('visible');
      }, function () {
        item.elem.removeClass('visible');
        section.removeClass('hover-on-project');
        item = undefined;
      });
    }
  };

  var $$29 = jQuery.noConflict();

  var ui = {
    init: function init() {
      this.set_tabs_container_height();
      this.tabs();
      this.read_more_toggle();
      this.scroll_to_page_anchor();
      this.show_crisis_homepage();
      this.close_crisis_homepage();
    },
    load: function load() {
      this.animate_onload();
    },
    resize: function resize() {
      this.set_tabs_container_height();
    },
    set_tabs_container_height: function set_tabs_container_height() {

      var elementHeights = $$29('.tab__content').map(function () {
        $$29('.carousel').flickity('resize');
        return $$29(this).height();
      }).get();

      var maxHeight = Math.max.apply(null, elementHeights);

      $$29('.tabs__container').height(maxHeight);
    },
    tabs: function tabs() {

      $$29('.tabs li').click(function () {

        var tab_id = $$29(this).attr('data-tab'),
          carousel = $$29("#" + tab_id).find('.carousel');

        $$29('.tabs li').removeClass('current');
        $$29('.tab__content').removeClass('current');

        $$29(this).addClass('current');
        $$29("#" + tab_id).addClass('current');

        if (carousel.length > 0) {
          carousel.flickity('destroy').flickity(options.multi);
        }
      });
    },
    read_more_toggle: function read_more_toggle() {

      var target = $$29('.read-more-toggle'),
        text_more = target.attr('data-more'),
        text_less = target.attr('data-less');

      target.each(function () {

        var trigger = $$29(this).next('[data-read-more-toggle]').find('a'),
          element_height = $$29(this).height() + 70;

        $$29(this).css('max-height', element_height + 'px');
        $$29(this).addClass('hidden');

        trigger.on('click', function () {
          target.toggleClass('hidden');
          if ($$29(this).text() == text_more) $$29(this).text(text_less);
          else $$29(this).text(text_more);
        });
      });
    },
    scroll_to_page_anchor: function scroll_to_page_anchor() {

      var anchors_nav = $$29('.section-nav');

      if (anchors_nav.length > 0) {

        var last_id = void 0,
          anchors_items = anchors_nav.find('a'),
          header_height = $$29('.l-header').height(),
          scroll_items = anchors_items.map(function () {
            var item = $$29($$29(this).attr('href'));
            if (item.length) return item;
          });

        anchors_items.click(function (e) {

          var href = $$29(this).attr('href'),
            offsetTop = href === "#" ? 0 : $$29(href).offset().top - header_height + 1;

          $$29('html, body').velocity('scroll', {
            duration: 1000,
            offset: offsetTop,
            easing: [.81, .13, .42, .92]
          }).stop();

          e.preventDefault();
        });

        $window.scroll(function () {

          var distance_top = $$29(this).scrollTop() + header_height,
            cur = scroll_items.map(function () {
              if ($$29(this).offset().top < distance_top) return this;
            });

          cur = cur[cur.length - 1];
          var id = cur && cur.length ? cur[0].id : '';

          if (last_id !== id) {
            last_id = id;
            anchors_items.parent().removeClass('active').end().filter("[href='#" + id + "']").parent().addClass('active');
          }
        });
      }
    },
    animate_onload: function animate_onload() {

      var elem = $$29('.animate-onload');

      if (elem.length <= 0) return;

      elem.addClass('visible');
    },
    semi_trans_img_overlay: function semi_trans_img_overlay() {

      $document.on('lazybeforeunveil', function (e) {
        var pseudo = $$29(e.target).parent().hasClass('js-pseudo');
        if (pseudo) {
          $$29(e.target).before('<span class="overlay overlay--light"></span>');
          setTimeout(function () {
            $$29('.js-pseudo').find('.overlay').addClass('active');
          }, 100);
        }
      });
    },
    show_crisis_homepage: function show_crisis_homepage() {

      if (Cookies.get('closed_crisis_notice')) {
        $$29('.c-crisis-homepage').hide();
        //helper.scroll_enable();
      } else {
        $$29('.c-crisis-homepage').show();
        //helper.scroll_disable();
      }
    },
    close_crisis_homepage: function close_crisis_homepage() {

      $$29('[data-crisis-close]').on('click', function () {
        $$29('.c-crisis-homepage').fadeOut(300);
        Cookies.set('closed_crisis_notice', 'true', {
          expires: 1
        });
        //helper.scroll_enable();
      });
    }
  };

  var $$30 = jQuery.noConflict();

  var video = {
    init: function init() {
      this.fade_in_video();
    },
    fade_in_video: function fade_in_video() {

      $$30('.reveal-slider__slide-video').addClass('animate--fade-in-init');
    },
    detect_touch: function detect_touch() {

      var video = $$30('#video-top');

      if ($$30('.no-touch').length <= 0 || video.length <= 0) return;

      var video_src = video.find('source'),
        video_data_src = video.attr('data-src');

      if (window.matchMedia('(max-width: 1024px)').matches) {
        video_src.attr('src', '');
      } else {
        video_src.attr('src', video_data_src);

        video[0].load();
      }
    },
    preloader: function preloader() {

      if ($$30('.home').length > 0) {

        setTimeout(function () {
          $$30('body').addClass('preloaded');
        }, 600);
      }
    },
    ie_video: function ie_video() {

      var ie_video_src = $$30('#ie-video source'),
        ie_video_data_src = $$30('#ie-video').attr('data-src');

      if (bowser.msie) {
        $$30('.top-section .lazy-container').hide();

        ie_video_src.attr('src', ie_video_data_src);
      } else {

        ie_video_src.attr('src', '');
      }
    }
  };

  var $$31 = jQuery.noConflict();

  var overlayGallery = new function () {
    var _this2 = this;

    var _this = this;

    this.$pswp = $$31('.pswp');
    this.$component = $$31('.js-photoswipe-gallery');
    this.$images = $$31('[data-photoswipe-category]');
    this.$pswpHook = $$31('#photoswipe-gallery-hook');
    this.$gridGallery = $$31('.js-photoswipe-grid-gallery');
    this.$tag = this.$gridGallery.find('.js-photoswipe-tag');
    this.categories = [];
    this.slides = [];

    /**
     * Initializes component
     * @method init
     */
    this.init = function () {
      var drawerExists = !!drawer.$component.length;
      var componentExists = !!this.$component.length;
      var imagesExists = !!this.$images.length;

      if (!drawerExists && !componentExists && !imagesExists) {
        return;
      }

      this._initGalleryCategoories();
      this._addEventListeners();
      this._cloneImagesToGrid();
    };

    /**
     * Attaches event listeners
     * @method _addEventListeners
     * @private
     */
    this._addEventListeners = function () {
      var _this = _this2;

      _this2.$component.find('.pswp__item').on('mousemove mouseover', function (e) {
        _this2._setCursor(e);
      });

      _this2.$component.on('click', '.cursor-right', function (e) {
        if (_this2._imageCanBeZoomed(e) || _this2._isTouchDevice()) {
          return;
        }

        e.stopPropagation();
        _this2.pswp.next();
      });

      _this2.$component.on('click', '.cursor-left', function (e) {
        if (_this2._imageCanBeZoomed(e) || _this2._isTouchDevice()) {
          return;
        }

        e.stopPropagation();
        _this2.pswp.prev();
      });

      _this2.$images.on('click', function (e) {
        e.preventDefault();

        var imgIndex = $$31(this).index('[data-photoswipe-sizes]');
        _this.open(imgIndex);
      });

      _this2.$tag.on('click', function () {
        var activeClass = 'is-selected';
        var $selectedGallery = $$31('[data-photoswipe-grid="' + $$31(this).data('photoswipe-tag') + '"]');
        var $images = $selectedGallery.find('[data-photoswipe-category]');

        _this.$tag.removeClass(activeClass);
        $$31(this).addClass(activeClass);
        $$31('[data-photoswipe-grid]').removeClass(activeClass);
        $selectedGallery.addClass(activeClass);
      });

      _this2.$gridGallery.on('click', '[data-photoswipe-category]', function (e) {
        e.preventDefault();

        var newSlides = [];
        var $images = $$31('[data-photoswipe-grid=' + $$31(this).data('photoswipe-category') + ']').find('[data-photoswipe-category]');

        $images.each(function (index, node) {
          return newSlides.push(JSON.parse(node.dataset.photoswipeSizes));
        });
        _this.slides = newSlides;
      });

      _this2.$gridGallery.on('click', function (e) {
        e.stopPropagation();
      });

      _this2.$gridGallery.on('click', '.js-close-drawer-hook', function () {
        drawer.close($$31(this).data('id'));
      });

      _this2.$gridGallery.on('click', '[data-photoswipe-category]', function (e) {
        var $images = _this.$gridGallery.find('[data-photoswipe-grid=' + $$31(this).data('photoswipe-category') + ']').find('[data-photoswipe-category]');
        var imgIndex = $$31(this).data('img-grid-index');

        e.stopPropagation();

        // console.log(imgIndex);

        _this.pswp.goTo(imgIndex);
      });
    };

    /**
     * Opens overlay gallery
     * @method open
     * @param {number} [index=0] - inded of gallery's element
     */
    this.open = function () {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (_this2.pswp) {
        _this2.pswp.close();
      }

      var realViewportWidth = void 0,
        useLargeImages = false,
        firstResize = true,
        imageSrcWillChange = void 0;

      var imagesArray = [];
      _this2.$images.each(function (index, image) {
        return imagesArray.push(JSON.parse(image.dataset.photoswipeSizes));
      });

      _this2.pswp = new PhotoSwipe(document.querySelectorAll('.pswp')[0], PhotoSwipeUI_Default, imagesArray, {
        barsSize: {
          top: 86,
          bottom: 86
        },
        isClickableElement: function isClickableElement(el) {
          if (el.tagName === 'SPAN') {
            $$31(el).trigger('click');
            return false;
          }

          if (el.tagName == 'A') {
            return true;
          }

          return false;
        },
        preload: [1, 1],
        mouseUsed: false,
        tapToToggleControls: false,
        loop: true,
        clickToCloseNonZoomable: false,
        closeElClasses: _this.slides,
        closeOnScroll: false,
        history: false,
        escKey: false,
        tapToClose: false,
        pinchToClose: false,
        closeOnVerticalDrag: false,
        hideAnimationDuration: 0,
        showAnimationDuration: 0,
        index: index
      });

      _this2.pswp.listen('afterChange', function () {
        _this2.$component.find('[download]')[0].href = _this2.pswp.currItem.src;
      });

      _this2.pswp.listen('beforeResize', function () {
        realViewportWidth = _this2.pswp.viewportSize.x * window.devicePixelRatio;

        if (useLargeImages && realViewportWidth < 1000) {
          useLargeImages = false;
          imageSrcWillChange = true;
        } else if (!useLargeImages && realViewportWidth >= 1000) {
          useLargeImages = true;
          imageSrcWillChange = true;
        }

        if (imageSrcWillChange && !firstResize) {
          _this2.pswp.invalidateCurrItems();
        }

        if (firstResize) {
          firstResize = false;
        }

        imageSrcWillChange = false;
      });

      var currentImageWidthPicked;
      var sizes = {};

      // Finding the closest width value in the object
      function closest(num, sizes) {

        var curr = Object.keys(sizes)[0];
        var diff = Math.abs(num - curr);
        for (var val = 0; val < Object.keys(sizes).length; val++) {
          var newdiff = Math.abs(num - Object.keys(sizes)[val]);
          if (newdiff < diff) {
            diff = newdiff;
            curr = Object.keys(sizes)[val];
          }
        }
        return curr;
      }

      _this2.pswp.listen('gettingData', function (index, item) {

        // Container size, doesn't have to be accurate, can be more or less accurate
        var containerHeight = window.innerHeight;
        var containerWidth = window.innerWidth;

        var containerRatio = containerWidth / containerHeight;
        var photoRatio = item.sizes[item.sizes.length - 1].w / item.sizes[item.sizes.length - 1].h;

        var photoInGalleryWidth = containerWidth;

        if (photoRatio < containerRatio) {
          photoInGalleryWidth = containerWidth / (containerRatio / photoRatio);
        }

        /* Extract all available sizes */
        // Sizes length
        var sizes_length = Object.keys(sizes).length;

        // Init sizes, we extract all available sizes
        if (sizes_length == 0) {
          for (var i = 0; i < item.sizes.length; i++) {
            sizes[item.sizes[i].w] = item.sizes[i].h;
          }
        }

        // Let's find smallest image bigger than what we expect to show
        for (var _i = 0; _i < item.sizes.length; _i++) {

          var size = item.sizes[_i];

          // If smallest image bigger than viewport width or last item (biggest image), then pick it
          if (size.w > photoInGalleryWidth * 2 || _i === item.sizes.length - 1) {

            item.w = photoInGalleryWidth * 2; //size.w;
            item.h = photoInGalleryWidth * 2 / photoRatio; //size.h;
            item.src = size.src;

            currentImageWidthPicked = item.w;

            // console.log('index', index, 'w', item.w);

            break;
          }
        }

        // Thumbnail size
        // var thumbnailSize = 0;
        //
        //
        // // Let's find smallest image bigger than viewport to show
        // for (var i = 0; i < item.sizes.length; i++) {
        //
        //     var size = item.sizes[i];
        //
        //     // If smallest image bigger than viewport width or last item (biggest image), then pick it
        //     if (size.w > window.innerWidth || i === item.sizes.length - 1) {
        //
        //         // Calculate size of the thumbnail
        //         thumbnailSize = (containerHeight / size.h) * size.w;
        //
        //         // Find the closest size of the doubled miniature
        //         var closestVal = closest(thumbnailSize * 2, sizes);
        //
        //         // ... and get its values:
        //         var size;
        //         $.each(item.sizes, function () {
        //             if (this.w == closestVal) {
        //                 size = this;
        //                 return false;
        //             }
        //         });
        //
        //         item.w = 3000;//size.w;
        //         item.h = 3000;//size.h;
        //         item.src = size.src;
        //
        //         currentImageWidthPicked = item.w;
        //
        //         break;
        //     }
        // }
      });

      _this2.pswp.listen('beforeResize', function () {

        var containerHeight = window.innerHeight - 172;
        var thumbnailSize = 0;

        var newImageWidthPicked;

        var sizes_length = Object.keys(sizes).length;

        for (var i = 0; i < sizes_length; i++) {

          var size_width = Object.keys(sizes)[i];

          if (size_width > window.innerWidth || i == sizes_length - 1) {

            var size_height = sizes[size_width];

            thumbnailSize = containerHeight / size_height * size_width;

            newImageWidthPicked = closest(thumbnailSize * 2, sizes);

            break;
          }
        }

        // If picked size has changed, let's invalidate items!
        if (newImageWidthPicked != currentImageWidthPicked) {
          _this2.pswp.invalidateCurrItems();
          currentImageWidthPicked = newImageWidthPicked;
        }
      });

      _this2.pswp.init();

      _this2.$component.find('[download]').attr('href', _this2.pswp.currItem.src);
    };

    /**
     * Initializes grid gallery's categories
     * @method _initGalleryCategoories
     * @private
     */
    this._initGalleryCategoories = function () {
      _this2.$images.each(function (index, element) {
        _this2.categories.push(element.dataset.photoswipeCategory);
      });

      if (_this2.categories.length) {
        _this2.categories.forEach(function (el) {
          $$31('[data-photoswipe-tag=\'' + el + '\']').removeClass('is-hidden');
        });
      }

      $$31('.js-photoswipe-tag.is-hidden').remove();
    };

    /**
     * Sets zoom, previous or next custom cursor over gallery
     * @method _setCursor
     * @param {MouseEvent} e
     * @private
     */
    this._setCursor = function (e) {
      var middle = window.innerWidth / 2;
      var target = e.target;

      if (e.clientX < middle) {
        $$31('.cursor-right:not(.c-photoswipe-cursor)').removeClass('cursor-right');
        $$31(target).addClass('cursor-left');
        $$31('.pswp__container').addClass('cursor-left');
      } else {
        $$31('.cursor-left:not(.c-photoswipe-cursor)').removeClass('cursor-left');
        $$31(target).addClass('cursor-right');
        $$31('.pswp__container').addClass('cursor-right');
      }
    };

    /**
     * Checks if target is zoomable image
     * @method _imageCanBeZoomed
     * @param {MouseEvent} e
     * @private
     * @returns {boolean}
     */
    this._imageCanBeZoomed = function (e) {
      var target = e.target;
      var photoswipeHasZoomAllowed = _this2.$pswp.hasClass('pswp--zoom-allowed');
      var targetIsImage = $$31(e.target).hasClass('pswp__img');

      if (targetIsImage) {
        // console.log(target.getBoundingClientRect().left)
        e.stopPropagation();
      }

      return photoswipeHasZoomAllowed && targetIsImage;
    };

    /**
     * Checks if device has enabled touch input
     * @method _isTouchDevice
     * @private
     * @returns {boolean}
     */
    this._isTouchDevice = function () {
      return bowser.mobile || bowser.tablet;
    };

    /**
     * Clones images to gallery's grid
     * @method _cloneImagesToGrid
     * @private
     */
    this._cloneImagesToGrid = function () {
      var imgIndex = 0;
      _this2.$images.each(function (index, node) {
        var img = $$31(node);
        var gridAll = $$31('[data-photoswipe-grid="All"]');
        var gridDrawings = $$31('[data-photoswipe-grid="Drawings"]');
        var imgCategory = img.data('photoswipe-category');
        var $img = img.clone();
        $img.find('[sizes]').attr('sizes', '350px');

        var photoswipeCat = $$31($img[0]).data("photoswipe-category");
        var photoswipeSizes = JSON.stringify($$31($img[0]).data("photoswipe-sizes"));
        var photoswipeID = $$31($img[0]).data("id");

        $$31($img[0]).removeClass().removeAttr('data-photoswipe-category');
        $$31($img[0]).removeAttr('data-photoswipe-sizes');
        $$31($img[0]).removeAttr("style");
        $$31($img[0]).css({
          paddingBottom: $$31($img[0]).data("padding")
        });
        $$31($img[0]).addClass('lazy-container');

        var customDiv = $$31("<div class='_wrapper' />");
        $img = customDiv.append($img);
        customDiv = $$31("<div data-img-grid-index='" + imgIndex + "' data-id='" + photoswipeID + "' data-photoswipe-category='" + photoswipeCat + "' data-photoswipe-sizes='" + photoswipeSizes + "' class='pswp__trigger js-close-drawer-hook' />");
        $img = customDiv.append($img);

        $img.appendTo(gridAll);
        if (imgCategory == "Drawings") {
          var $img2 = $img.clone();
          $img2.appendTo(gridDrawings);
        }

        imgIndex++;
      });
    };
  }();

  var $$32 = jQuery.noConflict();

  var inputs = {
    init: function init() {

      var text_fields = $$32('.field-text input');
      var textarea_fields = $$32('.field-textarea textarea');

      $$32(text_fields).on('focusin', function () {
        handleFillingField(this);
      });
      $$32(text_fields).on('focusout', function () {
        handleFillingField(this);
      });
      $$32(text_fields).keyup(function () {
        handleFillingField(this);
      });

      $$32(textarea_fields).on('focusin', function () {
        handleFillingField(this);
      });
      $$32(textarea_fields).on('focusout', function () {
        handleFillingField(this);
      });
      $$32(textarea_fields).keyup(function () {
        handleFillingField(this);
      });

      function handleFillingField(element) {
        if ($$32(element).val()) {
          $$32(element).closest('.field-wrapper').addClass('filled');
        } else {
          $$32(element).closest('.field-wrapper').removeClass('filled');
        }
      }
    }
  };

  var $$33 = jQuery.noConflict();

  var slider_boxes = {
    init: function init() {
      var $controller = $$33('.js-content-filters');

      $controller.on('click', 'li', function () {
        var $component = $$33($$33(this).parent().data('id'));

        $component.find('.visible').removeClass('visible');
        $component.children().eq($$33(this).index()).addClass('visible');
      });
    }
  };

  var $$34 = jQuery.noConflict();

  var azPanel = {
    $component: $$34('.js-az-panel'),
    $filterLetter: $$34('.js-az-panel-filter-letter'),

    $filterLetterTarget: $$34('.js-az-panel-container-list-letter'),

    $leftPanels: $$34('.js-az-panel-left'),
    $leftPanelProject: $$34('.js-az-panel-left[data-panel-id^=project]'),
    $leftPanelAZ: $$34('.js-az-panel-left[data-panel-id=az]'),
    $leftPanelLetter: $$34('.js-az-panel-left[data-panel-id=letter]'),
    $leftPanelProjectName: $$34('.js-az-panel-left[data-panel-id=project-name]'),

    $leftPanelDefault: $$34('.js-az-panel-left-default'),

    $rightPanel: $$34('.js-az-side-panel-right'),

    $singleLetter: $$34('.js-az-panel-big-letter'), // big letter panel

    $coverLink: $$34('.js-az-side-panel-cover'),
    $currentItemTitle: $$34('.js-az-panel-current-item'),
    $categoriesMenu: $$34('.c-categories'),

    hideLeftPanels: function hideLeftPanels() {
      this.$leftPanels.removeClass('is-visible');
    },
    showDefaultPanel: function showDefaultPanel() {
      this.hideLeftPanels();

      this.$leftPanelDefault.addClass('is-visible');
    },
    showLeftPanelProjectName: function showLeftPanelProjectName(projectName) {
      this.hideLeftPanels();

      this.$leftPanelLetter.addClass('is-visible');
      this.$singleLetter.text(letter);
    },
    showLeftPanelLetter: function showLeftPanelLetter(letter) {
      this.hideLeftPanels();

      this.$leftPanelLetter.addClass('is-visible');
      this.$singleLetter.text(letter);
    },
    showLeftPanelProject: function showLeftPanelProject(projectId) {
      this.hideLeftPanels();

      var panel = $$34('.js-az-panel-left[data-panel-id=project-' + projectId + ']');
      panel.addClass('is-visible');

      if (this.mode == "mode_first_image") {
        this.$leftPanelDefault.removeClass('js-az-panel-left-default');
        panel.addClass('js-az-panel-left-default');
        this.$leftPanelDefault = panel;
      }

      this.loadImages(panel);

      this.loadImages(this.$component);
    },
    loadImages: function loadImages(selector) {

      if (!bowser.tablet && !bowser.mobile) {
        selector.find('.lazy-container img').addClass('lazyload');
      }
    },
    init: function init() {
      var _this = this;

      if (!this.$component.length) {
        return;
      }

      this.mode = this.$component.attr('data-mode');

      this.$filterLetter.on('click', function (e) {
        azPanel.scrollList(this);
      });

      if (!bowser.tablet && !bowser.mobile) {
        this.$filterLetter.hover(function (ev) {
          _this.showLeftPanelLetter($$34(ev.target).text());
        }, function () {
          _this.showDefaultPanel();
        });

        this.$coverLink.hover(function (ev) {

          if ($$34(ev.target).hasClass('is-disabled')) {
            return;
          }

          // Greying out other elements on hover works ONLY if there are no disabled items. If some are disabled, this effect is turned off.
          if (_this.$rightPanel.find('.js-az-side-panel-cover.is-disabled').length === 0) {
            _this.$rightPanel.addClass('js-az-side-panel--item-hovered');
          }

          _this.showLeftPanelProject($$34(ev.target).attr('data-project-id'));
        }, function () {
          _this.showDefaultPanel();
          _this.$rightPanel.removeClass('js-az-side-panel--item-hovered');
        });
      }

      this.showDefaultPanel();

      // setTimeout(() => {
      //     this.loadImages(this.$component);
      // }, 6000);

      if (this.mode == "mode_first_image") {
        this.loadImages(this.$leftPanelProject.eq(0)); // preload first image, becuase it's visible after opening panel
      }
    },
    scrollList: function scrollList(el) {
      var $el = $$34(el);
      var letter = $el.text();
      var $scrollableArea = $$34('.js-az-side-panel-right');
      var value = $scrollableArea.find('[data-letter="' + $el.text() + '"]').offset().top - $$34(document).scrollTop() + $scrollableArea.scrollTop() - this.$categoriesMenu.outerHeight();

      $scrollableArea.animate({
        scrollTop: value
      }, 300);
    }
  };

  var $$35 = jQuery.noConflict();

  var Categories = {
    $component: $$35('[data-categories-target]'),
    $elementsToFilter: $$35($$35('[data-categories-target]').data('categories-target')).find('[data-categories]'),

    init: function init() {
      if (!this.$component.length) {
        return;
      }

      this.$component.on('click', '[data-category]', function (e) {
        e.preventDefault();

        var category = $$35(this).data('category');
        $$35(this).closest('[data-categories-target]').find('[data-category]').removeClass('is-selected');
        $$35(this).addClass('is-selected');

        $$35($$35(this).closest('[data-categories-target]').data('categories-target')).find('[data-categories]').each(function (index, node) {
          var $node = $$35(node);
          var categories = $node.data('categories').split(' ');

          if (!categories.includes(category)) {
            $node.addClass('is-disabled');

            if ($node.is('input')) {
              $node[0].disabled = true;
            }
          } else {
            $node.removeClass('is-disabled');

            if ($node.is('input')) {
              $node[0].disabled = false;
            }
          }
        });

        if ($$35(this).closest('.js-accordion-element').length) {
          var $accordionElement = $$35(this).closest('.js-accordion-element');
          var categoryName = $$35(this).parent().find('.js-projects-filters-mobile-name').text();

          Accordion.updateDynamicTitle($accordionElement, categoryName);
          Accordion.close($accordionElement);
        }
      });
    }
  };

  var $$36 = jQuery.noConflict();

  var bg_images = {
    init: function init() {
      this.set_image();
      this.object_fit_fallback();
    },
    resize: function resize() {
      this.init();
    },
    set_image: function set_image() {

      var image = $$36('[data-responsive-bg]'),
        large = window.matchMedia('(min-width: 1024px)'),
        medium = window.matchMedia('(min-width: 768px)'),
        small = window.matchMedia('(min-width: 430px)');

      image.each(function () {

        var data_size_l = $$36(this).data('size-l'),
          data_size_m = $$36(this).data('size-m'),
          data_size_s = $$36(this).data('size-s');

        if (large.matches) {
          $$36(this).css('background-image', 'url(' + data_size_l + ')');
        } else if (medium.matches) {
          $$36(this).css('background-image', 'url(' + data_size_m + ')');
        } else if (small.matches) {
          $$36(this).css('background-image', 'url(' + data_size_s + ')');
        } else {
          $$36(this).css('background-image', 'url(' + data_size_s + ')');
        }
      });
    },
    object_fit_fallback: function object_fit_fallback() {

      var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

      if (isIE11) {
        $$36('.js-object-fit').each(function () {
          var _this = $$36(this);
          var img = _this.find('img');
          var bgImageSrc = img.data('src-ie');
          _this.css({
            'background-image': 'url(' + bgImageSrc + ')',
            'background-repeat': 'no-repeat',
            'background-position': 'center',
            'background-size': 'cover'
          });
          img.hide();
        });
      }
    }
  };

  var $$37 = jQuery.noConflict();

  var utils = {
    init: function init() {
      this.toggle_grid();
      this.debug_lazy_img_sizes();
      this.p_ul_line_break();
      //this.remove_lazyloaded_bg();
    },
    resize: function resize() {
      this.match_element_viewport_height();
    },
    toggle_grid: function toggle_grid() {

      $$37('#toggle-grid').on('click', function () {
        $$37('#overlay-grid').toggle();
      });
    },
    debug_lazy_img_sizes: function debug_lazy_img_sizes() {

      if ($$37(".lazy-debugger").length == 0) {
        return;
      }

      var device_pixel_density = window.devicePixelRatio;

      function putActualSize(lazy_container) {
        var width = lazy_container.width();
        var window_width = $window.width();
        var ratio = Math.ceil(width / window_width * 1000) / 10;

        var loaded_width = lazy_container.find(".lazy-debugger__img-loaded").data("loaded");
        var efficiency = Math.ceil(width / loaded_width * 1000) / 10;

        lazy_container.find(".lazy-debugger .lazy-debugger__img-ratio").html("ratio&nbsp;&nbsp;" + ratio + "vw");
        lazy_container.find(".lazy-debugger .lazy-debugger__img-width").html("width&nbsp;&nbsp;" + width + "px");
        lazy_container.find(".lazy-debugger .lazy-debugger__img-efficiency").html("eff&nbsp;&nbsp;&nbsp;&nbsp;" + efficiency);
      }

      function refresh() {
        $$37('.lazy-container').each(function () {
          putActualSize($$37(this));
        });
      }

      $window.resize(refresh);

      $$37('.lazy-container img').load(function () {
        var img_width = $$37(this).width();
        var src = this.currentSrc;
        var width_index = src.indexOf("&w=");
        var s_index = src.indexOf("&s=");

        var loaded_width = parseInt(src.substr(width_index + 3, s_index - width_index - 3), 10) / device_pixel_density;

        $$37(this).closest(".lazy-container").find('.lazy-debugger__img-loaded').html("loaded " + loaded_width + "px" + (device_pixel_density > 1 ? " retina" : ""));
        $$37(this).closest(".lazy-container").find('.lazy-debugger__img-loaded').data("loaded", loaded_width);
        refresh();
      });
    },
    remove_lazyloaded_bg: function remove_lazyloaded_bg() {

      $document.on('lazybeforeunveil', function (e) {
        setTimeout(function () {
          $$37(e.target).parent().css('background-color', 'transparent');
        }, 1000);
      });
    },
    match_element_viewport_height: function match_element_viewport_height() {

      var js_viewport_height = $window.height() + 'px',
        css_viewport_height = '100vh';

      if (!helper.breakpoint.large.matches) {
        $$37('.translate-header--viewport').css('height', js_viewport_height);

        $$37('.translate-header--viewport .container--flex-vh').css({
          'height': js_viewport_height,
          'top': '0',
          'padding-bottom': '0'
        });

        $$37('.fill-viewport').css('height', js_viewport_height);
        $$37('.fill-viewport .container--vh').css('height', js_viewport_height);

        $$37('.col--vh').css('height', js_viewport_height);

        $$37('.reveal-slider__slide-overlay').css('height', js_viewport_height);
      } else {
        $$37('.translate-header--viewport').css('height', css_viewport_height);

        $$37('.translate-header--viewport .container--flex-vh').css({
          'height': 'calc( ' + css_viewport_height + ' - 84px)',
          'top': '84px',
          'padding-bottom': '50px'
        });

        $$37('.fill-viewport').css('height', css_viewport_height);
        $$37('.fill-viewport .container--vh').css('height', css_viewport_height);

        $$37('.col--vh').css('height', css_viewport_height);

        $$37('.reveal-slider__slide-overlay').css('height', css_viewport_height);
      }
    },
    p_ul_line_break: function p_ul_line_break() {

      var target = $$37('.c-text > p');

      target.each(function () {

        var str = $$37(this).prop('outerHTML');

        // startsWith IE fallback
        if (!String.prototype.startsWith) {
          String.prototype.startsWith = function (searchString, position) {
            position = position || 0;
            return this.indexOf(searchString, position) === position;
          };
        }
        if (str.startsWith('<p><strong>')) {
          $$37(this).addClass('c-text__subheading');
        }
      });
    }
  };

  var $$38 = jQuery.noConflict();

  var grids = {

    $grids: $$38('.c-grid-boxes .grid__row'),

    init: function init() {
      if (this.$grids.length == 0) {
        return;
      }

      var grids_of_boxes = [];

      this.$grids.each(function () {
        var boxes = $$38(this).find('.c-box');
        grids_of_boxes.push(boxes);
      });

      function setGrids() {
        for (var i = 0; i < grids_of_boxes.length; i++) {
          setBoxesTextHeight(grids_of_boxes[i]);
        }
      }

      function setBoxesTextHeight(boxes) {

        if (window.innerWidth > layout.Breakpoints.xxl) {
          box.matchBoxTextHeightInRow(boxes, 4);
        } else if (window.innerWidth > layout.Breakpoints.lg) {
          box.matchBoxTextHeightInRow(boxes, 3);
        } else if (window.innerWidth > layout.Breakpoints.md) {
          box.matchBoxTextHeightInRow(boxes, 2);
        } else {
          box.matchBoxTextHeightInRow(boxes, 1);
        }

        // debugger

        // boxes.each(function() {
        //     var height = $(this).find(".c-box__wrapper-text").outerHeight();
        //     $(this).append("<span style='color: white'>" + height + "</span>");
        // })
      }

      setGrids();
      $window.resize(setGrids);
    }
  };

  var $$39 = jQuery.noConflict();
  var form = $$39('#search-form');
  var field = $$39('.search-field');
  var close = $$39('[data-search-close]');
  var overlay = $$39('.search-overlay');
  var body_class = 'search-form-active';

  var search = {
    init: function init() {
      this.show_form();
      this.hide_form();
      this.submit_form();
      this.tabs();
    },
    load: function load() {
      //this.clear_form();
    },
    show_form: function show_form() {
      $$39('[data-search]').on('click', function () {
        $body.addClass(body_class);
        overlay.addClass('active');
        form.addClass('visible');
        form.find('input').focus();
      });
    },
    hide_form: function hide_form() {
      var self = this;
      close.on('click', function () {
        self.close();
      });
    },
    submit_form: function submit_form() {
      form.on('submit', function () {
        $body.removeClass(body_class);
      });
    },
    clear_form: function clear_form() {
      form.find('input').val('');
    },
    close: function close() {
      $body.removeClass(body_class);
      overlay.removeClass('active');
      form.removeClass('visible');
    },
    tabs: function tabs() {

      var tabs = $$39('.search-tabs'),
        tab = $$39('.search-tab');

      tab.each(function (i) {
        tabs.append('<li data-tab="' + $$39(this).attr('id') + '" ' + (i == 0 ? 'class="current"' : '') + '><span>' + $$39(this).data('label') + '</span></li>');

      });

      $$39('.tabs li').on('click', function () {

        var tab_id = $$39(this).attr('data-tab'),
          tab = $$39("#" + tab_id);

        $$39('.tabs li').removeClass('current');
        $$39('.tab__content').removeClass('current');

        $$39(this).addClass('current');
        tab.addClass('current');

        grids.init();
      });
    }
  };

  var $$40 = jQuery.noConflict();
  var pageThinking = new function () {
    var filterOverlay;
    var filterButton;
    var filterClose;
    var filterLinks;
    var filterItems;
    var filterClear;

    var grid;
    var irregularGrid;

    this.init = function () {

      filterButton = $$40('.page-thinking__filter-by span');
      filterOverlay = $$40('.page-thinking__filter-categories');
      filterClose = $$40('.page-thinking__filter-categories__close');
      filterLinks = $$40('.page-thinking__filter-categories a');
      filterItems = $$40('.page-thinking__filter-categories .item');
      filterClear = $$40('.page-thinking__filter-clear');

      grid = $$40('.irregular-grid');
      irregularGrid = new IrregularGrid(grid);
      irregularGrid.init();
      clearFilter();

      /**
       * FILTERS
       */

      // Filters open
      filterButton.click(function () {
        filterOverlay.addClass('opened');
        helper.scroll_disable();

        filterItems.each(function (i) {
          var item = $$40(this);

          item.removeClass('visible');

          setTimeout(function () {
            item.addClass('visible');
          }, i * 25 + 100);
        });
      });

      // Filter close
      filterClose.click(function () {
        filterOverlay.removeClass('opened');
        helper.scroll_enable();
      });

      // Filter hover animation
      filterLinks.hover(function () {
        filterLinks.addClass('inactive');
        $$40(this).removeClass('inactive');
      }, function () {
        filterLinks.removeClass('inactive');
      });

      function setFilterValue(val) {
        filterButton.html(val);
      }

      var response;
      var counter = 0;
      var apiCall;

      function tryLoadNewItems() {
        counter++;
        if (counter < 2) {
          return;
        } // two conditions must be met, end of animation or response from server

        var parsed = $$40(response);
        var newGrid = parsed.find('section.irregular-grid');

        grid.replaceWith(newGrid);

        irregularGrid.deinit();

        irregularGrid = new IrregularGrid(newGrid);
        irregularGrid.init();

        grid = newGrid;
        grid.removeClass('visible');

        if (window.location.search) {
          filterClear.addClass('visible');
        } else {
          filterClear.removeClass('visible');
        }

        setTimeout(function () {
          grid.addClass('visible');
        }, 200);
      }

      function success(r) {
        response = r;
        tryLoadNewItems();
      }

      function error() {
        console.error('server error!');
      }

      function goToURL(url, newFilterValue) {

        filterOverlay.removeClass('opened');
        grid.removeClass('visible');

        helper.scroll_enable();

        $$40(window).scrollTop(0);

        counter = 0;
        setFilterValue(newFilterValue);

        if (apiCall) {
          apiCall.abort();
        }

        apiCall = $$40.get({
          url: url,
          success: success,
          error: error,
          cache: false,
          dataType: "html"
        });

        setTimeout(function () {
          tryLoadNewItems();

          $$40(window).scroll(function () {
            helper.sticky_footer_animation();
          });
        }, 1000);

        history.replaceState({}, null, url);
      }

      filterLinks.click(function (e) {
        e.preventDefault();
        goToURL($$40(this).attr('href'), $$40(this).html());
      });

      function clearFilter() {

        var newURL = window.location.pathname,
          newFilter = filterClear.attr('data-default');

        filterClear.on('click', function () {

          $$40(this).removeClass('visible');

          setTimeout(function () {
            goToURL(newURL);
            setFilterValue(newFilter);

            filterButton.addClass('category');
          }, 300);
        });
      }
    };
  }();

  var $$41 = jQuery.noConflict();
  var pageReport = new function () {

    var element = $$41(".report-number__spacer");
    var image = $$41(".media-report__grid .image");

    this.init = function () {

      if ($$41(".c-content-modules--report").length == 0) {
        return;
      }

      function setSpacerHeight() {
        var height = image.outerHeight();
        var vh = $$41(window).height();
        var vw = $$41(window).width();

        var margin = vh - height - 90;

        element.css('height', height);

        element.css('top', margin);
      }

      setSpacerHeight();

      $$41(window).resize(setSpacerHeight);
    };
  }();

  var $$42 = jQuery.noConflict();
  var pageWork = new function () {

    this.init = function () {

      // Irregular grid management should be separated from projects filters, to refactor
      ProjectsFilters.init();
    };
  }();

  var $$43 = jQuery.noConflict();

  var contentFilters = {
    init: function init() {
      var $component = $$43('.js-content-filters');

      if (!$component.length && !$component.data('id')) {
        return;
      }
      $component.on('click', 'li', function () {
        $component.find('.is-active').removeClass('is-active');
        $$43(this).addClass('is-active');
      });
    }
  };

  var $$44 = jQuery.noConflict();
  var contactform = new function () {

    var form = $$44("form.contactform");
    var requiredInputs = form.find('.field-wrapper.required');

    this.init = function () {

      requiredInputs.find('input').focus(function () {
        $$44(this).parent().removeClass('error');
      });

      form.submit(function (e) {
        e.preventDefault();

        var errors = 0;

        requiredInputs.each(function (index) {

          var container = $$44(this);
          var input = container.find('input');
          var validMSG = container.find('.validation-message');
          var value = input.val();
          var error = false;
          var errorMSG = validMSG.attr('data-msg');

          error = validator.isEmpty(value);

          if (!error && input.attr('data-type') == 'email') {
            error = !validator.isEmail(value);
            errorMSG = 'Incorrect value';
          }

          validMSG.text(errorMSG);

          if (!error) {
            container.removeClass('error');
          } else {
            container.addClass('error');
            errors++;
          }
        });

        if (errors == 0) {

          form.find(':submit').prop('disabled', true);

          $$44.ajax({
            type: "POST",
            url: form.attr('action'),
            data: form.serialize(),
            success: function success(data) {
              form.find('.ajax-response').text(data.response).addClass('active').addClass(data.status);
              form.addClass('sent');
            }
          });
        }
      });
    };
  }();

  var $$45 = jQuery.noConflict();
  var MeetBody = {
    init: function init() {

      if ($$45(".c-meet-body").length == 0) {
        return;
      }

      function setOffsets() {
        if (window.innerWidth < layout.Breakpoints.lg) {
          $$45(".c-meet-body__offset-getter").css("margin-top", 0);
        } else {
          $$45(".c-meet-body__offset-getter").each(function () {
            var height = $$45(this).closest('.c-meet-body__item').find('.c-meet-body__offset-maker').outerHeight();
            $$45(this).css("margin-top", height / 2);
          });
        }
      }

      $$45(window).resize(setOffsets);

      setOffsets();
    }
  };

  var $$46 = jQuery.noConflict();

  $$46.fn.isInViewport = function () {

    var elementTop = $$46(this).offset().top,
      elementBottom = elementTop + $$46(this).outerHeight(),
      viewportTop = $$46(window).scrollTop(),
      viewportBottom = viewportTop + $$46(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  var loadNext = {
    init: function init() {
      this._checkInView();
    },
    resize: function resize() {
      this._checkInView();
    },
    scroll: function scroll() {
      this._checkInView();
    },
    _checkInView: function _checkInView() {
      var _this = this;

      var elem = $$46('.inview');

      if (!elem.length > 0 || elem.hasClass('loading')) return;

      if (elem.isInViewport()) {

        setTimeout(function () {
          elem.addClass('loading');
          _this._switchLoadingText(elem);
        }, 300);
      }
    },
    _switchLoadingText: function _switchLoadingText(elem) {

      var text = elem.find('.inview-text'),
        loadedText = text.attr('data-loaded-text');

      if ($document.find(elem).hasClass('loading')) {

        setTimeout(function () {
          text.html(loadedText);
        }, 600);
      }
    }
  };

  var $$47 = jQuery.noConflict();

  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  var CookieMessage = {

    $cookieMessage: $$47('#cookie-message'),
    $cookieMessageClose: $$47('#cookie-message .c-cookie-message__close'),

    init: function init() {
      var _this = this;

      if (getCookie('cookie-message') === null) {
        setCookie('cookie-message', 1);
        this.$cookieMessage.addClass('visible');

        this.$cookieMessageClose.click(function () {
          _this.$cookieMessage.removeClass('visible');
        });
      }
    }
  };

  // Class import
  /* import { vr } from './vr'; */

  (function ($, document) {

    video.detect_touch();
    scroll.translate_header();
    utils.match_element_viewport_height();
    ui.semi_trans_img_overlay();

    var ib_offset_top = void 0;

    $(document).ready(function () {

      app.init();

      window.lazySizesConfig = window.lazySizesConfig || {};
      lazySizesConfig.expand = $(window).height();

      $('.preload img').addClass('lazypreload');
    });

    $(window).load(function () {

      app.load();
    });

    $(window).scroll(function () {

      var scrollCheck = false;

      clearTimeout($.data(this, "scrollCheck"));
      $.data(this, "scrollCheck", setTimeout(function () {
        scrollCheck = true;
        if (scrollCheck) {
          $('.l-header').removeClass('down');
          scrollCheck = false;
        }
      }, 100));

      scroll.detect_scroll_direction(scrollCheck);
      scroll.init();
      scroll.invert_background(ib_offset_top);
      search.close();
      helper.sticky_footer_animation();
      loadNext.scroll();
    });

    $(window).resize(function () {

      wait_for_final_event(function () {

        helper.home_padding_top();
        helper.sticky_footer();
        video.detect_touch();
        nav.resize();
        plugins.resize();
        slider.resize();
        bg_images.resize();
        sticky.resize();
        utils.resize();
        loadNext.resize();

        $('.site').imagesLoaded(function () {
          row.resize();
          project.resize();
          helper.set_padding(project.set_widths, '.container');
          helper.sticky_footer();
          ui.resize();
        });
      }, 150, 'init');
    });

    // App Functions

    var app = {

      init: function init() {

        // Set src for MSIE
        if (bowser.msie) {
          lazySizesConfig.srcAttr = 'data-src-ie';
        }

        $('.js-modal-video-player').on('click', function () {
          videoPlayer.open($(this).data('video-sources'));
        });

        $('.lazyloadunveil img.lazyload').each(function () {
          lazySizes.loader.unveil(this);
        });

        var scrollingTimer = null;

        $(window).on('scroll', function () {
          if (!!scrollingTimer) {
            clearTimeout(scrollingTimer);
            $('body').addClass('is-scrolling');
          }

          scrollingTimer = setTimeout(function () {
            $('body').removeClass('is-scrolling');
          }, 100);
        });

        layout.init();
        ajax.init();
        GoogleMap.init();
        slider.init();
        plugins.init();
        nav.init();
        sticky.init();
        row.init();
        maker.init();
        project.init();
        pushy.init();
        helper.set_padding(project.set_widths, '.container');
        helper.sticky_footer();
        helper.calc_padding_top();
        helper.home_padding_top();
        helper.sticky_footer_animation();
        scroll.init();
        videosSlider.init();
        videoPlayer.init();
        section_media_awards.init();
        overlayGallery.init();
        drawer.init();
        ui.init();
        inputs.init();
        slider_boxes.init();
        azPanel.init();
        Categories.init();
        Accordion.init();
        utils.init();
        search.init();
        CookieMessage.init();
        video.ie_video();
        //vr.init();

        if ($('body').hasClass('blog')) {
          pageThinking.init();
        }
        if ($('body').hasClass('post-type-archive-cpt_projects')) {
          pageWork.init();
        }

        pageReport.init();

        contentFilters.init();
        video.preloader();
        contactform.init();
        grids.init();
        MeetBody.init();
        loadNext.init();

        if ($('#instafeed').length > 0) ig_feed.run();

        $('.site').imagesLoaded(function () {
          plugins.init();
          row.init();
        });
        if (bowser.msie) {
          $('html').addClass('bowser-msie');
        }

        if (bowser.windows) {
          $('html').addClass('bowser-windows');
        }
      },

      load: function load() {

        var ib_elem = $('.invert-background').first();

        if (ib_elem.length > 0) {
          ib_offset_top = ib_elem.offset().top - $(window).height() / 100 * 40;
        }

        search.load();
        bg_images.init();
        animate.load();
        ui.load();
      },

      element: {

        init: function init() {}

      }

    };
  })(jQuery, document);

}());