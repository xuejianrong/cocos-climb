cc.Class({
  extends: cc.Component,

  properties: {
    game: {
      default: null,
      type: cc.Node
    }
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
  onCollisionEnter: function (other) {
    if (this.node.y >= 300 && this.node.y <= 410) {
      console.log('game over');
      // this.game.getComponent('game').stopGame();
    }
  },

  start() {
  },

  // update (dt) {},
});
