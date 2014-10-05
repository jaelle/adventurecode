# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready ->

	@myMazeLayout = new MazeLayout('mazebuilder',"",50,5,5,"new")

	$(document).on 'click', @myMazeLayout.canvas, (event) ->

		if event.type == "touchstart"
			@myMazeLayout.touchToggleColor(event)
		else
			# @myMazeLayout.toggleColor(event)
			map = JSON.parse($("#layoutstring").val())

			rect = $("#mazebuilder .maze")[0].getBoundingClientRect()
			x = event.clientX - rect.left
			y = event.clientY - rect.top
		
			#which cell is this?
			col = Math.floor(x / 50)
			row = Math.floor(y / 50)

			console.log(col + " " + row + " " + map[0][1])
			
			if map[row][col] == 1
				map[row][col] = 0
			else
				map[row][col] = 1

			$("#layoutstring").val(JSON.stringify(map))
			$("#mazebuilder .maze").remove()
			@myMazeLayout = new MazeLayout('mazebuilder',JSON.parse($("#layoutstring").val()),50,5,5,"new")
			

	$(".mazelayout").on 'click', (event) ->
		#console.log()
		$("#layoutstring").val(this.children[0].value)
		$("#mazebuilder .maze").remove()
		@myMazeLayout = new MazeLayout('mazebuilder',JSON.parse($("#layoutstring").val()),50,5,5,"new")
	
class @MazeLayout
	currentCell: null
	numCols: 5
	numRows: 5
	cellSize: 50
	canvas: null
	drawingContext: null
	layoutmap: null
	containerID: null


	constructor: (containerID,map,cellSize,nrows,ncols,type) ->

		if map != "" 
			# import existing map
			@numCols = map.length
			@numRows = map[0].length

			@layoutmap = map
		else 
			@layoutmap = []

		@numRows = nrows;
		@numCols = ncols;
		@cellSize = cellSize;

		@containerID = containerID;

		@createCanvas()
		@createDrawingContext()
		
		@drawingContext.fillRect 0, 0, @cellSize, @cellSize
		@currentCell = []
		
		for row in [0..(@numRows-1)] by 1
			@currentCell[row] = [] 
			
			if map == ""
				@layoutmap[row] = []

			for col in [0..(@numCols-1)] by 1

				# alert(@map[row][col] + " " + row + ", " + col)
				if map != ""
					if map[row][col] == 1
						color = "white"
					else
						color = "black"
				else 
					color = "white"
					@layoutmap[row][col] = 1

				@currentCell[row][col] = @createCell(row,col,color)
				@drawCell @currentCell[row][col]
	
	createCanvas: ->
		@canvas = document.createElement 'canvas'
		@canvas.className = 'maze'
		@canvas.height = @cellSize * @numRows
		@canvas.width = @cellSize * @numCols
		document.getElementById(@containerID).appendChild @canvas

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

	toggleColor: (event) ->

		@toggle(event.clientX, event.clientY)

	touchToggleColor: (event) ->

		touch = event.originalEvent.targetTouches[0];

		@toggle(touch.pageX,touch.pageY)

	toggle: (clientX,clientY) ->

		rect = @canvas.getBoundingClientRect()
		x = clientX - rect.left
		y = clientY - rect.top
	
		#which cell is this?
		col = Math.floor(x / 50)
		row = Math.floor(y / 50)
		
		cell = @currentCell[row][col]

		if cell.color == "black"
			cell.color = "white"
			@layoutmap[row][col] = 1
		else
			cell.color = "black"
			@layoutmap[row][col] = 0

		
		# cell = @myMaze.createCell(row,col)
		@drawCell(cell)
	
	updateJSON: (map_id) ->
		$(map_id).val(JSON.stringify(@layoutmap))