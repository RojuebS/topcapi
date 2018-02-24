TopCapiBox = new Class({
    Implements: Options,
    options: {
        width: 600,
        height: 400,
        close: null,
        background: true,
        esc: true,
        closed: true,
        container: null
    },

    initialize: function(options){
        this.setOptions(options);
        this.setElements();
        this.show();
        this.esc();
    },

    setElements: function(){
        this.conteudo = this.options.container;
        this.background = new Element('div', {
            'id': 'bg-lightbox',
            'events': {
                'click': function(){
                    this.hide();
                }.bind(this)
            }
        });

        this.container = new Element('div', {
            'id': 'container-lightbox',
            'styles': {
                'width': this.options.width,
                'height': this.options.height,
                'left': '50%',
                'top': '50%',
                'margin-left': this.options.width / -2,
                'margin-top': this.options.height / -2,
                'position': 'fixed',
                'background': '#ffffff',
                'z-index': 11,
                'opacity': 0
            }
        }).adopt(
            new Element('div', {
                'id': 'recive',
                'html': this.conteudo.innerHTML
            })
        );

        this.closed = new Element('div', {
            'text': 'x',
            'styles': {
                'position': 'absolute',
                'top': 10,
                'right': 10,
                'cursor': 'pointer'
            },
            'events': {
                'click': function(){
                    this.hide();
                }.bind(this)
            }
        }).inject(this.container);


        if(this.options.background !== null) {
            this.background.inject($$('body')[0]);
        }
        this.container.inject($$('body')[0]);
    },

    show: function(){
        this.background.tween('opacity', '0.8');
        this.container.tween('opacity', '1');
    },

    hide: function(){
        if(this.options.closed === true) {
            this.background.destroy();
            this.container.destroy();
        }
    },

    esc: function(){
        window.addEvent('keydown', function(ev){
            if (ev.key == 'esc' && this.options.esc === true){
                this.hide();
            }
        }.bind(this));
    }
});