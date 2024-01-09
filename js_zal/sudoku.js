class Sudoku {
    #BOARD_SIZE = 9;
    #DOT_CHAR = '.';

    constructor() {
        this._board = [];
    }

    get board() {
        return this._board;
    }

    set board(newBoard) {
        if (newBoard.length === 0) {
            console.error('Board cannot be empty');
            return;
        }
        for (let i = 0; i < newBoard.length; i++) {
            for (let j = 0; j < newBoard[i].length; j++) {
                const char = newBoard[i][j];
                if (char !== this.#DOT_CHAR && !/^[1-9]$/.test(+char)) {
                    console.error(`Invalid character '${char}' in the board. Only chars '1' to '9' are allowed.`);
                    process.exit(1);
                }
            }
        }
        this._board = newBoard;
        console.log("Unsolved sudoku:")
        this.#print();
    }

    solve() {
        if (this.#helper(0, 0)) {
            console.log('Solved sudoku:');
            this.#print();
        } else {
            console.log('Could not solve this sudoku puzzle');
        }
    }

    #helper(row, col) {
        if (col === this.#BOARD_SIZE) {
            row += 1;
            col = 0;
        }

        if (row === 9)
            return true;

        if (this.board[row][col] !== this.#DOT_CHAR) {
            return this.#helper(row, col + 1);
        }

        for (let i = 1; i <= this.#BOARD_SIZE; i++) {
            let char = String(i);
            if (!this.#isValid(row, col, char))
                continue;
            this.board[row][col] = char;
            if (this.#helper(row, col + 1)) {
                return true;
            }
            this.board[row][col] = this.#DOT_CHAR;
        }
        return false;
    }

    #isValid(row, col, cur) {
        for (let i = 0; i < this.#BOARD_SIZE; i++) {
            if (this.board[row][i] === cur)
                return false;
            if (this.board[i][col] === cur)
                return false;
        }

        let rowBorder = this.#findStartEnd(row);
        let colBorder = this.#findStartEnd(col);

        for (let i = rowBorder[0]; i <= rowBorder[1]; i++) {
            for (let j = colBorder[0]; j <= colBorder[1]; j++) {
                if (this.board[i][j] === cur)
                    return false;
            }
        }
        return true;
    }

    #findStartEnd(coor) {
        const res = [];
        if (coor < 3) {
            res[0] = 0;
            res[1] = 2;
        } else if (coor < 6) {
            res[0] = 3;
            res[1] = 5;
        } else if (coor < 9) {
            res[0] = 6;
            res[1] = 8;
        }
        return res;
    }

    #print() {
        console.log('-------------------------------')
        for (let i = 0; i < this.board.length; i++) {
            if (i !== 0 && i % 3 === 0)
                console.log('-------------------------------')

            let string = '';
            for (let j = 0; j < this.board[i].length; j++) {
                if (j % 3 === 0)
                    string += '|';

                string += ' ' + this.board[i][j] + ' ';
            }
            console.log(string + '|')
        }
        console.log('-------------------------------')
    }
}

const example = [
    ['7', '.', '4', '8', '.', '.', '3', '.', '1'],
    ['8', '2', '.', '5', '.', '.', '.', '4', '.'],
    ['.', '.', '9', '4', '3', '.', '5', '.', '.'],
    ['3', '1', '.', '.', '.', '.', '8', '.', '7'],
    ['.', '8', '.', '.', '.', '.', '.', '1', '.'],
    ['9', '.', '7', '.', '.', '.', '.', '3', '2'],
    ['.', '.', '6', '.', '1', '5', '4', '.', '.'],
    ['.', '7', '.', '.', '.', '9', '.', '6', '5'],
    ['5', '.', '8', '.', '.', '2', '1', '.', '3']
]

const sudoku = new Sudoku();
sudoku.board = example;
sudoku.solve();