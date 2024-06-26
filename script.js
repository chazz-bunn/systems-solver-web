document.addEventListener("DOMContentLoaded", () => {
    let n = document.getElementById("number-of-equations");
    let grid = document.getElementById("grid");
    let solveButton = document.getElementById("solve-button")
    let answerRow = document.getElementById("answer-row-middle");
    let startFlag = true;
    let ansRow = "";

    const cells = [];
    let size = 0;

    if(startFlag) {
        updateGrid();
        startFlag = false;
    }

    n.addEventListener("input", () => {
        updateGrid();
    });

    solveButton.addEventListener("click", () => {
        solve();
    });

    function updateGrid() {
        clearElementChildren(grid);

        size = Number(n.value);
        let height = 4*size;
        let width = 4*(size+1);

        grid.style.height = String(height) + "ch";
        grid.style.width = String(width) + "ch";
        grid.style.gridTemplateRows = "repeat(" + String(size) + ", 1fr)";
        grid.style.gridTemplateColumns= "repeat(" + String(size+1) + ", 1fr)";

        ansRow = "(";

        cells.length = 0;
        for(let i = 1; i <= size; i++) {
            const row = [];
            ansRow += "x<sub>" + String(i) + "</sub>";
            if(i < size) {
                ansRow += ", ";
            }
            for(let j = 1; j <= size + 1; j++) {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                grid.appendChild(cell);
                cell.style.gridColumn = j;
                cell.style.gridRow = i;

                if(i == 1 && j <= size) {
                    let label = document.createElement("label");
                    label.classList.add("lab");
                    label.innerHTML = "x<sub>" + String(j) + "</sub>";
                    cell.appendChild(label);
                }

                if(j == size+1) {
                    cell.style.borderLeft = "2px dashed white";
                }

                let input = document.createElement("input");
                input.value = 0;
                input.type = "number";
                input.classList.add("input-cell");
                cell.appendChild(input);
                row.push(cell);
            }
            cells.push(row);
        }
        ansRow += ") =";
    }

    function clearElementChildren(el) {
        let child = el.lastElementChild;
        while(child) {
            clearElementChildren(child);
            el.removeChild(child);
            child = el.lastElementChild;
        }
    }

    function solve() {
        const matrix = [];
        buildMatrix(matrix);

        /* // Assuming integer coeffecients, reduces rows to lowest terms. May implement rational number feature
        for(let row of matrix) {
            let g = gcf.apply(this, row);
            let s = Math.sign(row[0])
            for(let i = 0; i < row.length; i++) {
                row[i] = s*(row[i]/g);
            }
        }
        */
        
        for(let i = 0; i < size - 1; i++){
            for(let j = i+1; j < size; j++){
                let b = matrix[j][i];
                for(let k = i; k < size+1; k++){
                    matrix[j][k] = matrix[i][i]*matrix[j][k] - b*matrix[i][k];
                }
            }
        }

        for(let i = size - 1; i >= 0; i--){
            for(let j = size - 1; j > i; j--){
                matrix[i][size] -= matrix[i][j]*matrix[j][size];
                matrix[i][j] = 0;
            }
            matrix[i][size] /= matrix[i][i];
            matrix[i][i] = 1;
        }
        let ans = " ("
        for(let i = 0; i < size; i++){
            ans += String(matrix[i][size]);
            if(i < size-1) {
                ans += ", ";
            }
        }
        ans += ")";
        answerRow.innerHTML = "Answer: <mark>" + ansRow + ans + "</mark>"; 
    }

    function buildMatrix(mat) {
        //Extracts numerical values from cells array
        mat.length = 0;

        for(let i = 0; i < size; i++) {
            const row = [];
            for(let j = 0; j < size+1; j++) {
                row.push(Number(cells[i][j].lastElementChild.value))
            }
            mat.push(row);
        }
    }

    function gcf(...args) {
        let gcf = args[0];
        for(let arg of args) {
            gcf = gcf_helper(gcf, arg);
        }
        return gcf;
    }

    function gcf_helper(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        if (b > a) {var temp = a; a = b; b = temp;}
        while (true) {
            if (b == 0) return a;
            a %= b;
            if (a == 0) return b;
            b %= a;
        }
    }
});
