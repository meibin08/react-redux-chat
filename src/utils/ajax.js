

export const ajaxJson = (options) => {

  // options.url ="https://easy-mock.com/mock/59294d8e91470c0ac1fe8a4c/staff"+options.url;
  options.url ="http://dev.szfb.hongan.com/staff"+options.url;
  const { url, type, data, ...others } = options;

  let opts = {
    type: type || 'get',
    url,
    data,
    success:(resData)=>{
      resHandler(resData,options)
    },
    error:(error,status)=>{
      errorHandler(error,options,status)
    },
  }
  $.ajax(opts);
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

  if (!resData || resData.res > 20000) {
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
