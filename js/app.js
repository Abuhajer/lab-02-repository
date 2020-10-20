'use strict';
let Alldata=[];
let sortTitle=false;
let sortHorns=false;

function Horns(horn) {
  this.title = horn.title;
  this.image = horn.image_url;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
}
let tempSectioin;
tempSectioin = $('#templates').html();

// Horns.prototype.render = function () {
//   let HornClone;
//   if (firstTime) {
//     HornClone = $('#photo-template');
//   } else {
//     HornClone = $('#photo-template').clone();
//   }
//   firstTime = false;
//   $('main').append(HornClone);
//   HornClone.find('h2').text(this.title);
//   HornClone.find('img').attr('src', this.image);
//   HornClone.find('p').text(this.description);
//   HornClone.attr('class', this.name);
// };

Horns.prototype.render = function () {
  let temp = $('#templates').html();
  let editHtml = Mustache.render(temp, this);
  let sec = $('<section></section>');
  sec.append(editHtml);
  sec.addClass('photo-template');
  $('#templates').append(sec);
};

let options = [];
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

const ajaxSettings = {
  method: 'get',
  dataType: 'json',
};
$('#page1').on('click', function () {
  options = [];
  $('select').empty();
  $('select').html('<option value="default">Filter by Keyword</option>');
  $('#templates').empty();
  $('#templates').html(tempSectioin);

  $.ajax('data/page-1.json', ajaxSettings).then((data) => {
    Alldata=data;
    if(sortTitle)
    {
      Alldata.sort((a, b) => {
        if (a.title.toUpperCase() > b.title.toUpperCase()) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    if(sortHorns)
    {
      Alldata.sort((a, b) => {
        if (a.horns - b.horns) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    if(sortHorns)
    {
      Alldata.sort((a, b) => {
        return(a.horns - b.horns) ;
      });
    }
    let optionChose = 'default';
    $('select').change(function () {
      optionChose = $(this).children('option:selected').val();
      $('#templates').empty();
      $('#templates').html(tempSectioin);
      Alldata.forEach((hornObj) => {
        let horn = new Horns(hornObj);
        //---------------------------
        if (optionChose === horn.keyword) {
          horn.render();
        } else if (optionChose === 'default') {
          horn.render();
          horn.selectOptions();
        }
      });
    });
    Alldata.forEach((hornObj) => {
      let horn = new Horns(hornObj);
      //---------------------------
      if (optionChose === 'default') {
        horn.render();
        horn.selectOptions();
      }
    });
  });
});

$('#page2').on('click', function () {
  options = [];
  $('select').empty();
  $('select').html('<option value="default">Filter by Keyword</option>');
  $('#templates').empty();
  $('#templates').html(tempSectioin);
  $.ajax('data/page-2.json', ajaxSettings).then((data) => {
    Alldata=data;
    if(sortTitle)
    {
      Alldata.sort((a, b) => {
        if (a.title.toUpperCase() > b.title.toUpperCase()) {
          return 1;
        } else {
          return -1;
        }
      });
    }

    if(sortHorns)
    {
      Alldata.sort((a, b) => {
        return(a.horns - b.horns) ;
      });
    }
    let optionChose = 'default';
    $('select').change(function () {
      optionChose = $(this).children('option:selected').val();
      $('#templates').empty();
      $('#templates').html(tempSectioin);
      Alldata.forEach((hornObj) => {
        let horn = new Horns(hornObj);
        //---------------------------
        if (optionChose === horn.keyword) {
          horn.render();
        } else if (optionChose === 'default') {
          horn.render();
          horn.selectOptions();
        }
      });
    });
    Alldata.forEach((hornObj) => {
      let horn = new Horns(hornObj);
      //---------------------------
      if (optionChose === 'default') {
        horn.render();
        horn.selectOptions();
      }
    });
  });
});

$.ajax('data/page-1.json', ajaxSettings).then((data) => {
  Alldata=data;
  sortTitle=true;
  if(sortTitle)
  {
    Alldata.sort((a, b) => {
      if (a.title.toUpperCase() > b.title.toUpperCase()) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  let optionChose = 'default';
  $('select').change(function () {
    optionChose = $(this).children('option:selected').val();
    $('#templates').empty();
    $('#templates').html(tempSectioin);
    Alldata.forEach((hornObj) => {
      let horn = new Horns(hornObj);
      //---------------------------
      if (optionChose === horn.keyword) {
        horn.render();
      } else if (optionChose === 'default') {
        horn.render();
        horn.selectOptions();
      }
    });
  });
  Alldata.forEach((hornObj) => {
    let horn = new Horns(hornObj);
    //---------------------------
    if (optionChose === 'default') {
      horn.render();
      horn.selectOptions();
    }
  });
});


$('#byTitle').on('click', function () {
  sortTitle=true;
  sortHorns=false;

});

$('#byHorns').on('click', function () {
  sortTitle=false;
  sortHorns=true;
});



console.log(Alldata);
