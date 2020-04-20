(function(){
  /* 定义变量,储存 */
  let aLi = [];
  let oList = document.querySelector("#list ul");

  /* 创建125个li */
  (function(){
    let fragment = document.createDocumentFragment(); // 创建DON文档碎片
    for(let i = 0;i < 125;i++){
      let d = data[i] || {"order":"118", "name":"Uuo", "mass":""};
      let oLi = document.createElement("li");
          oLi.innerHTML = 
          `
          <p>${d.name}</p>
          <p>${d.order}</p>
          <p>${d.mass}</p>
    
          `;

          oLi.style.transform = `translate3d(${Math.floor(Math.random()*7000-3500)}px, ${Math.floor(Math.random()*7000-3500)}px,${Math.floor(Math.random()*8000-4000)}px`;

          aLi.push(oLi);
          fragment.appendChild(oLi);
    }
    oList.appendChild(fragment);
    oList.offsetLeft; // 让浏览器先重绘，不然就会从某个地方瞬间变成另外一个地方
    sphere(); // 初始，自执行，重绘之后都行。
  })();

  /* 鼠标事件 */
  (function(){

    /* ul的各种初始位置 */
    let rX = 0,
        rY = 0,
        tZ = -2000; 

    /* 鼠标拖拽 */
    (function(){
      let sX,sY,sRotateX,sRotateY,lastX,lastY,GG,XX,timer,moveTime = 0;

      /* node.addEvenListener("事件名"，"事件函数") */
      document.addEventListener("mousedown",down);
      document.addEventListener("mouseup",up); // 如果不用清除点击事件，函数可以写到括号里面
      
      /* 按下 */
      function down(e){
        sX = lastX = e.pageX; // 为了避免一些小问题（雷区），即是当move（移动）事件中的lastX和lastY的值，最好在down事件执行的时候，记录一下，因为move事件里lastX和lastY的值记录了前一次的值，如果移动的距离很短，就会产生很大的偏差，所以先在down事件记录一下。
        sY = lastY = e.pageY;
        sRotateX = rX;
        sRotateY = rY;
        GG = 0; // 回归最初值，不然up里的moveTime等于undefined，就会跳过。
        XX = 0;
        this.addEventListener("mousemove",move);
        cancelAnimationFrame(timer);
      };
      
      /* 抬起 */
      function up(e){
        this.removeEventListener("mousemove",move);
        /* 如果抬起时间和最后一次的move时间相差较大，那就不要动画 */
        if(new Date - moveTime > 100)return;
        /* 惯性动画 */
        timer = requestAnimationFrame(m);
        function m(){
          GG *= 0.92; // 根据实际乘以一个数，让极限不断接近0的数，假如是100，然后乘以0.92等于90，下次再移动，就是92乘以0.92等于81……
          XX *= 0.92; // 如果是 1，就会停不下来了。
          rY += GG * 0.1;
          rX -= XX * 0.1;

          /* 改变样式 */
          oList.style.transform = `translateZ(${tZ}px) rotateX(${rX}deg) rotateY(${rY}deg)`;

          if(Math.abs(GG) <= 0.5 && Math.abs(XX) <= 0.5) return; // abs绝对值，考虑负值

          timer = requestAnimationFrame(m);
        } 
      };
      
      /* 移动 */
      function move(e){
        moveTime = new Date;
        let nX = e.pageX,
            nY = e.pageY;
  
        let x_ = nX - sX,
            y_ = nY - sY;
  
        /* 不能改变初始位置（rX，rY），要定义变量（sRotateX，sRotateY） */
        rY = sRotateY + x_ * 0.1; // 按下时刻的角度 + 总变化角度
        rX = sRotateX - y_ * 0.1;

        /* 改变样式 */
        oList.style.transform = `translateZ(${tZ}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
  
        /* 惯性 */
        GG = nX - lastX; // 就是每次move事件完了之后，把当前的鼠标坐标（nX / nY）赋值给lastX / lastY，所以说这里lastX / lastY还是上一次的值
        XX = nY - lastY;

        /* 存储改变位置的值 */
        lastX = nX; // 只要代码执行到这里才改变lastX和lastY的值
        lastY = nY;
      };
    })();

    /* 鼠标滚轮 */
    (function(){
      /* 
      
        onmousewheel 滚轮事件

        Chrome：mousewheel 用e.wheelDelta来区分滚轮方向，数值是120的倍数，往下负值，往上正值
      
        火狐：DOMMouseScroll 用e.detall来区分滚轮方向，数值是3的倍数，往下正值，往上负值
      
      */


      /* Chrome */
      document.addEventListener("mousewheel",wheel);
      /* 火狐 */
      document.addEventListener("DOMMouseScroll",wheel);

      function wheel(e){
        // let d = 0;
        // if(e.wheelDelta){
        //   d = e.wheelDelta / 120;
        // }
        // if(e.detall){
        //   d = e.detall / -3;
        // }

        /* 1的倍数，往下负值，往上正值 */
        let d = e.detail / 3 || e.wheelDelta / 120; // 逻辑或，遇真则停
        
        /* 改变 Z方向的位置 */

        // if(d < 0){
        //   tZ -= 200;
        // }else{
        //   tZ += 200;
        // }

        tZ += d * 200; // d自带符号（ + 和 - ）
        tZ = Math.max(tZ,-6000);
        tZ = Math.min(tZ,800);
        /* 样式变化 */
        oList.style.transform = `translateZ(${tZ}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
      }
    })();
  })(); 

  /* tab点击事件 */
  (function(){
    let oTabLi = document.querySelectorAll("#tab li")
    oTabLi.forEach((node,i)=>{
      node.onclick = function(){
        switch(i){
          case 0:
            table();
            break;
          case 1:
            sphere();
            break;
          case 2:
            helix();
            break;
          case 3:
            grid();
            break;
        }
      }
    })
  })();

  /* Grid布局 */
  function grid(){
    aLi.forEach((node,index)=>{
      let x = index % 5; // index / 序号(5) 的商
      let y = Math.floor(index % 25 / 5);  // y * 序号(5)+ x = index, 一层25个，然后重头再来
      let z = Math.floor(index / 25); // index / 序号(25) 的商

      /* 与中间为参照物，求差值 */
      let x_ = x - 2; // 位移两个序号
      let y_ = y - 2;
      let z_ = 2 - z;
      /* 开始位置 水平方向每一分位置300，垂直方向每一份位置400 */
      // node.innerHTML = `{${x},${y},${z}}`;
      node.style.transform = `translate3d(${x_ * 300}px, ${y_ * 400}px,${z_ * 1000}px`;
    });

  };

  /* Helix布局 */
  function helix(){
    aLi.forEach((node,index)=>{
      let deg = 360/(125/4);
      node.style.transform = `rotateY(${(index) * deg}deg) translate3d(0px, ${(index - 62) * 10}px,800px)`;
    });

  };

  /* Sphere布局 */
  function sphere(){ 
    /* 
      Y旋转 X旋转 Z位移就可以做出
      
      Y旋转
        一圈中所有的li角度偏差平分360
        360/每一圈的li个数
    
      X旋转
        90deg至-90deg的变化（一共变化180deg）
        180/一共有多少个圈 - 1

      Z位移
        固定值（假设：800px）


    分析
      if(index === 0){
        node.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(800px)";
      }else if(index === 1){
        node.style.transform = "rotateY(180deg) rotateX(0deg) translateZ(800px)"
      }else if(index === 2){
        node.style.transform = "rotateY(90deg) rotateX(0deg) translateZ(800px)"
      }else if(index === 3){
        node.style.transform = "rotateY(-90deg) rotateX(0deg) translateZ(800px)"
      }else if(index === 4){
        node.style.transform = "rotateY(0deg) rotateX(90deg) translateZ(800px)"
      }else if(index === 5){
        node.style.transform = "rotateY(0deg) rotateX(-90deg) translateZ(800px)"
      }else{
        node.style.transform = "translate3D(0,0,0)"
      }

    */
 
    let arr = [1,4,8,10,13,15,23,15,13,10,8,4,1];
    // console.log(arr.reduce((a,b) => a+b)); // 计算总数
    let len = arr.length;
    let xDeg_ = 180 / (len - 1); // 每一层x旋转度数的增量


    aLi.forEach((node,index)=>{
      // 通过序号求出当前li属于第几圈第几个
      let circle,a;
      let sum = 0; // 记录sum从0开始

      for(let i = 0;i < len;i++){
        sum += arr[i]; // arr序号的变化，如果arr中的序号是2，对应的个数是8，那么sum的个数是8，然后比较大小，如果index大于sum，肯定在arr中的第3圈。

        // 如果当前元素大于，序号（125个的）肯定在这一圈
        if(sum >= (index + 1)){
          circle = i; // 当前元素在arr第几圈（i是arr的序号）
          a = arr[i] - (sum - (index + 1)) - 1; // 个数 = 当前的个数 - 倒数第几个
            break;
        }
      }
        
      let xDeg = 90 - circle * xDeg_;
      let yDeg = 360 / arr[circle] * a + arr[circle] * 10; // 让它不是排成一排，当前圈数不变，改变圈数的第几个位置

      /* 改变样式 */
      node.style.transform = `rotateY(${yDeg}deg) rotateX(${xDeg}deg) translateZ(1000px)`;
  
    });
  };
      
  /* Table布局 */
  function table(){
    /* 前18个盒子的坐标 */
    let coordinate = [
      {x:0,y:0},
      {x:17,y:0},
      {x:0,y:1},
      {x:1,y:1},
      {x:12,y:1},
      {x:13,y:1},
      {x:14,y:1},
      {x:15,y:1},
      {x:16,y:1},
      {x:17,y:1},
      {x:0,y:2},
      {x:1,y:2},
      {x:12,y:2},
      {x:13,y:2},
      {x:14,y:2},
      {x:15,y:2},
      {x:16,y:2},
      {x:17,y:2}
    ];
    aLi.forEach((node,index)=>{
      /* 0-17的坐标 */
      /* 90-104的坐标 */
      /* 105-119的坐标 */
      let x,y;
      if(index < 18){
        x = coordinate[index].x;
        y = coordinate[index].y;
      }else if(index < 90){
        x = index % 18;
        y = Math.floor(index / 18) + 2;
      }else if(index < 105){
        x = index % 18 + 0.8;
        y = Math.floor(index / 18) + 2;
      }else if(index < 120){
        x = (index + 3) % 18 + 0.8;
        y = Math.floor((index + 3) / 18) + 2;
      }else{
        x = 17;
        y = 6;
      }

      /* x坐标和y坐标均分 */
      let x_ = x - 8.5,
          y_ = y -4;
        
      /* 样式改变 宽高 */
      node.style.transform = `translate(${x_ * 150}px,${y_ * 200}px)`;
    });
  };
})();



/* 


        
        
    oUl.offsetLeft;//让浏览器先重绘，否则无transform动画 

    惯性动画，用定时器和requestAnimationFrame做，记录最后两次move的间距，还要注意消除鼠标按住不放move过段时间才 up的时候也会有惯性，要消除

    当最后一次move与up的时间足够长，防止触发惯性动画

    绕X旋转-上下旋转 的动画是y方向距离的负数

    避免每次刷新都执行125次，初始页面一刷新就给父级加class名字 让所有li都有样式，此后就给ul加对应class名字即可

    布局函数提前声明，返回函数，公用部分防止多次执行，可提前提取出来，需要多次执行的放在回调函数中
        

    

*/