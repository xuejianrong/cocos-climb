cc.Class({
  extends: cc.Component,

  properties: {
    // 主角x坐标
    x: 0,
    // 主角跳跃高度
    jumpHeight: 0,
    // 主角跳跃持续时间
    jumpDuration: 0,
    // 前一个触摸点的x坐标
    prevTouchX: 0,
    // 是否触摸中
    isTouch: false,

    game: cc.Node,
    container: cc.Node,

    // 当前第几个阶梯
    step: 0,
    // 上一个吃金币的阶梯值
    preStep: 0,
  },

  setJumpAction() {
    // stair跑205(stair的高加上间距)时间就是跳跃上下一回的时间，jumpDuration就是这个时间的一半
    this.jumpDuration = (205 / this.container.getComponent('container').speed) * .5;
    // 跳跃上升
    const jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
    // 跳跃前就调整一次位置
    const startBefore = cc.callFunc(() => {
      this.container.getComponent('container').adjust();
    });
    // 下落
    const jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
    const finished = cc.callFunc(() => {
      this.step += 1;
    });
    // 不断重复
    return cc.repeatForever(cc.sequence(cc.spawn(jumpUp, startBefore), jumpDown, finished));
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
  },

  play() {
    // 设置初始化x坐标
    this.x = this.node.x;
    // 初始化跳跃动作
    this.node.runAction(this.setJumpAction());
    // 监听touch事件
    this.game.on('touchmove', this.touchMoveHandle, this);
    this.game.on('touchstart', this.touchStartHandle, this);
    this.game.on('touchend', this.touchEndHandle, this);
  },

  start () {
  },

  update (dt) {
    if (this.isTouch && this.container.getComponent('container').isStart) {
      this.node.x = this.x;
    }
  },

  touchStartHandle(e) {
    // 设置为触摸中
    this.isTouch = true;
    // 获取触摸初始点坐标
    this.prevTouchX = e.getLocation().x;
  },
  touchMoveHandle(e) {
    // 获取移动点坐标
    const x = e.getLocation().x;
    // 设置x坐标
    this.x += x - this.prevTouchX;
    // 更新前一个触摸点的x坐标
    this.prevTouchX = x;
  },
  touchEndHandle(e) {
    // 设置为触摸结束
    this.isTouch = false;
  },

  getGoldHandle() {
    const game = this.game.getComponent('game');
    if (this.step === this.preStep + 1) {
      // 连续  则连续吃金币数+1
      game.goldContinuousCount += 1;
    } else {
      // 不连续  则重置连续吃金币数
      game.goldContinuousCount = 1;
    }
    game.getGoldHandle();
    this.preStep = this.step;
  },
});
