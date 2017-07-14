
/*
* 轮播图
*
* */
  //定义变量
  var val = 2000;  //时间间隔
  var  idx = 0;   //信号量
  var $lis = $('.imageslist li');    //图片列表
  var $cis = $('.circle li');    //小圆圈列表
  var timer;

  //1.设置定时器,定时换图片
  timer = setInterval(function () {
    idx++;
    handle();
  }, val);

  //2.鼠标移入停止
  $('.carousel').mouseenter(function () {
    clearInterval(timer);
  });

  //3.鼠标移出继续
  $('.carousel').mouseleave(function () {
    clearInterval(timer);
    timer = setInterval(function () {
      idx++;
      handle();
    }, val);
  });

  //4.按钮点击事件
  $('.btns').click(function (event) {
    //如果是左按钮
    if(event.target.className == 'leftBtn'){
      idx--;
      handle();
      console.log(idx);
    }

    //如果是右按钮
    if(event.target.className == 'rightBtn'){
      idx++;
      handle();
      console.log(idx);
    }
  });
  //5.小圆圈显示
  $('.circle').click(function (event) {
    $(event.target).addClass('current').siblings().removeClass('current');
    idx = $(event.target).index()+1;
    handle();
  });
  /*
 * 事件处理函数
 * */
  function handle() {
    if (idx < 1) idx = 5;
    if (idx > $lis.length) idx = 1;
    $lis.eq(idx-1).addClass('first').siblings().removeClass('first');
    $cis.eq(idx-1).addClass('current').siblings().removeClass('current');
  }
/***************轮播图 end****************/




/*
 * 翻页
 * creatPage();
 * 参数:
 *   - id:容器;
 *   -page:当前页;
 *   -pageSize:单页显示数量;
 *   -pageCount: 总页数;
 *   -callback:提示当前页和总页数
 *
 * */
var mark =  document.getElementById('mark');
creatPage({
  id : "page",
  // page : ,
  pageSize : 5,
  pageCount : 9
});
function creatPage(opt) {
  //1.取得元素
  var _obj = document.getElementById(opt.id);//取得容器节点
  var _page = parseInt(opt.page)>parseInt(opt.pageCount)? 1:parseInt(opt.page)||1;
  var _pageSize = parseInt(opt.pageSize)>parseInt(opt.pageCount)? 1:parseInt(opt.pageSize)||1;
  var _pageCount = opt.pageCount; //翻页总数
  //2.当是第一页,且点击上一页时
  if(_page != 1){
    var oA = document.createElement('a');
    oA.href = '#' + (_page - 1);
    oA.innerHTML = '上一页';
    _obj.appendChild(oA);
  } else {
    var oS = document.createElement('span');
    oS.className = "pageDisabled"
    oS.innerHTML = "上一页";
    _obj.appendChild(oS);
  }
    //3.当页码为1~3时
  if(_page>=1&&_page<=3){
    for(var i=1; i<_pageSize; i++){
      var oA = document.createElement('a');
      oA.href = "#" + i
      oA.innerHTML = i.toString().length==1 ? "0"+i : i;
      _obj.appendChild(oA);
    }
    var oS = document.createElement('span');
    oS.innerHTML = "...";
    _obj.appendChild(oS);
  }
  //4.当页码为4~6时
  if(_page>3&&_page<=6){
    var oA = document.createElement('a');
    var oS = document.createElement('span');
    oS.innerHTML = "...";
    oA.href = "#1";
    oA.innerHTML = "01";
    _obj.appendChild(oA);
    _obj.appendChild(oS);
    for( var j=0;j<2; j++){
      var oA = document.createElement('a');
      oA.href = "#" +(_page+j);
      oA.innerHTML = (_page+j).toString().length==1 ? "0"+(_page+j): _page+j;
      _obj.appendChild(oA);
    }
    var oS = document.createElement('span');
    oS.innerHTML = "...";
    _obj.appendChild(oS);
  }
  //5.当页码为7~9时
  if(_page>6&&_page<=9 ){
    var oA = document.createElement('a');
    var oS = document.createElement('span');
    oA.href = '#01';
    oA.innerHTML = "01";
    oS.innerHTML = "...";
    _obj.appendChild(oA);
    _obj.appendChild(oS);
    for(var k=0; k<3; k++){
      var oA = document.createElement('a');
      oA.href = "#" +(7+k);
      oA.innerHTML ="0"+(7+k);
      _obj.appendChild(oA);
    }
  }
  //6.当是最后一页, 且点击下一页时
  if(_page != _pageCount){
    var oA = document.createElement('a');
    oA.href = '#' + (_page + 1);
    oA.innerHTML = "下一页";
    _obj.appendChild(oA);
  } else {
    var oS = document.createElement('span');
    oS.className = "pageDisabled";
    oS.innerHTML = "下一页";
    _obj.appendChild(oS);
  }
  //7.回调函数
  (function (pagenow,pagecount) {
        mark.innerHTML = '当前页' + pagenow +',总共页' + pagecount;
      })(_page,_pageCount);

  var cA = _obj.getElementsByTagName('a');
  for(var i=0; i<cA.length; i++){
    cA[i].onclick = function () {
      var pagenum = parseInt(this.getAttribute('href').substring(1));
      _obj.innerHTML = "";
      creatPage({
        id : opt.id, //容器id
        page : pagenum, //当前页
        pageSize : opt.pageSize, //显示数目
        pageCount : opt.pageCount //必选参数
      });
      return false;
    }
  }
  //8.更新热门商品
  shop.api.fetchHotGoods(_page,12,function (response) {
    // console.log(response.data);
    var content = "";
    for(var i = 0; i < response.data.length; i++){
      var obj = response.data[i];
      console.log(obj);
      content += `
        <li>
          <div calss="like"></div>
          <a href="pro_center.html?goods_id=${obj.goods_id}" >
            <img src="${obj.goods_thumb}"/>
            <div class="content">
              <span>￥${obj.price}'</span>
              <h4>${obj.goods_name}</h4>
              <p>${obj.goods_desc}</p>
            </div>
          </a>
          <h3>
            <img class="min-img" src="${obj.goods_thumb}"/>
            <p>无法获取数据</p>
          </h3>
        </li> 
            `
    }
      // console.log(content);
    $('#hot-list').html(content);
  });
}
// /****************翻页****************/
