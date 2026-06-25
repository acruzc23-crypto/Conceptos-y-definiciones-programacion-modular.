const selectDimension = document.getElementById('dimension-arreglo')
const inputValorBusqueda = document.getElementById('valor-busqueda')
const selectTipoOrden = document.getElementById('tipo-orden')
const inputNumRotaciones = document.getElementById('num-rotaciones')
const inputPosicion1 = document.getElementById('posicion1')
const inputPosicion2 = document.getElementById('posicion2')
const tableTbody = document.querySelector('#tabla-vector-numerico > tbody')
const txtRespuesta = document.getElementById('txt-respuesta')

const btnCargarVector = document.getElementById('btn-cargar-vector')
const btnVaciarVector = document.getElementById('btn-vaciar-vector')
const btnNumeroMayor = document.getElementById('btn-numero-mayor')
const btnNumeroMenor = document.getElementById('btn-numero-menor')
const btnSuma = document.getElementById('btn-suma')
const btnProducto = document.getElementById('btn-producto')
const btnModa = document.getElementById('btn-moda')
const btnMedia = document.getElementById('btn-media')
const btnMediana = document.getElementById('btn-mediana')
const btnSeleccion = document.getElementById('btn-seleccion')
const btnBurbuja = document.getElementById('btn-burbuja')
const btnInsercion  = document.getElementById('btn-insercion')
const btnFusion = document.getElementById('btn-fusion')
const btnBusquedaSecuencial = document.getElementById('btn-busqueda-secuencial')
const btnBusquedaBinaria = document.getElementById('btn-busqueda-binaria')
const btnInvertir = document.getElementById('btn-invertir')
const btnEliminarDuplicados = document.getElementById('btn-eliminar-duplicados')
const btnRotar = document.getElementById('btn-rotar')
const btnIntercambiar = document.getElementById('btn-intercambiar')

const NUM_MAXIMO_RANDOM = 100
let vector = []

btnCargarVector.addEventListener('click', function ()
{
    const dimension = selectDimension.value
    vector = []
    cargarVector(dimension)
    presentarVector()
    txtRespuesta.value = vector.join(', ') 
})

btnVaciarVector.addEventListener('click', function ()
{
    vector = []
    presentarVector()
    txtRespuesta.value = ''
})

btnNumeroMayor.addEventListener('click', function ()
{
    if (validarVectorCargado()){
        txtRespuesta.value = buscarNumeroMayor()
    }
})

btnNumeroMenor.addEventListener('click', function ()
{
    if (validarVectorCargado()){
        txtRespuesta.value = buscarNumeroMenor()
    }
})

btnSuma.addEventListener('click', function ()
{
    if (validarVectorCargado()){
        txtRespuesta.value =fnCalcularSuma()
    }
})

btnProducto.addEventListener('click', function ()
{
    if (validarVectorCargado()){
        txtRespuesta.value = fnCalcularProducto()
    }
})

btnModa.addEventListener('click', function ()
{
    if (validarVectorCargado()){
        const moda = fnCalcularModa()
    txtRespuesta.value = moda !== 0 ? 'Moda: ' + moda : 'No existe moda'
    }
})

btnMedia.addEventListener('click', function ()
{
    if (validarVectorCargado()){
        txtRespuesta.value = fnCalcularMedia()
    }
})

btnMediana.addEventListener('click', function ()
{
    if (validarVectorCargado()){
        txtRespuesta.value = fnCalcularMediana()
    }
})

btnSeleccion.addEventListener('click', function ()
{
    if (validarVectorCargado()){
        const orden = selectTipoOrden.value
    ordenarSeleccion(orden)
    presentarVector()
    txtRespuesta.value = 'Ordenado por Selección (' + orden + '): [' + vector.join(', ') + ']'
    }
})

btnBurbuja.addEventListener('click', function ()
{
    if (!validarVectorCargado()) return
    const orden = selectTipoOrden.value
    ordenarBurbuja(orden)
    presentarVector()
    txtRespuesta.value = 'Ordenado por Burbuja (' + orden + '): [' + vector.join(', ') + ']'
})

btnInsercion.addEventListener('click', function ()
{
    if (!validarVectorCargado()) return
    const orden = selectTipoOrden.value
    ordenarInsercion(orden)
    presentarVector()
    txtRespuesta.value = 'Ordenado por Inserción (' + orden + '): [' + vector.join(', ') + ']'
})

btnFusion.addEventListener('click', function ()
{
    if (!validarVectorCargado()) return
    const orden = selectTipoOrden.value
    vector = ordenarFusion(vector, orden)
    presentarVector()
    txtRespuesta.value = 'Ordenado por Fusión (' + orden + '): [' + vector.join(', ') + ']'
})

btnBusquedaSecuencial.addEventListener('click', function ()
{
    if (!validarVectorCargado()) return
    const valor = parseInt(inputValorBusqueda.value)
    if (isNaN(valor)) { txtRespuesta.value = 'Ingrese un valor a buscar'; return }
    const resultado = busquedaSecuencial(valor)
    txtRespuesta.value = resultado !== -1
        ? 'Búsqueda Secuencial: valor ' + valor + ' encontrado en posición ' + resultado
        : 'Búsqueda Secuencial: valor ' + valor + ' no encontrado'
})

btnBusquedaBinaria.addEventListener('click', function (e)
{
    if (!validarVectorCargado()) return
    const valor = parseInt(inputValorBusqueda.value)
    if (isNaN(valor)) { txtRespuesta.value = 'Ingrese un valor a buscar'; return }
    const resultado = busquedaBinaria(valor)
    txtRespuesta.value = resultado !== -1
        ? 'Búsqueda Binaria: valor ' + valor + ' encontrado en posición ' + resultado
        : 'Búsqueda Binaria: valor ' + valor + ' no encontrado (vector debe estar ordenado)'
})

btnInvertir.addEventListener('click', function (e)
{
    if (!validarVectorCargado()) return
    invertirVector()
    presentarVector()
    txtRespuesta.value = 'Vector invertido: [' + vector.join(', ') + ']'
})

btnEliminarDuplicados.addEventListener('click', function (e)
{
    if (!validarVectorCargado()) return
    eliminarDuplicados()
    presentarVector()
    txtRespuesta.value = 'Sin duplicados: [' + vector.join(', ') + ']'
})

btnRotar.addEventListener('click', function (e)
{
    if (!validarVectorCargado()) return
    const rotaciones = parseInt(inputNumRotaciones.value)
    if (isNaN(rotaciones) || rotaciones < 1) { txtRespuesta.value = 'Ingrese un número de rotaciones válido'; return }
    const direccion = document.querySelector('input[name="direccion"]:checked').value
    rotarVector(rotaciones, direccion)
    presentarVector()
    txtRespuesta.value = 'Vector rotado ' + rotaciones + 'x ' + direccion + ': [' + vector.join(', ') + ']'
})

btnIntercambiar.addEventListener('click', function (e)
{
    if (!validarVectorCargado()) return
    const pos1 = parseInt(inputPosicion1.value)
    const pos2 = parseInt(inputPosicion2.value)
    if (isNaN(pos1) || isNaN(pos2)) { txtRespuesta.value = 'Ingrese ambas posiciones'; return }
    if (pos1 < 0 || pos1 >= vector.length || pos2 < 0 || pos2 >= vector.length)
    {
        txtRespuesta.value = 'Posiciones fuera de rango (0 - ' + (vector.length - 1) + ')'
        return
    }
    intercambiarElementos(pos1, pos2)
    presentarVector()
    txtRespuesta.value = 'Intercambiados pos ' + pos1 + ' y pos ' + pos2 + ': [' + vector.join(', ') + ']'
})
//Funciones auxiliares
function validarVectorCargado()
{
    if (vector.length === 0)
    {
        txtRespuesta.value = 'Primero cargue el vector'
        return false
    }
    return true
}
//Carga y presentación
function cargarVector(dimension)
{
    for (let i = 0; i < dimension; i++)
    {
        const numero = Math.ceil(Math.random() * NUM_MAXIMO_RANDOM)
        vector[i] = numero
    }
}

function presentarVector()
{
    let contador = 0
    let str = ''
    while (contador < 2)
    {
        str += '<tr>'
        for (let i = 0; i < vector.length; i++)
        {
            if (contador == 0)
            {
                str += `<td>${i}</td>`
            }
            else
            {
                str += `<td bgcolor="rgb(0, 42, 255)">${vector[i]}</td>`
            }
        }
        str += '</tr>'
        contador++
    }
    tableTbody.innerHTML = str
}
//Estadísticas
function buscarNumeroMayor()
{
    let mayor = vector[0]
    for (let i = 1; i < vector.length; i++)
    {
        if (vector[i] > mayor)
        {
            mayor = vector[i]
        }
    }
    return mayor
}

function buscarNumeroMenor()
{
    let menor = vector[0]
    for (let i = 1; i < vector.length; i++)
    {
        if (vector[i] < menor)
        {
            menor = vector[i]
        }
    }
    return menor
}

function fnCalcularSuma()
{
    let suma = 0
    for (let i = 0; i < vector.length; i++)
    {
        suma += vector[i]
    }
    return suma
}

function fnCalcularProducto()
{
    let producto = 1
    for (let i = 0; i < vector.length; i++)
    {
        producto *= vector[i]
    }
    return producto
}

function fnCalcularMedia()
{
    const suma = fnCalcularSuma()
    return (suma / vector.length).toFixed(2)
}

function fnCalcularMediana()
{
    vector.sort((a, b) => a - b)

    const dimension = vector.length

    if (dimension % 2 == 0)
    {
        const indexCentral = dimension / 2
        return (vector[indexCentral] + vector[indexCentral - 1]) / 2
    }

    return vector[(dimension - 1) / 2]
}

function fnCalcularModa()
{
    let moda = 0
    let maximaRepeticion = 0

    for (let i = 0; i < vector.length; i++)
    {
        const numero = vector[i]
        let contarRepetido = 0
        for (let j = 0; j < vector.length; j++)
        {
            if (numero == vector[j])
            {
                contarRepetido++
            }
        }
        if (contarRepetido > 1 && contarRepetido > maximaRepeticion)
        {
            maximaRepeticion = contarRepetido
            moda = numero
        }
    }
    return moda
}
//Ordenamientos
function ordenarSeleccion(){
    for (let i = 0; i < vector.length - 1; i++)
    {
        let menor = i
        for (let j = i + 1; j < vector.length; j++){
            if (vector[j] < vector[menor])
            {
                menor = j
            }
        }
        let temp = vector[i]
        vector[i] = vector[menor]
        vector[menor] = temp
    }
}

function ordenarBurbuja(){
    for (let i = 0; i < vector.length - 1; i++)
    {
        for (let j = 0; j < vector.length - 1 - i; j++)
        {
            if (vector[j] > vector[j + 1])
            {
                let temp = vector[j]
                vector[j] = vector[j + 1]
                vector[j + 1] = temp
            }
        }
    }
}

function ordenarInsercion()
{
    for (let i = 1; i < vector.length; i++)
    {
        let actual = vector[i]
        let j = i - 1

        while (j >= 0 && vector[j] > actual)
        {
            vector[j + 1] = vector[j]
            j--
        }

        vector[j + 1] = actual
    }
}

function ordenarFusion(arr, orden)
{
    if (arr.length <= 1) return arr

    const medio      = Math.floor(arr.length / 2)
    const izquierda  = ordenarFusion(arr.slice(0, medio), orden)
    const derecha    = ordenarFusion(arr.slice(medio), orden)

    return fusionar(izquierda, derecha, orden)
}

function fusionar(izquierda, derecha, orden)
{
    const resultado = []
    let i = 0
    let j = 0

    while (i < izquierda.length && j < derecha.length)
    {
        const condicion = orden === 'asc'
            ? izquierda[i] <= derecha[j]
            : izquierda[i] >= derecha[j]
        if (condicion)
        {
            resultado.push(izquierda[i])
            i++
        }
        else
        {
            resultado.push(derecha[j])
            j++
        }
    }

    while (i < izquierda.length) { resultado.push(izquierda[i]); i++ }
    while (j < derecha.length)   { resultado.push(derecha[j]);   j++ }

    return resultado
}
//Búsquedas
function busquedaSecuencial(valor)
{
    for (let i = 0; i < vector.length; i++)
    {
        if (vector[i] === valor)
        {
            return i
        }
    }
    return -1
}

function busquedaBinaria(valor)
{
    let inicio = 0
    let fin    = vector.length - 1

    while (inicio <= fin)
    {
        const medio = Math.floor((inicio + fin) / 2)
        if (vector[medio] === valor)
        {
            return medio
        }
        else if (vector[medio] < valor)
        {
            inicio = medio + 1
        }
        else
        {
            fin = medio - 1
        }
    }
    return -1
}
//Transformaciones
function invertirVector()
{
    let inicio = 0
    let fin    = vector.length - 1
    while (inicio < fin)
    {
        const temp     = vector[inicio]
        vector[inicio] = vector[fin]
        vector[fin]    = temp
        inicio++
        fin--
    }
}

function eliminarDuplicados()
{
    const sinDuplicados = []
    for (let i = 0; i < vector.length; i++)
    {
        let existe = false
        for (let j = 0; j < sinDuplicados.length; j++)
        {
            if (sinDuplicados[j] === vector[i])
            {
                existe = true
                break
            }
        }
        if (!existe)
        {
            sinDuplicados.push(vector[i])
        }
    }
    vector = sinDuplicados
}

function rotarVector(rotaciones, direccion)
{
    const n = vector.length
    const rot = rotaciones % n
    if (rot === 0) return

    if (direccion === 'izquierda')
    {
        const extraidos = vector.splice(0, rot)
        vector.push(...extraidos)
    }
    else
    {
        const extraidos = vector.splice(n - rot, rot)
        vector.unshift(...extraidos)
    }
}

function intercambiarElementos(pos1, pos2)
{
    const temp    = vector[pos1]
    vector[pos1]  = vector[pos2]
    vector[pos2]  = temp
}
