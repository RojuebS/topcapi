Managers = new Class({

    Implements: Options,
    options: {
        id_manage: null
    },

    initialize: function(options) {
        this.setOptions(options);
        this.setElements();
    },

    setElements() {
        new Request.JSON({
            method: 'get',
            url: '/environments/managers.json',
            evalScripts: true,
            onSuccess: (r) => {
                r.managers.each( (el, n) => {

                    this.content = new Element('div', {
                        'class': 'block-managers',
                    }).adopt(
                        new Element('figure').adopt(
                            new Element('img', {
                                'src': 'images/people/'+el.image
                            }),
                        ),
                        new Element('div', {
                            'class': 'text'
                        }).adopt(
                            new Element('p', {
                                'class': 'name',
                                'text': el.name
                            }),

                            new Element('p', {
                                'class': 'texts',
                                'text': el.descricao
                            }).adopt(
                                new Element('a', {
                                    'href': 'javascript:;',
                                    'text': 'Ver currículo',
                                    'events': {
                                        'click': () => {
                                            this.contentBox(n)
                                        }
                                    }
                                })
                            ),
                        )
                    ).inject($$('.managers')[0]);

                });
            }
        }).send();
    },

    contentBox(index) {
        new Request.JSON({
            method: 'get',
            url: '/environments/managers.json',
            evalScripts: true,
            onSuccess: (r) => {
                this.content_lbox = new Element('div', {
                }).adopt(
                    new Element('h2', {
                        'class': 'name',
                        'text': r.managers[index].name
                    }).adopt(
                        new Element('div', {
                            'class': 'border-bottom'
                        })
                    ),

                    new Element('p', {
                        'class': 'title',
                        'text': r.managers[index].title
                    }),

                    new Element('p', {
                        'class': 'subtitle',
                        'text': r.managers[index].subtitle
                    })
                );

                new TopCapiBox({
                    width: 800,
                    height: 490,
                    container: this.content_lbox
                });
            }
        }).send();
    }
});