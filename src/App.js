import React from 'react';
import TopBar from '../src/TopBar'
import Screen from '../src/Screen'
import MemoryButtons from '../src/MemoryButtons'
import Buttons from '../src/Buttons'
import TypeCalculator from '../src/TypeCalculator'
import Warming from '../src/Warming'
import './App.css';
import './style/Mobile.css'

function setCharAt(str,index,chr) {
  if(index > str.length-1) return str;
  return str.substr(0,index) + chr + str.substr(index + 1);
}

const fitString = function(result)
{
  result = result.toString();
  result = result.replace(/ /g, '');
  let max = (result.search(',') === -1 ? result.length : result.search(','));
  for(let i = max - 1; i >= 0; i--)
  {
    if(i > max - 3)
      continue;
    else if(i === max - 3)
      result = result.slice(0, i) + " " + result.slice(i);
    else if((result[i + 1] !== ' ') && (result[i + 2] !== ' ') && (result[i + 3] !== ' '))    
      result = result.slice(0, i + 1) + " " + result.slice(i + 1);
  }

  return result;

}

const calculate = function(top, main, symbol, operation) 
{
    let result = 0;
    let i = 1;
    let number;
    number = top.slice(0, symbol[0]);
    number = countNumber(number) * 1;
    result = number;
  
    symbol.forEach(function(position){
      
      if(symbol.length > i)
      {
        
        number = top.slice(symbol[i - 1] + 1, symbol[i] - 1);
        number = countNumber(number) * 1;
    
      if(operation[i - 1] === 1)
        {
         result = result * number
        }
      else if(operation[i - 1] === 2)
        {
         result = (result * 1) / (number * 1)
        }
      else if(operation[i - 1] === 3)
        {
         result = (result * 1) - (number * 1)
        }
      else if(operation[i - 1] === 4)
        {
         result = (result * 1) + (number * 1)
        }
        i++;
  
      }
    })
  
    let tempMain = main.toString();
    tempMain = tempMain.replace(',', '.');
    if(operation[i - 1] === 1)
        {
         result = result * tempMain
        }
      else if(operation[i - 1] === 2)
        {
          if(tempMain * 1 === 0)
          {
            return "divideError";
          }
         result = (result * 1) / (tempMain * 1)
        }
      else if(operation[i - 1] === 3)
        {
         result = (result * 1) - (tempMain * 1)
        }
      else if(operation[i - 1] === 4)
        {
         result = (result * 1) + (tempMain * 1)
        }
  
        result = result.toString();
    result = result.replace(',', '.');
     result = parseFloat(result);
    result = round(result);
    result = result.toString().replace('.', ',');
    if(result.length >= 13)
    {
      changeFont(-1);
    }
    else
      changeFont(5);
  
    return result;
  }



const countNumber = function(string)
{
  string = string.replace(/ /g, '');
  let operations = [];
  while(1)
  {
    if(string[0] === "s")
    {
      string = string.slice(4, string.length - 1);
      operations.push(2);
    }
    else if(string[0] === "√")
    {
      string = string.slice(2, string.length - 1);
      operations.push(1);
    }
    else if(string[1] === "/" )
    {
      string = string.slice(3, string.length - 1);
      operations.push(3);
    }
    else
      break;
  }
  string = string.replace(',', '.');
  let number = string * 1;

  while(operations.length)
  {
    let temp = operations.pop();
    if(temp === 1)
      number = Math.sqrt(number);
    else if(temp === 2)
      number = number * number;
    else
      number = 1 / number;
  }
  return number;
}

const changeFont = function(param)
{
  const screen = document.getElementById('main');
  if(param === -1)
    screen.style.fontSize = "34px";
  else
    screen.style.fontSize = "46px";
}

const round = function(number)
{
  number = number.toString().replace(/ /g, '');
  let cut = 0;
  if(number.length > 18)
    cut = number.length - 18;

  number = number.toString();
  number = number.replace('.', ',');

  let from = number.search(",");
  if(from === -1) from = 0;
  let postString = number.slice(from);

  let preString = number.slice(0, from);

  if(preString === "")
    return postString;

  let a = postString.search("00");

  if(a !== -1 && !postString.match(/[1-9]/g))
    postString = postString.slice(0, a);

  if(postString !== ",")
    number = preString + postString;
  else
    number = preString + postString.replace(',', '');

  a = postString.search("999");
  if(a !== -1)
  {
  postString = postString.slice(0, a);
  preString = ((preString * 1) + 1).toString();
  number = preString + postString;

  if(postString !== ",")
    number = preString + postString;
  else
    number = preString + postString.replace(',', '');
  }

  if(number.length > 15)
    changeFont(-1);
  else
    changeFont(5);

  return number;
}

class App extends React.Component {

 state =  {
  firstCharacter: false,
  showUp: false,
  upContent: "",
  mainContent: "0",
  symbol: [],
  result: 0,
  firstAfterSymbol: true,
  operation: [],
  canDelete: true,
  onlyCalculate: false,
  memory: [],
  showMem: false,
  }


  deleteFromMemoryAll = () => {
    this.setState({
      memory: []
    })
  }

  showFromMemory = () => {
    this.setState({
      mainContent: this.state.memory[0],
      firstAfterSymbol: true
    })
  }


  deleteFromMemory = (id) => {
    let memory = this.state.memory;
    memory.splice(id, 1);
    this.setState({
      memory,
    })
  }

  additionToMemory = (id = 0) => {
    let memory = this.state.memory;
    console.log(memory[id]);
    memory[id] = memory[id].toString().replace(/ /g, '').replace(',', '.');
    let mainContent = this.state.mainContent.toString().replace(/ /g, '').replace(',', '.');
    memory[id] = memory[id] * 1 + mainContent * 1;
    memory[id] = memory[id].toString().replace('.', ',');
    memory[id] = round(memory[id]);
    memory[id] = fitString(memory[id]);
    this.setState({
      memory,
      firstAfterSymbol: true
    })
  }

  subtractionFromMemory = (id = 0) => {
    let memory = this.state.memory;
    memory[id] = memory[id].toString().replace(/ /g, '').replace(',', '.');
    let mainContent = this.state.mainContent.toString().replace(/ /g, '').replace(',', '.');
    memory[id] = memory[id] * 1 - mainContent * 1;
    memory[id] = memory[id].toString().replace('.', ',');
    memory[id] = round(memory[id]);
    memory[id] = fitString(memory[id]);
    this.setState({
      memory,
      firstAfterSymbol: true
    })
  }

  saveInMemory = (type = 5) => {
    let memory = this.state.memory;
    if(type !== 1)
      memory.push(this.state.mainContent);
    else
    memory.push(`- ${this.state.mainContent}`);

    this.setState({
      memory,
      firstAfterSymbol: true
    })
  }

  showMemory = () => {
    const background = document.getElementById('settingsMemory');
    
    if(!this.state.showMem)
      background.style.transform = "translate(0, -100%)";
    else
      background.style.transform = "translate(0, 100%)";

    

    this.setState({
      showMem: !this.state.showMem
    })
  }

  handleTopLine = () => {
    this.setState({
      showUp: !this.state.showUp,
    })
  }
// 
    

  setWarming = () => {

    
    const background = document.getElementById('warmingBackground');
    const warming = document.getElementById('warming');
    if(document.body.clientHeight < 500)
    {
      // console.log(warming);
      warming.style.display = "block";
      background.style.display = "block";
    }
    else
    {
      warming.style.display = "none";
      background.style.display = "none";
    }

  }
  

  configureInterval = () => {
    setInterval(this.setWarming, 1000);
  }

  handleError = () => {

    this.setState({
      operation: [],
      symbol: [],
      mainContent: "You can't divide by 0",
      upContent: "",
      canDelete: false,
      firstAfterSymbol: true,
      onlyCalculate: false,
      firstCharacter: false,
    })

  }

  handleMainScreen = (char) => {
    if(char === "deleteLast" && this.state.canDelete)
    {
      if(this.state.mainContent.length === 1)
      {
        this.setState({
          mainContent: "0",
          firstAfterSymbol: true
        })
      }
      else
      {
        let mainContent = this.state.mainContent;
        mainContent = mainContent.toString();
        if(this.state.mainContent[this.state.mainContent.length - 1] === " ")
          mainContent = mainContent.slice(0, -2);
        else
          mainContent = mainContent.slice(0, -1);

        mainContent = fitString(mainContent.trim());
        this.setState({
          mainContent,
        })
      }
    }
    else if(char === "%")
    {
      let mainContent = this.state.mainContent.replace(/ /g, '').toString();
      let upContent = this.state.upContent.toString();
      let x = calculate(upContent, "0", this.state.symbol, this.state.operation);
      if(x === "divideError") {this.handleError(); return;}

      if(upContent[upContent.length - 1] === "×" || upContent[upContent.length - 1] === "/")
      {
        mainContent = mainContent.replace(',', '.');
        upContent += ` ${mainContent / 100}`;
        mainContent = ` ${mainContent / 100}`;
      }
      else if(upContent[upContent.length - 1] === "+" || upContent[upContent.length - 1] === "-")
      {
        mainContent = mainContent.replace(/ /g, '').replace(',', '.');
        x = x.replace(',', '.')
        upContent += ` ${x * (mainContent * 1) / 100}`;
        mainContent = x * (mainContent * 1) / 100;
        mainContent = mainContent.toString().replace('.', ',');
        mainContent = fitString(mainContent);
      }
      else
        mainContent = fitString(mainContent);
      this.setState({
        upContent,
        mainContent,
        onlyCalculate: true
      })
    }
    else if(char === "opposed")
    {
      let mainContent = this.state.mainContent.toString().replace(/ /g, '');
      mainContent = mainContent.replace(',', '.');
      mainContent *= (-1);
      mainContent = mainContent.toString().replace('.', ',');
      mainContent = fitString(mainContent);
      this.setState({
        mainContent,
      })
    }
    else if ((char >= 0 && char <=9) || char === ',')
    {
      
      if(this.state.firstAfterSymbol && char !== ',')
      {
        if(char === 0)
        {
          if(!(this.state.mainContent.includes(',') && /[1-9]/.test( this.state.mainContent ) ))
            return;
        }

        this.setState({
          mainContent: char,
          firstAfterSymbol: false
        })
      }
      else if(this.state.mainContent.length >= 15)
        return;
      else if(char === 0 || char === ',')
      {

        if(!this.state.canDelete && this.state.firstAfterSymbol)
        {
          this.setState({
            mainContent: "0,",
            firstAfterSymbol: false,
          })
        }
        else if(this.state.mainContent.length >= 1)
          {
            if(char === 0 )
            {
              if(!(this.state.mainContent.includes(',') && /[1-9]/.test( this.state.mainContent ) ))
                return;
            }
            else if( char === ',')
            {
              if(this.state.mainContent.includes(','))
                return;
            }
            let mainContent = (this.state.mainContent + char);
            mainContent = fitString(mainContent);
            this.setState({
              mainContent,
              firstAfterSymbol: false,
            })
          }
      }
      else 
      {
        if(char === '0')
        {
          if(!(this.state.mainContent.includes(',') || /[1-9]/.test( this.state.mainContent ) ))
            return;
        }
      let mainContent = (this.state.mainContent + char);
      mainContent = fitString(mainContent.replace(/ /g, ''));
      this.setState({
        mainContent,
        })
      }
    }
    else
    {
      if(char === "sqrt")
      {
        let mainContent = this.state.mainContent.replace(/ /g, '');

        mainContent = mainContent.replace(',', '.');
        if(mainContent * 1 < 0)
        {
          this.setState({
            upContent: "",
            mainContent: "Incorrect input",
            firstAfterSymbol: true,
            operation: [],
            symbol: [],
            canDelete: false,
            onlyCalculate: false,
            firstCharacter: false,
          })
          return;
        }
        mainContent = Math.sqrt(mainContent * (1)).toFixed(9);
        mainContent = round(mainContent);
        mainContent = mainContent.replace('.', ',');

        if(this.state.upContent[this.state.upContent.length - 1] === ")")
        {
          let upContent = this.state.upContent;
          let sub = upContent.substr(this.state.symbol[this.state.symbol.length -1] + 1);
          upContent = upContent.replace(sub, `√( ${sub} )`);
          mainContent = fitString(mainContent);
          this.setState({
            upContent,
            firstAfterSymbol: true,
            mainContent,
          })
          return;

        }
          mainContent = fitString(mainContent);
          this.setState({
            upContent:`${this.state.upContent} √( ${this.state.mainContent !== "" ? this.state.mainContent.replace(/ /g, '') : "0"} )`,
            firstAfterSymbol: true,
            mainContent,
          })

      }
      else if(char === "CE")
      {
        this.setState({
          mainContent: "0",
          canDelete: true,
          firstAfterSymbol: true
        })
      }
      else if(char === "C")
      {
        this.setState({
          operation: [],
          symbol: [],
          mainContent: "0",
          upContent: "",
          canDelete: true,
          firstAfterSymbol: true,
          onlyCalculate: false,
          firstCharacter: false,
        })
      }
      else if(char === "sqr")
      {
        let mainContent = this.state.mainContent.replace(/ /g, '');
        mainContent = mainContent.replace(',', '.');
        // 
        mainContent = countNumber(mainContent);
        
        // 
        mainContent *= mainContent;
        mainContent = round(mainContent);
        mainContent = mainContent.replace('.', ',');
        if(this.state.upContent[this.state.upContent.length - 1] === ")")
        {
          let upContent = this.state.upContent;
          let sub = upContent.substr(this.state.symbol[this.state.symbol.length -1] +1);
          upContent = upContent.replace(sub, `sqr( ${sub} )`);
          mainContent = fitString(mainContent);
          this.setState({
            upContent,
            firstAfterSymbol: true,
            mainContent,
          })
          return;

        }
        mainContent = fitString(mainContent);
          this.setState({
            upContent:`${this.state.upContent} sqr( ${this.state.mainContent !== "" ? this.state.mainContent.replace(/ /g, '') : "0"} )`,
            firstAfterSymbol: true,
            mainContent,
          })
      }
      else if(char === "reverse")
      { 
        let mainContent = this.state.mainContent.replace(/ /g, '');
        if(mainContent === "" || mainContent * 1 === 0)
          {this.handleError(); return;}
        mainContent = mainContent.toString().replace(',', '.');
        
        mainContent = round(1 / mainContent);
        mainContent = mainContent.toString().replace('.', ',');

        if(this.state.upContent[this.state.upContent.length - 1] === ")")
        {
          let upContent = this.state.upContent;
          let sub = upContent.substr(this.state.symbol[this.state.symbol.length -1] +1);
          upContent = upContent.replace(sub, `1/( ${sub} )`);
          mainContent = fitString(mainContent);
          this.setState({
            upContent,
            firstAfterSymbol: true,
            mainContent,
          })
          return;

        }
        mainContent = fitString(mainContent);
          this.setState({
            upContent:`${this.state.upContent} 1/( ${this.state.mainContent.replace(/ /g, '')} )`,
            firstAfterSymbol: true,
            mainContent: mainContent,
          })

      }
      else if(char === "×")
      {
        if(this.state.onlyCalculate)
        {
          let upContent = this.state.upContent.slice(0, this.state.symbol[this.state.symbol.length])
          if(calculate(upContent, this.state.mainContent, this.state.symbol, this.state.operation) === "divideError") {this.handleError(); return;}
          let mainContent = calculate(upContent, this.state.mainContent.replace(/ /g, ''), this.state.symbol, this.state.operation);
          mainContent = fitString(mainContent.toString());
          this.setState({
            mainContent,
            upContent: `${upContent} ×`,
            onlyCalculate: false,
            firstAfterSymbol: true,
          })
          return;
        }

        if(this.state.upContent != "" && this.state.upContent[1] != "√")
        {
          if(this.state.firstAfterSymbol)
          {
            let operation = this.state.operation;
            let upContent = this.state.upContent;
            let symbol = this.state.symbol;

              if(upContent[this.state.upContent.length - 1] === "×")
                return;
              else if(upContent[this.state.upContent.length - 1] === "/" || upContent[this.state.upContent.length - 1] === "-" || upContent[this.state.upContent.length - 1] === "+")
              {
                upContent = setCharAt(upContent,this.state.upContent.length - 1,'×');
                operation[operation.length - 1] = 1;
                this.setState({
                  upContent,
                  operation,
                })
                return;
              }


              let mainContent = calculate(upContent, this.state.mainContent, symbol, operation);
              if(mainContent === "divideError") {this.handleError(); return;}


              if((upContent[1] === "s" && upContent[2] === "q") || (upContent[0] === " " && upContent[1] === "1") || ((upContent[symbol[symbol.length - 1] + 2] === "1" &&  upContent[symbol[symbol.length - 1] + 3] === "/")) || (upContent[upContent.length - 1] === ")"))
                 symbol.push( this.state.upContent.length + 1);
              else
                symbol.push( this.state.mainContent.length + 2);

              operation[this.state.operation.length] = 1;
            if(this.state.upContent[this.state.upContent.length - 1] != ")" && !(this.state.upContent[this.state.upContent.length - 1] >= '0' && this.state.upContent[this.state.upContent.length - 1] <= '9'))
              upContent = setCharAt(upContent,this.state.upContent.length - 1,'×');
            else
              upContent = upContent + " ×";

            mainContent = fitString(mainContent);
            this.setState({
              upContent,
              operation,
              symbol,
              mainContent,
            })
            return;
          }
          let upContent = this.state.upContent.toString();
          let mainContent = this.state.mainContent.toString().replace(/ /g, '');
          let x = calculate(upContent, mainContent, this.state.symbol, this.state.operation);
          if(x === "divideError") {this.handleError(); return;}

          const symbol = this.state.symbol;
          symbol.push(upContent.length + mainContent.length + 2);
          const operation = this.state.operation;
          operation.push(1);
          x = fitString(x.toString());
          this.setState({
            upContent: `${this.state.upContent} ${this.state.mainContent.replace(/ /g, '')} ×`,
            mainContent: x,
            operation: operation,
            canDelete: false,
            symbol: symbol,
            firstAfterSymbol: true,
          }) 
          }
          else
          {
            const symbol = this.state.symbol;
            if(this.state.upContent[1] === "√")
            {
              // e!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              if(!this.state.firstAfterSymbol)
              {
                let mainContent = calculate(this.state.upContent, this.state.mainContent.replace(/ /g, ''), this.state.symbol, this.state.operation);
                if(mainContent === "divideError") {this.handleError(); return;}

                symbol.push(this.state.upContent.length +3);
                const operation = this.state.operation;
                operation.push(1);
                fitString(mainContent.toString())
                this.setState({
                  symbol: symbol,
                  operation: operation,
                  mainContent,
                  upContent: `${this.state.upContent} ${this.state.mainContent.replace(/ /g, '')} ×`,
                  firstAfterSymbol: true,
                })
                return;
              }

              symbol.push(this.state.upContent.length +1);
              const operation = this.state.operation;
              operation.push(1);
              this.setState({
                symbol: symbol,
                operation: operation,
                upContent: `${this.state.upContent} ×`,
                firstAfterSymbol: true,
              })
            return;
            }
            let mainContent = this.state.mainContent.replace(/ /g, '');
            mainContent = mainContent.toString();
            symbol.push(mainContent.length + 1);
            const operation = this.state.operation;
            operation.push(1);
            this.setState({
              symbol: symbol,
              operation: operation,
              upContent: `${this.state.mainContent.replace(/ /g, '')} ×`,
              firstAfterSymbol: true,
            })

        }
    }
      else if(char === "divide")
      {

        if(this.state.onlyCalculate)
        {
          let upContent = this.state.upContent.slice(0, this.state.symbol[this.state.symbol.length])
          if(calculate(upContent, this.state.mainContent.replace(/ /g, ''), this.state.symbol, this.state.operation) === "divideError") {this.handleError(); return;}
          let mainContent = calculate(upContent, this.state.mainContent.replace(/ /g, ''), this.state.symbol, this.state.operation).toString();
          mainContent = mainContent.replace('.', ',');
          mainContent = fitString(mainContent);
          this.setState({
            mainContent,
            upContent: `${upContent} /`,
            onlyCalculate: false,
            firstAfterSymbol: true,
          })
          return;
        }

        if(this.state.upContent != "" && this.state.upContent[1] != "√")
        {
          if(this.state.firstAfterSymbol)
          {
            let operation = this.state.operation;
              let upContent = this.state.upContent;
              let symbol = this.state.symbol;
              if(upContent[this.state.upContent.length - 1] === "/")
                return;
              else if(upContent[this.state.upContent.length - 1] === "×" || upContent[this.state.upContent.length - 1] === "-" || upContent[this.state.upContent.length - 1] === "+")
              {
                upContent = setCharAt(upContent,this.state.upContent.length - 1,'/');
                operation[operation.length - 1] = 2;
                this.setState({
                  upContent,
                  operation
                })
                return;
              }
              let mainContent = calculate(upContent, this.state.mainContent.replace(/ /g, ''), symbol, operation);
              if(mainContent === "divideError") {this.handleError(); return;}


              if((upContent[1] === "s" && upContent[2] === "q") || (upContent[0] === " " && upContent[1] === "1") || ((upContent[symbol[symbol.length - 1] + 2] === "1" &&  upContent[symbol[symbol.length - 1] + 3] === "/")) || (upContent[upContent.length - 1] === ")"))
                symbol.push( this.state.upContent.length + 1);
              else
                symbol.push( this.state.mainContent.length + 2);

              operation[this.state.operation.length] = 2;
            if(this.state.upContent[this.state.upContent.length - 1] != ")" && !(this.state.upContent[this.state.upContent.length - 1] >= '0' && this.state.upContent[this.state.upContent.length - 1] <= '9'))
              upContent = setCharAt(upContent,this.state.upContent.length - 1,'/');
            else
              upContent = upContent + " /";
              
            mainContent = mainContent.toString();
            mainContent = mainContent.replace('.', ',');
            mainContent = fitString(mainContent);
            this.setState({
              upContent,
              operation,
              symbol,
              mainContent
            })
            return;
          }
          let upContent = this.state.upContent.toString();
          let mainContent = this.state.mainContent.toString().replace(/ /g, '');
          let x = calculate(upContent, mainContent, this.state.symbol, this.state.operation);
          if(x === "divideError") {this.handleError(); return;}

          const symbol = this.state.symbol;
          symbol.push(this.state.upContent.length + this.state.mainContent.replace(/ /g, '').length + 2);
          const operation = this.state.operation;
          operation.push(2);
          x = x.toString();
          x = x.replace('.', ',');
          x = fitString(x);
          this.setState({
            upContent: `${this.state.upContent} ${this.state.mainContent.replace(/ /g, '')} /`,
            mainContent: x,
            operation: operation,
            canDelete: false,
            symbol: symbol,
            firstAfterSymbol: true,
          }) 
        }
        else
        {
          const symbol = this.state.symbol;
          if(this.state.upContent[1] === "√")
            {
              if(!this.state.firstAfterSymbol)
              {
                let mainContent = calculate(this.state.upContent, this.state.mainContent.replace(/ /g, ''), this.state.symbol, this.state.operation);
                if(mainContent === "divideError") {this.handleError(); return;}

                symbol.push(this.state.upContent.length +3);
                const operation = this.state.operation;
                operation.push(2);
                mainContent = mainContent.toString();
                mainContent = mainContent.replace('.', ',');
                mainContent = fitString(mainContent);
                this.setState({
                  symbol: symbol,
                  operation: operation,
                  mainContent,
                  upContent: `${this.state.upContent} ${this.state.mainContent.replace(/ /g, '')} /`,
                  firstAfterSymbol: true,
                })
                return;
              }

          if(this.state.upContent[1] === "√")
          {
            symbol.push(this.state.upContent.length +1);
            const operation = this.state.operation;
            operation.push(2);
            this.setState({
              symbol: symbol,
              operation: operation,
              upContent: `${this.state.upContent} /`,
              firstAfterSymbol: true,
            })
          return;
          }
        }
          let mainContent = this.state.mainContent.replace(/ /g, '');
          mainContent = mainContent.toString();
          symbol.push(mainContent.length + 1);
          const operation = this.state.operation;
          operation.push(2);
          this.setState({
            symbol: symbol,
            operation: operation,
            upContent: `${this.state.mainContent.replace(/ /g, '')} /`,
            firstAfterSymbol: true,
          })
      }
      }
      else if(char === "-")
      {
        if(this.state.upContent != "" && this.state.upContent[1] != "√")
        {
          if(this.state.firstAfterSymbol)
          {
            let operation = this.state.operation;
              let upContent = this.state.upContent;
              let symbol = this.state.symbol;

              if(upContent[this.state.upContent.length - 1] === "-")
                return;
              else if(upContent[this.state.upContent.length - 1] === "/" || upContent[this.state.upContent.length - 1] === "×" || upContent[this.state.upContent.length - 1] === "+")
              {
                upContent = setCharAt(upContent,this.state.upContent.length - 1,'-');
                operation[operation.length - 1] = 3;
                this.setState({
                  upContent,
                  operation
                })
                return;
              }

              let mainContent = calculate(upContent, this.state.mainContent.replace(/ /g, ''), symbol, operation);
              if(mainContent === "divideError") {this.handleError(); return;}


              if((upContent[1] === "s" && upContent[2] === "q") || (upContent[0] === " " && upContent[1] === "1") || ((upContent[symbol[symbol.length - 1] + 2] === "1" &&  upContent[symbol[symbol.length - 1] + 3] === "/")) || (upContent[upContent.length - 1] === ")"))
                symbol.push( this.state.upContent.length + 1);
              else
                symbol.push( this.state.mainContent.replace(/ /g, '').length + 2);
              operation[this.state.operation.length] = 3;
            if(this.state.upContent[this.state.upContent.length - 1] != ")" && !(this.state.upContent[this.state.upContent.length - 1] >= '0' && this.state.upContent[this.state.upContent.length - 1] <= '9'))
              upContent = setCharAt(upContent,this.state.upContent.length - 1,'-');
            else
              upContent = upContent + " -";

              mainContent = mainContent.toString();
              mainContent = mainContent.replace('.', ',');
              mainContent = fitString(mainContent);
              
            this.setState({
              upContent,
              operation,
              symbol,
              mainContent
            })
            return;
          }

          let upContent = this.state.upContent.toString();
          let mainContent = this.state.mainContent.toString().replace(/ /g, '');
          let x = calculate(upContent, mainContent, this.state.symbol, this.state.operation);
          if(x === "divideError") {this.handleError(); return;}

          const symbol = this.state.symbol;
          symbol.push(this.state.upContent.length + this.state.mainContent.replace(/ /g, '').length + 2);
          const operation = this.state.operation;
          operation.push(3);
          x = x.toString();
          x = x.replace('.', ',');
          x = fitString(x);
          this.setState({
            upContent: `${this.state.upContent} ${this.state.mainContent.replace(/ /g, '')} -`,
            mainContent: x,
            operation: operation,
            canDelete: false,
            symbol: symbol,
            firstAfterSymbol: true,
          }) 
        }
        else {
          const symbol = this.state.symbol;
          if(this.state.upContent[1] === "√")
          {
            if(!this.state.firstAfterSymbol)
              {
                let mainContent = calculate(this.state.upContent, this.state.mainContent.replace(/ /g, ''), this.state.symbol, this.state.operation);
                if(mainContent === "divideError") {this.handleError(); return;}

                symbol.push(this.state.upContent.length +3);
                const operation = this.state.operation;
                operation.push(3);
                mainContent = mainContent.toString();
                mainContent = mainContent.replace('.', ',');
                mainContent = fitString(mainContent);
                this.setState({
                  symbol: symbol,
                  operation: operation,
                  mainContent,
                  upContent: `${this.state.upContent} ${this.state.mainContent.replace(/ /g, '')} -`,
                  firstAfterSymbol: true,
                })
                return;
              }

            symbol.push(this.state.upContent.length +1);
            const operation = this.state.operation;
            operation.push(1);
            this.setState({
              symbol: symbol,
              operation: operation,
              upContent: `${this.state.upContent} -`,
              firstAfterSymbol: true,
            })
          return;
          }
          let mainContent = this.state.mainContent.replace(/ /g, '');
          mainContent = mainContent.toString();
          symbol.push(mainContent.length + 1);
          const operation = this.state.operation;
          operation.push(3);
          this.setState({
            symbol: symbol,
            operation: operation,
            upContent: this.state.mainContent.replace(/ /g, '') + ' -' ,
            firstAfterSymbol: true,
        })
      }
      }
      else if(char === "+")
      {

        if(this.state.upContent != "" && this.state.upContent[1] != "√")
        {
          if(this.state.firstAfterSymbol)
          {
            let operation = this.state.operation;
              let upContent = this.state.upContent;
              let symbol = this.state.symbol;

              if(upContent[this.state.upContent.length - 1] === "+")
                return;
              else if(upContent[this.state.upContent.length - 1] === "/" || upContent[this.state.upContent.length - 1] === "×" || upContent[this.state.upContent.length - 1] === "-")
              {
                upContent = setCharAt(upContent,this.state.upContent.length - 1,'+');
                operation[operation.length - 1] = 4;
                this.setState({
                  upContent,
                  operation
                })
                return;
              }

              let mainContent = calculate(upContent, this.state.mainContent.replace(/ /g, ''), symbol, operation);
              if(mainContent === "divideError") {this.handleError(); return;}


              if((upContent[1] === "s" && upContent[2] === "q") || (upContent[0] === " " && upContent[1] === "1") || ((upContent[symbol[symbol.length - 1] + 2] === "1" &&  upContent[symbol[symbol.length - 1] + 3] === "/")) || (upContent[upContent.length - 1] === ")"))
                symbol.push( this.state.upContent.length + 1);
              else
                symbol.push( this.state.mainContent.replace(/ /g, '').length + 2);
              operation[this.state.operation.length] = 4;
            if(this.state.upContent[this.state.upContent.length - 1] != ")" && !(this.state.upContent[this.state.upContent.length - 1] >= '0' && this.state.upContent[this.state.upContent.length - 1] <= '9'))
              upContent = setCharAt(upContent,this.state.upContent.length - 1, '+');
            else
              upContent = upContent + " +";
              
            this.setState({
              upContent,
              operation,
              symbol,
              mainContent,
            })
            return;
          }
          let upContent = this.state.upContent.toString();
          let mainContent = this.state.mainContent.toString().replace(/ /g, '');
          let x = calculate(upContent, mainContent, this.state.symbol, this.state.operation);
          if(x === "divideError") {this.handleError(); return;}

          let symbol = this.state.symbol;
          symbol.push(this.state.upContent.length + this.state.mainContent.replace(/ /g, '').length + 2);


          let operation = this.state.operation;
          operation.push(4);
          x = x.toString();
          x = x.replace('.', ',');
          x = fitString(x);
          this.setState({
            upContent: `${this.state.upContent} ${this.state.mainContent.replace(/ /g, '')} +`,
            mainContent: x,
            operation: operation,
            canDelete: false,
            symbol: symbol,
            firstAfterSymbol: true,
          }) 
        }
        else 
        {
          const symbol = this.state.symbol;
          if(this.state.upContent[1] === "√")
          {

            if(!this.state.firstAfterSymbol)
              {
                let mainContent = calculate(this.state.upContent, this.state.mainContent.replace(/ /g, ''), this.state.symbol, this.state.operation);
                if(mainContent === "divideError") {this.handleError(); return;}

                symbol.push(this.state.upContent.length + 3);
                const operation = this.state.operation;
                operation.push(4);
                mainContent = mainContent.toString();
                mainContent = mainContent.replace('.', ',');
                mainContent = fitString(mainContent);

                this.setState({
                  symbol: symbol,
                  operation: operation,
                  mainContent,
                  upContent: `${this.state.upContent} ${this.state.mainContent.replace(/ /g, '')} +`,
                  firstAfterSymbol: true,
                })
                return;
              }

            symbol.push(this.state.upContent.length + 1);
            const operation = this.state.operation;
            operation.push(4);
            this.setState({
              symbol: symbol,
              operation: operation,
              upContent: `${this.state.upContent} +`,
              firstAfterSymbol: true,
            })
          return;
          }
          let mainContent = this.state.mainContent.replace(/ /g, '');
          mainContent = mainContent.toString();
          symbol.push(this.state.mainContent.replace(/ /g, '').length +1);
          const operation = this.state.operation;
          operation.push(4);
          this.setState({
            symbol: symbol,
            operation: operation,
            upContent: `${this.state.mainContent.replace(/ /g, '')} +`,
            firstAfterSymbol: true,
          })
      }
      }
      else if(char === "=")
      {
        let x = calculate(this.state.upContent, this.state.mainContent.replace(/ /g, ''), this.state.symbol, this.state.operation);
        if(x === "divideError") {this.handleError(); return;}
        x = fitString(x);
          this.setState({
            upContent: "",
            mainContent: x,
            operation: [],
            canDelete: false,
            symbol: [],
            firstAfterSymbol: true,
          })
        }
        
      }
    
  }

  render(){
  return (
    <div className="wrapper">
      <div className="calculator">
        <Warming></Warming>
        <TopBar ></TopBar>
        <TypeCalculator></TypeCalculator>
        <Screen showMemory={this.showMemory} mainScreen={this.state.mainContent} topLine={this.state.upContent}></Screen>
        <MemoryButtons back={this.backFromMenu} decision={this.state.showMem} script={this.configureInterval()} memory={this.state.memory} deleteAll={this.deleteFromMemoryAll} add={this.additionToMemory} subtract={this.subtractionFromMemory} show={this.showFromMemory} save={this.saveInMemory} showMemory={this.showMemory}></MemoryButtons>
        <Buttons decision={this.state.showMem} memory={this.state.memory} show={this.handleMainScreen} delete={this.deleteFromMemory} add={this.additionToMemory} subtract={this.subtractionFromMemory}></Buttons>
      </div>
    </div>
  );
  }
}

export default App;
