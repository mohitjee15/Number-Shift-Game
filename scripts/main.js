var main = (function(){
    var game_array;

    var valid_move_array  =   new Array();

    var matrix_grid_size;

    var moves_counter = 0;

    var blank_space_pointer;



    var getGameArray    =   function(){
        return game_array;
    }

    var getMatrixGridSize   =   function(){
        return matrix_grid_size;
    }

    var setMatrixGridSize   =   function(new_matrix_grid_size){
        matrix_grid_size    =   new_matrix_grid_size;
    }


    var getMovesCounter   =   function(){
        return moves_counter;
    }

    var getBlankSpacePointer    =   function(){
        return blank_space_pointer;
    }


    var createGameArray =   function(){
        game_array  =   new Array();
        var game_array_size =   matrix_grid_size*matrix_grid_size;

        for(i=0; i < (game_array_size-1); i++){
            game_array.push(i+1);
        }

        game_array.push('&nbsp;');
    }

    var randomizeGameArray  =   function(array){
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        blank_space_pointer =   array.indexOf('&nbsp;');

        return array;
    }

    var updateMoves =   function(){
        document.getElementById(config.moves_counter_id).innerHTML  =   moves_counter;

    }

    var setValidMovesArray  =   function(){

        blank_space_pointer *= 1;
        matrix_grid_size *= 1;
        valid_move_array    =   new Array();
        var left = blank_space_pointer - 1;
        var right = blank_space_pointer + 1;
        var top =   blank_space_pointer - matrix_grid_size;
        var bottom = blank_space_pointer + matrix_grid_size;

        if((((left+1)%matrix_grid_size) != 0) && (left >= 0)){
            valid_move_array.push(left);
        }

        if((((right)%matrix_grid_size) != 0) && (right <= (game_array.length-1))){
            valid_move_array.push(right);
        }

        if(top >= 0){
            valid_move_array.push(top);
        }

        if(bottom <= (game_array.length-1)){
            valid_move_array.push(bottom);
        }

        /*console.log(top);
        console.log(bottom);
        console.log(valid_move_array);*/

    }



    var getGameArray    =   function(){
        return game_array;
    }


    var isMoveAllowed   =   function(move_position){
        if(valid_move_array.indexOf(move_position*1) > -1){
            return true;
        } else {
            false;
        }
    }




    var shiftBlankSpace =   function(move_position){
        if(isMoveAllowed(move_position)){
            var temp    =   game_array[blank_space_pointer];
            game_array[blank_space_pointer] =   game_array[move_position];
            game_array[move_position]   =   temp;
            return true;
        }
        return false;
    }

    var isGameWon   =   function(){
        for(var i = 0; i < ((matrix_grid_size*matrix_grid_size)-2); i++ ){
            if(game_array[i] != (i+1)){
                console.log(game_array[i]);
                return false;
            }
        }
        return true
    };

    var createGameHTML  =   function(){
        var game_html= '';
        for(var i in game_array){
            if(i == 0){
                var game_html   =   '<div class="row">';
            } else if(i == (game_array.length)){
                game_html   +=   '</div>';
                break;
            } else if(((i*1+1)%matrix_grid_size)==1){
                game_html   +=   '</div><div class="row">';
            }


            game_html   +=  config.cell_html(i, game_array[i]);
        }

        document.getElementById(config.game_container_id).innerHTML =   game_html;
    }


    var refreshGameHTML =   function(){
        var game_cells_array    =   document.getElementsByClassName(config.game_cell_class);

        for(var i=0; i<game_cells_array.length; i++){
            game_cells_array[i].innerHTML = game_array[i];
        }
    }


    var bindGameCellsToEvents   =   function(){
        var game_cells_array    =   document.getElementsByClassName(config.game_cell_class);

        for(var i=0; i<game_cells_array.length; i++){

            game_cells_array[i].addEventListener('click',function(e){
                if(shiftBlankSpace(this.getAttribute('data-value'))){

                    blank_space_pointer =   this.getAttribute('data-value');
                    setValidMovesArray();
                    moves_counter++;
                    updateMoves();

                    refreshGameHTML();

                    if(isGameWon()){
                        alert("You have won in "+moves_counter+" moves");
                    }
                }
            });

        }
    }

    var prepareGame =   function(matrix_size){
        setMatrixGridSize(matrix_size);
        createGameArray();
        game_array  =  randomizeGameArray(game_array);
        createGameHTML();
        setValidMovesArray();
        bindGameCellsToEvents();
        moves_counter = 0;
        updateMoves();
    }

    var bootstrap   =   function(){
        document.getElementById(config.game_type_control_id).addEventListener('change',function(){

            if(this.options[this.selectedIndex].value!='Select'){
                prepareGame(this.options[this.selectedIndex].value);
            }

        });
    }



    return {
        bootstrap:bootstrap,
        prepareGame:prepareGame
    }

})();