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
            gravity:{y:800}
        }
    }
}

//instanciation
const game = new Phaser.Game(config);