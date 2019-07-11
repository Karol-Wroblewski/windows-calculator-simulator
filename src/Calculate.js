const calculate = function(top, main) {
  let result = 0;
  let i = 0;
  let number = top.slice(0, this.state.symbol[0] - 1);
  number = number.replace(',', '.');
  result = number;
  this.state.symbol.forEach(function(position){
    
    
    let number1 = top.slice(0, this.state.symbol[i] - 1);
    number1 = number1.replace(',', '.');
    if(this.state.operation[i] === 1)
      {
       result = result * number1
      }
    else if(this.state.operation[i] === 2)
      {
       result = (result * 1) / (number1 * 1)
      }
    else if(this.state.operation[i] === 3)
      {
       result = (result * 1) + (number1 * 1)
      }
    else if(this.state.operation[i] === 4)
      {
       result = (result * 1) - (number1 * 1)
      }
      i++;
  })

  let tempMain = main.replace(',', '.');
  if(this.state.operation[i] === 1)
      {
       result = result * tempMain
      }
    else if(this.state.operation[i] === 2)
      {
       result = (result * 1) / (tempMain * 1)
      }
    else if(this.state.operation[i] === 3)
      {
       result = (result * 1) + (tempMain * 1)
      }
    else if(this.state.operation[i] === 4)
      {
       result = (result * 1) - (tempMain * 1)
      }
  result = result.toFixed(9).toString().replace('.', ',');
  return result;
}