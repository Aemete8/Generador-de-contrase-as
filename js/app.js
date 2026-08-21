// === CONSTANTES ===

const LOWER   = 'abcdefghijklmnopqrstuvwxyz'
const UPPER   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*'

// === DOM ===

const passwordDisplay = document.querySelector('#passwordDisplay')
const copyBtn         = document.querySelector('#copyBtn')
const copyLabel       = document.querySelector('#copyLabel')
const lengthSlider    = document.querySelector('#lengthSlider')
const lengthValue     = document.querySelector('#lengthValue')
const strengthBar     = document.querySelector('#strengthBar')
const strengthLabel   = document.querySelector('#strengthLabel')
const errorMsg        = document.querySelector('#errorMsg')
const generateBtn     = document.querySelector('#generateBtn')

const chkLower   = document.querySelector('#chkLower')
const chkUpper   = document.querySelector('#chkUpper')
const chkNumbers = document.querySelector('#chkNumbers')
const chkSymbols = document.querySelector('#chkSymbols')

// === EVENTOS ===

lengthSlider.addEventListener('input', handleSlider)
generateBtn.addEventListener('click', handleGenerate)
copyBtn.addEventListener('click', handleCopy)

// === HANDLERS ===

/**
 * Actualiza el valor visible del slider y su atributo aria en tiempo real.
 */
function handleSlider() {
    lengthValue.textContent = Number(lengthSlider.value)
    lengthSlider.setAttribute('aria-valuenow', lengthSlider.value)
}

/**
 * Maneja el click del botón generar.
 * Valida que haya al menos un tipo de carácter seleccionado,
 * genera la contraseña y actualiza la interfaz.
 */
function handleGenerate() {
    errorMsg.textContent = ''
    const length = Number(lengthSlider.value)
    const pool = buildPool()

    if (!pool) {
        showError('Selecciona por lo menos un elemento a incluir')
        return
    }

    const password = generatePassword(pool, length)
    updateUI(password)
}

/**
 * Maneja el click del botón copiar.
 * Copia la contraseña al portapapeles y muestra confirmación visual por 2 segundos.
 */
function handleCopy() {
    navigator.clipboard.writeText(passwordDisplay.textContent)
    addClasses(copyBtn, 'is-copied')
    copyLabel.textContent = '¡Copiado!'
    copyBtn.setAttribute('aria-label', '¡Contraseña copiada!')

    setTimeout(() => {
        removeClasses(copyBtn, 'is-copied')
        copyLabel.textContent = 'Copiar'
        copyBtn.setAttribute('aria-label', 'Copiar contraseña')
    }, 2000)
}

// === LÓGICA PRINCIPAL ===

/**
 * Construye el pool de caracteres disponibles según los checkboxes activos.
 * @returns {string} String con todos los caracteres disponibles, vacío si ninguno está marcado.
 */
function buildPool() {
    let pool = ''

    if (chkLower.checked)   pool += LOWER
    if (chkUpper.checked)   pool += UPPER
    if (chkNumbers.checked) pool += NUMBERS
    if (chkSymbols.checked) pool += SYMBOLS

    return pool
}

/**
 * Genera una contraseña aleatoria a partir de un pool de caracteres.
 * @param {string} pool - String con todos los caracteres disponibles para construir la contraseña.
 * @param {number} length - Longitud deseada de la contraseña.
 * @returns {string} Contraseña generada aleatoriamente.
 */
function generatePassword(pool, length) {
    let password = ''

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * pool.length)
        let char = pool[randomIndex]
        password += char
    }

    return password
}

/**
 * Calcula el puntaje de fortaleza de la contraseña
 * basándose en la longitud y la variedad de tipos de caracteres activos.
 * @param {number} length - Longitud de la contraseña generada.
 * @returns {number} Puntaje total (máximo 6: 2 por longitud + 4 por variedad).
 */
function calculateStrength(length) {
    let variety = 0
    let score = 0

    if (chkLower.checked)   variety++
    if (chkUpper.checked)   variety++
    if (chkNumbers.checked) variety++
    if (chkSymbols.checked) variety++

    if (length >= 16) score++
    if (length >= 24) score++

    return score + variety
}

// === UI ===

/**
 * Actualiza la interfaz tras generar una contraseña:
 * muestra la contraseña, calcula la fortaleza y habilita el botón copiar.
 * @param {string} password - Contraseña generada para mostrar.
 */
function updateUI(password) {
    removeClasses(passwordDisplay, 'is-placeholder')
    passwordDisplay.textContent = password

    const totalScore = calculateStrength(password.length)
    renderStrength(totalScore)

    copyBtn.disabled = false
}

/**
 * Actualiza la barra y el label del indicador de fortaleza según el puntaje.
 * @param {number} score - Puntaje calculado por calculateStrength.
 */
function renderStrength(score) {
    let strengthLevel = ''

    removeClasses(strengthBar, 'is-weak', 'is-medium', 'is-strong')
    removeClasses(strengthLabel, 'is-weak', 'is-medium', 'is-strong')

    if (score <= 2) {
        strengthLevel = 'Débil'
        addClasses(strengthBar, 'is-weak')
        addClasses(strengthLabel, 'is-weak')
    } else if (score <= 4) {
        strengthLevel = 'Media'
        addClasses(strengthBar, 'is-medium')
        addClasses(strengthLabel, 'is-medium')
    } else {
        strengthLevel = 'Fuerte'
        addClasses(strengthBar, 'is-strong')
        addClasses(strengthLabel, 'is-strong')
    }

    strengthLabel.textContent = strengthLevel
}

/**
 * Muestra un mensaje de error en el elemento de error.
 * @param {string} message - Mensaje a mostrar al usuario.
 */
function showError(message) {
    errorMsg.textContent = message
}

// === UTILIDADES ===

/**
 * Agrega una o más clases CSS a un elemento del DOM.
 * @param {Element} element - Elemento al que se le agregarán las clases.
 * @param {...string} classes - Clases CSS a agregar.
 */
function addClasses(element, ...classes) {
    element.classList.add(...classes)
}

/**
 * Remueve una o más clases CSS de un elemento del DOM.
 * @param {Element} element - Elemento al que se le removerán las clases.
 * @param {...string} classes - Clases CSS a remover.
 */
function removeClasses(element, ...classes) {
    element.classList.remove(...classes)
}