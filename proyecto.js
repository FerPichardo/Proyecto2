const idnum = document.querySelector("#idnum")
const fname = document.querySelector("#fname")
const sname = document.querySelector("#sname")
const lname = document.querySelector("#lname")
const slname = document.querySelector("#slname")
const email = document.querySelector("#email")
const dob = document.querySelector("#dob")
const crear = document.querySelector("#crear")

let dic = []
let obj = {
    nombre: "",
    apellidos: "",
    edad: "",
    email: "",
    numero: ""
}
let obj2 = {
    nombre: "",
    apellidos: "",
    edad: "",
    email: "",
    numero: ""
}
let obj3 = {
    nombre: "",
    apellidos: "",
    edad: "",
    email: "",
    numero: ""
}
let obj4 = {
    nombre: "",
    apellidos: "",
    edad: "",
    email: "",
    numero: ""
}
let obj5 = {
    nombre: "",
    apellidos: "",
    edad: "",
    email: "",
    numero: ""
}
dic = [obj1,obj2,obj3,obj4,obj5]
const clearMemory = () => {
    console.warn = ("Se limpio la memória del navegador")
    localStorage.clear()
}

const showList = () => {
    let listTable = JSON.parse(localStorage.getItem('listOp'));
    document.getElementsByTagName('tbody')[0].innerHTML = '';
    if (listTable !== null) {
        listTable.forEach((element, index) => {
            let rowTable = document.createElement('tr');
            rowTable.innerHTML = `
                    <td>${index+1}</td>
                    <td>${element}</td>
                    <td>
                    <button onclick="editar(${index})>Editar</button>
                    <button onclick="eliminar${index}">Eliminar</button>
                    </td>`;
                    document.getElementsByTagName("tbody")[0].appendChild(rowTable);
        });
    }
}

const eliminar = (index) => {
console.log('Eliminar ' + index)
}

const editar = (editar) => {
console.log('Editar ' + index)
}

crear.addEventListener("click", () => {
    list = JSON.parse(localStorage.getItem('listOp'));
    if (list === null) {
        list = []
    }

}