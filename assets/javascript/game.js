

//createactive characters from list:

var characterCreation = {
        //available options
        namesAvailable: ['Luke', 'Leia', 'Chewie', 'Han', 'Lando', 'Obi', 'Palpy', 'r2d2', 'c3p0', 'Vader', 'Yoda'],
        characterImages: ['assets/images/luke.png','assets/images/leia.png', 'assets/images/chewie.png', 'assets/images/han.png', 'assets/images/lando.png', 'assets/images/obi.png', 'assets/images/palpatine.png', 'assets/images/r2.png', 'assets/images/c3p0.png', 'assets/images/vader.png', 'assets/images/yoda.png'],
        healthPoints: [],
        hitPoints: [],
        charactersActive: [],


        //create a different hit and health value for each character
        createHit: function () {
            for (var i = 0; i <= 4;){
                var random = Math.floor(Math.random() * 5 + 5);
                if (this.hitPoints.indexOf(random) < 0){
                    this.hitPoints.push(random);
                    i++;
                }
            }
        },
        createHealth: function () {
            for (var i = 0; i < 4;) {
                var random = Math.floor(Math.random() * 50 + 100);
                if (this.healthPoints.indexOf(random) < 0 && random % 5 === 0) {
                    this.healthPoints.push(random);
                    i++;
                }
            }
        }

    };

    characterCreation.createHealth();
    characterCreation.createHit();

//create a character
function createCharacter (number) {
    var good = false;
    while (!good) {
        var random = Math.floor(Math.random() * 11);
        var newCharacter = characterCreation.namesAvailable[random];

        if (characterCreation.charactersActive.indexOf(newCharacter) < 0) {
            good = true;

            var charImage = characterCreation.characterImages[random];
            var charHit = characterCreation.hitPoints[number];
            var charHealth = characterCreation.healthPoints[number];
            characterCreation.charactersActive.push(newCharacter);
            return {
                name: newCharacter,
                image: charImage,
                hit: charHit,
                health: charHealth,
                isAttacker: false,
                hitIncrease: charHit
            };

        }
    }
}


function game() {
    //set up characters
    var char1 = createCharacter(0);
    var char2 = createCharacter(1);
    var char3 = createCharacter(2);
    var char4 = createCharacter(3);
    //write to dom
        '<img class="card-img-top" src=' + char1.image + '>' +
        '<div class ="card-block">' +
        '<h4 class="card-title">' + char1.name + '</h4>' +
        '<h6 class="card-title">Health: <span id="char1-health"> ' + char1.health + '</span> <br>Power: <span id="char1-power">' + char1.hit + '</span></p>' +
        '</div>';
    $(".char1").html(char1Html);

    var char2Html = '<img class="card-img-top" src=' + char2.image + '>' +
        '<div class ="card-block">' +
        '<h4 class="card-title">' + char2.name + '</h4>' +
        '<h6 class="card-title">Health: <span id="char2-health"> ' + char2.health + '</span><br>' +
        'Power: <span id="char2-power">' + char2.hit + '</span></p>' +
        '</div>';
    $(".char2").html(char2Html);

    var char3Html = '<img class="card-img-top" src=' + char3.image + '>' +
        '<div class ="card-block">' +
        '<h4 class="card-title">' + char3.name + '</h4>' +
        '<h6 class="card-title">Health: <span id="char3-health"> ' + char3.health + '</span><br>' +
        'Power: <span id="char3-power">' + char3.hit + '</span></p>' +
        '</div>';
    $(".char3").html(char3Html);

    var char4Html = '<img class="card-img-top" src=' + char4.image + '>' +
        '<div class ="card-block">' +
        '<h4 class="card-title">' + char4.name + '</h4>' +
        '<h6 class="card-title">Health: <span id="char4-health"> ' + char4.health + '</span><br>' +
        'Power: <span id="char4-power">' + char4.hit + '</span></p>' +
        '</div>';
    $(".char4").html(char4Html);


    $("#enemies").hide();
    $(".btn").hide();
    $("#main-text").text('Choose Your Character');
    $(".card").addClass('defender');

    var setAttacker = false;
    var setDefender = false;
    var attackerHit = 0;
    var attackerhitInterval = 0;
    var AttackerHealth = 0;
    var defecerAttack = 0;
    var defenderHealth = 0;


    $(".card").click(function(){
        console.log(42);

        if (!setAttacker && !setDefender){

            $(this).removeClass('defender');
            $(this).addClass('attacker');

            setAttacker = true;
            attackerID = $(this

            $(".attacker").hide();
            $("#main-text").text('Choose A Defender');

        else




        }
    });


}



$(document).ready(function() {

  game()

});


