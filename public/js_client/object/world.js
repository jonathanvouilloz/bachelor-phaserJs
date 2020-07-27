const fontTitle = {
    fontFamily : "Bangers",
    fontSize:"42px",
    color:"#252525"
}

const fontDead = {
    fontFamily : "Calibri",
    fontSize:"23px",
    color:"#252525"
}

let world = {
    tilemap:null,
    tileset:null,
    downLayer:null,
    topLayer:null,
    worldLayer:null,
    overlapLayer:null,
    endPosition:null,
    score:0,
    textScore:null,
    gameOver:false,

    initalizeWorld : function(){
        this.tilemap = gameObject.scene.make.tilemap({key:"map"});
        this.tileset = this.tilemap.addTilesetImage("tilesheet", "tiles");
        //layer world
        this.downLayer = this.tilemap.createStaticLayer("bot", this.tileset,0,0);
        this.worldLayer = this.tilemap.createStaticLayer("world", this.tileset,0,0);
        this.topLayer = this.tilemap.createStaticLayer("top", this.tileset,0,0);
        this.overlapLayer = this.tilemap.createDynamicLayer("overlap", this.tileset,0,0);
        
        this.worldLayer.setCollisionByProperty({collide : true});

        this.endPosition = this.tilemap.findObject("Objects", obj => obj.name === "end");

        gameObject.scene.physics.world.setBounds(0,0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);
        
        this.textScore = gameObject.scene.add.text(16,16,"Score : 0", fontTitle);
        this.textScore.setScrollFactor(0);
    },

    manageCollider : function(){
        this.overlapLayer.setTileIndexCallback(50, this.collectGem, this);
        this.overlapLayer.setTileIndexCallback(52, this.collectGem, this);
        this.overlapLayer.setTileIndexCallback(71, this.killPlayer, this);
        this.overlapLayer.setTileIndexCallback(76, this.endLevel, this);
        this.overlapLayer.setTileIndexCallback(90, this.endLevel, this);
        gameObject.scene.physics.add.collider(gameObject.player.aPlayer, this.worldLayer);
        gameObject.scene.physics.add.overlap(gameObject.player.aPlayer, this.overlapLayer);

        gameObject.scene.physics.add.collider(gameObject.zombie.aZombie, this.worldLayer);
        gameObject.scene.physics.add.overlap(gameObject.player.aPlayer, gameObject.zombie.aZombie, this.attackZombie);


    },

    manageCamera : function(){
        gameObject.scene.cameras.main.startFollow(gameObject.player.aPlayer);
        gameObject.scene.cameras.main.setBounds(0,0,this.tilemap.widthInPixels-50, this.tilemap.heightInPixels-50);
    },

    collectGem : function(player, tile){
        gameObject.scene.sound.play("gemSound");
        this.addScore(tile.properties.item);
        this.textScore.setText("Score : " +this.score);
        this.overlapLayer.removeTileAt(tile.x, tile.y).destroy();
    },

    addScore : function(item){
        switch(item){
            case 'blueGem':
                this.score+=5;
                break;
            case 'greenGem':
                this.score+=10;
                break;        
        }
    },

    killPlayer : function(winOrLose){
        gameObject.player.killPlayer(winOrLose);    
        if(!this.gameOver){
            this.gameOver = true; 
            gameObject.scene.add.sprite(gameObject.scene.cameras.main.midPoint.x, gameObject.scene.cameras.main.midPoint.y, "panel").setScale(4,2);    
            const restartButton = gameObject.scene.add.sprite(gameObject.scene.cameras.main.midPoint.x, gameObject.scene.cameras.main.midPoint.y+65, "validation").setInteractive();
           
            gameObject.scene.add.text(gameObject.scene.cameras.main.midPoint.x-145,gameObject.scene.cameras.main.midPoint.y-50,"Tu est mort ! Ton score est de: "+ this.score, fontDead);
            gameObject.scene.add.text(gameObject.scene.cameras.main.midPoint.x-115,gameObject.scene.cameras.main.midPoint.y-20,"Essaie de recommencer !", fontDead);

            restartButton.on("pointerup", function(){
                gameObject.scene.scene.restart();
                gameObject.player.isAlive = true;
            })
        }      
    },

    attackZombie : function(){
        if(gameObject.player.isJumping){
            gameObject.zombie.destroyZombie();
            gameObject.player.aPlayer.setVelocityY(-250);
        }else{
            gameObject.world.killPlayer("lose");
        }
    },


    endLevel : function(player){
        console.log(player.x, " s ", this.endPosition.x);
        
        if(player.x > this.endPosition.x + 5){
            if(!this.gameOver){
                gameObject.world.killPlayer("win");
                this.gameOver = true; 
                gameObject.scene.add.sprite(gameObject.scene.cameras.main.midPoint.x, gameObject.scene.cameras.main.midPoint.y, "panel").setScale(4,2);    
                const restartButton = gameObject.scene.add.sprite(gameObject.scene.cameras.main.midPoint.x, gameObject.scene.cameras.main.midPoint.y+65, "validation").setInteractive();
               
                gameObject.scene.add.text(gameObject.scene.cameras.main.midPoint.x-145,gameObject.scene.cameras.main.midPoint.y-50,"Tu as gagné ! Ton score est de: "+ this.score, fontDead);
                gameObject.scene.add.text(gameObject.scene.cameras.main.midPoint.x-115,gameObject.scene.cameras.main.midPoint.y-20,"Souhaites-tu recommencer ?", fontDead);
    
                restartButton.on("pointerup", function(){
                    gameObject.scene.scene.restart();
                    gameObject.player.isAlive = true;
                })
            }  
        }    
    }
}