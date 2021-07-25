// 重置表单
const resetForm = function() {
  const $form = $('#form');

  $form.find('[data-label="validate"]').remove();
  $form.removeClass('was-validated');
  slice.call($form.find('input'))
    .forEach(function(item) {
      $(item).val('');
    });
};

// 模拟提交，跳转链接后再请求数据
const submit = function() {
  location.href = config.roadMap.result + '?' + getParams(true);
};

;(function () {
  $('#submit').on('click', function() {
    if (formValidate()) {
      $('#submit').attr('disabled', true).find('#spinner').removeClass('visually-hidden');
      $('#reset').attr('disabled', true);
      submit();
    }
  });

  $('#reset').on('click', resetForm);
})();
