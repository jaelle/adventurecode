tutorial(Level,HeroImage,GoalImage,SettingImage,MazeStart,MazeEnd,MazeMap):-
    db_select_tutorial(Level,MazeMap,Hero,Goal,Setting,MazeStart,MazeEnd),
    
    db_get_hero_image(Hero,HeroImage),
    db_get_goal_image(Goal,GoalImage),
    db_get_setting_image(Setting,SettingImage).