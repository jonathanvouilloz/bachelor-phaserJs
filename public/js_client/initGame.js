//config de base du jeu
const config = {
    type : Phaser.AUTO,
    width: 800,
    backgroundColor:"#E2D7FF",
    height:600,
    scene : {
        preload : preload,
        create: create,
        update: update
    },
    physics:{
        default: 'arcade',
        arcade :{
            gravity:{y:800}
        }
    },
    scale: {
        parent: 'yourgamediv',
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 600
    }
}

//instanciation
const game = new Phaser.Game(config);