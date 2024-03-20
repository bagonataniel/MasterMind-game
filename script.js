const colors = ['piros', 'kék', 'zöld', 'sárga', 'narancs', 'lila', 'rozsaszín', 'fekete', 'fehér'];
var clickcounter = 0;
var sorcounter = 0;
var ColorsToGuess = [];
var GuessedColors = [];

for (let index = 0; index < 4; index++) {
    ColorsToGuess.push(colors[Math.floor(Math.random() * colors.length)]);
}
console.log(ColorsToGuess);


// Left side of the game, where all the guesses are
document.querySelector(".gamearea").innerHTML += '<div class="left"></div>';
for (let index = 0; index < 10; index++) {
    document.querySelector('.left').innerHTML += '<div class="sorok" id="sor'+ index +'">'
    for (let j = 0; j < 4; j++) {
        document.querySelector('#sor'+index).innerHTML += "<div class='szin'></div>"
    }
}


// Right side of the game, where the players guess is calculated
document.querySelector(".gamearea").innerHTML += "<div class='ColorCheckContainer'>"
divcounter = 0;
for (let index = 1; index < 11; index++) {
    document.querySelector(".ColorCheckContainer").innerHTML += '<div class="checkline" id="checkline'+index+'"></div>'
    for (let j = 1; j < 5; j++) {
        document.querySelector('#checkline'+index).innerHTML += "<div class='checkcolor' id='color"+divcounter+"'></div>"
        divcounter++
    }
}

// The bottom area of the game, with the divs which are to select colors
document.querySelector(".gamearea").innerHTML += "<div class='ChooseColor'>";
for (let index = 0; index < colors.length; index++) {
    currcol = colors[index];
    document.querySelector(".ChooseColor").innerHTML += '<div class="colors" id='+currcol+'></div>';
    document.getElementById(currcol).onclick = function() { alert('blah'); };
}
for (let index = 0; index < colors.length; index++) {
    document.getElementById(colors[index]).onclick = function() { SelectColor(colors[index]); };
}



function SelectColor(szin) {
    kockak = document.getElementsByClassName("szin");
    rightColors = document.getElementsByClassName("checkcolor");
    GuessedColors.push(szin);

    if (GuessedColors.length == 4) {
        foglalt = 0;
        for (let index = 0; index < GuessedColors.length; index++) {
            if (ColorsToGuess.includes(GuessedColors[index])) {
                rightColors[sorcounter*4+foglalt].style.backgroundColor = "red";
                if (GuessedColors[index] == ColorsToGuess[index]) {
                        rightColors[sorcounter*4+foglalt].style.backgroundColor = "black";
                    }
                foglalt++;
            }
            
            if (arrayCompare(ColorsToGuess, GuessedColors)) {
                rightColors[sorcounter*4].style.backgroundColor = "black";
                rightColors[sorcounter*4+1].style.backgroundColor = "black";
                rightColors[sorcounter*4+2].style.backgroundColor = "black";
                rightColors[sorcounter*4+3].style.backgroundColor = "black";
                document.body.innerHTML += '<div id="text-container"><p id="text">You Won!</p></div>';
            }
        }
        foglalt = 0;


        GuessedColors = [];
        sorcounter++
    }
    kockak[clickcounter].id = szin;
    clickcounter++;
}

function arrayCompare(_arr1, _arr2) {
    if (
      !Array.isArray(_arr1)
      || !Array.isArray(_arr2)
      || _arr1.length !== _arr2.length
      ) {
        return false;
      }
    
    // .concat() to not mutate arguments
    const arr1 = _arr1;
    const arr2 = _arr2;
    
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
         }
    }
    
    return true;
}