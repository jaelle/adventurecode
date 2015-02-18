function init() {
	Blockly.inject(document.body, {toolbox: document.getElementById('toolbox')});
	// Let the top-level application know that Blockly is ready.
	window.parent.blocklyLoaded(Blockly);
}