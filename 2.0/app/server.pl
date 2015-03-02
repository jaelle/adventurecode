:-use_module(library(http/thread_httpd)).
:-use_module(library(http/http_dispatch)).
:-use_module(library(http/http_pwp)).
:-use_module(library(http/http_mime_plugin)).
:-use_module(library(http/http_client)).
:-use_module(library(http/html_write)).
:-use_module(library(http/http_parameters)).
:-use_module(library(http/json)).
:-use_module(library(http/http_session)).

:- ensure_loaded(debug).
:- ensure_loaded(db).

user:file_search_path(pwp_root,'pwp').
user:file_search_path(static,'static').
user:file_search_path(assets,'assets').

:- http_handler('/blockly.html', blockly_handler, [priority(1)]).
:- http_handler('/mazemap_json', mazemap_json_handler, [priority(1)]).
:- http_handler('/settings_json', settings_json_handler, [priority(1)]).
:- http_handler('/goals_json', goals_json_handler, [priority(1)]).
:- http_handler('/heroes_json', heroes_json_handler, [priority(1)]).

/*:- http_handler('/setting_save', upload_handler, [priority(1)]).
:- http_handler('/goal_save', upload_handler, [priority(1)]).
:- http_handler('/hero_save', upload_handler, [priority(1)]).

:- http_handler('/mazemap_save', mazemap_save_handler, [priority(1)]).*/

:- http_handler('/js', assets_handler, [prefix, priority(1)]).
:- http_handler('/css', assets_handler, [prefix, priority(1)]).
:- http_handler('/images', assets_handler, [prefix, priority(1)]).
:- http_handler('/fonts', assets_handler, [prefix, priority(1)]).

:- http_handler('/favicon.ico', favicon_handler, [priority(2)]).

:- http_handler(/, default_handler, [prefix, priority(3)]).

server(Port):-
	% start server on specified Port
	http_server(http_dispatch, [port(Port)]).

default_handler(Request):-

	% Post data exists
	??memberchk(method(post),Request),
	catch(	
		??http_read_data(Request, Parameters, []),
		_E,
		fail),
	
	set_sessions(Request,Parameters),
		
	load_template(Request).
	
default_handler(Request):-

	% Post data doesn't exist
		
	load_template(Request).

assets_handler(Request):-

	% file is not PWP
	memberchk(path(Path),Request),
	http_reply_file(assets(Path),[cache(true),unsafe(false)],Request).

blockly_handler(Request):-
	reply_pwp_page(static('blockly.html'),[pwp_module(true)], Request).
	
favicon_handler(Request):-
	http_404([],Request).

upload_handler(Request):-
	memberchk(method(post), Request),
	http_read_data(Request, Parts, [form_data(mime)]),
	
	member(mime(DescriptionAttributes, Description, []), Parts),
	memberchk(name(description),DescriptionAttributes),
	
    member(mime(FileAttributes, File, []), Parts),
    memberchk(name(file),FileAttributes),
    memberchk(filename(Target),FileAttributes),
    
    directory_file_path('assets/images/uploads',Target,Path),
    directory_file_path('images/uploads',Target,WebPath),
			
	open(Path,write,FStream,[create([read,write]),encoding(octet)]),
	write(FStream,File),
	close(FStream),

    memberchk(path(URLPath), Request),
    
	db_connect(Connection),
	db_save(Connection,Description,WebPath,URLPath),
	odbc_disconnect(Connection)
	
    reply_pwp_page(pwp_root('template.html'),[pwp_module(true)],Request).
    
mazemap_save_handler(Request):-
	memberchk(method(post), Request),
	http_read_data(Request, [description=Description,mazebuilder_map=Map], []),
	
	db_connect(Connection),
	db_insert_mazemap(Connection,Description,Map),
	odbc_disconnect(Connection)
	
    reply_pwp_page(pwp_root('template.html'),[pwp_module(true)],Request).
    
mazemap_json_handler(Request):-

	db_connect(Connection),
	findall(
		mazemap{description:Description,map:Map},
		db_select_mazemaps(Connection,row(_Id,Description,Map)),
		Maps),
	odbc_disconnect(Connection)
	
	% must output the header or json_write will hang
    format('Content-type: text/json~n~n'),	
	json_write(current_output,Maps).
    
settings_json_handler(Request):-

	db_connect(Connection),
	findall(
		setting{id:Id,description:Description,image_path:ImagePath},
		db_select_settings(Connection,row(Id,Description,ImagePath)),
		Settings),
	odbc_disconnect(Connection)
	
	% must output the header or json_write will hang
    format('Content-type: text/json~n~n'),	
	json_write(current_output,Settings).
	
goals_json_handler(Request):-

	db_connect(Connection),
	findall(
		goal{id:Id,description:Description,image_path:ImagePath},
		db_select_goals(Connection,row(Id,Description,ImagePath)),
		Goals),
	odbc_disconnect(Connection)
	
	% must output the header or json_write will hang
    format('Content-type: text/json~n~n'),	
	json_write(current_output,Goals).

heroes_json_handler(Request):-

	db_connect(Connection),
	findall(
		hero{id:Id,description:Description,image_path:ImagePath},
		db_select_heroes(Connection,row(Id,Description,ImagePath)),
		Heroes),
	odbc_disconnect(Connection)
	
	% must output the header or json_write will hang
    format('Content-type: text/json~n~n'),	
	json_write(current_output,Heroes).

set_sessions(Request,Parameters):-

	% Check for step 0 POST data
	memberchk(path_info(step1),Request),
	step00_set_session(Parameters).
	
set_sessions(Request,Parameters):-

	% Check for step 1 POST data
	??memberchk(path_info(step2),Request),
	step01_set_session(Parameters).
	
set_sessions(Request,Parameters):-

	% Check for step 2 POST data
	memberchk(path_info(step3),Request),
	step02_set_session(Parameters).
	
load_template(Request):-
	
	% Handle PWP
	reply_pwp_page(pwp_root('template.html'),[pwp_module(true)],Request).

step00_set_session(Parameters):-
	
	memberchk(reset=1,Parameters),
	
	http_session_retractall(maze_setting(_Settings)),
	http_session_retractall(maze_goal(_Goals)),
	http_session_retractall(maze_hero(_Heroes)),
	http_session_retractall(maze_map(_MazeMaps)),
	http_session_retractall(maze_start(_MazeStarts)),
	http_session_retractall(maze_end(_MazeEnds)).
	
step00_set_session(_Parameters).

step01_set_session(Parameters):-
		
	memberchk(maze_setting=Setting,Parameters),
	memberchk(maze_goal=Goal,Parameters),
	memberchk(maze_hero=Hero,Parameters),
	
	http_session_retractall(maze_setting(_Settings)),
	http_session_retractall(maze_goal(_Goals)),
	http_session_retractall(maze_hero(_Heroes)),
	
	http_session_assert(maze_setting(Setting)),
	http_session_assert(maze_hero(Hero)),
	http_session_assert(maze_goal(Goal)).
	
step02_set_session(Parameters):-

	memberchk(maze_setting=Setting,Parameters),
	memberchk(maze_goal=Goal,Parameters),
	memberchk(maze_hero=Hero,Parameters),
	memberchk(maze_map=MazeMap,Parameters),
	memberchk(maze_start=MazeStart,Parameters),
	memberchk(maze_end=MazeEnd,Parameters),

	http_session_retractall(maze_setting(_Settings)),
	http_session_retractall(maze_goal(_Goals)),
	http_session_retractall(maze_hero(_Heroes)),
	http_session_retractall(maze_map(_MazeMaps)),
	http_session_retractall(maze_start(_MazeStarts)),
	http_session_retractall(maze_end(_MazeEnds)),
	
	http_session_assert(maze_setting(Setting)),
	http_session_assert(maze_hero(Hero)),
	http_session_assert(maze_goal(Goal)),
	http_session_assert(maze_map(MazeMap)),
	http_session_assert(maze_start(MazeStart)),
	http_session_assert(maze_end(MazeEnd)).