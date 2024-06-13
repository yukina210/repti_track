document.addEventListener('turbo:load', function() {
    const button = document.querySelector('.btn-api');
    const form = document.querySelector('#google_oauth2_form');
  
    if (button && form) {
      button.addEventListener('click', function(event) {
        event.preventDefault();
        console.log("Googleでサインアップボタンがクリックされました");
        form.submit();
      });
    } else {
      console.log("ボタンまたはフォームが見つかりません");
    }
  });
  