Banner = new Class({
    Implements: Options,
    options: {
        start: true
    },

    current: 1,

    initialize: function (options) {
        this.setOptions(options);
        this.setElements();
        this.start();

        if(window.getSize().x < 768) {
            this.identify_mobile = true;
        }else {
            this.identify_mobile = false;
        }
    },

    setElements() {
        this.controlls = new Element('div', {
            'id': 'controlls'
        }).adopt(
            new Element('img', {
                'class': 'left',
                'src': 'images/arrowleft.png',
                'events': {
                    'click': () => {
                        this.prev();
                    }
                }
            }),

            new Element('img', {
                'class': 'right',
                'src': 'images/arrowRight.png',
                'events': {
                    'click': () => {
                        this.next();
                    }
                }
            })
        );

        this.content_slide = new Element('div');

        new Request.JSON({
            method: 'get',
            url: '/environments/banner.json',
            evalScripts: true,
            onSuccess: (r) => {
                let count = 0;
                let date = r.banner;
                let slideSize = $$('.container')[1].getSize().x;
                this.content_slide.setStyle('width', ($$('.container')[1].getSize().x * date.length));
                window.addEvent('resize', () => {
                    this.content_slide.setStyle('width', ($$('.container')[1].getSize().x * date.length));
                });
                for (let a = 0; a < date.length; a++) {
                    if(this.identify_mobile) {
                        this.image = 'images/banner/mobile/' + date[a].image_mobile
                    }else {
                        this.image = 'images/banner/' + date[a].image
                    }

                    window.addEvent('resize', () => {
                        let slideSize = $$('.container')[1].getSize().x;

                        if(this.identify_mobile) {
                            this.image = 'images/banner/mobile/' + date[a].image_mobile;
                        }else {
                            this.image = 'images/banner/' + date[a].image;
                        }
                    });

                    this.slide = new Element('div', {
                        'class': 'slide',
                        'id': 'id_' + count++,
                        'styles': {
                            'width': slideSize,
                        }
                    }).adopt(
                        new Element('div', {
                            'class': 'center',
                            'style': {
                                'width': slideSize - 140,
                                'margin': '0 auto'
                            }
                        }).adopt(

                            new Element("div", {
                                "class": "logo-mobile"
                            }).adopt(
                                new Element("img", {
                                    "src": "images/logo-mobile.png"
                                })
                            ),

                            new Element('div', {
                                'class': 'block-left'
                            }).adopt(
                                new Element('div', {
                                    'id': 'logo'
                                }).adopt(
                                    new Element('img', {
                                        'src': 'images/logo.png'
                                    })
                                ),

                                new Element('div', {
                                    'class': 'info-banner'
                                }).adopt(
                                    new Element('p', {
                                        'class': 'title-info-banner',
                                        'html': date[a].title
                                    }),

                                    new Element('p', {
                                        'class': 'sub-title-info-banner',
                                        'html': date[a].subtitle
                                    })
                                ),

                                new Element("a", {
                                    "class": "button-slide",
                                    "text": "SAIBA MAIS",
                                    "href": date[a].link
                                })
                            ),

                            new Element('div', {
                                'class': 'block-right'
                            }).adopt(
                                new Element('div', {
                                    'class': 'images'
                                }).adopt(
                                    new Element('img', {
                                        'src': this.image,
                                        'alt': ''
                                    })
                                )
                            )
                        )
                    );
                    this.slide.inject(this.content_slide);
                }
                window.addEvent('resize', () => {
                    $$('.slide').setStyle('width', ($$('.container')[0].getSize().x));
                });
            }
        }).send();
        this.controlls.inject($$('#banner')[0]);
        this.content_slide.inject($$('#banner')[0]);
    },

    start() {
        if (this.options.start === true) {
            this.timer = setInterval(() => {
                this.next();
            }, 5000);
        }

    },

    next() {
        this.content_slide.tween('margin-left', -$$('.slide')[0].getSize().x);
        this.content_slide.get('tween').chain(() => {
            this.content_slide.setStyle('margin-left', 0);
            this.content_slide.getElement('.slide:first-child').inject(this.content_slide);
        });
        clearInterval(this.timer);
        this.start();
    },

    prev() {
        this.content_slide.getElement('.slide:last-child').setStyle('margin-left', -$$('.slide')[0].getSize().x).inject(this.content_slide, "top");
        this.content_slide.tween('margin-left', 0);
        this.content_slide.get('tween').chain(() => {
            this.content_slide.getElement('.slide:first-child').setStyle('margin-left', 0);
        });
        clearInterval(this.timer);
        this.start();
    }

});