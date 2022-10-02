const idnum = document.querySelector("#idnum")
const fname = document.querySelector("#fname")
const sname = document.querySelector("#sname")
const lname = document.querySelector("#lname")
const slname = document.querySelector("#slname")
const email = document.querySelector("#email")
const dob = document.querySelector("#dob")
const crear = document.querySelector("#crear")

let dic = []

const borrar = () => {
    idnum.value = ''
    fname.value = ''
    sname.value = ''
    lname.value = ''
    slname.value = ''
    email.value = ''
    dob.value = ''
}
const clearMemory = () => {
    console.warn = ("Se limpio la memória del navegador")
    localStorage.clear()
}

const showList = () => {
    let listTable = JSON.parse(localStorage.getItem('listOp_dos'));
    document.getElementsByTagName('tbody')[0].innerHTML = '';
    if (listTable !== null) {
        listTable.forEach((element, index) => {
            let rowTable = document.createElement('tr');
            rowTable.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${element.num}</td>
                    <td>${element.ncompleto}</td>
                    <td>${element.correo}</td>
                    <td>${element.fecha}</td>
                    <td>${element.edad}</td>
                    <td>
                    <button onclick="editar(${index})" id= "editar${index}">Editar</button>
                    <button onclick="eliminar(${index})">Eliminar</button>
                    <button onclick="actualizar(${index})" disabled id="Button${index}">Actualizar</button>
                    </td>`;
            document.getElementsByTagName("tbody")[0].appendChild(rowTable);
        });
    }
}

const eliminar = (index) => {
    let lista = JSON.parse(localStorage.getItem('listOp_dos'));
    lista.splice(index, 1)
    localStorage.setItem('listOp_dos', JSON.stringify(lista));
    showList()}

const editar = (index) => {
    let lista = JSON.parse(localStorage.getItem('listOp_dos'));
    idnum.value = lista[index].num
    fname.value = lista[index].pnombre
    sname.value = lista[index].snombre
    lname.value = lista[index].papellido
    slname.value = lista[index].sapellido
    email.value = lista[index].correo
    dob.value = lista[index].fecha

    document.getElementById(`Button${index}`).disabled = false
    document.getElementById(`editar${index}`).disabled = true
}

const actualizar = (index) => {
    let list = []
    let list_dos = []
    let nombre = ''
    list_dos = JSON.parse(localStorage.getItem('listOp_dos'));
    if (sname.value === null || '') {
        if (slname.value === null || '') {
            nombre = `${fname.value} ${lname.value}`;
        } else {
            nombre = `${fname.value} ${lname.value} ${slname.value}`;
        }
    } else if (slname.value === null || '') {
        nombre = `${fname.value} ${sname.value} ${lname.value}`
    } else {
        nombre = `${fname.value} ${sname.value} ${lname.value} ${slname.value}`;
    }
    let obj_dos = {
        num: idnum.value,
        pnombre: fname.value,
        snombre: sname.value,
        papellido: lname.value,
        sapellido: slname.value,
        correo: email.value,
        fecha: dob.value,
        ncompleto: nombre,
        edad: getEdad(dob.value)
    }
    list_dos.splice(index,1,obj_dos)
    localStorage.setItem('listOp_dos', JSON.stringify(list_dos))
    showList()
    borrar()
}

const getEdad = (fecha) => {
    let hoy = new Date()
    let fnacimiento = new Date(fecha)
    let edad = hoy.getFullYear() - fnacimiento.getFullYear()
    let dif = hoy.getMonth() - fnacimiento.getMonth()
    if (dif < 0 || (dif === 0 && hoy.getdate() < fnacimiento.getDate())) {
        edad--
    }
    return edad
}

crear.addEventListener("click", () => {
    let list = []
    let list_dos = []
    let nombre = ''
    list_dos = JSON.parse(localStorage.getItem('listOp_dos'));
    if (list === null) {
        list = [];
    }
    if (list_dos === null) {
        list_dos = [];
    }
    if (sname.value === null || '') {
        if (slname.value === null || '') {
            nombre = `${fname.value} ${lname.value}`;
        } else {
            nombre = `${fname.value} ${lname.value} ${slname.value}`;
        }
    } else if (slname.value === null || '') {
        nombre = `${fname.value} ${sname.value} ${lname.value}`
    } else {
        nombre = `${fname.value} ${sname.value} ${lname.value} ${slname.value}`;
    }

    //     // let fecha = new Date(Date.utc(dob.value)).toLocaleDateString('es-MX')    
    // fecha = Date(dob.value)

    let obj_dos = {
        num: idnum.value,
        pnombre: fname.value,
        snombre: sname.value,
        papellido: lname.value,
        sapellido: slname.value,
        correo: email.value,
        fecha: dob.value,
        ncompleto: nombre,
        edad: getEdad(dob.value)
    }
    list_dos.push(obj_dos)
    localStorage.setItem('listOp_dos', JSON.stringify(list_dos))
    showList()
    borrar()
})
showList()