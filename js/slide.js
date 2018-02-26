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

        this.content_slide = new Element('div', {
            'class': 'center'
        });

        new Request.JSON({
            method: 'get',
            url: '/environments/banner.json',
            evalScripts: true,
            onSuccess: (r) => {
                let date = r.banner;
                for (let a = 0; a < date.length; a++) {

                    this.slide = new Element('div', {
                        'class': 'slide',
                        'id': 'id_' + this.current++
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
                                    'src': 'images/' + date[a].image,
                                    'alt': ''
                                })
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
        if(this.current > 1) {
            $$('.slide')[this.current - 1].setStyle('margin-left', 1300);
            this.current--;
        }
    },

    prev() {
        if(this.current < $$('.slide').length) {
            $$('.slide')[this.current].setStyle('margin-left', 0);
            this.current++;
        }
    },

    effect() {
        /*let count = 1;
        this.content_slide.getElements('.slide').slice(0).reverse().each( (n, m) => {
            setTimeout( () => {
                n.setStyle('margin-left', 1300);
            }, 1000 * count++);
        });*/
    },

});