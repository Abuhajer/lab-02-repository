'use strict';
//------------------------------------------
//Main Variables
let sortTitle = true;
let sortHorns = false;
let options = [];
let tempSectioin = $('#templates').html();
const ajaxSettings = { method: 'get', dataType: 'json' };
let jsonFilePath = 'data/page-1.json';
let optionChose = 'default';
//------------------------------------------
//Object Horns Constructor
function Horns(horn) {
  this.title = horn.title;
  this.image = horn.image_url;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
}
//------------------------------------------
//Render function
Horns.prototype.render = function () {
  let temp = $('#templates').html();
  let editHtml = Mustache.render(temp, this);
  let sec = $('<section></section>');
  sec.append(editHtml);
  sec.addClass('photo-template');
  $('#templates').append(sec);
};
//------------------------------------------
//set the option after render
Horns.prototype.selectOptions = function () {
  let inc = options.includes(this.keyword);
  if (!inc) {
    let option = $('<option></option>');
    option.text(this.keyword);
    option.val(this.keyword);
    $('select').append(option);
    options.push(this.keyword);
  }
};
//------------------------------------------
//Page 1 Listener
$('#page1').on('click', function () {
  optionChose = 'default';
  jsonFilePath = 'data/page-1.json';
  start(jsonFilePath, optionChose);
});
//------------------------------------------
//Page 2 Listener
$('#page2').on('click', function () {
  optionChose = 'default';
  jsonFilePath = 'data/page-2.json';
  start(jsonFilePath, optionChose);
});
//------------------------------------------
//strating rendering after check what page,order and filter
function start(jsonFilePath, optionChose) {
  clearTemp();
  $.ajax(jsonFilePath, ajaxSettings).then((data) => {
    if (sortTitle) {
      titleSort(data)
    }
    else if (sortHorns) {
      hornSort(data)
    }
    data.forEach((hornObj) => {
      let horn = new Horns(hornObj);
      //---------------------------
      if (optionChose === 'default') {
        horn.render();
        horn.selectOptions();
      }
      else if (optionChose === horn.keyword) {
        horn.render();
        horn.selectOptions();
      }
      else
      {
        horn.selectOptions();
      }
    });
  });
}
//------------------------------------------
//listener when change filter
$('select').change(function () {
  optionChose = $(this).children('option:selected').val();
  $('#templates').empty();
  $('#templates').html(tempSectioin);
  start(jsonFilePath,optionChose);
});
//------------------------------------------
//listener when change order by title
$('#byTitle').on('click', function () {
  sortTitle = true;
  sortHorns = false;
  start(jsonFilePath,optionChose);
});
//------------------------------------------
//listener when change order by Horns
$('#byHorns').on('click', function () {
  sortTitle = false;
  sortHorns = true;
  start(jsonFilePath,optionChose);
});
//------------------------------------------
//To clear the template
function clearTemp() {
  options = [];
  $('select').empty();
  $('select').html('<option value="default">Filter by Keyword</option>');
  $('#templates').empty();
  $('#templates').html(tempSectioin);
}
//------------------------------------------
//sorting by title
function titleSort(arr) {
  arr.sort((a, b) => {
    if (a.title.toUpperCase() > b.title.toUpperCase()) {
      return 1;
    } else {
      return -1;
    }
  });

}
//------------------------------------------
//sorting by number of horn
function hornSort(arr) {
  arr.sort((a, b) => {
    return (a.horns - b.horns);
  });
}


start(jsonFilePath, optionChose);
