# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$(document).ready ->
	@myMaze = new Maze

	$(document).on 'click touchstart', @myMaze.canvas, (event) ->
		rect = @myMaze.canvas.getBoundingClientRect()
		x = event.clientX - rect.left
		y = event.clientY - rect.top
	
		#which cell is this?
		col = Math.floor(x / 50)
		row = Math.floor(y / 50)
		
		cell = @myMaze.currentCell[row][col]
		
		if cell.color == "black"
			cell.color = "white"
		else
			cell.color = "black"
		
		# cell = @myMaze.createCell(row,col)
		@myMaze.drawCell(cell)
	
class Maze
	currentCell: null
	cellSize: 50
	numRows: 5
	numCols: 5
	canvas: null
	drawingContext: null

	constructor: ->
		@createCanvas()
		@createDrawingContext()
		
		@drawingContext.fillRect 0, 0, @cellSize, @cellSize
		@currentCell = []
		
		for row in [0..@numRows] by 1
			@currentCell[row] = [] 
			for col in [0..@numCols] by 1
				@currentCell[row][col] = @createCell(row,col,"white")
				@drawCell @currentCell[row][col]
	
	createCanvas: ->
		@canvas = document.createElement 'canvas'
		@canvas.id = 'maze'
		@canvas.height = @cellSize * @numRows
		@canvas.width = @cellSize * @numCols
		document.getElementById('mazebuilder').appendChild @canvas

	createDrawingContext: ->
		@drawingContext = @canvas.getContext '2d'

	drawCell: (cell) ->
		x = cell.col * @cellSize
		y = cell.row * @cellSize
		color = cell.color
		
		@drawingContext.strokeStyle = 'rgba(0, 0, 0, 1)'
		@drawingContext.strokeRect x, y, @cellSize, @cellSize
		
		if color == "white"
			fillStyle = 'rgb(255,255,255)'
		else
			fillStyle = 'rgb(0,0,0)'
			
		@drawingContext.fillStyle = fillStyle
		@drawingContext.fillRect x, y, @cellSize, @cellSize

	createCell: (row,col,color) ->
		row: row 
		col: col
		color: color