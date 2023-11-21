/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

@Component
export struct ComWheel {
  @Link public model: Model;

  build() {
    Column(){
      Stack() {
        Path()
          .strokeWidth(this.model.barWidth)
          .fillOpacity(0)
          .stroke(this.model.barColor)
          .commands(this.model.svgPath)
          .width(this.model.circleRadius/3*2)
          .height(this.model.circleRadius/3*2)
          .zIndex(2)
        Path()
          .strokeWidth(this.model.rimWidth)
          .fillOpacity(0)
          .stroke(this.model.rimColor)
          .width(this.model.circleRadius/3*2)
          .height(this.model.circleRadius/3*2)
          .commands(this.model.rimSvgPath)
          .zIndex(0)
      }
    }
  }
}

export class Model {
  //画笔宽度
  barWidth: number = 5;
  //轮圈宽度
  rimWidth: number = 5
  //画笔颜色
  barColor: ResourceColor = 0X5588FF
  // 大/小角度弧标志  0为小角度
  angleFlag: number = 0
  // 圆弧最小角度
  minAngle: number = 16
  // 圆弧最大角度
  maxAngle: number = 270
  //半径
  circleRadius: number = 30
  //真实半径
  radius: number = 0
  // 在 minAngle 基础上，额外需要绘制的角度
  barExtraLength: number = 0
  // 需要绘制到的角度
  targetAngle: number = 0
  // 圆弧递增或递减的标记  true表示递增
  barGrowingFromFront: boolean = true
  // 逆时针顺时针标志 1表示顺时针
  directionFlag: number = 1
  // svg路径
  svgPath: string = "";
  // 绘制终点的X轴坐标
  endX: number = 0;
  //绘制终点的Y轴坐标
  endY: number = 0;
  //起始位置
  startX: number = 0;
  startY: number = 0;
  // 目标进度值
  mTargetProgress: number = 1
  // 进度值
  mProgress: string = "0";
  // 起始角度
  progress: number = 0
  //轮圈颜色
  rimColor: number = Color.White
  // 近似闭合的坐标
  closureY: number = 0
  // 每1ms的旋转角度，例：230 每1s旋转 230 度    (270-16)/0.46 = 230
  spinSpeed: number = 230
  //轮圈的svg路径
  rimSvgPath: string = ""
  // 是否是动态进度轮
  isSpinning: boolean = true
  // 是否是线性进度轮
  linearProgress: boolean = false
  //圆弧处在最大或者最小角度时，保持当时状态的时间，简而言之，当圆弧为的角度为 barLength
  //圆弧处在最大或者最小角度时，保持当时状态的时间，简而言之，当圆弧为的角度为 barLength
  // 或者 barMaxLength 时，都会在 pauseGrowingTime 这个时间后才会继续变化，最大向最小变化，最小向最大变化，可以理解为 delayTime
  pauseGrowingTime: number = 200
  // 圆弧 递增/递减 已经经历时间
  timeStartGrowing: number = 0
  //圆弧 从最小到最大/从最大到最小 的总时间
  barSpinCycleTime: number = 460
  // 圆弧在 最大/最小 角度保持的时间
  pausedTimeWithoutGrowing: number = 0
  //上一次绘制的时间
  lastTimeAnimated: number = 0
  // 定时器
  intervalID: number = 0

  //初始化
  init() {
    this.radius = this.circleRadius - this.barWidth
    this.startX = this.circleRadius
    this.startY = this.barWidth
    // 近似一个完整的回环(轮圈)
    let closureRadian = 359.99 * Math.PI / 180
    // 近似闭合的坐标
    let closureX = this.circleRadius + (this.radius * Math.sin(closureRadian))
    this.closureY = this.circleRadius - (this.radius * Math.cos(closureRadian))
    this.rimSvgPath = "M" + this.startX + " " + this.startY + " " + "A " + this.radius + " " +
    this.radius + ", 0, " + "1" + ", " + this.directionFlag + ", " + closureX + " " + this.closureY + "Z"
    // 计算弧度
    if (this.isSpinning) {
      let radian = this.minAngle * Math.PI / 180
      this.endX = this.circleRadius + (this.radius * Math.sin(radian))
      this.endY = this.circleRadius - (this.radius * Math.cos(radian))
      this.svgPath = "M" + this.startX + " " + this.startY + " " + "A " + this.radius + " " +
      this.radius + ", 0, " + this.angleFlag + ", " + this.directionFlag + ", " + this.endX + " " + this.endY
    } else {
      if (this.mTargetProgress == 1) {
        this.maxAngle = 359.99
      } else {
        this.maxAngle = this.mTargetProgress * 360
      }
    }
    this.lastTimeAnimated = new Date().getTime()
    if (this.intervalID != 0) {
      this.closeTimer()
    }
    this.intervalID = setInterval(() => {
      // 刷新数据
      this.onDraw()
    }, 20)
  }

  private onDraw(): void {
    // 动态绘制
    if (this.isSpinning) {
      if ((this.barExtraLength + this.minAngle) < 180) {
        this.angleFlag = 0
      } else {
        this.angleFlag = 1
      }
      // 增量时间
      let deltaTime = new Date().getTime() - this.lastTimeAnimated;
      let deltaNormalized = deltaTime * this.spinSpeed / 1000;
      this.progress += deltaNormalized
      if (this.progress > 360) {
        this.progress -= 360;
      }
      let radian = this.progress * Math.PI / 180
      this.startX = this.circleRadius + (this.radius * Math.sin(radian))
      this.startY = this.circleRadius - (this.radius * Math.cos(radian))
      // 计算需要额外绘制的角度
      this.updateBarLength(deltaTime)
      this.lastTimeAnimated = new Date().getTime()
      // 计算坐标
      this.calculation()
      this.targetAngle = this.progress + this.barExtraLength + this.minAngle
      if (this.targetAngle > 360) {
        this.targetAngle = this.targetAngle - 360
      }
      this.svgPath = "M" + this.startX + " " + this.startY + " " + "A " + this.radius + " " +
      this.radius + ", 0, " + this.angleFlag + ", " + this.directionFlag + ", " + this.endX + " " + this.endY
      this.mProgress = "Progress:"
    } else {
      // 静态
      if (this.progress < 180) {
        this.angleFlag = 0
      } else {
        this.angleFlag = 1
      }
      if (this.progress != this.maxAngle) {
        let deltaTime = (new Date().getTime() - this.lastTimeAnimated) / 1000;
        let deltaNormalized = deltaTime * this.spinSpeed
        this.progress = Math.min(this.progress + deltaNormalized, this.maxAngle);
        this.lastTimeAnimated = new Date().getTime()
      } else {
        this.lastTimeAnimated = new Date().getTime()
      }
      this.targetAngle = this.progress
      if (!this.linearProgress) {
        let factor = 2
        //起始角
        let startAngle = (1.0 - Math.pow(1.0 - this.progress / 360, 2 * factor)) * 360
        let start = startAngle * Math.PI / 180
        this.startX = this.circleRadius + (this.radius * Math.sin(start))
        this.startY = this.circleRadius - (this.radius * Math.cos(start))
        // 偏移的角度
        let Offset = (1 - Math.pow(1 - this.progress / 360, factor)) * 360
        this.targetAngle = startAngle + Offset
        if (Offset < 180) {
          this.angleFlag = 0
        } else {
          this.angleFlag = 1
        }
      }
      if (this.targetAngle > 360) {
        this.targetAngle = this.targetAngle - 360
      }
      // 计算坐标
      this.calculation()
      this.svgPath = "M" + this.startX + " " + this.startY + " " + "A " + this.radius + " " +
      this.radius + ", 0, " + this.angleFlag + ", " + this.directionFlag + ", " + this.endX + " " + this.endY
      this.mProgress = (this.progress / 360).toFixed(2)
    }
  }

  private calculation(): void{
    // 计算弧度
    let radian = this.targetAngle * Math.PI / 180
    this.endX = this.circleRadius + (this.radius * Math.sin(radian))
    this.endY = this.circleRadius - (this.radius * Math.cos(radian))
    // 控制起点终点无限接近时正常画圆
    if ((this.circleRadius - 1) < this.endX && this.endX < this.circleRadius && (this.circleRadius - this.endX) < 0.01) {
      this.endX = this.circleRadius - 0.01
    }
  }

  private updateBarLength(deltaTimeInMilliSeconds: number): void {
    // 到达最大小最小角的保持时间
    if (this.pausedTimeWithoutGrowing >= this.pauseGrowingTime) {
      this.timeStartGrowing += deltaTimeInMilliSeconds;
      // 计算递增递减
      if (this.timeStartGrowing > this.barSpinCycleTime) {
        this.timeStartGrowing -= this.barSpinCycleTime;
        this.pausedTimeWithoutGrowing = 0;
        // 递增递减切换
        this.barGrowingFromFront = !this.barGrowingFromFront;
      }
      let distance = Math.cos((this.timeStartGrowing / this.barSpinCycleTime + 1) * Math.PI) / 2 + 0.5;
      // 目标角度
      let destLength = (this.maxAngle - this.minAngle);
      if (this.barGrowingFromFront) {
        // 递增
        this.barExtraLength = distance * destLength;
      } else {
        //递减
        let newLength = destLength * (1 - distance);
        this.progress += (this.barExtraLength - newLength);
        this.barExtraLength = newLength;
      }
    } else {
      this.pausedTimeWithoutGrowing += deltaTimeInMilliSeconds;
    }
  }

  setCircleRadius(circleRadius: number): Model {
    this.circleRadius = circleRadius
    return this
  }

  getCircleRadius(): number{
    return this.circleRadius
  }

  setBarColor(barColor: ResourceColor): Model{
    this.barColor = barColor
    return this
  }

  getBarColor(): ResourceColor{
    return this.barColor
  }

  setRimColor(rimColor: number): Model{
    this.rimColor = rimColor
    return this
  }

  getRimColor(): number{
    return this.rimColor
  }

  setRimWidth(rimWidth: number): Model{
    this.rimWidth = rimWidth
    return this
  }

  getRimWidth(): number{
    return this.rimWidth
  }

  setBarWidth(barWidth: number): Model{
    this.barWidth = barWidth
    return this
  }

  getBarWidth(): number{
    return this.barWidth
  }

  setProgress(mTargetProgress: number): Model {
    if (this.isSpinning) {
      this.progress = 0
      this.isSpinning = false
    }
    if (mTargetProgress > 1) {
      mTargetProgress = 1
    } else if (mTargetProgress < 0) {
      mTargetProgress = 0
    }
    this.mTargetProgress = mTargetProgress
    return this
  }
  // 获取当前的进度值
  getProgress(): string {
    return this.mProgress
  }

  setSpinning(isSpinning: boolean): Model {
    this.isSpinning = isSpinning
    return this
  }

  setLinearProgress(linearProgress: boolean): Model {
    this.linearProgress = linearProgress
    return this
  }

  setSpinSpeed(spinSpeed: number): Model{
    this.spinSpeed = spinSpeed
    return this
  }

  getSpinSpeed(): number {
    return this.spinSpeed
  }

  // Reset the count (in increment mode)
  resetCount(): void{
    this.progress = 0
    this.mTargetProgress = 0
  }

  stopSpinning(): void {
    this.isSpinning = false;
    this.progress = 0;
    this.mTargetProgress = 0;
  }

  // Puts the view on spin mode
  spin(): void {
    this.lastTimeAnimated = new Date().getTime()
    this.isSpinning = true;
  }

  // 将进度设置为特定值，栏将立即设置为该值 @param progress 0 和 1 之间的进度
  setInstantProgress(progress: number): void{
    if (this.isSpinning) {
      this.progress = 0
      this.isSpinning = false
    }
    if (progress > 1) {
      progress -= 1
    } else if (progress < 0) {
      progress = 0
    }
    if (progress == this.mTargetProgress) {
      return;
    }
    this.mTargetProgress = Math.min(progress * 360, 360);
    this.progress = this.mTargetProgress;
    this.lastTimeAnimated = new Date().getTime()
  }

  spinning(): boolean{
    return this.isSpinning
  }

  closeTimer() {
    clearInterval(this.intervalID);
  }
}