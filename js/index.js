let temps = 0
let debut = 0
let tempsActuel = 0
let diffTemps = 0
let tabTemps = []
let nbTemps = 0
let tabScore = []
let tempsJeu
let meilleurTemps
let cpt = 0
let pairesTrouvees = 0
let nbPartie = 0
let premierChoix, deuxiemeChoix
let dos1, dos2

const tabNumeroImage = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

const outputButton = document.getElementById('bt-demarrer')

function demarrerQuitter () {
    if (outputButton.textContent === 'Nouvelle Partie') {
        document.getElementById('paire').setAttribute('value', 0)
        if (nbPartie > 1) {
            for (let i = 1; i < 17; i++) {
                document.getElementById('carre').removeChild(document.getElementById('case' + i))
            }
            selectionAleatoireImage()
        }
        demarrerChronometre()
        nbPartie += 1
        outputButton.innerHTML = 'Arreter'
    } else {
        outputButton.innerHTML = 'Nouvelle Partie'
        alert('Dommage la prochaine fois')
        initChronometre()
        // location.reload()
    }
}

function selectionAleatoireImage () {
    for (let i = 1; i < 16; i++) {
        const hasard = Math.floor(Math.random() * (i + 1))
        const sauve = tabNumeroImage[i]
        tabNumeroImage[i] = tabNumeroImage[hasard]
        tabNumeroImage[hasard] = sauve
    }

    for (let j = 0; j < tabNumeroImage.length; j++) {
        const divImage = document.createElement('div')
        divImage.setAttribute('id', 'case' + (j + 1))
        const image = document.createElement('img')
        const fond = document.createElement('img')
        image.setAttribute('src', 'image/' + tabNumeroImage[j] + '.jpg')
        switch (tabNumeroImage[j]) {
        case 1 :
            image.classList.add('class-1')
            break
        case 2 :
            image.classList.add('class-1')
            break
        case 3 :
            image.classList.add('class-2')
            break
        case 4 :
            image.classList.add('class-2')
            break
        case 5 :
            image.classList.add('class-3')
            break
        case 6 :
            image.classList.add('class-3')
            break
        case 7 :
            image.classList.add('class-4')
            break
        case 8 :
            image.classList.add('class-4')
            break
        case 9 :
            image.classList.add('class-5')
            break
        case 10 :
            image.classList.add('class-5')
            break
        case 11 :
            image.classList.add('class-6')
            break
        case 12:
            image.classList.add('class-6')
            break
        case 13 :
            image.classList.add('class-7')
            break
        case 14 :
            image.classList.add('class-7')
            break
        case 15 :
            image.classList.add('class-8')
            break
        case 16 :
            image.classList.add('class-8')
            break
        }
        image.style.display = 'none'
        fond.setAttribute('src', 'image/gris.jpg')
        fond.addEventListener('click', clicImage)
        divImage.appendChild(fond)
        divImage.appendChild(image)

        document.getElementById('carre').appendChild(divImage)
    }
}

function clicImage () {
    if (outputButton.textContent === 'Arreter') {
        event.target.style.display = 'none'
        event.target.nextSibling.style.display = 'block'
        cpt++
        if (cpt > 1) {
            deuxiemeChoix = event.target.nextSibling
            dos2 = event.target
            comparerImage()
            cpt = 0
        } else {
            premierChoix = event.target.nextSibling
            dos1 = event.target
        }
    }
}

function comparerImage () {
    if (premierChoix.classList.value === deuxiemeChoix.classList.value) {
        pairesTrouvees += 1
        document.getElementById('paire').setAttribute('value', pairesTrouvees)
        premierChoix = null
        deuxiemeChoix = null
    } else {
        premierChoix.style.display = 'none'
        dos1.style.display = 'block'
        deuxiemeChoix.style.display = 'none'
        dos2.style.display = 'block'
        premierChoix = null
        deuxiemeChoix = null
    }
    if (pairesTrouvees === 8) {
        // alert('FELICITATIONS VOUS AVEZ GAGNER')
        tempsJeu = document.querySelector('#minuteur input').value
        initChronometre()
        alert('FELICITATIONS VOUS AVEZ GAGNER')
        premierChoix = null
        deuxiemeChoix = null
        dos1 = null
        dos2 = null
        cpt = 0
        pairesTrouvees = 0
        tempsJeu = document.getElementById('montre').value
        nbPartie += 1
        if (nbPartie > 0) {
            meilleurTemps = document.getElementById('montre').value
        }
        arreterChronometre()

        outputButton.innerHTML = 'Nouvelle Partie'
        tabScore += tempsJeu
        console.log(tabScore)
    }
}

function trouverMeilleurTemps () {
    for (let i = 0; i < tabScore.length; i++) {
        if (tabScore[i].split(':')[0] < tabScore[0].split(':')[0]) {
            meilleurTemps = tabScore[i]
        } else if (tabScore[i].split(':')[0] === tabScore[0].split(':')[0]) {
            if (tabScore[i].split(':')[1] < tabScore[0].split(':')[1]) {
                meilleurTemps = tabScore[i]
            } else if (tabScore[i].split(':')[1] === tabScore[0].split(':')[1]) {
                if (tabScore[i].split(':')[2] < tabScore[0].split(':')[2]) {
                    meilleurTemps = tabScore[i]
                } else if (tabScore[i].split(':')[2] === tabScore[0].split(':')[2]) {
                    meilleurTemps = tabScore[i]
                }
            }
        }
    }
    return meilleurTemps
}
console.log(trouverMeilleurTemps())

function chronometre () {
    let diff
    tempsActuel = new Date()
    diff = tempsActuel - debut
    diffTemps = new Date(diff)
    afficherTemps(diffTemps)
}

function demarrerChronometre () {
    let pause
    arreterChronometre()
    if (diffTemps === 0) {
        debut = new Date()
    } else {
        tempsActuel = new Date()
        pause = tempsActuel - diffTemps
        debut = new Date(pause)
    }
    temps = setInterval(chronometre, 10)
}

function arreterChronometre () {
    clearInterval(temps)
    tabTemps[nbTemps] = diffTemps
}

function initChronometre () {
    arreterChronometre()
    debut = 0
    diffTemps = 0
    tabTemps = []
    nbTemps = 0
    document.getElementById('montre').value = '00:00:00'
}
/*
function afficherMeilleurTemps(){
    document.getElementById('meilleur-temps') = trouverMeilleurTemps()
} */

selectionAleatoireImage()

outputButton.addEventListener('click', demarrerQuitter)
