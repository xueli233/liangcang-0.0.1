//用户登录信息接入
if (localStorage.getItem('token')) {
	    $('.usrImg').attr("src", "images/header_d_head.png")
        $('.usrName').text(localStorage.getItem('username'));
        $("#inxusr").show(); 
        $(".login-btn, .register-btn").hide();
}
//退出登录
$(".exit").click(function(){
         localStorage.removeItem("username");
         localStorage.removeItem("password");
         localStorage.removeItem("token"); 
         $("#inxusr").hide();
         $(".login-btn, .register-btn").show();
})
//搜索功能
var str = 1;
var oSearch = $('.search-input');
$('.search-icon').click(function() {
	if ($("#glb_keyword").val() == 0 ) {
		if (str === 1) {
			oSearch.animate({
		       "left": 10
		    },500);
		   str = 2 ; 
		   return;
		}
		if ( str === 2) {
			oSearch.animate({
		       "left": 266
		    },500);
		    str = 1;
		}
	} else {		
		if (/^\s+$/g.test($("#glb_keyword").val())) {
			alert("请输入内容");
		} else {
			location.href = 'search.html?search_text=' + $("#glb_keyword").val();
		}
	}
});	
var searchText = $.getQueryString('search_text');
var oSearchText = document.getElementById("glb_keyword");
oSearchText.value = searchText;
searchGoods();

function searchGoods () {
	$.ajax({
    "url": 'http://lc.shudong.wang/api_goods.php?search_text=' + searchText,
    'type': 'GET',
    'dataType': 'json',
    'success': function(response) {
      // console.log(response);
      var content = "";
      for (var i = 0; i < response.data.length; i++) {
        var obj = response.data[i];
        content += `
            <div class= "sea-list">
              <div class="like"></div>
              <div class="goods-img">
                 <a href="">
                    <img class="img-1" src="${obj.goods_thumb}"/>
                    <img class="img-2" src = "images/icon_car_black.png" />
	             </a>
	          </div>
	          <div class="sea-shop">
	             <span>￥${obj.price}
	                 <a href="cart.html">
	                    <img src = "images/icon_car.png"
	                 </a>
	             </span>
	             <a href="pro_center.html?goods_id=${obj.goods_id}" class="con">
	                ${obj.goods_name}
	             </a>
	          </div>
	        </div>`;
      }
	$('.section-list').html(content);
    }
  });
}



		

	
	


//获取商品列表
$.ajax({
	"url": 'http://lc.shudong.wang/api_cat.php',
	"type": "get",
	"dataType": "json",
	"success": function(response) {
		for (var i = 0; i < response.data.length; i++) {
			var obj = response.data[i];
		    $(".list").append(
		    	'<li><a href="pro_list.html?cat_id='
		    	+ obj.cat_id
		    	+ '"><img src="./images/index/index_img'
		    	+ i +'.png"/><p>' 
		    	+obj.cat_name
		    	+ '</p></a></li>') ;      
        }
	},
	"error": function(message) {
		console.log(message);
	}
});
  /*
   * 商品列表展示
   * */
  function iHover() {
    $('.items').hover(function (e) {
      var _this = $(this), //闭包 //
          _desc = _this.find('.desc').stop(true),
          width = _this.width(),//取得元素宽
          height = _this.height(),//取得元素高
          left = e.offsetX || e.originalEvent.layerX, //取得左边界
          top = e.offsetY || e.originalEvent.layerY, //取得右边界
          right = width - left, //计算出右边界
          bottom = height - top, //计算出边界
          _out = e.type == "mouseleave",//是否是离开事件
          spos = {}, //起始位置
          way = 'none', //存储进入或离开的方向
          _exec = function (way) {
            spos = {
              left: {"left": -width, "top": 0},
              right: {"left": left, "top": 0},
              top: {"top": -height, "left": 0},
              bottom: {"top": height, "left": 0}
            }[way];

            if (_out) {
              _desc.animate(spos, 'fast');
            } else {
              _desc.css(spos).animate({"left": 0, "top": 0}, 'fast');//进入
            }
          };
      //判断进入/离开的方向
      if (_out) {
        //对象的边界矩阵和当前鼠标的坐标
        var _rect = {
              left: _this.offset().left,
              right: _this.offset().left + _this.width(),
              top: _this.offset().top,
              bottom: _this.offset().top + _this.height()
            },
            pos = (e.pageX || e.pageY) ? {x: e.pageX, y: e.pageY} : {
                  x: e.clientX + document.body.scrollLeft - document.body.clientLeft,
                  y: e.clientY + document.body.scrollTop - document.body.clientTop
                };
        //判断离开的方向
        if (pos.y <= _rect.top) {
          way = 'top';
        } else if (pos.y >= _rect.bottom) {
          way = 'bottom';
        } else if (pos.x <= _rect.left) {
          way = 'left';
        } else {
          way = 'right';
        }
        ;
      } else {
        //获取进入的方向
        way = [{way: 'left', v: left}, {way: 'right', v: right}, {way: 'top', v: top}, {
          way: 'bottom',
          v: bottom
        }].sort(function (a, b) {
          return a.v - b.v;
        })[0].way;
      }
      ;
      //消灭卡顿现像
      $(".desc").hide();
      _this.find('.desc').show();
      // 执行对应边界 进入/离开 的方法
      _exec(way);
    });
  }