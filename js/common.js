// 全局配置
const config = {
  domain: 'http://101.201.153.220:6724',
  roadMap: {
    index: 'file:///Users/henry/Desktop/code/pt%20code/grades/index.html',
    login: 'file:///Users/henry/Desktop/code/pt%20code/grades/login.html',
    management: 'file:///Users/henry/Desktop/code/pt%20code/grades/management.html',
    result: 'file:///Users/henry/Desktop/code/pt%20code/grades/result.html'
  }
}

// 挂载loading元素
function addLoading() {
  $('body').append(`
  <div id="loading" class="d-none" style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(0, 0, 0, .4)">
    <div class="d-flex justify-content-center align-items-center" style="height: 100%">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>`);
}

// 展示loading
function showLoading() {
  if (!$.find('#loading').length) addLoading();

  $('#loading').removeClass('d-none');
}

// 隐藏loading
function hideLoading() {
  $('#loading').addClass('d-none');
};

// 挂载请求结果元素
function addResult() {
  $('nav').after('<div class="alert d-none" role="alert" id="result"></div>');
}

// 设置请求结果元素的类型和内容
function setResult(status, text) {
  if (!$.find('#result').length) {
    addResult();
  }

  $('#result').removeClass('alert-success alert-danger')
    .addClass(function() {
      if (status === 'success') return 'alert-success';
      if (status === 'error') return 'alert-danger';
    })
    .text(text).removeClass('d-none');
}

// 隐藏请求结果元素
function hideResult() {
  $('#result').addClass('d-none');
}

// 心跳请求
function heartBeat() {
  $.ajax({
    url: config.domain + '/bg/heartBeat',
    method: 'get',
    dataType: 'json',
    success: function(res) {
      if (res.code !== 0) {
        location.href = config.roadMap.login;
        return;
      }

      setTimeout(heartBeat, 3000);
    },
    error: function() {
      location.href = config.roadMap.login;
    }
  })
}

;(function() {
  if (!location.href.includes('login')) {
    heartBeat();
  }
})();
