view('/','pwp/step1.pwp','Choose Options').
view('/step1','pwp/step1.pwp','Choose Options').
view('/step2','pwp/step2.pwp','Build Maze').
view('/step3','pwp/step3.pwp','Solve Maze').
view('/setting_new','pwp/setting_new.pwp','Create new Setting').


page('/',null,'/step2').
page('/step1',null,'/step2').
page('/step2','/step1','/step3').
page('/step3','/step2',null).
page('/setting_new',null,null).

display_view(ScriptName,View,Title):-
	
	view(ScriptName,Template,Title),
	load_view(Template,View).

load_view(Template,View):-
	load_xml_file(Template, Contents),
	pwp_xml(Contents, View, []).