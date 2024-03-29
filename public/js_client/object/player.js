let player = {
    aPlayer: null,
    isJumping: false,
    isAlive: true,

    initializePlayer: function () {
        this.aPlayer = gameObject.scene.physics.add.sprite(100, 250, "player", "adventurer_stand");
        this.aPlayer.setCollideWorldBounds(true);
        this.aPlayer.setOrigin(0.5, 1);
    },
    generatePlayerAnimations: function () {
        gameObject.scene.anims.create({
            key: "playerWalk",
            frames: game.anims.generateFrameNames("player", { prefix: "adventurer_walk", start: 1, end: 2 }),
            frameRate: 5,
            repeat: -1
        });
        gameObject.scene.anims.create({
            key: "playerIdle",
            frames: [{ key: "player", frame: "adventurer_stand" }, { key: "player", frame: "adventurer_idle" }],
            frameRate: 3,
            repeat: -1
        });
        gameObject.scene.anims.create({
            key: "playerWin",
            frames: [{ key: "player", frame: "adventurer_cheer" }, { key: "player", frame: "adventurer_cheer2" }],
            frameRate: 3,
            repeat: -1
        });
    },



    managerMoving: function () {

        if (this.isAlive) {
            //action de mouvement

            //gauche droite
            if (gameObject.cursor.left.isDown) {
                this.aPlayer.setVelocityX(-250);
                this.aPlayer.setFlip(true, false);
            } else if (gameObject.cursor.right.isDown) {
                this.aPlayer.setVelocityX(250);
                this.aPlayer.setFlip(false, false);
            }
            else {
                this.aPlayer.setVelocityX(0);
            }

            //jump
            if (gameObject.cursor.up.isDown && this.aPlayer.body.onFloor()) {
                this.isJumping = !this.isJumping;
                this.aPlayer.setVelocityY(-500);
                this.aPlayer.setTexture("player", "adventurer_jump");
            }

            if (this.aPlayer.body.onFloor()) {
                this.isJumping = false;
            } else {
                this.isJumping = true;
            }

            //animations
            if (this.isJumping) {
                this.aPlayer.setTexture("player", "adventurer_jump");
            } else {
                if (gameObject.cursor.left.isDown || gameObject.cursor.right.isDown) {
                    this.aPlayer.anims.play("playerWalk", true);
                } else {
                    this.aPlayer.anims.play("playerIdle", true);
                }
            }
        }else{
            this.aPlayer.setVelocityX(0);
        }
    },

    killPlayer: function (winOrLose) {
        this.isAlive = false;
        if(winOrLose==="win"){
            this.aPlayer.setVelocityY(-250);
            this.aPlayer.anims.play("playerWin", true);
        }else{
            this.aPlayer.setTexture("player", "adventurer_hurt");

        }        
    }
}