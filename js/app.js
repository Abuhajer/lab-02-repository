'use strict';

function Horns(horn) {
  this.title = horn.title;
  this.image = horn.image_url;
  this.description = horn.description;
  this.keyword=horn.keyword;
  this.horns=horn.horns;
}
let firstTime=true;
let tempSectioin=$('#photo-template').clone();
Horns.prototype.render = function () {

  let HornClone;
  if (firstTime){
    HornClone = $('#photo-template');
  }
  else{
    HornClone = $('#photo-template').clone();
  }
  firstTime=false;
  $('main').append(HornClone);
  HornClone.find('h2').text(this.title);
  HornClone.find('img').attr('src', this.image);
  HornClone.find('p').text(this.description);
  HornClone.attr('class', this.name);
};

let options=[];
Horns.prototype.selectOptions=function (){
  let inc=options.includes(this.keyword);
  if (!inc){
    let option=$('<option></option>');
    option.text(this.keyword);
    option.val(this.keyword);
    $('select').append(option);
    options.push(this.keyword);
  }
};



const ajaxSettings = {
  method: 'get',
  dataType: 'json',
};

$.ajax('../data/page-1.json', ajaxSettings).then((data) => {
  let optionChose='default';
  $('select').change(function() {
    optionChose=$(this).children('option:selected').val();
    $('main').html('');
    firstTime=true;
    $('main').append(tempSectioin);
    data.forEach((hornObj) => {
      let horn=new Horns(hornObj);
      //---------------------------
      if(optionChose===horn.keyword){
        horn.render();
      }
      else if(optionChose==='default'){
        horn.render();
        horn.selectOptions();
      }
    });
  });
  data.forEach((hornObj) => {
    let horn=new Horns(hornObj);
    //---------------------------
    if(optionChose==='default'){
      horn.render();
      horn.selectOptions();
    }

  });
});
