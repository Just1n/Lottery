		var attentionSeekers = ["flash","bounce","shake","tada","swing","wobble","pulse"];
  		var appear = ["flipInX","flipInY","fadeIn","fadeInUp","fadeInDown","fadeInLeft","fadeInRight","fadeInUpBig","fadeInDownBig","fadeInLeftBig","fadeInRightBig","slideInDown","slideInLeft","slideInRight","bounceIn","bounceInDown","bounceInUp","bounceInLeft","bounceInRight","rotateIn","rotateInDownLeft","rotateInDownRight","rotateInUpLeft","rotateInUpRight","lightSpeedIn","rollIn"];

  		console.log('luckyAmount is ' + luckyAmount);
  		function showKey(evt){
	     	evt = (evt) ? evt : window.event;
	     	if(evt.keyCode==32){
          		return false;//禁止空格翻页
	     	}
     	}

	     document.onkeydown=showKey;

		  function testAnim(x,d) {
			$('#' + d).removeClass().addClass(x + ' animated').one('webkitAnimationEnd oAnimationEnd', function(){
				$(this).removeClass();
			});
	      }
	      function getRandomAction(action){
	      	var randomNumber=Math.floor(Math.random()*action.length+1)-1;
			return action[randomNumber];
	      }

	      //该方法已作废
	      function addTextForTheLucky(company,name,id,delay){
		    if(!delay){
		        delay = 300;
		    }
		    if(company.length >0){
		        $('#luckycompany').append(company[0]);
		        setTimeout(
		            function(){
		                addTextForTheLucky(company.slice(1),name,id,delay);            
		             },delay                 
	            );
		    }else{
		    	testAnim(getRandomAction(attentionSeekers),'luckycompanydiv');
		    	addTextForLuckyName(name,name,id,delay);
		    }
	      }

	      function addTextForLuckyName(name,fixedName,id,delay){
	      	if(!delay){
	      		delay = 300;
	      	}
	      	if(name.length >0){
		        $('#luckyname').append(name[0]);
		        setTimeout(
		            function(){
		                addTextForLuckyName(name.slice(1),fixedName,id,delay);            
		             },delay                 
	            );
		    }else{
		    	testAnim(getRandomAction(attentionSeekers),'luckynamediv');
		    	$('#luckyimg').attr('src','images/' + fixedName + '.jpg').after(function(){
		    		testAnim(getRandomAction(attentionSeekers),'luckyimgdiv');	
		    	});
		    	//$('#allluckyguys').prepend('<span id="' + id + '" class="box round align-center red">' + fixedName + '</span>')
			    //  .after(function(){
		      	//	testAnim(getRandomAction(appear),id);
		      	//});
				$('#allluckyguys').prepend('<li id="' + id + '"><img src="images/' + fixedName + '.jpg" width="120px" height="120px" class="round"><span class="box round align-center red" style="top:-35px;left:25px;">' + fixedName + '</span></li>')
			      .after(function(){
		      		testAnim(getRandomAction(appear),id);
		      	});
	    		employees.splice(randomNo,1);
	      		db.set(pageType + pageNo + id,fixedName);
	      		luckyAmount--;
	      		luckyCount++;
	      		$('#luckyGuysCount').text(luckyCount).after(function(){
	      			testAnim(getRandomAction(appear),'luckyGuysCountDiv');
	      		});
		    	doing = false;
		    	console.log('lotteryed employees is ' + employees.length);
		    	console.log('after: employees ' + employees.length + ' luckyAmount ' + luckyAmount + ' luckyCount ' + luckyCount + ' list ' + list.length);
		    }
	      }

	      var db = new localDatabase();
	      var list = db.list();
		  console.log('All lucky guys is ' + list.length);

		  var employees = data;
		  console.log('All employees count is ' + employees.length);

		  for(var i = 0;i < list.length; i++){
		  	for(var j = 0;j < employees.length; j++){
		  		if(employees[j].id == list[i].id.slice(2)){
		  			employees.splice(j,1);
		  			if(list[i].id.substr(0,2) == pageType + pageNo){
		  				luckyAmount--;
		  				luckyCount++;
			      		$('#luckyGuysCount').text(luckyCount).after(function(){
			      			testAnim(getRandomAction(appear),'luckyGuysCountDiv');
			      		});
		  			}
		  			break;
		  		}
		  	}
		  }
		  
	      console.log('calculatored employees is ' + employees.length);

	      var allCompanies = ["Company1","Company2","Company3","嘉宾","贵宾"];


	      function listLuckyGuys(){
	      	if(list.length != 0){
	      		for(var k = 0;k < list.length;k++){
	      			console.log(list[k]);
	      			//$('#allluckyguys').prepend('<span id="' + list[k].id + '" class="box round align-center red">' + list[k].name + '</span>')
				    //  .after(function(){
			      	//	testAnim(getRandomAction(appear),list[k].id);
			      	//});
					if(list[k].id.substr(0,2) == pageType + pageNo){
						$('#allluckyguys').prepend('<li id="' + list[k].id.slice(2) + '"><img src="images/' + list[k].name + '.jpg" width="120px" height="120px" class="round"><span class="box round align-center red" style="top:-35px;left:25px;">' + list[k].name + '</span></li>')
					      .after(function(){
				      		testAnim(getRandomAction(appear),list[k].id.slice(2));
				      	});
			      	}
	      		}
	      	}
	      }


		  var randomNo = 0;
		  
		  function lottery(){
		  	randomNo = Math.floor(Math.random()*employees.length);
		  	//document.getElementById("result").innerHTML = employees[randomNo].id;
		  	$('#luckyimg').attr('src','images/' + employees[randomNo].name + '.jpg');
		  	$('#luckycompany').text(employees[randomNo].company);
		  	$('#luckyname').text(employees[randomNo].name);
		  }

		  var doing = false;
		  function setValues(){
		  	doing = true;
		  	$('#luckyimg').attr('src','images/default.jpg');
		  	$('#luckycompany').empty();
		  	$('#luckyname').empty();

		  	people = new ListEval(allCompanies, 4);
		  	startWaiting4Company();
		  	startWaiting4Name();

		  	setTimeout(function() {
            	endWaiting4Company();
	            chooser(done);
	        }, 500);	

		  	//addTextForTheLucky(company,name,id,100);
		  }

		  function setTimer(){
		  	console.log('before: employees ' + employees.length + ' luckyAmount ' + luckyAmount + ' luckyCount ' + luckyCount + ' list ' + list.length);

		    time=setInterval("lottery()",20);
		  }
		  function clearTimer(){
		     clearInterval(time);
		     c = 0;
		     setValues(); 
		  }


		  $(document).ready(function(){
		  	if(pageType != '加'){
		  		$('#lotteryType').text(pageType + '马奖');
		  	}else{
		  		$('#lotteryType').text('董事长特别奖');
		  	}
		  	$('#luckyGuysCount').text(luckyCount);
		  	startWaiting4Company();
		  	startWaiting4Name();
		  	listLuckyGuys();
		  	KeyboardJS.on('ctrl + backspace', function() {
			    //db.clear();
			    //window.location.reload();
			});

			var temp=0;
			KeyboardJS.on('space', function() {
				if(doing){
					return;
				}
			    if(employees.length == 0){
		      		doing = true;
		      		$('#tipmsg').text('HAVE NO DATA !!!');
		      		$('#luckyimg').fadeOut(500,function(){
		      			$('#tip').fadeIn(300,function(){
	      					$('#luckyimg').fadeIn(3000,function(){
	      						$('#tip').fadeOut(500,function(){
	      							doing = false;
	      						});
	  						});
		      			});
		      		});
		      		return;
		      	}
		      	if(luckyAmount <= 0){
		      		doing = true;
		      		$('#tipmsg').text(pageType + '马奖人数已抽完');
		      		$('#luckyimg').fadeOut(500,function(){
		      			$('#tip').fadeIn(300,function(){
	      					$('#luckyimg').fadeIn(3000,function(){
	      						$('#tip').fadeOut(500,function(){
	      							doing = false;
	      						});
	  						});
		      			});
		      		});
		      		return;
		      	}

		        if(!doing){
		          if(temp%2 == 0){
		            setTimer();
		            endWaiting4Company();
		            endWaiting4Name();
		          }else{
		            clearTimer();
		          }
		          temp++;
		          //console.log(doing); 
		        }
			});

		  });