/**
 * 表单公共函数
 */

const slice = Array.prototype.slice;
// 表单校验
const formValidate = function() {
  const $form = $('#form');
  let result = true;

  $form.find('[data-label="validate"]').remove();

  slice.call($form.find('input'))
    .forEach(function(item) {
      const $item = $(item);

      if (!$item.val()) {
        $item.after('<div class="invalid-feedback" data-label="validate">请输入' + $item.attr('aria-label') + '</div>');
        result = false;
      }
    });

  $form.addClass('was-validated');
  return result;
};

// 获取表单参数
const getParams = function(needStr) {
  const $form = $('#form');
  const $inputs = $form.find('[data-key]');
  const params = {};

  slice.call($inputs)
    .forEach(function(input) {
      const $input = $(input);

      params[$input.attr('data-key')] = $input.val();
    });
  
  return needStr ? Object.keys(params).map(function(key) { return key + '=' + params[key] }).join('&') : params;
}

// 切换元素禁用
const toggleItemDisabled = function(disabled, parent) {
  slice.call(parent.find('[data-key]'))
    .forEach(function(input) {
      $(input).attr('disabled', disabled);
    });
}

// 表单提交前的钩子函数
const preSubmit = function() {
  const $form = $('#form');

  toggleItemDisabled(true, $form);
  $form.find('#submit').attr('disabled', true).find('#spinner').removeClass('visually-hidden');
};

// 表单提交后的钩子函数
const postSubmit = function() {
  const $form = $('#form');

  toggleItemDisabled(false, $form);
  $form.find('#submit').attr('disabled', false).find('#spinner').addClass('visually-hidden');
}
