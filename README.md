# 🔐 Generador de Contraseñas

Aplicación web para generar contraseñas seguras y personalizadas al instante.
Construida con HTML, CSS y JavaScript vanilla — sin frameworks, sin dependencias.

## ✨ Funcionalidades

- Control de longitud con slider (8–32 caracteres)
- Selección de tipos de caracteres: minúsculas, mayúsculas, números y símbolos
- Indicador visual de fortaleza de la contraseña (débil / media / fuerte)
- Copia al portapapeles con confirmación visual
- Validación: avisa si no se seleccionó ningún tipo de carácter
- Diseño responsivo con estética claymorphism

## 🛠️ Tecnologías

- HTML5 semántico
- CSS3 (custom properties, grid, animaciones)
- JavaScript vanilla (ES6+)



## 🚀 Cómo usarlo localmente

```bash
git clone https://github.com/Aemete8/password-generator.git
cd password-generator
# Abre index.html en tu navegador
```



## 🌐 Demo en vivo

[Ver en GitHub Pages](https://Aemete8.github.io/password-generator)

## 📁 Estructura del proyecto

password-generator/
├── index.html
├── styles.css
├── app.js
├── .gitignore
└── README.md

## 📄 Licencia

MIT — libre para usar y modificar.

# 🔐 Guía paso a paso — Generador de Contraseñas



## Lo que ya tienes listo

- [x] Referencias al DOM
- [x] Slider actualiza el número en tiempo real
- [x] Constantes de caracteres (LOWER, UPPER, NUMBERS, SYMBOLS)
- [x] buildPool() — arma el string de caracteres disponibles

---



## Paso 1 — Corregir buildPool()

Asegúrate de que los 4 `if` revisen el `.checked` del **checkbox**,
no del string de caracteres.

```
if (chkLower.checked)   pool += LOWER
if (chkUpper.checked)   pool += UPPER
if (chkNumbers.checked) pool += NUMBERS
if (chkSymbols.checked) pool += SYMBOLS
```

Prueba en consola: marca y desmarca checkboxes,
llama buildPool() y verifica que el string cambia.

---



## Paso 2 — Generar la contraseña

Crea una función que reciba el pool y la longitud,
y devuelva un string aleatorio de esa longitud.

```
Inicio
  └── resultado = string vacío
  └── repetir N veces (N = longitud)
        └── elegir un índice aleatorio dentro del pool
        └── tomar el carácter en ese índice
        └── agregarlo al resultado
  └── retornar resultado
```

Pistas:

- Índice aleatorio → Math.floor(Math.random() * pool.length)
- Tomar carácter   → pool[indice]
- Agregar al string → resultado += caracter

---



## Paso 3 — Conectar el botón Generar

Agrega un addEventListener de tipo "click" al botón Generar.
Adentro, en orden:

```
Evento "click" en #generateBtn
  └── Limpiar el mensaje de error (errorMsg.textContent = '')
  └── Llamar buildPool() y guardar el resultado en una variable
  └── ¿El pool está vacío?
        └── Sí → escribir un mensaje en #errorMsg y detener todo (return)
        └── No → continuar
  └── Leer el valor actual del slider (la longitud)
  └── Llamar generatePassword(pool, longitud)
  └── Mostrar la contraseña en #passwordDisplay
  └── Quitarle la clase "is-placeholder" a #passwordDisplay
```

Prueba: al hacer clic debe aparecer la contraseña en pantalla.

---



## Paso 4 — Indicador de fortaleza

Crea una función que calcule qué tan fuerte es la contraseña
y actualice la barra y el label.

```
Inicio
  └── Contar cuántos checkboxes están marcados (0 a 4)
  └── Calcular un puntaje combinando:
        ├── Longitud (si es >= 16 suma puntos, si es >= 24 suma más)
        └── Variedad (cada tipo de carácter activo suma 1 punto)
  └── Según el puntaje total:
        ├── Puntaje bajo  → nivel "Débil"
        ├── Puntaje medio → nivel "Media"
        └── Puntaje alto  → nivel "Fuerte"
  └── Limpiar clases anteriores de #strengthBar y #strengthLabel
        └── classList.remove('is-weak', 'is-medium', 'is-strong')
  └── Agregar la clase del nivel actual a ambos elementos
        └── classList.add('is-weak') — o is-medium, o is-strong
  └── Actualizar el texto de #strengthLabel
        └── "Débil", "Media" o "Fuerte"
```

Llama esta función justo después de mostrar la contraseña en el Paso 3.

---



## Paso 5 — Botón Copiar

Agrega un addEventListener de tipo "click" al botón Copiar.
Adentro, en orden:

```
Evento "click" en #copyBtn
  └── Copiar el texto de #passwordDisplay al portapapeles
        └── navigator.clipboard.writeText(passwordDisplay.textContent)
  └── Cambiar el texto de #copyLabel a "¡Copiado!"
  └── Agregar clase "is-copied" a #copyBtn
  └── Esperar 2 segundos
        └── setTimeout(() => { ... }, 2000)
  └── Dentro del setTimeout:
        └── Volver el texto de #copyLabel a "Copiar"
        └── Quitar clase "is-copied" de #copyBtn
```

---



## Paso 6 — Subir a GitHub Pages

```
1. Crear repositorio en github.com (público, sin inicializar)
2. En tu terminal, dentro de la carpeta del proyecto:
      git add .
      git commit -m "first commit"
      git branch -M main
      git remote add origin https://github.com/tu-usuario/password-generator.git
      git push -u origin main
3. En GitHub → Settings → Pages
      → Source: Deploy from a branch
      → Branch: main / (root)
      → Save
4. Esperar ~2 minutos
5. Tu app estará en: https://tu-usuario.github.io/password-generator
```

---



## Referencia rápida


| Necesitas                          | Cómo                                   |
| ---------------------------------- | -------------------------------------- |
| Número aleatorio entre 0 y N       | `Math.floor(Math.random() * N)`        |
| Carácter de un string por posición | `string[indice]`                       |
| Cambiar texto visible              | `elemento.textContent = '...'`         |
| Agregar clase CSS                  | `elemento.classList.add('clase')`      |
| Quitar clase CSS                   | `elemento.classList.remove('clase')`   |
| Copiar al portapapeles             | `navigator.clipboard.writeText(texto)` |
| Ejecutar algo tras N ms            | `setTimeout(() => { }, 2000)`          |
| Detener una función                | `return`                               |


