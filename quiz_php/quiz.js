$(function() {
  'use strict';

  $('.answer').on('click', function() {
    var $selected = $(this); //クリックされた要素を変数に入れる。JQueryオブジェクトの場合は先頭に$をつける
    if($selected.hasClass('correct') || $selected.hasClass('wrong')) {
      return; //一度押した後に他のところもクリックできないようにする
    }
    $selected.addClass('selected');
    var answer = $selected.text(); //$selectedの中のテキストをanswerとして保持しておく
    //ajax処理を書いていく
    $.post('/_answer.php', { //指定したファイルにAjax処理を投げる
      answer: answer, //answerというキーに上記で定義したanswerを値として渡す
      token: $('#token').val()
    }).done(function(res) { //終わった後の処理をdoneに続けてかく
      $('.answer').each(function() { //answerクラスに対して全てつける
        if($(this).text() === res.correct_answer) {
          $(this).addClass('correct');
        } else {
          $(this).addClass('wrong');
        }
      });
      if(answer === res.correct_answer) {
        $selected.text(answer + ' ... CORRECT!');
      } else {
        $selected.text(answer + ' ... WRONG!');
      }
      $('#btn').removeClass('disabled');
    });
  });

  $('#btn').on('click', function() {
    if(!$(this).hasClass('disabled')) {
      location.reload();
    }
  });
});