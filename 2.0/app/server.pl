:-use_module(library(http/thread_httpd)).
:-use_module(library(http/http_dispatch)).
:-use_module(library(http/http_pwp)).

:- ensure_loaded(debug).

user:file_search_path(pwp_root,'pwp').
user:file_search_path(static,'static').
user:file_search_path(assets,'assets').


:- http_handler('/blockly.html', blockly_handler, [priority(1)]).
:- http_handler('/js', assets_handler, [prefix, priority(1)]).
:- http_handler('/css', assets_handler, [prefix, priority(1)]).
:- http_handler('/images', assets_handler, [prefix, priority(1)]).
:- http_handler('/fonts', assets_handler, [prefix, priority(1)]).
:- http_handler('/favicon.ico', favicon_handler, [priority(1)]).
:- http_handler(/, default_handler, [prefix, priority(2)]).

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
	reply_pwp_page(static('blockly.html'),[], Request).
	
favicon_handler(Request):-

	http_404([],Request).

/*

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
	reply_pwp_page(static('blockly.html'),[], Request).*/

