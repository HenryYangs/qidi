// 请求成绩结果列表
function queryResultList() {
  showLoading();

  $.ajax({
    url: config.domain + '/bg/getResultList',
    method: 'get',
    dataType: 'json',
    success: function(res) {
      if (res.code === 0) {
        let str = '';
  
        // 渲染数据
        res.data.forEach(function(item) {
          str += '<tr><th scope="row">' + item.no + '</th><td>' + item.groupType + '</td><td>' + item.projectName + '</td><td>' + item.preliminaryContest.finalScore.toFixed(1) + '</td></tr>';
        });
  
        const $list = $('#list');

        $list.children().remove(); // 清空表格已有内容
        $list.append(str);
      } else {
        setResult('error', res.message);
      }

      hideLoading();
    },
    error: function() {
      setResult('error', '查询失败，请重试');
      hideLoading();
    }
  })
}

// 导入文件
function uploadFile(data, callback) {
  hideResult();
  showLoading();

  const formData = new FormData();

  formData.append('file', data);

  $.ajax({
    url: config.domain + '/bg/import',
    method: 'post',
    mimeType: 'multipart/form-data',
    dataType: "json",
    contentType: false,
　　processData: false,
    data: formData,
    success: function(res) {
      if (res.code === 0) {
        setResult('success', '上传成功');
      } else {
        setResult('error', res.message);
      }

      hideLoading();
      queryResultList(); // 导入文件后，重新请求列表
      callback();
    },
    error: function() {
      setResult('error', '上传失败，请重试');
      hideLoading();
      callback();
    }
  })
}

;(function() {
  queryResultList();

  $('#importTrigger').on('change', function() {
    /**
     * 上传完成后的回调函数
     * 清空上传按钮选中的值
     */
    function callback() {
      this.value = '';
    }

    uploadFile(this.files[0], callback.bind(this));
  })

  $('#import').on('click', function() {
    $('#importTrigger').click();
  })
})();