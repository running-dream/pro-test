$(function(){
	//左边导航栏
	var aside_left=document.querySelector('#aside-left')
	var p=aside_left.querySelector('p')
	var right_a=document.querySelector('#right_a')
	p.addEventListener('mouseover',function(){
		right_a.style.display='block';
	})
	p.addEventListener('mouseout',function(){
		right_a.style.display='none';
	})
	//轮播图
	var lunbo_left=document.querySelector('.lunbo_left')
	var lunbo_right=document.querySelector('.lunbo_right')
	var lunbo=document.querySelector('#lunbo')
	lunbo.addEventListener('mouseenter',function(){
		lunbo_left.style.display='block';
		lunbo_right.style.display='block';
		
	})
	lunbo.addEventListener('mouseleave',function(){
		lunbo_right.style.display='none'
		lunbo_left.style.display='none'
	})
	//封装动画函数
		function animate(obj,target,callback){
			clearInterval('timer')//先清除以前的定时器,只保留当前的
			obj.timer=setInterval(function(){//用var会浪费资源
			var step=(target-obj.offsetLeft)/10;
			step=step > 0 ? Math.ceil(step) : Math.floor(step);
				if(obj.offsetLeft==target){
					clearInterval(obj.timer)
					if(callback){
						callback();
					}
				}
				obj.style.left=obj.offsetLeft + step +"px";
			},15)
		}
		//动态生成小圆圈
		var ul=lunbo.querySelector('ul')
		var ol=lunbo.querySelector('.circle')
		var lunbo=document.querySelector('#lunbo')
		var li=ul.querySelector('li')
		var lunbowith=lunbo.offsetWidth//为全局作用
		// console.log(ul.children.length)
		for(var i=0;i<ul.children.length;i++){
			var li=document.createElement('li')
			li.setAttribute('index',i)//自定义属性小圆圈的索引号
			ol.appendChild(li)
			//当点击当前圆圈,背景颜色变,排他思想
			li.addEventListener('click',function(){
				for(var i=0;i<ol.children.length;i++){
					ol.children[i].className=" "
				}
				this.className='current'
				//点击小圆圈,移动图片,移动的是ul
				//ul移动距离是索引号*盒子大小
				var index=this.getAttribute('index')
				// console.log(lunbowith)
				// console.log(index)
				// console.log(ul.style.left)
				animate(ul,-index*lunbowith);
			})
		}
		ol.children[0].className='current';
		//点击右侧按钮,轮播图
		//克隆第一章图片
		var first=ul.children[0].cloneNode(true)
		ul.appendChild(first)
		var num=0;
		var lunbo_right=document.querySelector('.lunbo_right')
		var lunbo_left=document.querySelector(".lunbo_left")
		var img=ul.querySelectorAll('.other')
		var circle=0
		lunbo_right.addEventListener('click',function(){
			// alert(1)
			//如果走到最后一张克隆的,此时要快速复原,left值为0
			 if(num==4){
				 ul.style.left=0;
				 num=0;
			 }
			num++;
			animate(ul,-num*lunbowith);
			circle++
			//先删掉其他圆圈的类名,留下当前
			if(circle==ol.children.length){
				circle=0;
			}
			for(var i=0;i<ol.children.length;i++){
				ol.children[i].className=""
			}
			ol.children[circle].className='current'
		})
			
})