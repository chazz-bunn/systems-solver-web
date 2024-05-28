document.addEventListener("DOMContentLoaded", () => {
    let n = document.getElementById("number of equations");
    console.log("Hello World");
    console.log(n.value)
    
    n.addEventListener("input", myFunction);

    function myFunction() {
        deleteGrid();
        const element = document.getElementById("div2");
        for(let i = 0; i < n.value; i++) {
            for(let j = 0; j < n.value; j++) {
                var cell = document.createElement("input");
                cell.setAttribute("type", "number");

                element.appendChild(cell);
            }
            var r = document.createElement("label")
            r.append(document.createTextNode(" | "));
            element.appendChild(r)

            var rcell = document.createElement("input");
            rcell.setAttribute("type", "number");
            element.appendChild(rcell);

            var b = document.createElement("br");
            element.appendChild(b);
        }
    }
    
    function deleteGrid() {
        let e = document.getElementById("div2");
        let child = e.lastElementChild;
        while(child) {
            e.removeChild(child);
            child = e.lastElementChild;
        }  
    }
});

/*
const para = document.createElement("p");
const node = document.createTextNode("I like turtles");
para.appendChild(node);

const element = document.getElementById("div2");
element.appendChild(para);
*/