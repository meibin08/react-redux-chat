import promise from 'es6-promise'
import fetch from 'isomorphic-fetch'
// import StaticToast from 'src/components/common/toast'

promise.polyfill();

export const fetchJson = (options) => {

  // if (process.env.DEPLOY_ENV || 'dev' == 'dev' && options.url.indexOf('/api/crius/person/resource') > -1) {
  //   options.url = 'https://healthindex.wilddogio.com/' + options.url.replace(/\//g,"_");
  //   if (options.url.indexOf('?') > -1) {
  //     options.url = options.url.replace('?','.json?');
  //   } else {
  //     options.url += '.json'
  //   }
  // }
options.url ="https://easy-mock.com/mock/59294d8e91470c0ac1fe8a4c/staff"+options.url;
  const { url, type, data, ...others } = options;
  let opts = {
    ...others,
    method: type || 'get',
    // credentials: 'include',// 日志上报的，需求注释这一行
    headers: {
      'X-Avoscloud-Application-Id': 'toi4KhzlzSCXvIzkI9FHIEt5-gzGzoHsz',
      'X-Avoscloud-Application-Key':'5NNtepVs7mF6R8U8TPjImffo',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  if (['POST', 'PUT'].indexOf(opts.method.toUpperCase()) >= 0) {
    opts.body = JSON.stringify(data)
  }

  fetch(url, opts)
    .then(resData => toJson(resData, opts))
    .then(resData => resHandler(resData, opts))
    // .catch(error => errorHandler(error, opts))
}

export const fetchFormData = (options) => {

  const { url, type, data, ...others } = options;

  let opts = {
    ...others,
    method: type || 'get',
    credentials: 'include',
  }

  if (['POST', 'PUT'].indexOf(opts.method.toUpperCase()) >= 0) {
    opts.body = data
  }

  fetch(url, opts)
    .then(resData => toJson(resData, opts))
    .then(resData => resHandler(resData, opts))
    // .catch(error => errorHandler(error, opts))
}


function toJson(resp, options) {
  if (resp.status >= 400) {
    return errorHandler(null, options, resp.status)
  }
  return resp.json()
}

// 请求成功处理
function resHandler(resData, options) { 

  if (resData.status && resData.status != 200) {
    return errorHandler(resData.error, options, resData.status);
  }

  if (!resData || resData.code > 20000) {
    options.error && options.error(resData)
    console.log(resData.message);
  } else {
    options.success && options.success(resData);
  }
}

// 异常处理
function errorHandler(error, options, status) {
  options.error && options.error(error);
  console.log(`网络异常，请稍后重试(${status})`)
}
