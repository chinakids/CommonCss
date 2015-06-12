/**
 *   说明 : 新房公共部分，页面效果以及初始化方法
 *   依赖 : jquery
 *   编写 : chinakids
 *   时间 : 2015-06-11
 */
$(function(){
  "use strict";
   /**
    * 下拉控制
    */
  $(document).on('click','.select',function(){
      var _this = $(this);
      _this.find('.option').slideToggle(100);
  });
  $(document).on('click','.option li',function(){
      var _this = $(this),
          text = _this.text(),
          val = _this.attr('value');
      _this.parent().siblings('span').text(text).attr('value',val);
  });
   /**
    * tab切换控制
    */
  $('.tab-x li,.tab-y li,.tab li,.tab-o li').click(function(){
      var index = $(this).index();
      $(this).addClass('cur').siblings('li').removeClass('cur');
      $(this).parent().siblings('.tab-main').find('> .tab-box').eq(index).show().siblings('.tab-box').hide();
  });
   /**
    * 侧边栏（比一比和历史）
    */
  $('.jq-history,.jq-compare').click(function(event) {
    var _this = $(this).siblings('.history'),
        _attr = $(this).attr('data-fade') || 0;
    if(_attr == 0){
      $(this).attr('data-fade',1);
      _this.fadeIn(100,function(){
        _this.find('.jq-clear').bind('click',function() {
          _this.find('input').each(function() {
            $(this).val('');
          });
        });
        _this.find('.btn-back').bind('click',function(){
          _this.fadeOut(100, function() {
            _this.find('.btn-back,.jq-clear').unbind('click');
          });
        })
      });
    }else{
      $(this).attr('data-fade',0);
      _this.fadeOut(100, function() {
        _this.find('.btn-back,.jq-clear').unbind('click');
      });
    }
   });
  /**
   * 分页page自动填充，翻页控制
   */
  function createPage(ele){
    var cur = ele.attr('data-cur'),
        count = ele.attr('data-count'),
        html = '<li data-page="prev"><</li>';
    if(cur==undefined || count == undefined){
      return false;
    }
    if(parseInt(count) > 10){
      if((parseInt(cur)-5)>0){
        if((parseInt(cur)-5)>=2 && parseInt(cur)<(parseInt(count)-3)){
          html += '<li data-page=1>1</li><li>···</li>';
          for(var key=(parseInt(cur)-3);key<=(parseInt(cur)+2);key++){
            html +='<li class="'+(key == cur ? 'cur' : '')+'" data-page='+key+'>'+key+'</li>';
          }
          html += '<li>···</li><li data-page='+count+'>'+count+'</li>';
        }else if((parseInt(cur)-5)<2){
          for(var key=1;key<=8;key++){
            html +='<li class="'+(key == cur ? 'cur' : '')+'" data-page='+key+'>'+key+'</li>';
          }
          html += '<li>···</li><li data-page='+count+'>'+count+'</li>';
        }else if(parseInt(cur)>=(parseInt(count)-3)){
          html += '<li data-page=1>1</li><li>···</li>';
          for(var key=(parseInt(count)-7);key<=count;key++){
            html +='<li class="'+(key == cur ? 'cur' : '')+'" data-page='+key+'>'+key+'</li>';
          }
        }
      }else{
        for(var key=1;key<=8;key++){
          html +='<li class="'+(key == cur ? 'cur' : '')+'" data-page='+key+'>'+key+'</li>';
        }
        html += '<li>···</li><li data-page='+count+'>'+count+'</li>';
      }

    }else{
      for(var key=1;key<=count;key++){
        html +='<li class="'+(key == cur ? 'cur' : '')+'" data-page='+key+'>'+key+'</li>';
      }
    }
    html += '<li data-page="next">></li>';
    ele.html(html);
  }
  $('.page').each(function(index, el) {
    createPage($(this));
  });
  $(document).on('click','.page li',function(){
    var page = $(this).attr('data-page'),
        cur = $(this).parent('.page').attr('data-cur'),
        count = $(this).parent('.page').attr('data-count');
    if(page == undefined){
      return false;
    }
    if(page == 'prev'){
      if(parseInt(cur) == 1){
        return false;
      }else{
        $(this).parent('.page').attr('data-cur',(parseInt(cur)-1));
        createPage($(this).parent('.page'));
        return false;
      }
    }
    if(page == 'next'){
      if(parseInt(cur) == count){
        return false;
      }else{
        $(this).parent('.page').attr('data-cur',(parseInt(cur)+1));
        createPage($(this).parent('.page'));
        return false;
      }
    }
    $(this).parent('.page').attr('data-cur',page);
    createPage($(this).parent('.page'));
  })
})