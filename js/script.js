window.addEvent('domready', () => {
    $$('.texts a').addEvent('click', function() {
        new Managers({
            id_manage: this.id
        })
    });

    $$(".number").addEvent('keydown', (ev) => {
        if(!ev.ctrlKey && ev.key.length == 1 && !ev.key.match(/^([0-9])$/)){
            ev.stop();
        }

        let item = ev.target.get('value');
        let contador = ev.target.get('value').length;

        if(contador === 0) {
            if(ev.key != "Backspace") {
                $$('.number').set('value', "(" + item);
            }
        }

        if(contador === 3){
            console.log('dsad');
            if(ev.key != "Backspace") {
                $$('.number').set('value', item + ") ");
            }
        }

        if(contador === 10){
            if(ev.key != "Backspace"){
                $$('.number').set('value', item + "-");
            }
        }
    });

    $('form_subimit').addEvent('submit', function(ev){
        ev.stop();
        this.getElements('input, select, textarea').each( (el, n) => {
            if(el.get('value').trim() === ""){
                el.getParent().addClass('error');
            } else {
                el.getParent().removeClass('error');
                if(!validateEmail()){
                    $("email").getParent().addClass('error');
                }else{
                    $("email").getParent().removeClass('error');
                }
            }
        });

        if($$('.error').length === 0) {
           this.submit();
        }
    });
});

function validateEmail(){
    let email = $("email").get('value');
    let filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    if(filtro.test(email)) {
        return true;
    }
}