

//createactive characters from list:

var game = {
        //available options
        namesAvailable: ['Luke', 'Leia', 'Chewie', 'Han', 'Lando', 'Obi', 'Palpy', 'r2d2', 'c3p0', 'Vader', 'Yoda'],
        characterImages: ['assets/images/luke.png','assets/images/leia.png', 'assets/images/chewie.png', 'assets/images/han.png', 'assets/images/lando.png', 'assets/images/obi.png', 'assets/images/palpatine.png', 'assets/images/r2.png', 'assets/images/c3p0.png', 'assets/images/vader.png', 'assets/images/yoda.png'],
        healthPoints: [],
        hitPoints: [],
        characterNamesActive: [],
        charactersActive: [],


        //create a different hit and health value for each character
        createHit: function () {
            for (var i = 0; i <= 4;){
                var random = Math.floor(Math.random() *  15 + 5);
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
        },
        //create 4 characters
        createCharacters: function(){
            for (var i = 0; i< 4; ) {
                var random = Math.floor(Math.random() * 11);
                var newCharacter = this.namesAvailable[random];
                if (this.characterNamesActive.indexOf(newCharacter) < 0) {
                   this.characterNamesActive.push(newCharacter);
                    this.charactersActive.push({
                        name: newCharacter,
                        image: this.characterImages[random],
                        hit: this.hitPoints[i],
                        health: this.healthPoints[i],
                        isAttacker: false,
                        hitIncrease: this.hitPoints[i],
                        imageDiv: "#char"+i+"-img",
                        titleDiv: "#char"+i+"-title",
                        healthDiv  : "#char"+i+"-health",
                        hitDiv: "#char"+i+"-power",
                        charDiv: "#char"+i
                    });

                    //send character info to dom
                    $(this.charactersActive[i].imageDiv).attr('src', this.charactersActive[i].image);
                    $(this.charactersActive[i].imageDiv).attr('alt', this.charactersActive[i].name);
                    $(this.charactersActive[i].imageDiv).attr('alt', this.charactersActive[i].name);
                    $(this.charactersActive[i].titleDiv).text(this.charactersActive[i].name);
                    $(this.charactersActive[i].healthDiv).text(this.charactersActive[i].health);
                    $(this.charactersActive[i].hitDiv).text(this.charactersActive[i].hit);
                    $(this.charactersActive[i].charDiv).data(this.charactersActive[i]);
                    i++;
                }

            }
            console.log(this.charactersActive)

        },

    //gameplay
        startGame: function(){
            //setup
            this.createHit();
            this.createHealth();
            this.createCharacters();

            var setAttacker = false;
            var setDefender = false;
            var attacker = "";
            var defender = "";
            var defendersRemaining = 3;

            $("#spacer-1").hide();
            $(".enemies").hide();
            $(".btn").hide();
            $("#vs").hide();
            $("#main-text").text('Choose Your Character');
            $("#defender-zone-text").hide();

            //choose attacker and defender
            $(".character-card").click(function(){
                if (!setAttacker) {

                    setAttacker = true;
                    attacker = $(this).data();
                    $(".character-card").addClass('defender');
                    $(this).removeClass('defender');
                    $(this).addClass('attacker');
                    $("#spacer-1").show();
                    $(".spacer-2").hide();
                    $(".defender").appendTo("#defenders");
                    $(".enemies").show();
                    $("#defender-zone-text").show();
                    $("#main-text").text('Choose A Defender');
                }
                else if (!setDefender && defendersRemaining > 1){
                    setDefender = true;
                    defender = $(this).data();
                    defendersRemaining--;
                    $("#vs").appendTo("#battlefield");
                    $("#vs").show();
                    $(this).appendTo("#battlefield");
                    $("#main-text").text('Battlefield');
                    $("#defender-zone-text").text('Defenders Waiting');

                }
                else{
                    setDefender = true;
                    defender = $(this).data();
                    defendersRemaining--;
                    $("#vs").appendTo("#battlefield");
                    $("#vs").show();
                    $(this).appendTo("#battlefield");
                    $("#main-text").text('Battlefield');
                    $("#defender-zone-text").hide();
                    $(".enemies").hide();
                }
            });
            //battle
            $("#vs").click(function() {
                //verify that a defender is present
                if (setDefender) {
                    //update stats
                    var originalAttack = attacker.hit;
                    attacker.health = attacker.health - defender.hit;
                    defender.health = defender.health - attacker.hit;
                    attacker.hit = attacker.hit + attacker.hitIncrease;
                    //update dom
                    $(attacker.healthDiv).text(attacker.health);
                    $(defender.healthDiv).text(defender.health);
                    $(attacker.hitDiv).text(attacker.hit);
                    //attacker still alive
                    if (attacker.health > 0) {
                        //both chars alive
                        if (defender.health > 0) {
                            $("#attacker-text").text('You attacked ' + defender.name + ' and did ' + originalAttack + ' damage.');
                            $("#defender-text").text(defender.name + ' attacked back and did ' + defender.hit + ' damage.');
                    }
                        //defender defeated and defenders left
                        else if (defender.health <= 0  && defendersRemaining > 0) {
                            $("#attacker-text").text('You attacked ' + defender.name + ' and did ' + originalAttack + ' damage. ');
                            $("#defender-text").text(defender.name + ' attacked back and did ' + defender.hit + ' damage. ' + defender.name + ' has been defeated.');
                            $(defender.charDiv).remove();
                            $("#main-text").text('Choose A Defender');
                            setDefender = false;
                        }
                        //win
                        else {
                            $("#attacker-text").text('You attacked ' + defender.name + ' and did ' + originalAttack + ' damage. ');
                            $("#defender-text").text(defender.name + ' attacked back and did ' + defender.hit + ' damage. ' + defender.name + ' has been defeated.');
                            $("#main-text").text('All Defenders have been defeated. You won!!');
                            setDefender = false;
                            $("#battlefield").append($("#win-button"));
                            $("#win").show()
                        }
                    }
                    //loss
                    else {
                        $("#attacker-text").text('You attacked ' + defender.name + ' and did ' + originalAttack + ' damage. ');
                        $("#defender-text").text(defender.name + ' attacked back and did ' + defender.hit + ' damage. You have been defeated.');
                        $("#main-text").text('You have been defeated');
                        $("#battlefield").append($("#lose-button"));
                        $("#lose").show()
                    }
                }
            });
        }


    };

$(document).ready(function() {



    game.startGame();

    $(".reset").click(function(){
        location.reload();
    })

});


