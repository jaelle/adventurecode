view('/','pwp/step1.pwp','Choose Options').
view('/step1','pwp/step1.pwp','Choose Options').
view('/step2','pwp/step2.pwp','Build Maze').
view('/step3','pwp/step3.pwp','Solve Maze').
view('/setting_new','pwp/setting_new.pwp','Create New Setting').
view('/setting_save','pwp/save.pwp','New Setting Saved').
view('/hero_new','pwp/hero_new.pwp','Create New Hero').
view('/hero_save','pwp/save.pwp','New Hero Saved').
view('/goal_new','pwp/goal_new.pwp','Create New Goal').
view('/goal_save','pwp/save.pwp','New Goal Saved').
view('/mazemap_new','pwp/mazemap_new.pwp','Create Maze Map').
view('/mazemap_save','pwp/save.pwp','New Maze Map Saved').

page('/',null,'/step2').
page('/step1',null,'/step2').
page('/step2','/step1','/step3').
page('/step3','/step2',null).

display_view(ScriptName,View,Title):-
	view(ScriptName,Template,Title),
	load_view(Template,View).

load_view(Template,View):-
	load_xml_file(Template, Contents),
	pwp_xml(Contents, View, []).