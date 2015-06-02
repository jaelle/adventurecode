/*
To add a new tutorial page
0. Create a new PWP view (easiest way is to save the previous one as the next number in the list)

1. add a view rule:

ex:
view('/path/to/tutorial','/path/to/pwp/view/','Page Title').

2. update the page rules so that the navigation is accurate

pattern should be:
page('/path/to/tutorial','/path/to/previous','/path/to/next')

3. Create a new maze to use for the base of this tutorial

Go to / and walk through the steps in Maze Builder to create your tutorial maze. Save it using the "Save" icon.

4. In postgresql, link the maze you just created with a new row in the tutorials.

In command line:
sudo sudo -u postgres psql
\c adventurecode
SELECT id FROM mazes ORDER BY id DESC LIMIT 1;
SELECT id FROM tutorials ORDER BY id DESC LIMIT 1
INSERT INTO tutorials VALUES ([tutorial_id++],[maze_id])
\q
*/

view('/','pwp/step1.pwp','Fill in the blanks:').
view('/step1','pwp/step1.pwp','Fill in the blanks:').
view('/step2','pwp/step2.pwp','Choose a path.').
view('/step3','pwp/step3.pwp','Reach the goal.').
view('/setting_new','pwp/setting_new.pwp','Create New Setting').
view('/setting_save','pwp/save.pwp','New Setting Saved').
view('/hero_new','pwp/hero_new.pwp','Create New Hero').
view('/hero_save','pwp/save.pwp','New Hero Saved').
view('/goal_new','pwp/goal_new.pwp','Create New Goal').
view('/goal_save','pwp/save.pwp','New Goal Saved').
view('/mazemap_new','pwp/mazemap_new.pwp','Create Maze Map').
view('/mazemap_save','pwp/save.pwp','New Maze Map Saved').
view('/save','pwp/save.pwp','Maze Saved').
view('/tutorial','pwp/tutorial/0.pwp','Tutorial: Drag & Drop').
view('/tutorial2','pwp/tutorial/1.pwp','Tutorial: North, South, East, West').
view('/tutorial3','pwp/tutorial/2.pwp','Tutorial: Over and Over Again').

page('/',null,'/step2').
page('/step1',null,'/step2').
page('/step2','/step1','/step3').
page('/step3','/step2',null).

page('/tutorial',null,'/tutorial2').
page('/tutorial2','/tutorial','/tutorial3').
page('/tutorial3','/tutorial2',null).

display_view(ScriptName,View,Title):-
	view(ScriptName,Template,Title),
	load_view(Template,View).

load_view(Template,View):-
	load_xml_file(Template, Contents),
	pwp_xml(Contents, View, []).