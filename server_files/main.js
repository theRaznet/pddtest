
var game = new Phaser.Game(1344, 768, Phaser.AUTO, '', {preload: preload, create: create, update: update });

function preload(){
    game.load.image('background', 'assets/Room-1.png');
    game.load.image('ground', 'assets/platform.jpg');
    game.load.image('star', 'assets/star.png');
    game.load.image('ember', 'assets/ember.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48, 9);

    game.load.image('door1', 'assets/door-frontx400.png');
    game.load.json('room1','Rooms/room1.json');
}
var player;

var border;
var platform;

var stars;

var score = 0;
var scoreText;

var time = 1;
var deltaT = 500; //ms

var cursors;
var scaleFactor = 1;

function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
    var room = new Room(game, 'room1');
    //game.add.sprite(0, 0, 'background').scale.setTo(scaleFactor, scaleFactor);
    //game.add.sprite('ember').scale.setTo(scaleFactor, scaleFactor);

    border = game.add.group();
    border.enableBody = true;

    var bottom = border.create(0, game.world.height - 128, null);
    bottom.scale.setTo(39, 1);
    bottom.body.immovable = true;

    var top = border.create(0, 128 + 32, null);
    top.scale.setTo(38, 1);
    top.body.immovable = true;

    var left = border.create(154, 0, null);
    left.scale.setTo(1, 20);
    left.body.immovable = true;

    var right = border.create(game.world.width - 184, 0, null);
    right.scale.setTo(1, 20);
    right.body.immovable = true;


    platforms = game.add.group();
    platforms.enableBody = true;

    /**
    var ledge = platforms.create(275, 200, 'ember');
    ledge.scale.setTo(.75, .75);
    ledge.body.immovable = true;

    var ledge = platforms.create(275, 400, 'ember');
    ledge.scale.setTo(.75, .75);
    ledge.body.immovable = true;

    var ledge = platforms.create(850, 200, 'ember');
    ledge.scale.setTo(.75, .75);
    ledge.body.immovable = true;

    var ledge = platforms.create(850, 400, 'ember');
    ledge.scale.setTo(.75, .75);
    ledge.body.immovable = true;
    //*/

    player = new Player(game, 256, 250);
    game.add.existing(player);
    /**
    stars = game.add.group();
    stars.enableBody = true;

    for (var i = 0; i < 30; i++){
        for (var j = 0; j < 8; j++){
            if (getRandomInt(0, 2) == 1){
                var star = stars.create(i * 32 + 128 + 4, j * 48 + 128 + 8, 'star');
            }
        }
    }
    //*/

    scoreText = game.add.text(16, 8, '', {fontsize: '32px', fill: '#FFF'});

    cursors = game.input.keyboard.createCursorKeys();
    //setTimeout(framerate, deltaT);
}

function update(){
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    //game.physics.arcade.overlap(ledge, stars, collectStar, null, this);
    game.physics.arcade.collide(player, border, collisionHandler, null, this);

    if (cursors.up.isDown) {
        player.move('up');
    } else if (cursors.down.isDown) {
        player.move('down');
    } else {
        player.move('y');
    }
    if (cursors.right.isDown) {
        player.move('right');
    } else if (cursors.left.isDown) {
        player.move('left');
    } else {
        player.move('x');
    }
}

function collectStar (player, star) {
    star.kill();

    score += 10;
    scoreText.text = 'Score: ' + score;
}

function collisionHandler (obj1, obj2){
    if (obj1 instanceof Player){
        obj1.collision(obj2);
    }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function framerate(){
    scoreText.text = String((score*1000)/(time*deltaT));
    time++;
    setTimeout(framerate, deltaT);
}