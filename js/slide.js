Banner = new Class({
    Implements: Options,
    options: {

    },

    initialize: function (options) {
        this.setOptions(options);
        this.setElements();
    },

    setElements() {
        this.controlls = new Element('div', {
            'id': 'controlls'
        }).adopt(
            new Element('img', {
                'class': 'left',
                'src': 'images/arrowleft.png'
            }),

            new Element('img', {
                'class': 'right',
                'src': 'images/arrowRight.png'
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
                console.log(r);
                for (let a = 0; a < r.banner.length; a++) {

                    this.slide = new Element('div', {
                        'class': 'slide',
                        'id': 'id_' + a
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
                                    'html': r.banner[a].title
                                }),

                                new Element('p', {
                                    'class': 'sub-title-info-banner',
                                    'html': r.banner[a].subtitle
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
                                    'src': 'images/' + r.banner[a].image,
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

    },

    prev() {

    },

    effect() {
        let count = 1;
        this.content_slide.getElements('.slide').each( (n, m) => {
            setTimeout( () => {
                n.setStyle('margin-left', 1300);
            }, 1000 * count++);
        });
    },

});