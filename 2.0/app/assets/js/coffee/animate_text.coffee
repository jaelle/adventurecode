class window.Tutorial
    @steps: null
    @step: null
    @message: null
    @section: null
    @modal: null
    
    constructor: (@step,@message) ->
        @steps = []
        @messages = []
        # $('#modal_init').modal('show')
        $('#modal_init').modal({
            backdrop: 'static',
            keyboard: false,
            show: true})
        @load()
    
    load: ->
        console.log("trying to load")
        $.getJSON '/json/messages.json', () ->
            console.log("Success")
        .done (data) ->
            this_tutorial = window.tutorial
            
            this_tutorial.add step for step in data.tutorial.steps
            this_tutorial.display_message()
        .fail (error) ->
            console.log("Error")
            console.log($.parseJSON(error.responseText))
            
    add: (step) ->
        console.log(step)
        @steps.push(step)
        
    display_message: ->
        console.log("message: " + @message)
        console.log("steps[" + @step + "].messages[" + @message + "]")
        console.log(@steps[@step].messages[@message].message)
        $('#rxe_message')[0].innerHTML = @steps[@step].messages[@message].message
        
        #is there another message?
        console.log("Update")
        @update_navbuttons()
        
    update_navbuttons: ->
        console.log("Update nav buttons")
        @update_next()
        @update_previous()
        @show_tryit()
        
    update_next: ->
        console.log("update next")
        if typeof @steps[@step].messages[@message + 1] != "undefined"
            $("#modal-next")[0].style.display = "inline"
        else
            console.log("hide button")
            $("#modal-next")[0].style.display = "none"
        
    update_previous: ->
        console.log("message: " + @message)
        if typeof @steps[@step].messages[@message - 1] != "undefined"
            $("#modal-previous")[0].style.display = "inline"
        else
            console.log("hide button")
            $("#modal-previous")[0].style.display = "none"
            
    show_tryit: ->
        console.log("Try it: " + @steps[@step].messages[@message].tryit)
        if @steps[@step].messages[@message].tryit == true
            $("#modal-tryit")[0].style.display = "inline"
        else
            $("#modal-tryit")[0].style.display = "none"
            
        
    next: ->
        @message++
        @display_message()
        
    previous: ->
        @message--
        @display_message()
        
    get_step: ->
        @step