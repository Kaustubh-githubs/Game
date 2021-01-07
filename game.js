let gameScene = new Phaser.Scene("Game");

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: gameScene,
  backgroundColor: 0x444444,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 350 },
      debug: true,
    },
  },
};

let text, player, cursors, platforms;
// 1st scene -> preLoad , update , create
gameScene.preload = function () {
  this.load.spritesheet("player", ".//assets//sprite//char.png", {
    frameWidth: 40,
    frameHeight: 52,
  });
  this.load.image("platform", ".//assets//sprite//platform.png");
};

let playerFrameRate = 10;
gameScene.create = function () {
  // text = this.add.text(300, 200, "Gobline", { fontSize: "32px" });
  player = this.physics.add.sprite(350, 150, "player");
  player.setFrame(4);
  // this is platforms for the statinc grouped
  platforms = this.physics.add.staticGroup();
  // platforms we ahave 4 of them in here...
  platforms.create(50, 580, "platform").setScale(2, 0.7).refreshBody();
  platforms.create(215, 110, "platform").setScale(0.2, 0.3).refreshBody();
  platforms.create(260, 350, "platform").setScale(0.2, 0.3).refreshBody();
  platforms.create(555, 200, "platform").setScale(0.2, 0.3).refreshBody();
  platforms.create(600, 430, "platform").setScale(0.2, 0.3).refreshBody();

  // **********************animation creating
  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("player", { start: 0, end: 9 }),
    frameRate: playerFrameRate,
    repeat: -1,
  });
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("player", { start: 10, end: 19 }),
    frameRate: playerFrameRate,
    repeat: -1,
  });
  this.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNumbers("player", { start: 20, end: 20 }),
    frameRate: playerFrameRate,
    repeat: -1,
  });
  // jumping animation
  this.anims.create({
    key: "ljump",
    frames: [{ key: "player", frame: 19 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "rjump",
    frames: [{ key: "player", frame: 1 }],
    frameRate: 20,
  });

  player.anims.play("ideal");
  //  ****************collision************
  player.setCollideWorldBounds(true);
  this.physics.add.collider(platforms, player);

  // inputs from the keyBoards************
  cursors = this.input.keyboard.createCursorKeys();
  // console.log(cursors);
};

let xVelocity = 150;
gameScene.update = function () {
  // for horizontal movement...
  if (cursors.left.isDown) {
    player.setVelocityX(-xVelocity);
    if (player.body.touching.down) {
      player.anims.play("left", true);
    } else {
      player.anims.play("ljump", true);
    }
  } else if (cursors.right.isDown) {
    player.setVelocityX(+xVelocity);
    if (player.body.touching.down) {
      player.anims.play("right", true);
    } else {
      player.anims.play("rjump", true);
    }
  } else {
    player.setVelocityX(0);
    player.anims.play("idle");
  }

  // for jumping movement...
  if (cursors.space.isDown && player.body.touching.down) {
    player.setVelocityY(-300);
  }
};

let game = new Phaser.Game(config);
