const allRanges = document.querySelectorAll(".range-wrap");
allRanges.forEach(wrap => {
  const range = wrap.querySelector(".range");
  const bubble = wrap.querySelector(".bubble");

  range.addEventListener("input", () => {
    setBubble(range, bubble);
  });
  setBubble(range, bubble);
});

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val;
  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}



$('i').click(() => {
  $('#result').select();
  document.execCommand("copy");
})


const encryption = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789{[}]:;'.,/!@#$%^&*()_+-~`";
const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const nums = "0123456789";
const sym = `"{[}]:;'.,${``}/!@#$%^&*()_+-~`;
let alpha_num = alpha + nums;
let alpha_sym = alpha + sym;
let num_sym = nums + sym;



let pass = "";
let clicks = 0;
$(document).ready(function() {
    let clearButton = document.createElement("button");
    clearButton.innerText = "clear all";
    clearButton.id = "clearButton";
    let exportButton = document.createElement("button");
    exportButton.innerHTML = "export data"
    exportButton.id = "exportButton";
    let div = document.getElementById("dataButtons");
    if(parseInt(localStorage.getItem("clicks")) > 0) {
      clearButton.hidden = false;
      exportButton.hidden = false;
    }
    else {
      clearButton.hidden = true;
      exportButton.hidden = true;
    }
    div.appendChild(clearButton); div.appendChild(exportButton);

  $("#exportButton").click(() => { 
    let export_data = "";
    for(let i = 1; i <= parseInt(localStorage.getItem("clicks")); i++) 
        export_data += "\n(" + localStorage.getItem(`date${i}`) + ")\n" + localStorage.getItem(`pass${i}`) + "\n\n----------";
     
    export_data = export_data.substring(0,export_data.length-10);
    let saver = new Blob([export_data], {type: "text/plain;charset=utf-8"});
    saveAs(saver, new Date().toLocaleString('en-GB'));

  });
  
  $("#clearButton").click(() => {
    document.querySelectorAll("table").forEach(table => {
      table.remove(); })
      document.querySelectorAll("#saveBr").forEach(br => {
        br.remove(); })
      clicks = 0;
    localStorage.clear();
    clearButton.hidden = true;
    exportButton.hidden = true;
  });

});

$("#all_").click(()=> {
  if($("#all_").is(":checked")){
  $("#alpha_").prop("checked",true);
  $("#num_").prop("checked",true);
  $("#sym_").prop("checked",true); 
  }
  else {
    $("#alpha_").prop("checked",false);
  $("#num_").prop("checked",false);
  $("#sym_").prop("checked",false);
  }
  changeColors("all");
  changeColors("alpha");
  changeColors("num");
  changeColors("sym");
});


$("#alpha_").click(() => {
  changeColors("alpha");
})
$("#num_").click(() => {
  changeColors("num");
})
$("#sym_").click(() => {
  changeColors("sym");
})


function changeColors(ele) {
  if($(`#${ele}_`).is(":checked")) {
    console.log("1");
    document.getElementById(ele).style = `
      color:blue;
      -webkit-transition: color 1s ease-out;`
  }
    else {
      document.getElementById(ele).style = `
    color:red;
    -webkit-transition: color 1s ease-out;`

    }

}


if(localStorage.getItem("clicks") != null) {
   clicks = parseInt(localStorage.getItem("clicks"));
   saveLocalData();
}
$('#gen').click(() => {
  clicks++;
  document.getElementById("clearButton").hidden = false;
  document.getElementById("exportButton").hidden = false;
  if(($("#alpha_").is(":checked")) && ($("#num_").is(":checked")) && ($("#sym_").is(":checked"))){
  for (let i = 0; i < parseInt($('input[type="range"]').val()); i++) 
    pass += encryption[getRandomInt(encryption.length - 1)];
  }
  else if($("#alpha_").is(":checked") && ($("#num_").is(":checked"))) {
    for (let i = 0; i < parseInt($('input[type="range"]').val()); i++) 
     pass += alpha_num[getRandomInt(alpha_num.length - 1)];
  }
  else if($("#alpha_").is(":checked") && ($("#sym_").is(":checked"))) {
  for(let i = 0; i < parseInt($('input[type="range"]').val()); i++) 
     pass += alpha_sym[getRandomInt(alpha_sym.length - 1)];
  }
  else if($("#num_").is(":checked") && ($("#sym_").is(":checked"))) {
    for(let i = 0; i < parseInt($('input[type="range"]').val()); i++) 
       pass += num_sym[getRandomInt(num_sym.length - 1)];
    }
    else if($("#alpha_").is(":checked")) {
      for(let i = 0; i < parseInt($('input[type="range"]').val()); i++) 
         pass += alpha[getRandomInt(alpha.length - 1)];
      }

      else if($("#num_").is(":checked")) {
        for(let i = 0; i < parseInt($('input[type="range"]').val()); i++) 
           pass += nums[getRandomInt(nums.length - 1)];
        }
        else if($("#sym_").is(":checked")) {
          for(let i = 0; i < parseInt($('input[type="range"]').val()); i++) 
             pass += sym[getRandomInt(sym.length - 1)];
          }
          else {
            clicks--;
            alert("Select someting");
            if(localStorage.getItem("clicks") == null) {
            document.getElementById("clearButton").hidden = true;
            document.getElementById("exportButton").hidden = true;
          }
            return;
          }
    
  $('#result').val(pass);
  let date = new Date().toLocaleString('en-GB');
  localStorage.setItem("clicks",clicks);
  localStorage.setItem(`pass${localStorage.getItem("clicks")}`, pass);
  localStorage.setItem(`date${localStorage.getItem("clicks")}`, date)
  saveData();
  pass = "";

});



function saveData() {
      let data = document.createElement("table");
      let tr = document.createElement("tr");
      let cell0 = document.createElement("td");
      let cell1 = document.createElement("td")
      let newLine = document.createElement("br");
      newLine.id = "saveBr";
     cell0.appendChild(document.createTextNode(pass));
     cell1.appendChild(document.createTextNode(new Date().toLocaleString('en-GB')));
     tr.appendChild(cell0); tr.appendChild(cell1);
  data.appendChild(tr);
  document.body.appendChild(data);
  document.body.appendChild(newLine);

  
  }

function saveLocalData() {
  for(let i = 1; i <= parseInt(localStorage.getItem("clicks")); i++) {
    let data = document.createElement("table");
    let tr = document.createElement("tr");
    let cell0 = document.createElement("td");
    let cell1 = document.createElement("td")
    let newLine = document.createElement("br");
    newLine.id = "saveBr";
   cell0.appendChild(document.createTextNode(localStorage.getItem(`pass${i}`)));
   cell1.appendChild(document.createTextNode(localStorage.getItem(`date${i}`)));
   tr.appendChild(cell0); tr.appendChild(cell1);
data.appendChild(tr);
document.body.appendChild(data);
document.body.appendChild(newLine);
  }

}



function getRandomInt(max) {
  let min = 0;
  const range = max + 1
  const bytes_needed = Math.ceil(Math.log2(range) / 8)
  const cutoff = Math.floor((256 ** bytes_needed) / range) * range
  const bytes = new Uint8Array(bytes_needed)
  let value
  do {
      crypto.getRandomValues(bytes)
      value = bytes.reduce((acc, x, n) => acc + x * 256 ** n, 0)
  } while (value >= cutoff)
  return min + value % range
}








