export let sum = (...m)=>{
  let total = 0;
  for (let v of m){
    if (v) total+=v
  }
  return total
};

export let minus = (x,y)=>x-y;
