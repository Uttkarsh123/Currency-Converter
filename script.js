const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const updateExchangeRate = async ()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal ==="" || amtVal <1)
    {
        amtVal =1;
        amount.value="1";
    }
   
    const fromCurr = document.querySelector(".from select").value.toLowerCase();
    const toCurr = document.querySelector(".to select").value.toLowerCase();


    const url = `${BASE_URL}/${fromCurr}.json`
    const response = await fetch(url)
    if(response.status===200)
    {
        const data = await response.json();
        
        const req_data = data[fromCurr];
        const final_amt = amtVal*req_data[toCurr]
        console.log(final_amt);
        document.querySelector('.msg').innerText = `${amtVal} ${fromCurr.toUpperCase()} = ${final_amt} ${toCurr.toUpperCase()}`
    }
    else
    {
        alert("Something went wrong")
    }
}

window.addEventListener("load", updateExchangeRate)


const dropdown = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("#get_rate");
for (let select of dropdown)
{
    for(Curr_code in countryList)
    {
        let newOpt = document.createElement('option')
        newOpt.innerText = Curr_code;
        newOpt.value = Curr_code;
        select.append(newOpt);

        if(select.name==="from" && Curr_code==="USD")
        {
            newOpt.selected="selected";
        }
        else if(select.name==="to" && Curr_code==="INR")
        {
            newOpt.selected="selected";
        }
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })
}

const updateFlag =  (ele)=>{
 console.log(ele)
 console.log(ele.value)

 let currency_code = ele.value;
 let country = countryList[currency_code];
 let newSrc = `https://flagsapi.com/${country}/flat/64.png`
 ele.parentNode.querySelector("img").setAttribute('src',newSrc);
}

btn.addEventListener("click",  (e)=>{
    e.preventDefault();
    updateExchangeRate();
})

document.getElementById("exchange").addEventListener("click",(e)=>{
    const fromCurrSelector = document.querySelector(".from select")
    const toCurrselector = document.querySelector(".to select")

    const fromValue = fromCurrSelector.value;
    const toValue = toCurrselector.value;

    setSelectedValue(fromCurrSelector, toValue);
    setSelectedValue(toCurrselector, fromValue);
    updateFlag(fromCurrSelector)
    updateFlag(toCurrselector)

    function setSelectedValue(selectObj, valueToSet) {
        for (var i = 0; i < selectObj.options.length; i++) {
            if (selectObj.options[i].text== valueToSet) {
                selectObj.options[i].selected = true;
                return;
            }
        }
    }
})

