<?php
/*
 *
 * SmartBIB: The SmartBIB Project allows you to present a BIB database (
 * .bibtex files) containing your publications on the web. 
 * It is ideal for personal and project websites.
 *
 * Copyright (C) 2012 Georgios Larkou - DMSL - University of Cyprus
 *
 *
 * This program is free software: you can redistribute it and/or modify 
 * it under the terms of the GNU General Public License as published by 
 * the Free Software Foundation, either version 3 of the License, or 
 * at your option) any later version. 
 *
 * This program is distributed in the hope that it will be useful, 
 * but WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the 
 * GNU General Public License for more details. 
 *
 * Υou should have received a copy of the GNU General Public License 
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
class ClassTeX_Parser
{
    var $count;
    var $items;
	var $sortedItems;
    var $types;
    var $filename;
    var $inputdata;
	var $yearData;
	var $lastType;
    var $resultedHtml;
	
    /**
     * BibTeX_Parser( $file, $data )
     *
     * Constructor
     * @param String $file if filename is used
     * @param String $data if input is a string
     */
    function parser( $file = null, $data = null ) {
        $this->items = array(
			'title' => array(),
            'year' => array(),
			'code' => array(),
			'description' => array(),
			'outline' => array(),
			'type' => array(),
			'link' => array(),
            'abstract' => array(),
            'location' => array(),
            'url' => array(),

        );
        
        if( $file )
            $this->filename = $file;
        elseif( $data )
            $this->inputdata = $data;
        
        $this->parse();
		
		$this->types = array_unique($this->items['type']);
		$this->types = array_values($this->types);
		
		//print_r($this->sortedItems['type']);
		
		global $sortby;
		
		
		$this->sortedItems = $this->items;

		return $this->printPublications();
    }

    /**
     * parse()
     *
     * Main method that parses the data.
     */
    function parse() {
        $value = array();
        $var = array();
        $this->count = -1;
        $lineindex = 0;
        $fieldcount = -1;
        if( $this->filename )
            $lines = file($this->filename);
        else
            $lines = preg_split( '/\n/', $this->inputdata );
    
        if (!$lines)
            return;
    
        foreach($lines as $line) {
			$lineindex++;
			if ($this->count > -1) {
            $this->items['lineend'][$this->count] = $lineindex;
			}
            $line = trim($line);
            $raw_line = $line + '\n';
            $line=str_replace("'","`",$line);
            $seg=str_replace("\"","`",$line);
            $ps=strpos($seg,'=');
            $segtest=strtolower($seg);
    
            // some funny comment string
            if (strpos($segtest,'@string')!==false)
                continue;
    
            // pybliographer comments
            if (strpos($segtest,'@comment')!==false)
                continue;
    
            // normal TeX style comment
            if (strpos($seg,'%%')!==false)
                continue;
    
            /* ok when there is nothing to see, skip it! */
            if (!strlen($seg))
                continue;
    
            if ("@" == $seg[0]) {
                $this->count++;
                $this->items['raw'][$this->count] = $line . "\r\n";
                
                $ps=strpos($seg,'@');
                $pe=strpos($seg,'{');
                $this->types[$this->count]=trim(substr($seg, 1,$pe-1));
                $fieldcount=-1;
                $this->items['linebegin'][$this->count] = $lineindex;
            } // #of item increase
            elseif ($ps!==false ) { // one field begins
                $this->items['raw'][$this->count] .= $line . "\r\n";
                $ps=strpos($seg,'=');
                $fieldcount++;
                $var[$fieldcount]=strtolower(trim(substr($seg,0,$ps)));
    
                if ($var[$fieldcount]=='pages') {
                    $ps=strpos($seg,'=');
                    $pm=strpos($seg,'--');
                    $pe=strpos($seg,'},');
                    $pagefrom[$this->count] = substr($seg,$ps,$pm-$ps);
                    $pageto[$this->count]=substr($seg,$pm,$pe-$pm);
                    $bp=str_replace('=','',$pagefrom[$this->count]); $bp=str_replace('{','',$bp);$bp=str_replace('}','',$bp);$bp=trim(str_replace('-','',$bp));
                    $ep=str_replace('=','',$pageto[$this->count]); $bp=str_replace('{','',$bp);$bp=str_replace('}','',$bp);;$ep=trim(str_replace('-','',$ep));
                }
                $pe=strpos($seg,'},');
                
                if ($pe===false)
                    $value[$fieldcount]=strstr($seg,'=');
                else
                    $value[$fieldcount]=substr($seg,$ps,$pe);
            } else {
				if ($this->count > -1 ) {
                $this->items['raw'][$this->count] .= $line . "\r\n";
                $pe=strpos($seg,'},');
				}
                
                if ($fieldcount > -1) {
                    if ($pe===false)
                        $value[$fieldcount].=' '.strstr($seg,' ');
                    else
                        $value[$fieldcount] .=' '.substr($seg,$ps,$pe);
                }
            }
            
            if ($fieldcount > -1) {
                $v = $value[$fieldcount];
                $v=str_replace('=','',$v);
                $v=str_replace('{','',$v);
                $v=str_replace('}','',$v);
				if ($var[$fieldcount]=='author' || $var[$fieldcount]=='location' ) 
                	$v=$this->str_last_replace(',',' ',$v);
				else
					$v=$this->str_last_replace(',',' ',$v);
                $v=str_replace('\'',' ',$v);
                $v=str_replace('\"',' ',$v);
                // test!
                $v=str_replace('`',' \'',$v);
                $v=trim($v);
                $this->items["$var[$fieldcount]"][$this->count]="$v";
            }
        }
    }
	
	function printPublications() {	
		global $sortby; 
		global $sortbyTitle;	
		//Print filters 
		echo '<ul id="classes-filter">';
		echo '<li><a href="#"  class="btn btn-xs btn-success current" data-filter="*">All</a></li>';
		for($i = 0; $i < count($this->types); $i++) {
                $key = array_search($this->types[$i], $sortby);
                echo '<li><a class="btn btn-xs btn-primary"  href="#" data-filter=".'.$this->types[$i].'">'.$sortbyTitle[$key].'</a></li>';
		}
		echo '</ul>';
  		echo '<div style="clear:both;"></div>';
    	echo '<ul id="classes-list">';
		
		for ($i = 0; $i <= $this->count; $i++ ) {
			switch ($this->sortedItems['type'][$i]) {
				case "undergraduate":
					$this->htmlPublication("undergraduate", $i);
					break;
				case "greek":
					$this->htmlPublication("greek", $i);
					break;
				default:
					$this->htmlPublication("undergraduate", $i);
				
			}
		}
		echo '</ul>';
	}
	
	function htmlPublication($type, $element) {
		global $delimiter; 
		global $sortby; 
		global $sortbyTitle;
		$delimiter=", ";
        if ($this->lastType != $this->sortedItems['type'][$element]){
            $this->lastType = $this->sortedItems['type'][$element];
            $key = array_search($this->sortedItems['type'][$element], $sortby);
            echo '<li id="'.$this->lastType.'"><h2 class="main-heading"><span>'.$sortbyTitle[$key].'</span></h2></li>';
        }
        echo '<li class="'.$this->sortedItems['type'][$element].'"><div class="classesUnit">';

        if(isset($this->sortedItems['location'][$element])) {
            echo '<div class="more-less-p">"<a href="#" class="adjusts">'.$this->sortedItems['title'][$element].'</a>", '.$this->sortedItems['location'][$element].', <span class="timelineDate">'.$this->sortedItems['year'][$element].'</span>';
        }
        
        if (isset($this->sortedItems['link'][$element])) {
            echo  '&nbsp;<a href="'.$this->sortedItems['link'][$element].'" class="publications-ppt"original-title="Presentation" target="_blank"></a>';
          // $this->resultedHtml .= '<a target="_blank" title="Powerpoint" class="publications-title" href="'.$this->sortedItems['powerpoint'][$element].'"><i class="fa fa-file-powerpoint-o">&nbsp;</i></a>';
        }
        if (isset($this->sortedItems['url'][$element])) {
            echo '<a target="_blank" title="Related Website" class="publications-title" href="'.$this->sortedItems['url'][$element].'"><i class="fa fa-globe">&nbsp;</i></a>';
        }
       // $this->resultedHtml .= '</li>';

        if (isset($this->sortedItems['abstract'][$element])) {
           // echo '&nbsp;<a href="javascript:$(\'#link-'.$element.'\').toggle();" title="Abstract"><i class="fa fa-bold">&nbsp;</i></a>';
            echo  '<div class="more-block"  id="link-'.$element.'"><pre>'.$this->sortedItems['abstract'][$element].'</pre></div>';
            //$this->resultedHtml .= '<a class="publications-title" href="#bibtex-'.$element.'" class="fa fa-book" title="BibTex" id="publink-'.$element.'" href="#" title="BibTex Reference"></a>&nbsp;';
        }

        echo  '</div></li>';
	}

	function str_last_replace($search, $replace, $subject)
	{
		$pos = strrpos($subject, $search);
	
		if($pos !== false)
		{
			$subject = substr_replace($subject, $replace, $pos, strlen($search));
		}
	
		return $subject;
	}
}
?>
