class Agent {
    constructor() {

    }

    minimax(board, depth, isMaximizing) {
        let gameOver = board.gameOver();
        if (gameOver !== 0) {
            if (gameOver === 1) return {score: 10 - depth};  
            if (gameOver === 2) return {score: depth - 10};  
            if (gameOver === 3) return {score: 0}; 
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            let bestMove;
            for (let i = 0; i < board.cells.length; i++) {
                let cell = i + 1;
                if (board.cellFree(cell)) {
                    let newBoard = board.clone();
                    newBoard.move(cell);
                    let result = this.minimax(newBoard, depth + 1, false);
                    if (result.score > bestScore) {
                        bestScore = result.score;
                        bestMove = cell;
                    }
                }
            }
            return {score: bestScore, move: bestMove};
        } else {
            let bestScore = Infinity;
            let bestMove;
            for (let i = 0; i < board.cells.length; i++) {
                let cell = i + 1;
                if (board.cellFree(cell)) {
                    let newBoard = board.clone();
                    newBoard.move(cell);
                    let result = this.minimax(newBoard, depth + 1, true);
                    if (result.score < bestScore) {
                        bestScore = result.score;
                        bestMove = cell;
                    }
                }
            }
            return {score: bestScore, move: bestMove};
        }
    }

    selectMove(board) {
        let result = this.minimax(board, 0, board.playerOne);
        return result.move;
    }
}
