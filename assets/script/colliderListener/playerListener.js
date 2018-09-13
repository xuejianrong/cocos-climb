cc.Class({
  extends: cc.Component,

  properties: {
    game: cc.Node
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    const manager = cc.director.getCollisionManager();
    // 开启碰撞检测系统
    manager.enabled = true;
    // 开启 debug 绘制
    // manager.enabledDebugDraw = true;
    // 显示碰撞组件的包围盒
    // manager.enabledDrawBoundingBox = true;
  },
  onCollisionEnter(collider) {
    const game = this.game.getComponent('game');
    if (this.node.y >= game.initY && this.node.y <= (game.initY + 110)) {
      if (collider.node.name === 'barrierItem') {
        // 碰撞的是障碍
        console.log('game over');
        game.stopGame();
      } else if (collider.node.name === 'gold'){
        // 碰撞的是金币
        this.node.getComponent('player').getGoldHandle();
      }
    }
  },

  start() {
  },

  // update (dt) {},
});
