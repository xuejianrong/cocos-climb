// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
    // 存在的阶梯数组
    stairs: [],
    stairPrefab: {
      default: null,
      type: cc.Prefab
    },
    container: {
      default: null,
      type: cc.Node
    },
    player: {
      default: null,
      type: cc.Node
    },
    playerComponent: {
      default: null,
      type: cc.Component
    },
    ctrl: {
      default: null,
      type: cc.Node
    },
    ctrlButtonLabel: {
      default: null,
      type: cc.Label
    },
    gameOverNode: {
      default: null,
      type: cc.Node
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    // 设置player组件
    this.playerComponent = this.player.getComponent('player');
  },

  start () {
  },

  // update (dt) {},

  spawnNewStair(_, y) {
    // 生成新节点（预制资源）
    const newStair = cc.instantiate(this.stairPrefab);
    // 设置stair中的container、game值，使之能访问container、game
    newStair.getComponent('stair').container = this.container;
    newStair.getComponent('stair').game = this;
    // 把节点添加到container中
    this.container.addChild(newStair, -1);
    // 添加阶梯数到数组中
    this.stairs.push(newStair);
    // 设置节点初始位置
    newStair.setPosition(cc.v2(0, y || this.container.height));
  },

  // 开始游戏
  startGame() {
    console.log('start game');
    // 设置player初始位置
    this.player.setPosition(0, 300);
    // 重新开始时需要destroy
    this.destroyStairs();
    // 生成新节点计时器，spawnNewStair会有一个默认传参（但是没搞懂是啥）
    this.schedule(this.spawnNewStair, this.playerComponent.jumpDuration * 2);
    // player 开始运动
    this.playerComponent.play();
    // 隐藏控制面板
    this.ctrl.runAction(cc.hide());
  },

  // 结束游戏
  stopGame() {
    this.stairs.forEach(stair => stair.stopAllActions());
    this.player.stopAllActions();
    this.unschedule(this.spawnNewStair);
    this.ctrl.runAction(cc.show());
    this.ctrlButtonLabel.string = '再来一局';
    this.gameOverNode.runAction(cc.fadeIn(.5));
  },

  // 销毁已有的stair
  destroyStairs() {
    this.stairs.forEach(stair => stair.destroy());
  }
});
