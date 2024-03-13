console.log("script.js")

const frutas = [
    { fruit: "Maça", price: 1.25, codigo: "F001" },
    { fruit: "Banana", price: 0.75, codigo: "F002" },
    { fruit: "Laranja", price: 1.00, codigo: "F003" },
    { fruit: "Pera", price: 1.50, codigo: "F004" },
    { fruit: "Mango", price: 2.99, codigo: "F005" },
    { fruit: "Abacaxi", price: 3.50, codigo: "F006" },
    { fruit: "Morango", price: 4.25, codigo: "F007" },
    { fruit: "Blueberry", price: 5.75, codigo: "F008" },
    { fruit: "Melancia", price: 4.99, codigo: "F009" },
    { fruit: "Kiwi", price: 2.75, codigo: "F010" },
];

let itemInput = document.getElementById("inputNameCod");
let btnConsultar = document.getElementById("btnConsultar");
let btnLimparBusqueda = document.getElementById("btnLimparBusqueda");
let divResult = document.getElementById("divResult");
let btnAddCarrinho = document.getElementById("btnAddCarrinho");
let tablaCarrinho = document.querySelector("#tablaCarrinho tbody");
let divTotal = document.getElementById('divTotalCarrinho');
//let tablaCarrinho = document.getElementById("tablaCarrinho");

let itemCarrinho = '';// VARIABLE to save item in buscarItem()
let carrinho = [];// array to save objets in the cart

function limparBusqueda() {
    //access and midify the atribute VALUE of the input
    itemInput.value = '';
    // limpar a divResult
    divResult.textContent = '';
    // borrar variable temporal para carrinho
    itemCarrinho = '';
}

function limparBusqueda2() {
    // limpar a divResult
    divResult.textContent = '';
    // borrar variable temporal para carrinho
    itemCarrinho = '';
}

function buscarItem(event) {
    event.preventDefault();
    itemCarrinho = '';
    let resultBusqueda = [];
    let digitado = itemInput.value;
    console.log(digitado);

    if (digitado === '') {
        divResult.textContent = '';
        divResult.style.backgroundColor = 'white';
        return
    };

    resultBusqueda = frutas.findIndex(
        fruta => (
            fruta.fruit.toLowerCase() === digitado.toLowerCase()
            ||
            fruta.codigo.toLowerCase() === digitado.toLowerCase()
        )
    );

    if (resultBusqueda === -1) {
        divResult.textContent = 'O produto não existe.';
        divResult.style.color = 'red';
        divResult.style.fontWeight = '600';
    }
    else {
        let item = frutas[resultBusqueda];
        let f = item.fruit
        let p = item.price
        divResult.textContent = f + ' = ' + p + '$';
        divResult.style.color = 'blue';
        divResult.style.fontWeight = '600';
        itemCarrinho = item;
    }
}

function addCarrinho() {
    //console.log(itemCarrinho != '');
    if (itemCarrinho != '') {
        console.log('itemCarrinho', itemCarrinho);
        carrinho.push(itemCarrinho);
        console.log('Carrinho', carrinho);
        addRowToTabla();

        let itemCarrinhoTemp = {
            fruit: itemCarrinho.fruit,
            price: itemCarrinho.price
        };
        console.log('itemCarrinhoTemp', itemCarrinhoTemp);

        //------LOCAL STORAGE--------------
        //----------------------------------
        //Guardando el item consultado actual 
        localStorage.setItem('produto-consultado', JSON.stringify(itemCarrinhoTemp));

        //mostrando el item consultado actual
        let produto = localStorage.getItem('produto-consultado');
        console.log('produto-consultado', produto);

        //suponemos que ya tenemos una variable con los productos consultados anteriores. Guardamos la variable en otra variable temporal
        //produtosSalvosTempString nos da STRING
        let produtosSalvosTempString = localStorage.getItem('productosSalvos');
        console.log('produto to data', produtosSalvosTempString);
        //creamos variable data para almacenar los datos viejos y nuevos
        let data = [];
        // si la variable no existe = null
        if (produtosSalvosTempString) {
            //to pase str -> JSON y guardar data previa
            data = JSON.parse(produtosSalvosTempString);
        }
        //adjuntando nueva data
        data.push(itemCarrinhoTemp);
        //data->productosSalvos
        localStorage.setItem('productosSalvos', JSON.stringify(data));
    }
    else{
        alert('Digite primeiro o produto desejado y clique no botão consultar.');
    }
}

function addRowToTabla() {
    //if (itemCarrinho.length > 0){}// no es necesario
    //carrinho.forEach((item) => { }}//solo para arrays

    // Create a table row
    const tableRow = document.createElement("tr");

    // Create data cells for each property and set content
    const fruitCell = document.createElement("td");
    fruitCell.textContent = itemCarrinho.fruit;
    tableRow.appendChild(fruitCell);

    const priceCell = document.createElement("td");
    // Add dollar sign for formatting
    priceCell.textContent = `$${itemCarrinho.price}`;
    tableRow.appendChild(priceCell);

    // Append the table row to the table body
    tablaCarrinho.appendChild(tableRow);
}

function calTotal() {
    let tot = 0;
    if (carrinho.length > 0) {
        carrinho.forEach((item) => {
            tot += item.price;
        }
        )
    }
    else {
        alert('O Carrinho esta vazio.');
        return
    }
    divTotal.textContent = 'Total Carrinho = ' + tot + ' $';
    divTotal.style.color = 'black';
    divTotal.style.backgroundColor = 'white';
    divTotal.style.fontWeight = '600';
    divTotal.style.borderRadius = '5px';
    divTotal.style.padding = '10px';
}

function comprar() {
    if (carrinho.length == 0) {
        alert('O Carrinho esta vazio.');
        return;
    }
};

function checkCarrinho() {
    //Give us the objects in localstorage as a string
    let produtosSalvosString = localStorage.getItem('productosSalvos');
    //console.log('produto to data', produtosSalvosString);
    if (produtosSalvosString) {
        alert('Tem produtos no seo carrinho.')
        //to save from str -> JSON y guardar data previa
        carrinho = JSON.parse(produtosSalvosString);
        console.log('carrinho', carrinho);
        //to display the table
        for (let i = 0; i < carrinho.length; i++) {
            const tableRow = document.createElement("tr");

            // Create data cells for each property and set content
            const fruitCell = document.createElement("td");
            fruitCell.textContent = carrinho[i].fruit;
            tableRow.appendChild(fruitCell);

            const priceCell = document.createElement("td");
            // Add dollar sign for formatting
            priceCell.textContent = `$${carrinho[i].price}`;
            tableRow.appendChild(priceCell);

            // Append the table row to the table body
            tablaCarrinho.appendChild(tableRow);
        }
    }
    else {
        return;
    }
};

function limparCarrinho(){
    localStorage.clear();
    location.reload();
    // itemCarrinho = '';
    // divTotal.textContent = '';
    // divTotal.style.display = 'none';
    // carrinho = [];
}