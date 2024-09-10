window.onload=function(){
    document.querySelector(".ON").style.backgroundColor="#15400e"
    document.querySelector(".OFF").style.backgroundColor="#ee3a1f";

}
let previousanswers=[];
let previous=document.querySelector(".PreviousANS");
let answer;
function calc (arr)
{
    answer=0;
    console.log(arr)
    if (arr[arr.length - 1] === "Sqrt()") {
        let n = arr.pop();
        arr.pop(); 
        result = Math.sqrt(parseFloat(n));
    } else {
        while (arr.length > 1) {
            let num1 = parseFloat(arr.shift());
            let sign = arr.shift();
            let num2 = parseFloat(arr.shift());

            switch (sign) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    if (num2 === 0) {
                        result = "Division by zero is not allowed.";
                        arr = [];
                        break;
                    } else {
                        result = num1 / num2;
                    }
                    break;
                case '^':
                    result = Math.pow(num1, num2);
                    break;
                default:
                    result = "Invalid operation";
                    arr = [];
                    break;
            }

            arr.unshift(result);
        }
    }
    answer = result;
    document.querySelector(".ans").innerHTML = result;
    previousanswers.unshift(result);

    previous.innerHTML = previousanswers.join('<br>');
}

let show="";
let buttons = document.querySelectorAll("button");
let arr=[];
let currentNumber = "";
buttons.forEach(button => {
    button.onclick = function() {
        let val = button.value || button.innerHTML;
        console.log(val);
        if (!isNaN(val) || val === '.') { 
            currentNumber += val; 
            document.querySelector(".ans").innerHTML = currentNumber;
        }
        else {
            if (currentNumber !== "") {
                arr.push(currentNumber); 
                currentNumber = ""; 
                }
            if (val === "ans") { 
                    console.log(answer)
                        currentNumber =answer;
                        arr.push(answer)
                        document.querySelector(".ans").innerHTML = currentNumber;
                    
                    return;
                }
            if(isNaN(val)&&arr.length===0)
            {
                arr.push(answer)
            }
            arr.push(val);
            document.querySelector(".ans").innerHTML = val;
        }


        if(val==="DEL")
        {previousanswers=[]
            arr=[];
            show=""
            document.querySelector(".ans").innerHTML='';
            previous.innerHTML='';
            val=""
        }
        if (val === 'OFF') {
            document.querySelectorAll("button").forEach(button => {
                if (button.className!=="OFF"&& button.className!=="ON") {
                    button.disabled=true;
                    button.style.filter="blur(1.05px)"
                }
            });
            show="";
            previous.innerHTML="";
            document.querySelector(".OFF").style.backgroundColor="#15400e";
            document.querySelector(".ON").style.backgroundColor="#ee3a1f";
            let temp = document.querySelector(".ans");
            temp.style.opacity = "0.7";
            temp.style.backgroundColor = "#ddd";
            temp.style.border = "1px solid #bbb";
            temp.style.color = "#333";
        }
        if (val === 'ON') {
            document.querySelectorAll("button").forEach(button => {
                if (button.className!=="OFF"&& button.className!=="ON") {
                    button.disabled=false;
                    button.style.filter="blur(0)"
                }
            });
            arr = [];
            previous.innerHTML = "";
            previousanswers = [];
            show=""
            val=""
            document.querySelector(".ON").style.backgroundColor = "#15400e";
            document.querySelector(".OFF").style.backgroundColor = "#ee3a1f";
            let temp = document.querySelector(".ans");
            temp.innerHTML = "";
            temp.style.opacity = "1"; 
            temp.style.backgroundColor = ""; 
            temp.style.border = ""; 
            temp.style.color = ""; 
        
        }
        if(val==="xpowerx")
            val="^";
        show+=val;
        document.querySelector(".ans").innerHTML=show;
    
    if(val==="="){
        arr.pop()
        calc(arr)
        arr=[];
        
    }
};
});

const icons = document.querySelectorAll('.conta a img');

document.querySelector('.conta div').addEventListener('mouseover', function() {
    icons.forEach(img => {
        img.style.visibility = 'visible'; 
        img.style.opacity = '1'; 
    });
});

document.querySelector('.conta div').addEventListener('mouseout', function() {
    icons.forEach(img => {
        img.style.opacity = '0';
        setTimeout(() => {
            img.style.visibility = 'hidden'; 
        }, 500); 
    });
});
