let gameObject = {
    scene: null,
    world: world,
    player: player,
    cursor:null,
}

//function de base phaser
function preload(){
    gameObject.scene = this;
    //load map
    gameObject.scene.load.image("tiles", './assets/images/world/platformPack_tilesheet.png');
    gameObject.scene.load.tilemapTiledJSON("map", './assets/json/mapJeu2.json');
    //load joueur
    gameObject.scene.load.atlas("player", './assets/images/player/player.png', './assets/json/playerAtlas.json');
    gameObject.scene.load.audio("gemSound",'./assets/sounds/gemSound.ogg');

    gameObject.scene.load.image("panel", './assets/images/world/yellow_panel.png');
    gameObject.scene.load.image("validation", './assets/images/world/yellow_boxCheckmark.png');
    gameObject.world.gameOver = false;

}

//function de base phaser
function create(){
    gameObject.player.initializePlayer();
    gameObject.player.generatePlayerAnimations();
    gameObject.world.initalizeWorld();
    gameObject.world.manageCollider();
    gameObject.cursor = gameObject.scene.input.keyboard.createCursorKeys();
    gameObject.world.manageCamera();
}

//function de base phaser
function update(time, delta){
    gameObject.player.managerMoving();
}