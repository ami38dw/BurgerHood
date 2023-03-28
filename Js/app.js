
let contMain = document.querySelector('#container')
let url = 'Js/item.json';
let items = [];
let btnAgregear = document.querySelector('.btnAgregar');
let btnAgregearCP = document.querySelector('.btnAgregarCP');
let CarExtra = document.querySelector('.extra');
let arrayEspeciales = [];
let fshord = document.querySelector('#totBtn');
let offCBody = document.querySelector('#offcanvas-body'), listaOrds = document.querySelector('#verOrds'), termOrd = document.querySelector('#terminarOrden'), offCOrds = document.querySelector('.offcanvas-body-ordenes'),divTotDia = document.querySelector('.totDia'), divCommandasDia = document.querySelector('.comandasDia')

// Array para los controles especiales
let comandosEspeciales = ['Bebida','PorcionPapas','PorcionPulled','Cerveza'];


fetch(url)
.then(response => response.json())
.then(data => {
    console.log(data);

    contMain.innerHTML = ``;
    // Agrega los items del json al html
    for (let burg of data) {
        // console.log(burg);
        // aca se genera los items con los comandos especiales
        if(comandosEspeciales.includes(burg.nameData)){

            contMain.innerHTML += `
            <div id="${burg.id}-div" class="item ${burg.id}">
                <img src="${burg.img}" class="imgburg col-4">
                <div class="item-title ${burg.id} col-8">
                    <h2>${burg.name}</h2>
                </div>
                <div class='commands col-7' id="${burg.id}">
                    <form id="commandsForm-${burg.id}" action="" method="POST" class="column form">
                        <button type="submit" name="ag" class="btnAgregar" data-price="${burg.precio}" data-nameData="${burg.nameData}">Agregar </button>
                        <button type="submit" name="agcp" class="btnAgregarCP esp d-none" data-price="${burg.precio}+50" data-name="${burg.nameData}" >Agregar c/p </button>
                        <input id="extraC-${burg.nameData}" name="extCarne" class="extra esp d-none" type="number" placeholder="Carne extra" list="exC" ></input>
                        <datalist id="exC">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </datalist>
                    </form>
                </div>
            </div>
            `
            
        }else{
            // aca se genera los items normales
            contMain.innerHTML += `
            <div id="${burg.id}-div" class="item ${burg.id}">
                <img src="${burg.img}" class="imgburg col-4">
                <div class="item-title ${burg.id} col-6">
                    <h2>${burg.name}</h2>
                </div>
                <div class='commands col-7' id="${burg.id}">
                    <form id="commandsForm-${burg.id}" action="" method="POST" class="column form">
                        <button type="submit" name="ag" class="btnAgregar " data-price="${burg.precio}" data-nameData="${burg.nameData}">Agregar </button>
                        <button type="submit" name="agcp" class="btnAgregarCP " data-price="${burg.precio}+50" data-name="${burg.nameData}">Agregar c/p </button>
                        <input id="extraC-${burg.nameData}" name="extCarne" class="extra " type="number" placeholder="Carne extra" list="exC"></input>
                        <datalist id="exC">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </datalist>
                    </form>
                </div>
            </div>
            `
        }
        if (burg.especial === true) {
            arrayEspeciales.push(burg.nameData)
        }
    }


    let $forms = document.querySelectorAll('div.commands')
    let orden = [];
    let extC = undefined;
    let namedata = undefined;

    
    $forms.forEach(form =>{
        form.firstElementChild.addEventListener('submit', (e)=>{
            e.preventDefault();
        })
        
        // Boton para agregar hamburgesa ------------------------------------------
        form.firstElementChild[0].addEventListener('click', ()=>{
            namedata = form.firstElementChild[0].dataset.namedata
            extC = document.querySelector(`#extraC-${namedata}`).value
            console.log(namedata);

            if(extC === ''){
                orden.push({
                    'namedata': namedata,
                    'hamburgesa': namedata,
                    'precio': form.firstElementChild[0].dataset.price,
                    'carneExtra': 0,
                })
            }else {
                if(arrayEspeciales.includes(namedata)){   
                    orden.push({
                        'namedata': namedata,
                        'hamburgesa': namedata,
                        'precio': parseInt(form.firstElementChild[0].dataset.price)+130*extC,
                        'carneExtra': extC,
                    })
                }else {
                    orden.push({
                        'namedata': namedata,
                        'hamburgesa': namedata,
                        'precio': parseInt(form.firstElementChild[0].dataset.price)+65*extC,
                        'carneExtra': extC,
                    })
                }
            }
            
            console.log(orden);
        });
        
        // Boton para agregar hamburgesa con papas----------------------------------
        form.firstElementChild[1].addEventListener('click', ()=>{
            namedata = form.firstElementChild[0].dataset.namedata
            extC = document.querySelector(`#extraC-${namedata}`).value
            
            if(extC === ''){
                orden.push({
                    'namedata': namedata,
                    'hamburgesa': namedata + ' c/p',
                    'precio': parseInt(form.firstElementChild[0].dataset.price)+50,
                    'carneExtra': 0,
                })
            }else {
                if(arrayEspeciales.includes(namedata)){   
                    orden.push({
                        'namedata': namedata,
                        'hamburgesa': namedata+' c/p',
                        'precio': parseInt(form.firstElementChild[0].dataset.price)+(130*extC)+50,
                        'carneExtra': extC,
                    })
                }else {
                    orden.push({
                        'namedata': namedata,
                        'hamburgesa': namedata + ' c/p',
                        'precio': parseInt(form.firstElementChild[0].dataset.price)+(65*extC)+50,
                        'carneExtra': extC,
                    })
                }
            }
            
                console.log(orden);
        });
        
        
    });
    // Boton de terminar la orden
    fshord.addEventListener('click', ()=>{
        sessionStorage.setItem('Orden',JSON.stringify(orden));
        let tot = 0;
        let ornedToAppend = '';

        offCBody.innerHTML = '';
        for (com of orden){
            if(com.carneExtra === 0){
                ornedToAppend += `${com.hamburgesa} &emsp;&emsp;$${com.precio} <br>`
            }else{
                ornedToAppend += `${com.hamburgesa} +${com.carneExtra} carne &emsp;&emsp;$${com.precio} <br>`
            }
            tot += parseInt(com.precio)
        }
        offCBody.innerHTML = `
        <div class="comanda">
        ${ornedToAppend}
        </div>
        <br><hr><br> 
        <div class="totComanda">
        Total= $${tot}<br> Debito= $${tot*1.05}
        </div><br>`;
        ornedToAppend = ''
    })
    // Boton para terminar la comanda y guardarla en el sessionStorage
    termOrd.addEventListener('click',()=>{
        if(sessionStorage.getItem('ordenes') === null){
            let ordenes = [];
            orden.forEach(comm =>{
                ordenes.push(comm)
            })
            sessionStorage.setItem('ordenes',JSON.stringify(ordenes))
            orden = [];
        }else{
            let ordenes = JSON.parse(sessionStorage.getItem('ordenes'))
            orden.forEach(comm =>{
                ordenes.push(comm)
            })
            // ordenes.push(orden);
            sessionStorage.setItem('ordenes','')
            sessionStorage.setItem('ordenes',JSON.stringify(ordenes))
            orden = [];
        }
    })
    // Boton para ver el listado de las comandas del dia
    let totDia = 0;
    listaOrds.addEventListener('click',()=>{
        let sumParcial = 0;
        // ordenes = JSON.parse(sessionStorage.getItem('ordenes'));
        // if (ordenes === null){
        //     offCOrds.innerHTML = 'No hay ordenes guardadas'
        // }else {
        //     let totDia = 0, contToAppend = '';
        //     ordenes.forEach(comm => {
        //         totDia += parseInt(comm.precio)
        //         contToAppend += `${comm.hamburgesa} +${comm.carneExtra} carne &emsp;&emsp;$${comm.precio} <br><br>`

        //     })
        //     offCOrds.innerHTML = `<br><span class='totDia'>&emsp;&emsp;Total del dia $${totDia}</span><br><hr><br>
        //     ${contToAppend} <hr>`
        // }
        let ordenSS = JSON.parse(sessionStorage.getItem('Orden')), ordenes = JSON.parse(sessionStorage.getItem('ordenes')), contToAppend = '';

        console.log(ordenes)
        if (ordenSS.length>1){
            contToAppend = '';
            ordenSS.forEach(comm => {
                if(comm.carneExtra === 0){
                    contToAppend += `${comm.hamburgesa} &emsp;&emsp;$${comm.precio} <br>`    
                }else{
                    contToAppend += `${comm.hamburgesa} +${comm.carneExtra} carne &emsp;&emsp;$${comm.precio} <br>`
                }
                totDia += parseInt(comm.precio)
                sumParcial += parseInt(comm.precio)
            })
            divTotDia.innerHTML = `Total del dia $${totDia}`
            divCommandasDia.innerHTML += `<hr><div>${contToAppend} <span class='sumParcial'> Sub Total $${sumParcial}</span></div><hr>`
            contToAppend = '';
        }else {
            if (ordenes === null){
                    divCommandasDia.innerHTML = 'No hay ordenes guardadas'
                }else {
                    contToAppend = '';
                    if(ordenSS[0].carneExtra === 0){
                        contToAppend += `${ordenSS[0].hamburgesa} &emsp;&emsp;$${ordenSS[0].precio} <br>`
                    }else{
                        contToAppend += `${ordenSS[0].hamburgesa} +${ordenSS[0].carneExtra} carne &emsp;&emsp;$${ordenSS[0].precio} <br>`
                    }
                    totDia += parseInt(ordenSS[0].precio)
                    divTotDia.innerHTML = `Total del dia $${totDia}`
                    divCommandasDia.innerHTML += `<hr><br>${contToAppend} <hr>`
                }
                contToAppend = '';
        }
    })
   


})