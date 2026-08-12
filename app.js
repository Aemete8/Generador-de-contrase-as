const passwordDisplay = document.querySelector('#passwordDisplay')
const copyBtn = document.querySelector('#copyBtn')
const copyLabel = document.querySelector('#copyLabel')
const lengthSlider = document.querySelector('#lengthSlider')
const lengthValue = document.querySelector('#lengthValue')
const strengthBar = document.querySelector('#strengthBar')
const strengthLabel = document.querySelector('#strengthLabel')
const errorMsg = document.querySelector('#errorMsg')
const generateBtn = document.querySelector('#generateBtn')

//Checks
const chkLower = document.querySelector('#chkLower')
const chkUpper = document.querySelector('#chkUpper')
const chkNumbers = document.querySelector('#chkNumbers')
const chkSymbols = document.querySelector('#chkSymbols')

//

const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*'


lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = Number(lengthSlider.value)
    
})

generateBtn.addEventListener('click', function () {
    errorMsg.textContent = ''
    const longitud = Number(lengthSlider.value)
    const pool = buildPool()

    if (pool === '' || pool === undefined || pool === null) {
        generarMensajeError()
        return
    }
    generatePasswrd(pool, longitud)
})

copyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(passwordDisplay.textContent)
    agregarClases(copyBtn, 'is-copied')
    copyBtn.textContent='¡Copiado!'

    setTimeout(() => {
        removerClases(copyBtn, 'is-copied')
        copyBtn.innerHTML=`
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span class="output__copy-label" id="copyLabel">Copiar</span>`
    },2000)
})

function buildPool() {
    let pool = ''

    if (chkLower.checked) pool += LOWER
    if (chkUpper.checked) pool += UPPER
    if (chkNumbers.checked) pool += NUMBERS
    if (chkSymbols.checked) pool += SYMBOLS

    return pool
}

function generatePasswrd(pool,longitud) {
    let passwrd = ''

    for (let i = 0; i < longitud; i++) {
        let indiceAleatorio = Math.floor(Math.random() * pool.length)
        let char = pool[indiceAleatorio]
        passwrd += char
    }
    removerClases(passwordDisplay,'is-placeholder')
    passwordDisplay.textContent = passwrd
    updateStrength(pool,longitud)
}


function updateStrength(pool, longitud) {
    let variedad = 0
    let puntaje = 0

    if (chkLower.checked) variedad++
    if (chkUpper.checked) variedad++
    if (chkNumbers.checked) variedad++
    if (chkSymbols.checked) variedad++

    if (longitud >= 16) puntaje+= 1
    if (longitud >= 24) puntaje+= 1

    const puntajeTotal = puntaje+variedad

    actualizarDOM(puntajeTotal)
}

function actualizarDOM(puntaje) {
    let nivelSeguridad = ''

    if (puntaje <=2) {
        nivelSeguridad = 'Débil'

        removerClases(strengthBar,'is-medium', 'is-strong')
        agregarClases(strengthBar,'is-weak')

        removerClases(strengthLabel,'is-medium', 'is-strong')
        agregarClases(strengthLabel,'is-weak')
    } else if (puntaje <=4) {
        nivelSeguridad = 'Media'

        removerClases(strengthBar,'is-weak', 'is-strong')
        agregarClases(strengthBar,'is-medium')

        removerClases(strengthLabel,'is-weak', 'is-strong')
        agregarClases(strengthLabel,'is-medium')
    } else {
        nivelSeguridad = 'Fuerte'

        removerClases(strengthBar,'is-weak', 'is-medium')
        agregarClases(strengthBar,'is-strong')

        removerClases(strengthLabel,'is-weak', 'is-medium')
        agregarClases(strengthLabel,'is-strong')
    }
    strengthLabel.textContent = nivelSeguridad
}

function generarMensajeError(){
    errorMsg.textContent = 'Selecciona por lo menos un elemento a incluir'
}

function removerClases(elemento, ...clase) {
    elemento.classList.remove(...clase)
}

function agregarClases(elemento, ...clase) {
    elemento.classList.add(...clase)
}