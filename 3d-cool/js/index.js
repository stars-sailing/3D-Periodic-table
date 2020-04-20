
$(function(){
	
	var liNum = 5*5*5;
	
	//入场动画

	init();
	
	function init()
	{	
		for (var i = 0; i<liNum;i++ )
		{
			var demoArrNum = i%5;			
			var $li = $('<li><p class="title">'+demoArr[demoArrNum].title +'</p><p class="author">'+demoArr[demoArrNum].author +'</p><p class="time">'+demoArr[demoArrNum].date +'</p></li>');
			
			var randomX = (Math.random()-0.5)*5000;
			var randomY = (Math.random()-0.5)*5000;
			var randomZ = (Math.random()-0.5)*5000;

			$li.css({
			
				'transform':'translate3d('+randomX+'px,'+randomY+'px,'+randomZ+'px)',

			})
			
			$('#main').append($li);
		}

		setTimeout(function(){
			Grid()
			
			$('#styleBtn').css({
		
				'transform' : 'scale(1)',
				'opacity' : 1
			})
			$('#shapeBtn').css({
		
				'transform' : 'scale(1)',
				'opacity' : 1
			})					
			},500);


	}

	//覆盖变色&&点击事件

	var $show = $('#show');

	$('#main li').mouseenter(function()
	{
		$(this).addClass('onSelect');	

	}).mouseleave(function(){
	
		$(this).removeClass('onSelect');	
	}).click(function(ev){
		ev = ev||window.event;
		$show.fadeIn(1000).css({			
			'transform' : 'rotateY(0deg) scale(1)',
			'display' : 'block'	
		})
		ev.stopPropagation() 
	})
	
	$(document).click(function(ev){
		ev = ev||window.event;
		$show.fadeOut(1000,function(){
			$show.css
				({
					'transform' : 'rotateY(0deg) scale(1.5)',
					'display':'none'			
				})
					
			}).css({		
				'transform' : 'rotateY(180deg) scale(0.1)',
		})
		ev.stopPropagation(); 	
	})

	$show.click(function(){
	
		$('#wrap').animate({
		
			'left' : '-100%'			
		},1000)

		$('#frame').show().animate({
			
				'left' : 0
		},1000)
	})
	
	$('#back').click(function(){
	
		$('#wrap').animate({		
			'left' : 0		
		},1000)

		$('#frame').show().animate({			
			'left' : '100%'
		},1000)
	})
	
	//按钮切换样式
	
	$('#styleBtn li').click(function()
	{
		var index = $(this).index();

		switch (index)
		{
			case 0:
			Table();
			break;

			case 1:
			Sphere();
			break;

			case 2:
			Helix();
			break;

			case 3:
			Grid();
			break;

			case 4:
			Circle();
			break;			
		}
	
	})

	//图形样式

	$('#shapeBtn li').each(function(i){
	
		$(this).click(function(){
	
			if(i)
			{
				$('#main li').each(function(){			
					$(this).css({			
						'width' : '160px',
						'borderRadius' : '50%'
					})
				})
				
				tableDis =true;
			}
			else
			{
				$('#main li').each(function(){			
					$(this).css({			
						'width' : '120px',
						'borderRadius' : 0
					})
					})

				tableDis =false;
			}	
		})
	
	
	
	
	})
});

//	网格样式

function Grid(){

	var propX = 400, propY = 400, propZ = 800;

	var firstX = -2*propX;
	var firstY = -2*propY;
	var firstZ = -2*propZ;

	$('#main li').each(function(i){		
	var disX = (i%25)%5;
	var disY = parseInt((i%25)/5);
	var disZ = parseInt(i/25);
		
	$(this).css({
			
		'transform':'translate3d('+(firstX+propX*disX)+'px,'+(firstY+propY*disY)+'px,'+(firstZ+disZ*propZ)+'px)',
	
	});
	})
}


//	螺旋样式

function Helix(){
	
	$('#main li').each(function(i){
		
		var rotateY = 10*i;
		var midY =  Math.ceil($('#main li').length/2);
		var tansY = 10*(i-midY);

		$(this).css({
		
			'transform' : 'rotateY('+rotateY+'deg) translateZ(1000px) translateY('+tansY+'px)',
		
		})
	});
}

//环形样式

function Circle(){

	$('#main li').each(function(i){
		
		var rotateY = 6*i;
		var midY =  Math.ceil($('#main li').length/2);
		var tansY = 800*(parseInt(i/midY))-400;
		
		console.log(rotateY)
		$(this).css({
			'transform':'rotateY('+rotateY+'deg) translateZ(1800px)',

		})

	})
}

//环形样式

function Sphere(){

	var arr = [1,4,8,10,12,17,22,16,14,9,6,5,1];
	var propRotateX = 180/arr.length;
	var RotateFirstX = 90;
	$('#main li').each(function(j){
	
		var sum = 0;
		var index,num;

		for (var i = 0; i<arr.length ;i++ )
		{	
			sum+=arr[i];
			if ( sum >= j+1 )
			{
				index = i;
				num = arr[i]-(sum-j);
				break;
			}
		}

		var propRotateY = 360/arr[index];
		var RotateX = RotateFirstX + index*propRotateX;
		var RotateY = propRotateY*num;
		var RotateZ = 0;
		if (RotateX>90 && RotateX<270)RotateZ = 180;
		
		$(this).css({
		
			'transform' : 'rotateY('+RotateY+'deg) rotateX('+RotateX+'deg)  rotateZ('+RotateZ+'deg) translateZ(800px)'
		
		})
	})
}

//表格样式
	
	var tableDis =false;
	
	function Table(){
		
		if (tableDis)
		{
			var tX = 200;
		}
		else
		{
			var tX = 160;
		}
		var tY = 200;
		
		var heightNum = Math.ceil(125/18);
		var firstX = -9*tX+60;
		var firstY = -heightNum/2*tY-80;
		
		
		var arr = [
			{disX:firstX,disY:firstY},
			{disX:firstX+17*tX,disY:firstY},
			{disX:firstX , disY:firstY+tY },
			{disX:firstX+tX , disY:firstY+tY},
			{disX:firstX+12*tX , disY:firstY+tY },
			{disX:firstX+13*tX , disY:firstY+tY },
			{disX:firstX+14*tX , disY:firstY+tY },
			{disX:firstX+15*tX , disY:firstY+tY },
			{disX:firstX+16*tX , disY:firstY+tY },
			{disX:firstX+17*tX , disY:firstY+tY },
			{disX:firstX , disY:firstY+tY*2 },
			{disX:firstX+tX , disY:firstY+tY*2},
			{disX:firstX+12*tX , disY:firstY+tY*2 },
			{disX:firstX+13*tX , disY:firstY+tY*2 },
			{disX:firstX+14*tX , disY:firstY+tY*2 },
			{disX:firstX+15*tX , disY:firstY+tY*2 },
			{disX:firstX+16*tX , disY:firstY+tY*2 },
			{disX:firstX+17*tX , disY:firstY+tY*2 }
		];

		$('#main li').each(function(i){
			
			if (i<18)
			{
				var disX = arr[i].disX;
				var disY = arr[i].disY;	
			}
			else
			{
				var disX = firstX+tX*((i+18)%18);	
				var disY = firstY+tY*parseInt((i+18)/18)+tY;
			}

				$(this).css({
				
					'transform' : 'translate('+disX+'px , '+disY+'px)' 

				})

		})
	}
	



//	鼠标拖拽事件


$(function(){

	var nowX,minuseX = 0,nowY,minuseY = 0,startX,startY;

	var rotateY = 0;
	var rotateX = 0;
	var transZ =  -2000;
	var timer1;
	var timer2;
	
	$(document).mousedown(function(ev)
		{
			ev = ev||window.event;
			startX = ev.clientX;
			startY = ev.clientY;
			clearInterval(timer1);
			$(this).on('mousemove',function(ev)
			{
				ev = ev||window.event;
				nowX = ev.clientX;
				nowY = ev.clientY;
				
				minuseX = nowX - startX;
				minuseY = nowY - startY;

				rotateY+= minuseX*0.15;
				rotateX-= minuseY*0.15;

				$('#main').css({
				
					//'transform' : 'translateZ('+transZ+'px) rotateY('+rotateY+'deg) rotateX('+rotateX+'deg)'
					  'transform' : 'translateZ('+transZ+'px) rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)'

				
				})

				startX = nowX;
				startY = nowY;
			})
				return false;

		}).mouseup(function()
		{
			$(this).off('mousemove');

			//	拖拽缓冲事件

			timer1 = setInterval(function()
				{
					minuseX = minuseX*0.85;
					minuseY = minuseY*0.85;

					rotateY+= minuseX*0.15;
					rotateX-= minuseY*0.15;

					if(Math.abs(minuseX)<0.1 && Math.abs(minuseY)<0.1)
					{
						clearInterval(timer1)
					}					
					$('#main').css({
						//'transform' : 'translateZ('+transZ+'px) rotateY('+rotateY+'deg) rotateX('+rotateX+'deg)'
						  'transform' : 'translateZ('+transZ+'px) rotateX('+rotateX+'deg) rotateY('+rotateY+'deg) '
					})
				},15)

			//	滚轮事件

		}).mousewheel(function()
			{
				clearInterval(timer2);	
				var dis = arguments[1]
				transZ+= dis*80;
				transZ = Math.min(0,transZ);
				transZ = Math.max(-5000,transZ);
				
				$('#main').css({	
					
					'transform':'translateZ('+transZ+'px) rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)',

				})

				timer2 = setInterval(function()
				{
					dis *=0.9
					if (Math.abs(dis) < 0.01)
					{
						clearInterval(timer2);	
					}	
					transZ+= dis*80;
					transZ = Math.min(0,transZ);
					transZ = Math.max(-5000,transZ);
								
					$('#main').css({	

						'transform':'translateZ('+transZ+'px) rotateX('+rotateX+'deg) rotateY('+rotateY+'deg) ',
					})
				},13)
			}
						
	)
})