//random
window.onload=function(){restart_game()}
var ran;
var i,j;
var arr= new Array();
var ro,col;

for(ro=0;ro<4;ro++){
	arr[ro]= new Array();
	for (col=0; col<4; col++) {
		arr[ro][col]=0;
	}
}

function rand(){
	do{
		i=Math.floor(Math.random()*4);
        j=Math.floor(Math.random()*4);
	}while(Used_Nu(i,j))//
						//就是这个循环，这个意味着如果我将rand xie zai 外面的话，即那个can_up等的判断的外围的话，就会在所有的格子都有数字的情况之下，
						//指得是数组所有的数字都大于0的情况之下，会进入死循环，然后一直出不来，，woc
    if(Math.random()<=0.5){
    	arr[i][j]=2;
    	document.getElementById("cell"+i+j).innerHTML=arr[i][j];
    }
    else{
    	arr[i][j]=4
    	document.getElementById("cell"+i+j).innerHTML=arr[i][j];
    }
}

function init(){
	for(ro=0;ro<4;ro++){
		arr[ro]= new Array();
		for (col=0; col<4; col++) {
			arr[ro][col]=0;
		}
	}
}

function Used_Nu(row,column){
    if(arr[row][column]==0)
    	return false;
    else 
    	return true;
}

function restart_game(){
	init();
	rand();
	rand();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(arr[i][j]==0){
				document.getElementById('cell'+i+j).innerHTML="";
            	$('#cell'+i+j).css('background-color','#CDC0B4');
			}
			else
				document.getElementById('cell'+i+j).style.color = "black";
			    $('#cell'+i+j).css('background-color',background_color(arr[i][j]));
		}
	}
	document.getElementById('number').innerHTML=0;
}

/*
    38: 0, // Up
    39: 1, // Right
    40: 2, // Down
    37: 3, // Left
    75: 0, // Vim up
    76: 1, // Vim right
    74: 2, // Vim down
    72: 3, // Vim left
    87: 0, // W
    68: 1, // D
    83: 2, // S
    65: 3  // A
*/

$(document).keydown(function(event) {
	switch(event.keyCode) {
		case 37:
		case 72:
		case 65:
			move_left();
			press_music();
			break;

		case 39:
		case 76:
		case 68:
		    move_right();
		    press_music();
		    break;

		case 38:
		case 75:
		case 87:
			move_up();
			press_music();
			break;

        case 40:
        case 74:
        case 83:
        	move_down();
        	press_music();
        	break;
	}
});

function move_left(){
	if(can_left(arr)){
		for(i=0;i<4;i++)
			for(j=1;j<4;j++)
				if(arr[i][j]!=0){
					for(var k=0;k<j;k++){
						if(arr[i][j]==arr[i][k]&&mid_block1(i,k,j,arr)){
							arr[i][k]=arr[i][j]*2;
							arr[i][j]=0;
							continue;
						}
						else if(arr[i][k]==0&&mid_block1(i,k,j,arr)){
							arr[i][k]=arr[i][j];
							arr[i][j]=0;
							continue;
						}
					}
				}
	rand();
	}
    show_number();
}

function move_right(){
	if(can_right(arr)){
		for(i=0;i<4;i++)
			for(j=2;j>=0;j--)
				if(arr[i][j]!=0){
					for(var k=3;k>j;k--){
						if(arr[i][j]==arr[i][k]&&mid_block1(i,j,k,arr)){
							arr[i][k]=arr[i][j]*2;
							arr[i][j]=0;
							continue;
						}
						else if(arr[i][k]==0&&mid_block1(i,j,k,arr)){
							arr[i][k]=arr[i][j];
							arr[i][j]=0;
							continue;
						}
					}
				}
	rand();
	}
	show_number();
}

function move_up(){
	if(can_up(arr)){
		for(j=0;j<4;j++)
			for(i=1;i<4;i++)
				if(arr[i][j]!=0){
					for(var k=0;k<i;k++){
						if(arr[k][j]==arr[i][j]&&mid_block2(j,k,i,arr)){
							arr[k][j]=arr[i][j]*2;
							arr[i][j]=0;
							continue;
						}
						else if(arr[k][j]==0&&mid_block2(j,k,i,arr)){
							arr[k][j]=arr[i][j];
							arr[i][j]=0;
							continue;
						}
					}
				}
	rand();
	}
	show_number();
}

function move_down(){
	if(can_down(arr)){
			for(j=0;j<4;j++)
				for(i=2;i>=0;i--)
					if(arr[i][j]!=0)
						for(var k=3;k>i;k--){
							if(arr[i][j]==arr[k][j]&&mid_block2(j,i,k,arr)){
								arr[k][j]=arr[i][j]*2;
								arr[i][j]=0;
								continue;
							}
							else if(arr[k][j]==0&&mid_block2(j,i,k,arr)){
								arr[k][j]=arr[i][j];
								arr[i][j]=0;
								continue;
							}
						}
	rand();
	}
	show_number();
}

function show_number(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(arr[i][j]==0){
				document.getElementById('cell'+i+j).innerHTML = "";
			    $('#cell'+i+j).css('background-color','#CDC0B4');
			}
			else{
				document.getElementById('cell'+i+j).innerHTML = arr[i][j];
				document.getElementById('cell'+i+j).style.color = "black";
			    $('#cell'+i+j).css('background-color',background_color(arr[i][j]));
			}
		}
	}
	if(game_over(arr)){
		document.getElementById('special').style.filter.blur="10pxs";
		alert("game over");
    }
    score(arr);
}

function can_left(arr){
	for(i=0;i<4;i++)
		for(j=1;j<4;j++)
			if(arr[i][j]!=0)
				if(arr[i][j]==arr[i][j-1]||arr[i][j-1]==0)
					return true;
	return false;
}

function can_right(arr){
	for(i=0;i<4;i++)
		for(j=2;j>=0;j--)
			if(arr[i][j]!=0)
				if(arr[i][j]==arr[i][j+1]||arr[i][j+1]==0)
					return true;
	return false;
}

function can_up(arr){
	for(j=0;j<4;j++)
		for(i=1;i<4;i++)
			if(arr[i][j]!=0)
				if(arr[i][j]==arr[i-1][j]||arr[i-1][j]==0)
					return true;
	return false;
}

function can_down(arr){
	for(j=0;j<4;j++)
		for(i=2;i>=0;i--)
			if(arr[i][j]!=0)
				if(arr[i+1][j]==arr[i][j]||arr[i+1][j]==0)
					return true;
	return false;
}

function mid_block1(row,col_from,col_to,arr){
	for(var k=col_from+1;k<col_to;k++)
		if(arr[row][k]!=0)
			return false;
	return true;
}

function mid_block2(col,row_from,row_to,arr){
	for(var k=row_from+1;k<row_to;k++)
		if(arr[k][col]!=0)
			return false;
	return true;
}

function game_over(arr){
	if(!can_right(arr)&&!can_left(arr)&&!can_down(arr)&&!can_up(arr))
		return true;
	return false;
}

function background_color( number ){
    switch( number ){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }
}

function score(arr){
	var sco=0;
	for ( i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if(arr[i][j]!=0){
				sco=sco+arr[i][j]*2;
			}
		}
	}
	document.getElementById('number').innerHTML=sco;
}

function press_music(){
	var audio = document.createElement('audio');
    audio.src = 'poi.mp3'//这里放音乐的地址
    audio.autoplay=true;
    document.body.appendChild(audio);
}