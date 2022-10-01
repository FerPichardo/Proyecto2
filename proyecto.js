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
    let listTable = JSON.parse(localStorage.getItem('listOp'));
    // console.log(listTable)
    document.getElementsByTagName('tbody')[0].innerHTML = '';
    if (listTable !== null) {
        listTable.forEach((element, index) => {
            let rowTable = document.createElement('tr');
            rowTable.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${element.Numero}</td>
                    <td>${element.Nombre}</td>
                    <td>${element.Correo}</td>
                    <td>${element.Fnacimiento}</td>
                    <td>${element.Edad}</td>
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
    let lista = JSON.parse(localStorage.getItem('listOp'));
    lista.splice(index, 1)
    localStorage.setItem('listOp', JSON.stringify(lista));
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
    list = JSON.parse(localStorage.getItem('listOp'));
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
    let obj = {
        Nombre: nombre,
        Edad: getEdad(dob.value),
        Correo: email.value,
        Numero: idnum.value,
        Fnacimiento: dob.value
    }
    let obj_dos = {
        num: idnum.value,
        pnombre: fname.value,
        snombre: sname.value,
        papellido: lname.value,
        sapellido: slname.value,
        correo: email.value,
        fecha: dob.value
    }
    list_dos.splice(index,1,obj_dos)
    localStorage.setItem('listOp_dos', JSON.stringify(list_dos))
    // console.log(fecha)
    list.splice(index,1,obj)
    localStorage.setItem('listOp', JSON.stringify(list));
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
    list = JSON.parse(localStorage.getItem('listOp'));
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
    let obj = {
        Nombre: nombre,
        Edad: getEdad(dob.value),
        Correo: email.value,
        Numero: idnum.value,
        Fnacimiento: dob.value
    }
    let obj_dos = {
        num: idnum.value,
        pnombre: fname.value,
        snombre: sname.value,
        papellido: lname.value,
        sapellido: slname.value,
        correo: email.value,
        fecha: dob.value
    }
    list_dos.push(obj_dos)
    localStorage.setItem('listOp_dos', JSON.stringify(list_dos))
    // console.log(fecha)
    list.push(obj)
    localStorage.setItem('listOp', JSON.stringify(list));
    showList()
    borrar()
})
showList()