:-use_module(library(http/thread_httpd)).
:-use_module(library(http/http_dispatch)).
:-use_module(library(http/http_files)).
:-use_module(library(http/http_pwp)).

:- ensure_loaded(debug).

% setup http server
http:location(root, '/', []).
http:location(images, '/images/', []).
http:location(fonts, '/fonts/', []).

user:file_search_path(pwp,'pwp').
user:file_search_path(static,'static').
user:file_search_path(css,'css').
user:file_search_path(js,'js').

:- http_handler('/blockly.html', blockly_handler, []).

:- http_handler(images(.), http_reply_from_files('images', []), [prefix]).
:- http_handler(fonts(.), http_reply_from_files('fonts', []), [prefix]).
:- http_handler(root(.), index_handler, [prefix,priority(2)]).

server(Port):-
	http_server(http_dispatch, [port(Port)]).
	
index_handler(Request):-

	reply_pwp_page(static('template.html'),[pwp_module(true)],Request).

blockly_handler(Request):-
	reply_pwp_page(static('blockly.html'),[], Request).

:- catch(server(8000),_E,fail).

