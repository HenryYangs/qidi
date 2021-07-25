// 提交登录请求
const submit = function() {
  const data = getParams();

  showLoading();
  $.ajax({
    url: config.domain + '/bg/login',
    method: 'post',
    data,
    dataType: 'json',
    success: function(res) {
      if (res.code === 0) {
        setResult('success', '登录成功，正在跳转');
        setTimeout(function() {
          location.replace(config.roadMap.index);
        }, 2000);
      } else {
        setResult('error', res.message);
      }

      hideLoading();
    },
    error: function() {
      postSubmit();
      setResult('error', '登录失败，请重试');
      hideLoading();
    }
  })
};

;(function () {
  $('#submit').on('click', function() {
    if (formValidate()) {
      hideResult();
      preSubmit();
      submit();
    }
  });
})();
