
let contMain = document.querySelector('#container')
let url = 'Js/item.json';
let items = [];
let btnAgregear = document.querySelector('.btnAgregar');
let btnAgregearCP = document.querySelector('.btnAgregarCP');
let CarExtra = document.querySelector('.extra');
let arrayEspeciales = [];
let comandosEspeciales = ['Bebida','PorcionPapas','PorcionPulled'];
let fshord = document.querySelector('#totBtn');
let offCBody = document.querySelector('#offcanvas-body'), listaOrds = document.querySelector('#verOrds'), termOrd = document.querySelector('#terminarOrden')
// console.log(contMain)



fetch(url)
.then(response => response.json())
.then(data => {
    console.log(data);

    contMain.innerHTML = ``;
    for (let burg of data) {
        // console.log(burg);
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
    // console.log($forms);
    let orden = [];
    let extC = undefined;
    let namedata = undefined;
    let btnAgregar = undefined;

    
    $forms.forEach(form =>{
        form.firstElementChild.addEventListener('submit', (e)=>{
            e.preventDefault();
        })
        
        // Boton para agregar hamburgesa
        form.firstElementChild[0].addEventListener('click', ()=>{
            // orden = [];
            namedata = form.firstElementChild[0].dataset.namedata
            extC = document.querySelector(`#extraC-${namedata}`).value
            console.log(namedata);

            if(extC === ''){
                orden.push({
                    'hamburgesa': namedata,
                    'precio': form.firstElementChild[0].dataset.price,
                    'carneExtra': 0,
                })
            }else {
                if(arrayEspeciales.includes(namedata)){   
                    orden.push({
                        'hamburgesa': namedata,
                        'precio': parseInt(form.firstElementChild[0].dataset.price)+130*extC,
                        'carneExtra': extC,
                    })
                }else {
                    orden.push({
                        'hamburgesa': namedata,
                        'precio': parseInt(form.firstElementChild[0].dataset.price)+65*extC,
                        'carneExtra': extC,
                    })
                }
            }
            
            console.log(orden);
        });
        
        // Boton para agregar hamburgesa con papas
        form.firstElementChild[1].addEventListener('click', ()=>{
            // orden = [];
            namedata = form.firstElementChild[0].dataset.namedata
            extC = document.querySelector(`#extraC-${namedata}`).value
            
            if(extC === ''){
                orden.push({
                    'hamburgesa': namedata + ' c/p',
                    'precio': parseInt(form.firstElementChild[0].dataset.price)+50,
                    'carneExtra': 0,
                })
            }else {
                if(arrayEspeciales.includes(namedata)){   
                    orden.push({
                        'hamburgesa': namedata+' c/p',
                        'precio': parseInt(form.firstElementChild[0].dataset.price)+(130*extC)+50,
                        'carneExtra': extC,
                    })
                }else {
                    orden.push({
                        'hamburgesa': namedata + ' c/p',
                        'precio': parseInt(form.firstElementChild[0].dataset.price)+(65*extC)+50,
                        'carneExtra': extC,
                    })
                }
            }
            
                console.log(orden);
        });
        
        
    });
    // console.log(formsList);
    // let totDia = 0;
    fshord.addEventListener('click', ()=>{
        localStorage.setItem('Orden',JSON.stringify(orden));
        let tot = 0;
        let ornedToAppend = '';

        offCBody.innerHTML = '';
        for (com of orden){
            tot += parseInt(com.precio)
            ornedToAppend += `${com.hamburgesa} +${com.carneExtra} carne &emsp;&emsp;$${com.precio} <br>`
        }
        // totDia += tot;
        offCBody.innerHTML = `
        <div class="comanda">
            ${ornedToAppend}
        </div>
        <br><hr><br> 
        <div class="totComanda">
            Total= $${tot}<br> Debito= $${tot*1.05}
        </div><br>`;
    })
    
    termOrd.addEventListener('click',()=>{
        // localStorage.setItem('ordenes', orden)
        console.log(localStorage.getItem('ordenes'))
        if(localStorage.getItem('ordenes') === null){
            let ordenes = [];
            orden.forEach(comm =>{
                ordenes.push(comm)
            })
            localStorage.setItem('ordenes',JSON.stringify(ordenes))
            orden = [];
        }else{
            let ordenes = JSON.parse(localStorage.getItem('ordenes'))
            orden.forEach(comm =>{
                ordenes.push(comm)
            })
            localStorage.setItem('ordenes','')
            localStorage.setItem('ordenes',JSON.stringify(ordenes))
            orden = [];
        }
    })
    // listaOrds.addEventListener('click',()=>{})
   


})