var config  =   {
    cell_html   :   function(index, value){
        return '<div class="col-sm-1 game-cell" data-value="'+index+'">'+value+'</div>';
    },

    game_container_id   : "game_container",
    game_cell_class:"game-cell",
    game_type_control_id:"game-type",
    moves_counter_id:"moves-counter"
};