(function( $ ) {
    'use_strict';
    var rri = {
        cache : {},
        handlers: {},
        init: ( self ) =>{
            self.cacheElements( self );
            self.handlerElements( self );
            self.bindEvents( self );
        },
        cacheElements: ( self ) => {
            self.cache = {
                $window: $( window ),
                $document: $( document )
            };
        },
        handlerElements: ( self ) => {
            self.handlers = {
                $tabWrapper: $( '.rri-vertical-tabs-inner' ),
                $tabNavWrapper: $( '.rri-tabs-nav' ),
                $tabNav: $( '.rri-nav' ),
                $tabPanelWrapper: $( '.rri-tabs-panels' ),
                $tabPane: $( '.rri-tabs-pane' )
            }
        },
        bindEvents: ( self ) => {
            self.cache.$document.on('ready', function(){
                self.initTabMenu( self );
                self.initTabs( self );
                self.getActiveTab( self ); 
                
            });
        },
        initTabMenu: ( self ) => {
            _.each(self.handlers.$tabWrapper, (el) => {
                var nav = $(el).find(self.handlers.$tabNav);
                var tabs = $(el).find(self.handlers.$tabPane);
                _.each(tabs, (el) => {
                    var template = '<li class="rri-nav-item">' +
                                        '<a class="rri-nav-link" href="#' + $(el).attr('id') + '">'+ $(el).data('name') +'</a>' +
                                    '</li>';
                    $(nav).append(template);
                    console.log(nav);
                });
            });
        },
        initTabs: ( self ) => {
            var wHeight, nHeight;
            _.each(self.handlers.$tabWrapper, (el) => {
                $(el).find('.rri-nav-item').first().addClass('active');
                $(el).find(self.handlers.$tabPane).first().addClass('active');

                wHeight = $(el).find(self.handlers.$tabNavWrapper).height();
                nHeight = $(el).find(self.handlers.$tabNav).height();
                
                if(nHeight > wHeight){
                    $(el).find(self.handlers.$tabNav).wrap('<div class="rri-nav-wrap"></div>').parent().append('<div class="thumb"></div>');
                    self.initScroll( $(el), self );
                }
            });
        },
        getActiveTab: ( self ) => {
            self.cache.$document.on('click', '.rri-nav-link', function(e){
                
                e.preventDefault();
                var tabID = $(this).attr('href'),
                    navWrapper = $(this).closest(self.handlers.$tabNavWrapper),
                    tabWrapper = $(this).closest(self.handlers.$tabWrapper);
                    console.log(tabID);
                navWrapper.find('.rri-nav-item').removeClass('active');
                tabWrapper.find(self.handlers.$tabPane).removeClass('active');
                $(this).parent().addClass('active');
                tabWrapper.find(tabID).addClass('active');
            })
        },
        initScroll: ( el, self ) => {
            var scrollWrap = el.find('.rri-nav-wrap'),
                wHeight = scrollWrap.height(), 
                nHeight = scrollWrap.find(self.handlers.$tabNav).height(),
                tHeight = Math.pow(wHeight, 2) / nHeight,
                ratio = 0;

            scrollWrap.find('.thumb').css({ 'height': tHeight, 'top': ratio });

            scrollWrap.on('scroll', function(e){
                ratio = ($(this).scrollTop() * tHeight) / wHeight;
                $(this).find('.thumb').css({ 'top': ratio });
            }); 
        }
    }
    rri.init( rri );
}) ( jQuery );


