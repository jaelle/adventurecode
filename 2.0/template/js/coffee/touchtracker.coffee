class window.TouchTracker
	constructor: (@element, params={}) ->
		# Distance, in pixels, a touch event can travel while still being considered a “tap”
		@tapThreshold = params.tapThreshold ? 20

		# Maximum time, in milliseconds, for a Tap event (any longer is considered a “Hold”, or something else)
		@tapTimeoud = params.tapTimeoud ? 500
 
 		# Should a Tap be triggered if a touch event drops off an edge of the screen?
		@tapSlideOff = params.tapSlideOff ? false

		# Distance, in pixels, of a “drag” needed to trigger Swipe
		@swipeThreshold = params.swipeThreshold ? 300 

		# Should a Swipe be triggered if a drag drops off an edge of the screen?
		@swipeSlideOff = params.swipeSlideOff ? false 

		startX: => 0
		startY: => 0
		endX: => 0
		endY: => 0

		@element.bind "touchstart", (e) => @touchStartHandler(e)
		@element.bind "touchend", (e) => @touchEndHandler(e)

	touchStartHandler: (e) =>

		@startX = e.originalEvent.targetTouches[0].pageX
		@startY = e.originalEvent.targetTouches[0].pageY
	touchEndHandler: (e) =>
		@endX = e.originalEvent.changedTouches[0].pageX
		@endY = e.originalEvent.changedTouches[0].pageY
		distance = Math.sqrt(Math.pow(@startX - @endX, 2) + Math.pow(@startY - @endY, 2));
		console.log "Distance: ", distance
		swipeEvent = if distance > @swipeThreshold then "Yes" else "No"
		console.log "Swipe Event? ", swipeEvent

jQuery ->
	#touchCanvas = $ '#mazebuilder'
	#touchTracker = new TouchTracker(touchCanvas, {swipeThreshold: 400})