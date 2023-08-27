const GameBoard = (() => {

	let board = [];

		const rows = 3;
		const columns = 3;

		for (let i = 0; i < (rows * columns); i++){
				board.push('');
		}


		return {
			getBoard:function(){
				return board;
			},
			placeMarker:function(index,marker){
				board[index] = board[index] === '' && marker !== undefined ? marker : board[index];
				return board;
			},
						
			}			
		
})();

const GameController = (() => {

	const Players = [
		{
			name: 'Player 1',
			token: undefined,
		},
		{
			name: 'Computer',
			token: undefined,
		},
	]

	let board = GameBoard.getBoard();

	let activePlayer = Players[0];

	const win = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[6,4,2],[0,3,6],[1,4,7],[2,5,8]];


	const switchTurns = () => activePlayer = activePlayer === Players[0] ? Players[1] : Players[0];

	const checkForWin = () => {
		for (let i = 0; i < win.length; i++){
			if ((board[win[i][0]] === board[win[i][1]] && board[win[i][1]] === board[win[i][2]]) && (board[win[i][0]] !== '')){
				return board[win[i][0]] === Players[0].token ? Players[0] : Players[1];
				} 
		}
		} 

			
	return {
		chooseMarker: function(event){
			Players[0].token = event.target.key;
			Players[1].token = Players[0].token === 'x' ? 'o' : 'x';
		},
		getActivePlayer:function(){
			return activePlayer;
		},
		playRound:function(event){
			if (activePlayer.token !== undefined && board[event.target.value] == ''){
			GameBoard.placeMarker(event.target.value,activePlayer.token);
			ScreenController.updateDisplay();
			let winner = checkForWin();
			ScreenController.announceWinner(winner);
			}
		},
		changeTurn:function(){
			switchTurns();
			ScreenController.displayTurn();
		},
		}
	
	
})();

const ScreenController = (() => {

	const headerDiv = document.createElement('div');
		headerDiv.className = 'headerDiv';

		const header = document.createElement('h2');
			header.className = 'header';
			header.textContent = 'Tic Tac Toe';

			headerDiv.appendChild(header);

			document.body.appendChild(headerDiv);

	const gameContainer = document.createElement('div');
		gameContainer.className = 'gameContainer';

		const displayDiv = document.createElement('div');
			displayDiv.className = 'displayDiv';

			const displayHeader = document.createElement('h3');
				displayHeader.textContent = 'Pick a marker to begin:';
		
		displayDiv.appendChild(displayHeader);

				const mainDisplay = document.createElement('div');
					mainDisplay.className = 'mainDisplay';

					const markerChoices = [
						{ 
							token: 'x',
							path: '/icons/x.svg', 
						},
						{
							token: 'o',
							path: '/icons/o.svg',
						},
					];

						for (let i = 0; i < markerChoices.length; i++){
							const markerClickHandler = document.createElement('a');
								markerClickHandler.addEventListener('click',GameController.chooseMarker);
								markerClickHandler.addEventListener('click',function(){
									displayHeader.textContent = 'Make your move:';
								let activePlayer = GameController.getActivePlayer();
								mainDisplay.textContent = `${activePlayer.name}'s turn...`
						})

									
								
								const markerImg = document.createElement('img');
									markerImg.className = 'marker';
									markerImg.key = markerChoices[i].token;
									markerImg.src = markerChoices[i].path;

							markerClickHandler.appendChild(markerImg);
							mainDisplay.appendChild(markerClickHandler);
									}
		
		displayDiv.appendChild(mainDisplay);
	
	gameContainer.appendChild(displayDiv);

	

const gameBoard = document.createElement('div');
			gameBoard.className = 'gameBoard';

return {
	updateDisplay: function(){

		gameBoard.innerHTML = '';
			const board = GameBoard.getBoard();
			let i = 0;
			for (const element of board){
				
				const square = document.createElement('div');
					square.className = 'square';
				square.addEventListener('click',GameController.playRound);

				if (element == ''){
					const squareBtn = document.createElement('button');
						squareBtn.value = i;
						square.appendChild(squareBtn);
						gameBoard.appendChild(square);
						i++

				} else if (element === 'x'){
					const squareImg = document.createElement('img');
						squareImg.className = 'largeImg';
						squareImg.src = 'icons/x.svg';
						square.appendChild(squareImg);
						gameBoard.appendChild(square);
						i++

				} else if (element === 'o'){
					const squareImg = document.createElement('img');
					squareImg.className = 'largeImg';

						squareImg.src = 'icons/o.svg';
						square.appendChild(squareImg);
						gameBoard.appendChild(square);
						i++

				}
				gameContainer.appendChild(gameBoard);

			}
			
			
document.body.appendChild(gameContainer);

		
	},
	displayTurn: function(){
		displayHeader.textContent = 'Make your move:';
		let activePlayer = GameController.getActivePlayer();
		mainDisplay.textContent = `${activePlayer.name}'s turn...`

	},
	announceWinner: function(player){
		if (player !== undefined){
		displayHeader.textContent = 'Game Over!';
		mainDisplay.textContent = `${player.name} wins!`;
		} else {
			GameController.changeTurn();
		}
	},

}
			

		


})();

ScreenController.updateDisplay();