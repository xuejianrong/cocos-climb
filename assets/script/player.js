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
  },

  setJumpAction() {
    // 跳跃上升
    var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
    // 下落
    var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
    // 不断重复
    return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
  },

  play() {
    // 初始化x坐标
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
    if (this.isTouch) {
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
  }
});
