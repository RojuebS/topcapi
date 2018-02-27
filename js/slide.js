Banner = new Class({
    Implements: Options,
    options: {

    },

    initialize: function (options) {
        this.setOptions(options);
        this.setElements();
        this.current = 0;
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
                        console.log('prev')
                        this.prev();
                    }
                }
            }),

            new Element('img', {
                'class': 'right',
                'src': 'images/arrowRight.png',
                'events': {
                    'click': () => {
                        console.log('next')
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
                let slideSize = window.getSize().x;
                this.content_slide.setStyle('width', (window.getSize().x * date.length));
                for (let a = 0; a < date.length; a++) {

                    this.slide = new Element('div', {
                        'class': 'slide',
                        'id': 'id_' + count++,
                        'styles': {
                            'width': slideSize
                        }
                    }).adopt(
                        new Element('div', {
                            'class': 'center',
                            'style': {
                                'width': slideSize - 140,
                                'margin': '0 auto'
                            }
                        }).adopt(
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
                                )
                            ),

                            new Element('div', {
                                'class': 'block-right'
                            }).adopt(
                                new Element('div', {
                                    'class': 'images'
                                }).adopt(
                                    new Element('img', {
                                        'src': 'images/banner/' + date[a].image,
                                        'alt': ''
                                    })
                                )
                            )
                        )
                    );
                    this.slide.inject(this.content_slide);
                }
                this.effect();
            }
        }).send();
        this.controlls.inject($$('#banner')[0]);
        this.content_slide.inject($$('#banner')[0]);
    },

    next() {
        this.countSlide = $$('.slide').length;
        if(this.current < this.countSlide - 1) {
            if(this.current === 0) {
                this.calc = $$('.slide')[0].getSize().x * -1
            }else {
                this.calc = ($$('.slide')[0].getSize().x * this.current) * -1;
            }
            $$('.slide')[this.current].setStyle('margin-left', this.calc);
            this.current++;
        }

    },

    prev() {
        if(this.current > 0) {
            $$('.slide')[this.current - 1].setStyle('margin-left', 0);
            this.current--;
        }
    }

});