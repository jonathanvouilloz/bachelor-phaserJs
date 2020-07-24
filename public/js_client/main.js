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
    gameObject.scene.load.tilemapTiledJSON("map", './assets/json/mapJeu.json');
    //load joueur
    gameObject.scene.load.atlas("player", './assets/images/player/player.png', './assets/json/playerAtlas.json');
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
    adjustSizeScreen();
}


function adjustSizeScreen(){
    const canvas = document.querySelector("canvas");

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowRatio = windowWidth / windowHeight;

    const gameRatio = config.width/config.height;

    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}