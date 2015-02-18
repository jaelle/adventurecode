view('/step1','pwp/step1.pwp','Choose Options').
view('/step2','pwp/step2.pwp','Build Maze').
view('/step3','pwp/step3.pwp','Solve Maze').

display_view(ScriptName,View,Title):-
	
	view(ScriptName,Template),
	load_view(Template,View,Title).

load_view(Template,View):-
	load_xml_file(Template, Contents),
	pwp_xml(Contents, View, []).