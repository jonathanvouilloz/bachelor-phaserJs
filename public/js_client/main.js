//config de base du jeu
const config = {
    type : Phaser.AUTO,
    width: 800,
    backgroundColor:"#AAAAFF",
    height:600,
    scene : {
        preload : preload,
        create: create,
        update: update
    },
    physics:{
        default: 'arcade',
        arcade :{
            gravity:{y:500}
        }
    }
}

//instanciation
const game = new Phaser.Game(config);
let controls;

//function de base phaser
function preload(){
    //load map
    this.load.image("tiles", './assets/images/world/platformPack_tilesheet.png');
    this.load.tilemapTiledJSON("map", './assets/json/mapJeu.json');
    //load joueur
    this.load.atlas("player", './assets/images/player/player.png', './assets/json/playerAtlas.json');
}

//function de base phaser
function create(){
    this.tilemap = this.make.tilemap({key:"map"});
    this.tileset = this.tilemap.addTilesetImage("tilesheet", "tiles");

    this.anims.create ({
        key : "playerWalk",
        frames : this.anims.generateFrameNames("player",{prefix:"adventurer_walk",start:1,end:2}),
        frameRate : 5,
        repeat : -1
    });

    let player = this.add.sprite(200,200, "player", "adventurer_stand");
    player.anims.play("playerWalk");
    //player.setTexture("player","player_walk2");

    //layer world
    this.downLayer = this.tilemap.createStaticLayer("bot", this.tileset,0,0);
    this.worldLayer = this.tilemap.createStaticLayer("world", this.tileset,0,0);
    this.topLayer = this.tilemap.createStaticLayer("top", this.tileset,0,0);


    let cursors = this.input.keyboard.createCursorKeys();
    const controlConfig = {
        camera : this.cameras.main,
        left: cursors.left,
        right:cursors.right,
        up:cursors.up,
        down:cursors.down,
        speed:0.5
    }
    controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

}

//function de base phaser
function update(time, delta){
    controls.update(delta);
}

