const info = document.querySelector('.info');
const cellules = document.querySelectorAll('.cell');

let verouillage = true;
let joueurEnCours = "X";

info.innerHTML = `Au tour de ${joueurEnCours}`;

const alignementsGagnants = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let partiEnCours = ["", "", "", "", "", "", "", "", ""];

cellules.forEach(cell => {
    cell.addEventListener('click', clicSurCase);
})

function clicSurCase(e){
    const caseClique = e.target;
    const caseIndex = caseClique.getAttribute('data-index');

    if(partiEnCours[caseIndex] !== "" || !verouillage){
        return
    }

    partiEnCours[caseIndex] = joueurEnCours;
    caseClique.innerHTML = joueurEnCours;
    console.log(partiEnCours);

    validationResultat();
}

function validationResultat(){
    let finDepartie = false;

    for (let i = 0; i < alignementsGagnants.length; i++){
        const checkWin = alignementsGagnants[i];
        // [O, 1, 2]
        let a = partiEnCours[checkWin[0]]; //checkWin de 0 ici c'est 0, dans le tableau parti en cour c'est X ou O et on le stocke dans a
        let b = partiEnCours[checkWin[1]];
        let c = partiEnCours[checkWin[2]];
        if(a === '' || b ==='' || c ===''){
            continue; // continue dans la fonction
        }
        if(a === b && b === c){
            finDepartie = true;
            break; //sortir de la condition
        }
    }

    if (finDepartie){
        info.innerText = `Le joueur ${joueurEnCours} a gagné! 🥳✊`;
        document.body.style.background = 'rgb(248, 133, 1)';
        verouillage = false;
        return; // sort de la fonction
    }

    // si il n' y a pas de chaine de caractere vides dans la parti en cour
    let matchNul = !partiEnCours.includes('');
    if(matchNul){   //la condition est vrai
        info.innerText = 'Match nul !😕'
        document.body.style.background = 'rgb(85, 84, 84)';
        verouillage = false;
        return;
    }

    changementDeJoueur();
}


function changementDeJoueur(){
    //est que le joueur est un X , si X ça devient 0 sinon X
    joueurEnCours = joueurEnCours === "X" ? "O" : "X";
    info.innerText = `Au tour de ${joueurEnCours}`;
}