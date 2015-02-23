:-ensure_loaded(db_config).

db_connect(Connection):-

	db_config(Username,Password),
	odbc_connect(adventurecode_connector,Connection,[user(Username),password(Password)]).
	
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
		odbc_prepare(Connection,'INSERT INTO mazemaps (description, map) VALUES (?,?)',[varchar(255),varchar(255)],Insert),
		odbc_execute(Insert,[Description,MazeMap],_Result),
		odbc_free_statement(Insert)).
		
db_select_mazemaps(Connection,row(Id,Description,Map)):-
	setup_call_cleanup(
		odbc_prepare(Connection,'SELECT id,description,map FROM mazemaps',[],Select),
		odbc_execute(Select,[],row(Id,Description,Map)),
		odbc_free_statement(Select)).


db_select_goals(Connection,row(Id,Description,ImagePath)):-
	setup_call_cleanup(
		odbc_prepare(Connection,'SELECT id,description,image_path FROM goals',[],Select),
		odbc_execute(Select,[],row(Id,Description,ImagePath)),
		odbc_free_statement(Select)).
		

db_select_heroes(Connection,row(Id,Description,ImagePath)):-
	setup_call_cleanup(
		odbc_prepare(Connection,'SELECT id,description,image_path FROM heroes',[],Select),
		odbc_execute(Select,[],row(Id,Description,ImagePath)),
		odbc_free_statement(Select)).


db_select_settings(Connection,row(Id,Description,ImagePath)):-
	setup_call_cleanup(
		odbc_prepare(Connection,'SELECT id,description,image_path FROM settings',[],Select),
		odbc_execute(Select,[],row(Id,Description,ImagePath)),
		odbc_free_statement(Select)).
		
db_get_hero_image(Id,ImagePath):-
	db_connect(Connection),
	db_select_heroes(Connection,row(Id,Description,ImagePath)),!.
	
	
db_get_goal_image(Id,ImagePath):-
	db_connect(Connection),
	db_select_goals(Connection,row(Id,Description,ImagePath)),!.