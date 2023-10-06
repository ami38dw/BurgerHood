
let contMain = document.querySelector('#container')
let url = 'Js/item.json';
let items = [];
let btnAgregear = document.querySelector('.btnAgregar');
let btnAgregearCP = document.querySelector('.btnAgregarCP');
let CarExtra = document.querySelector('.extra');
let arrayEspeciales = [];
let fshord = document.querySelector('#totBtn');
let offCBody = document.querySelector('#offcanvas-body'), listaOrds = document.querySelector('#verOrds'), termOrd = document.querySelector('#terminarOrden'), offCOrds = document.querySelector('.offcanvas-body-ordenes'),divTotDia = document.querySelector('.totDia'), divCommandasDia = document.querySelector('.comandasDia'), btnDelete = document.querySelector('#btnDelete')

// Array para los controles especiales
let comandosEspeciales = ['Bebida','PorcionPapas','PorcionPulled','Cerveza','Comb1','Comb2','CombBajonero','PorcionPapasChedar','PorcionPapasChedarBaicon','PorcionPapasBunker','Postre'];


fetch(url)
.then(response => response.json())
.then(data => {
    // console.log(data);

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



                        <button type="submit" name="ag" class="btn btn-sm btnAgregar esp" data-price="${burg.precio}" data-nameData="${burg.nameData}">Agregar </button>
                        <button type="submit" name="agcp" class="btn btn-sm btnAgregarCP d-none" data-price="${burg.precio}+60" data-name="${burg.nameData}" >Agregar c/p </button>


                        <input id="extraC-${burg.nameData}" name="extCarne" class="extra" type="number" placeholder="Carne extra" list="exC" disabled ></input>
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
                        <button type="submit" name="ag" class="btn btn-sm btnAgregar " data-price="${burg.precio}" data-nameData="${burg.nameData}">Agregar </button>
                        <button type="submit" name="agcp" class="btn btn-sm btnAgregarCP " data-price="${burg.precio}+60" data-name="${burg.nameData}">Agregar c/p </button>
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
            console.log(form);

            form.firstElementChild[0].classList.add('active');
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
                        'precio': parseInt(form.firstElementChild[0].dataset.price)+140*extC,
                        'carneExtra': extC,
                    })
                }else {
                    orden.push({
                        'namedata': namedata,
                        'hamburgesa': namedata,
                        'precio': parseInt(form.firstElementChild[0].dataset.price)+70*extC,
                        'carneExtra': extC,
                    })
                }
            }
            form.firstElementChild[0].classList.remove('active');
            // console.log(orden);
        });
        
        // Boton para agregar hamburgesa con papas----------------------------------
        form.firstElementChild[1].addEventListener('click', ()=>{
            namedata = form.firstElementChild[0].dataset.namedata
            extC = document.querySelector(`#extraC-${namedata}`).value
            
            if(extC === ''){
                orden.push({
                    'namedata': namedata,
                    'hamburgesa': namedata + ' c/p',
                    'precio': parseInt(form.firstElementChild[0].dataset.price)+60,
                    'carneExtra': 0,
                })
            }else {
                if(arrayEspeciales.includes(namedata)){   
                    orden.push({
                        'namedata': namedata,
                        'hamburgesa': namedata+' c/p',
                        'precio': parseInt(form.firstElementChild[0].dataset.price)+(130*extC)+60,
                        'carneExtra': extC,
                    })
                }else {
                    orden.push({
                        'namedata': namedata,
                        'hamburgesa': namedata + ' c/p',
                        'precio': parseInt(form.firstElementChild[0].dataset.price)+(65*extC)+60,
                        'carneExtra': extC,
                    })
                }
            }
            
                // console.log(orden);
        });
        
        
    });
    // Boton de terminar la orden
    let numOrd = 0;
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
        // numOrd ++
        // Orden Num:${numOrd} <br>
        offCBody.innerHTML = `
        <div class="comanda">
        ${ornedToAppend}
        </div>
        <br><hr><br> 
        <div class="totComanda">
        Total= $${tot}<br> Debito= $${tot*1.03}
        </div><br>`;
        ornedToAppend = ''
    })
    // Boton para terminar la comanda y guardarla en el sessionStorage
    termOrd.addEventListener('click',()=>{
        if(localStorage.getItem('ordenes') === null){
            let ordenes = [];

            ordenes.push(orden)
            localStorage.setItem('ordenes',JSON.stringify(ordenes))
            orden = [];
        }else{
            let ordenes = JSON.parse(localStorage.getItem('ordenes'))

            ordenes.push(orden)
            // ordenes.push(orden);
            localStorage.setItem('ordenes','')
            localStorage.setItem('ordenes',JSON.stringify(ordenes))
            orden = [];
        }
    })
    // Boton para limpiar el Local storage de la pagina
    btnDelete.addEventListener('click', ()=>{
        localStorage.removeItem('ordenes')
        location.reload()
    })
    // Boton para ver el listado de las comandas del dia
    listaOrds.addEventListener('click',()=>{
        let totDia = 0;
        let ordenes = JSON.parse(localStorage.getItem('ordenes')), contToAppend = '';

        divCommandasDia.innerHTML = ' ';
        ordenes.forEach(comm => {
            let sumParcial = 0
            if(comm.length > 1){
                contToAppend = '';
                comm.forEach(burg => {
                    if(burg.carneExtra === 0){
                        contToAppend += `${burg.hamburgesa} &emsp;&emsp;$${burg.precio} <br>`    
                    }else{
                        contToAppend += `${burg.hamburgesa} +${burg.carneExtra} carne &emsp;&emsp;$${burg.precio} <br>`
                    }
                    totDia += parseInt(burg.precio)
                    sumParcial += parseInt(burg.precio)
                })
                divTotDia.innerHTML = `Total del dia $${totDia}`
                divCommandasDia.innerHTML += `<hr><div>${contToAppend} <span class='sumParcial'> Sub Total $${sumParcial}</span></div><hr>`
            }else{
                contToAppend = '';
                if(comm[0].carneExtra === 0){
                    contToAppend += `${comm[0].hamburgesa} &emsp;&emsp;$${comm[0].precio} <br>`
                }else{
                    contToAppend += `${comm[0].hamburgesa} +${comm[0].carneExtra} carne &emsp;&emsp;$${comm[0].precio} <br>`
                }
                totDia += parseInt(comm[0].precio)
                divTotDia.innerHTML = `Total del dia $${totDia}`
                divCommandasDia.innerHTML += `<hr><br>${contToAppend} <hr>`
            }
        })
    })
   
})