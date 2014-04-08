var config  =   {
    cell_html   :   function(index, value){
        return '<div class="col-sm-1 game-cell" data-value="'+index+'">'+value+'</div>';
    },

    success_html: function(moves){
        return '<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Congrats!</strong>You have won the game in'+moves+'</div>';
    },

    game_container_id   : "game_container",
    game_cell_class:"game-cell",
    game_type_control_id:"game-type",
    moves_counter_id:"moves-counter"
};