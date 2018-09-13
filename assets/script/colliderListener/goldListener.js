cc.Class({
  extends: cc.Component,

  properties: {
    game: cc.Node,
    player: cc.Node,
    addScore: cc.Node,
    goldPic: cc.Node,
    scoreLabel: cc.Label,
  },

  onLoad() {
    const manager = cc.director.getCollisionManager();
    // 开启碰撞检测系统
    manager.enabled = true;
  },
  onCollisionEnter(collider) {
    const game = this.game.getComponent('game');
    if (this.player.y >= game.initY && this.player.y <= (game.initY + 110)) {
      if (collider.node.name === 'player') {
        this.goldPic.opacity = 0;
        this.scoreLabel.string = `+${game.addCount}`;
        this.addScore.opacity = 255;
        this.scheduleOnce(_ => {
          this.addScore.opacity = 0;
        }, .5);
      }
    }
  },
  init() {
    this.goldPic.opacity = 255;
    this.addScore.opacity = 0;
  },
});
