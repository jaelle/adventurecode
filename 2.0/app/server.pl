:-use_module(library(http/thread_httpd)).
:-use_module(library(http/http_dispatch)).
:-use_module(library(http/http_pwp)).
:-use_module(library(http/http_mime_plugin)).
:-use_module(library(http/http_client)).
:-use_module(library(http/html_write)).

:- ensure_loaded(debug).
:- ensure_loaded(db_config).

user:file_search_path(pwp_root,'pwp').
user:file_search_path(static,'static').
user:file_search_path(assets,'assets').


:- http_handler('/blockly.html', blockly_handler, [priority(1)]).

:- http_handler('/setting_save', upload_handler, [priority(1)]).

:- http_handler('/js', assets_handler, [prefix, priority(1)]).
:- http_handler('/css', assets_handler, [prefix, priority(1)]).
:- http_handler('/images', assets_handler, [prefix, priority(1)]).
:- http_handler('/fonts', assets_handler, [prefix, priority(1)]).

:- http_handler('/favicon.ico', favicon_handler, [priority(2)]).

:- http_handler(/, default_handler, [prefix, priority(3)]).

server(Port):-
	db_config(Username,Password),
	
	odbc_connect(adventurecode_connector,Connection,[user(Username),password(Password)]),
	??db_insert_setting(Connection,"Description","images/dog.png"),
	
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
	(   memberchk(method(post), Request),
		http_read_data(Request, Parts, [form_data(mime)]),
		member(mime(Attributes, Data, []), Parts),
		memberchk(name(file), Attributes),
		memberchk(filename(Target), Attributes) ->  
		
			% process file here; this demo just prints the info gathered
			% TODO: save Data to a file
            atom_length(Data, Len),
            format('Content-type: text/plain~n~n'),
            format('Need to store ~D characters into file \'~w\'~n',
                   [ Len, Target ])
        ;   throw(http_reply(bad_request(bad_file_upload)))
	).

:- multifile prolog:message//1.

prolog:message(bad_file_upload) -->
        [ 'A file upload must be submitted as multipart/form-data using', nl,
          'name=file and providing a file-name'
        ].
	
db_insert_setting(Connection,Description,ImagePath):-
	setup_call_cleanup(
		odbc_prepare(Connection,'INSERT INTO settings (description,image_path) VALUES (?,?)',[varchar(255),varchar(255)],Insert),
		odbc_execute(Insert,[Description,ImagePath],_Result),
		odbc_free_statement(Insert)).