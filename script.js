document.addEventListener("DOMContentLoaded", () => {
    let n = document.getElementById("number of equations");
    console.log("Hello World");
    console.log(n.value)
    
    n.addEventListener("input", myFunction);


    function myFunction() {
        deleteGrid();
        for(let i = 0; i < n.value; i++){
            var grid = document.createElement("input");
            grid.setAttribute("type", "number");

            const element = document.getElementById("div2");
            element.appendChild(grid);
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