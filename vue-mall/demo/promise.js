let checkLogin = () => {
  return new Promise((resolve, reject) => {
    let flag = document.cookie.indexOf("userId") > -1 ? true:false;
    if (flag){
      resolve({
        status:0,
        result:true,
      })
    }else{
      reject("error-by reject")//一般情况下，reject会报错，所以不建议写在else此处
    }
  })
};

let getUserInfo = ()=>{
  return new Promise((resolve => {
    resolve({
      UserId:1,
    })
  }))
};

checkLogin().then(res=>{
  console.log(res.status,res.result);
  return getUserInfo()
}).catch(error=>{
  console.log(error)
}).then(res2=>{
  console.log(`userInfo:${res2.UserId}`)
});

Promise.all([checkLogin(),getUserInfo()]).then(([res1,res2])=>{
  console.log(`all--res1:${res1.status},res2:${res2.UserId}`)
});
