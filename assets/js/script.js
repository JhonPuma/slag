var arrayLista = []
const obtener = async _ => {
    var textArea = document.getElementById('copea').value
    var lineBreak = textArea.split("\n");
    for (var i = 0; i < lineBreak.length; i++) {
        if (i == 0) {
            arrayLista = []
        }
        let tabSeparacion = lineBreak[i].split(/(\t)/)
        let priemra = { tipo: '', nombre: '' }
        for (let index = 0; index < tabSeparacion.length; index++) {
            if (tabSeparacion[index].trim() != '') {
                if (index == 0) {
                    priemra.tipo = await tabSeparacion[index]
                } else if (priemra.nombre == '') {
                    priemra.nombre = await tabSeparacion[index]
                }
            }

        }

        arrayLista.push(await concatSlag(priemra.tipo, priemra.nombre))
        var newElement = await concatSlag(priemra.tipo, priemra.nombre)
        if (newElement != false) {
            var contentElements = document.querySelectorAll('#elementos');
            var clonElement = contentElements[0].firstElementChild.cloneNode(true);
            clonElement.setAttribute('class', 'input-group mb-3')
            clonElement.querySelector('input.form-control').value = newElement[1]
            clonElement.querySelector('input.input-none').id = 'elemento-' + i;
            clonElement.querySelector('input.input-none').value = newElement[0];
            clonElement.querySelector('button').setAttribute('onclick', 'copySlay("elemento-' + i + '")')
            var container = document.querySelector("#elementos");
            container.appendChild(clonElement);
        }
    }
}
function concatSlag(type, name) {
    switch (type.toUpperCase()) {
        case ('TIPO IMAGEN'):
        case ('IMAGE'):
            return [`[Element context="autofill" type="content" key="${name}" format="url" htmlencode="true"]`, name];
        case ('TEXTO BREVE'):
        case ('SHORT TEXT'):
            return [`[Element context="current" type="content" key="${name}"]`, name];
        case ('SELECCIÓN DE OPCIÓN'):
        case ('OPTION SELECTION'):
            return [`[Element key="${name}" type="content" context="autofill" rendition="auto"]`, name]
        case ('TEXTO ENRIQUECIDO'):
        case ('RICH TEXT'):
            return [`[Element key="${name}" type="content" context="current"]`, name]
        case ('ENLACE'):
        case ('LINK'):
            return [`[Element key="${name}" type="content" context="autofill"]`, name]
        default:
            return false;
    }
}
function copySlay(id) {
    try {
        var copyText = document.getElementById(id);
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
    } catch (error) {
        console.error(error);
    }
}
function clearTextArea() {
    document.getElementById('copea').value = '';
    var removeElements = document.querySelectorAll('#elementos .input-group.mb-3')
    for (let index = 0; index < removeElements.length; index++) {
        const element = removeElements[index];
        if (index>0) {
            element.parentNode.removeChild(element)
        }
        
    }
    
}