window.addEvent('domready', () => {
    $$('.texts a').addEvent('click', function() {
        new Managers({
            id_manage: this.id
        })
    });
});
