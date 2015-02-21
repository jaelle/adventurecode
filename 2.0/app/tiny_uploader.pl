:-use_module(library(http/thread_httpd)).
:-use_module(library(http/http_dispatch)).
:-use_module(library(http/http_pwp)).
:-use_module(library(http/http_mime_plugin)).
:-use_module(library(http/http_client)).
:-use_module(library(http/html_write)).
:-use_module(library(http/http_parameters)).


:- http_handler('/save', upload_handler, [priority(1)]).
:- http_handler(/, default_handler, [prefix, priority(2)]).

% :- ensure_loaded(debug).

server(Port):-
		
	% start server on specified Port
	http_server(http_dispatch, [port(Port)]).


default_handler(Request):-
	reply_html_page(
            title('Upload a file'),
            [ h1('Upload a file'),
              form([ method('POST'),
                     action('/save'),
                     enctype('multipart/form-data')
                   ],
                   table([],
                         [ tr([td(input([type(file), name(file)]))]),
                           tr([td(input([type(text), name(description)]))]),
                           tr([td(align(right),
                                  input([type(submit), value('Upload!')]))])
                                
                         ]))
            ]).

upload_handler(Request):-

	memberchk(method(post), Request),
	http_read_data(Request, Parts, [form_data(mime)]),
	
	member(mime(DescriptionAttributes, Description, []), Parts),
	memberchk(name(description),DescriptionAttributes),
	
    member(mime(FileAttributes, File, []), Parts),
    memberchk(name(file),FileAttributes),
    memberchk(filename(Target),FileAttributes),
			
	open(Target,write,FStream,[create([read,write]),encoding(octet)]),
	write(FStream,File),
	close(FStream),
	
    atom_length(File, Len),
    format('Content-type: text/plain~n~n'),
    format('Need to store ~D characters into file \'~w\'~n', [ Len, Target ]),
    format('Description: ~w',[Description]).