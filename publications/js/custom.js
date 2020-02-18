//
//
//SmartBIB:  The SmartBIB Project allows you to present a BIB database (
//.bibtex files) containing your publications on the web. 
//It is ideal for personal and project websites.
//
//Copyright (C) 2012 Georgios Larkou - DMSL - University of Cyprus
//
//
//This program is free software: you can redistribute it and/or modify 
//it under the terms of the GNU General Public License as published by 
//the Free Software Foundation, either version 3 of the License, or 
//at your option) any later version. 
//
//This program is distributed in the hope that it will be useful, 
//but WITHOUT ANY WARRANTY; without even the implied warranty of 
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the 
//GNU General Public License for more details. 

//Υou should have received a copy of the GNU General Public License 
//along with this program. If not, see <http://www.gnu.org/licenses/>.
//
//

jQuery(document).ready(function(){ 

	var $container	 	= $('#publication-list');
	var $filter 		= $('#publication-filter');
		  
	$container.isotope({
		filter				: '*',
		layoutMode			: 'straightDown',
		animationEngine 	: 'css',
	});	
	
	$filter.find('a').click(function(){
	  var selector = $(this).attr('data-filter');
		$container.isotope({ 
		filter				: selector,
		animationEngine 	: 'css'
	  });
	  return false;
	});	
	
	/* ---------------------------------------------------------------------- */
	/*	Tipsy 
	/* ---------------------------------------------------------------------- */
	$("[id^=publink]").tipsy({gravity:'n', html:true});
	
	/* ---------------------------------------------------------------------- */
	/*	Fancybox 
	/* ---------------------------------------------------------------------- */
	$container.find('a').fancybox({
		'transitionIn'		:	'elastic',
		'transitionOut'		:	'elastic',
		'speedIn'			:	200, 
		'speedOut'			:	200,
		'scrolling'			:	'no', 
		'overlayOpacity'	:   0.6
	});
	$(".publications-title").unbind('click.fb');
	$(".series-link").unbind('click.fb');
	$(".publications-ppt").unbind('click.fb');
	$(".publications-pdf").unbind('click.fb');
	$(".publications-website").unbind('click.fb');
});	