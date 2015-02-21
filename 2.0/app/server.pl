:-use_module(library(http/thread_httpd)).
:-use_module(library(http/http_dispatch)).
:-use_module(library(http/http_pwp)).
:-use_module(library(http/http_mime_plugin)).
:-use_module(library(http/http_client)).
:-use_module(library(http/html_write)).
:-use_module(library(http/http_parameters)).

:- ensure_loaded(debug).
:- ensure_loaded(db_config).

user:file_search_path(pwp_root,'pwp').
user:file_search_path(static,'static').
user:file_search_path(assets,'assets').

:- http_handler('/blockly.html', blockly_handler, [priority(1)]).

:- http_handler('/setting_save', upload_handler, [priority(1)]).
:- http_handler('/goal_save', upload_handler, [priority(1)]).
:- http_handler('/hero_save', upload_handler, [priority(1)]).

:- http_handler('/mazemap_save', mazemap_save_handler, [priority(1)]).

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

	% Handle PWP
	reply_pwp_page(pwp_root('template.html'),[pwp_module(true)],Request).
	
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
			
	open(Path,write,FStream,[create([read,write]),encoding(octet)]),
	write(FStream,File),
	close(FStream),

    memberchk(path(URLPath), Request),
    
	db_config(Username,Password),
	odbc_connect(adventurecode_connector,Connection,[user(Username),password(Password)]),
	
	db_save(Connection,Description,Path,URLPath),
	
    reply_pwp_page(pwp_root('template.html'),[pwp_module(true)],Request).
    
mazemap_save_handler(Request):-
	memberchk(method(post), Request),
	??http_read_data(Request, Parts, []),
	
	format('Map: ~w',Map).
	
    reply_pwp_page(pwp_root('template.html'),[pwp_module(true)],Request).

db_save(Connection,Description,Path,'/setting_save'):-
	db_insert_setting(Connection,Description,Path).

db_save(Connection,Description,Path,'/hero_save'):-
	db_insert_hero(Connection,Description,Path).

db_save(Connection,Description,Path,'/goal_save'):-
	db_insert_goal(Connection,Description,Path).
	
db_insert_setting(Connection,Description,ImagePath):-
	setup_call_cleanup(
		odbc_prepare(Connection,'INSERT INTO settings (description,image_path) VALUES (?,?)',[varchar(255),varchar(255)],Insert),
		odbc_execute(Insert,[Description,ImagePath],_Result),
		odbc_free_statement(Insert)).

db_insert_hero(Connection,Description,ImagePath):-
	setup_call_cleanup(
		odbc_prepare(Connection,'INSERT INTO heroes (description,image_path) VALUES (?,?)',[varchar(255),varchar(255)],Insert),
		odbc_execute(Insert,[Description,ImagePath],_Result),
		odbc_free_statement(Insert)).

db_insert_goal(Connection,Description,ImagePath):-
	setup_call_cleanup(
		odbc_prepare(Connection,'INSERT INTO goals (description,image_path) VALUES (?,?)',[varchar(255),varchar(255)],Insert),
		odbc_execute(Insert,[Description,ImagePath],_Result),
		odbc_free_statement(Insert)).


db_insert_mazemap(Connection,Description,MazeMap):-
	setup_call_cleanup(
		odbc_prepare(Connection,'INSERT INTO mazemaps (map,image_path) VALUES (?,?)',[varchar(255),varchar(255)],Insert),
		odbc_execute(Insert,[Description,MazeMap],_Result),
		odbc_free_statement(Insert)).