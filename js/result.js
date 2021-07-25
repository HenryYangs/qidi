// 获取url带的参数并校验
function getParams() {
  const search = location.search.replace('?', '');
  const params = {};
  let valid = true;

  search.split('&').some((function(item) {
    const prop = item.split('=');
    const key = prop[0];
    const value = prop[1];

    if (!value) {
      valid = false;
      return true;
    }

    params[prop[0]] = key === 'directorMobile' ? Number(prop[1]) : prop[1];
    return false;
  }));

  if (!valid) {
    setResult('error', '参数错误，请返回重试');
    throw new Error('参数错误');
  }

  return params;
}

// 根据url上的参数请求数据
function loadData() {
  const params = getParams();

  if (!params) return;

  showLoading();
  $.ajax({
    url: config.domain + '/getResult',
    method: 'get',
    data: params,
    dataType: 'json',
    success: function(res) {
      const data = res.data;
      const final = {
        no: data.no,
        groupType: data.groupType,
        projectName: data.projectName,
        finalScore: data.preliminaryContest.finalScore.toFixed(1),
      }

      // 渲染数据
      Object.keys(final).forEach(function(key) {
        $('#' + key).text(final[key]);
      });
      hideLoading();
    },
    error: function() {
      setResult('error', '查询失败，请重试');
      hideLoading();
    }
  });
}

;(function() {
  $('#redirect').attr('href', config.roadMap.index);
  loadData();
})();
