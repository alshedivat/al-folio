<?php
    /*
     *
     * SmartBIB:  The SmartBIB Project allows you to present a BIB database (
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
    class BibTeX_Parser
    {
        var $count;
        var $items;
        var $sortedItems;
        var $types;
        var $filename;
        var $inputdata;
        var $yearData = array();
        var $typeData = array();
        var $awardData = array();
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
                                 'note' => array(),
                                 'abstract' => array(),
                                 'year' => array(),
                                 'group' => array(),
                                 'publisher' => array(),
                                 'location' => array(),
                                 'articleno' => array(),
                                 'numpages' => array(),
                                 'doi' => array(),
                                 'page-start' => array(),
                                 'page-end' => array(),
                                 'pages' => array(),
                                 'address' => array(),
                                 'url' => array(),
                                 'volume' => array(),
                                 'chapter' => array(),
                                 'journal' => array(),
                                 'author' => array(),
                                 'raw' => array(),
                                 'title' => array(),
                                 'booktitle' => array(),
                                 'folder' => array(),
                                 'type' => array(),
                                 'series' => array(),
				 'number' => array(),
                                 'linebegin' => array(),
                                 'lineend' => array(),
                                 'durl' => array(),
                                 'powerpoint' => array(),
                                 'infosite' => array(),
                                 'website' => array(),
                                 'award' => array()
                                 );
            
            if( $file )
                $this->filename = $file;
            elseif( $data )
            $this->inputdata = $data;
            
            $this->parse();
            
            global $sortby;
            
            
            $this->sortedItems = $this->items;
            
            for($i=0; $i < count($this->sortedItems['type']); $i++)
                foreach($this->sortedItems as $key=> $value) {
                    if (isset($value[$i]))  
                        $temp[$i][$key] = $value[$i];
                }
            
            
            foreach($temp as $key=>$row) {
                $types[$key] = array_search($row['type'],$sortby);
                $years[$key] = $row['year'];
                $ids[$key] = $key;
            }
            array_multisort($types, SORT_ASC, $ids, SORT_ASC, $years, SORT_DESC, $temp);
            
            for($i=0; $i < count($temp); $i++)
                foreach($temp[$i] as $key=> $value)
                $temp2[$key][$i] = $value;
			
            $this->sortedItems = $temp2;
            
            $this->types = $this->sortedItems['type'];
            
            $this->prepareHTML();
			
	    $this->yearData = array_unique($this->yearData);

            
            rsort($this->yearData);
	    $this->awardData = array_unique($this->awardData);		
	    $this->typeData = array_unique($this->typeData);

            return $this-> printPublications();
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
                    if ($var[$fieldcount]=='projects') 
                        $v=str_replace(',',' ',$v);
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
        
        function prepareHTML() {
            global $article;
            global $book;
            global $booklet;
            global $conference;
            global $inbook;
            global $inproceedings;
            global $incollection;
            global $inbook;
            global $mastersthesis;
            global $misc;
            global $phdthesis;
            global $proceedings;
            global $techreport;
            global $unpublished;
            global $other;
            global $projects;
            global $bibTexFile;
            
            $this->resultedHtml .= '<ul id="publication-list">';
            
            for ($i = 0; $i <= $this->count; $i++ ) {
				if (in_array("all", $projects) || $this->checkProject($i)) {
					switch ($this->types[$i]) {
						case "journal":
							$this->htmlPublication("journal", $article, $i);
							break;                        
						case "article":
							$this->htmlPublication("article", $article, $i);
							break;
						case "book":
							$this->htmlPublication("book", $book, $i);
							break;
						case "booklet":
							$this->htmlPublication("booklet", $article, $i);
							break;
						case "conference":
							$this->htmlPublication("conference", $conference, $i);
							break;
						case "inbook":
							$this->htmlPublication("inbook", $inbook, $i);
							break;
						case "incollection":
							$this->htmlPublication("incollection", $incollection, $i);
							break;
						case "inproceedings":
							$this->htmlPublication("inproceedings", $inproceedings, $i);
							break;
						case "manual":
							$this->htmlPublication("inbook", $manual, $i);
							break;
						case "mastersthesis":
							$this->htmlPublication("mastersthesis", $matersthesis, $i);
							break;
						case "misc":
							$this->htmlPublication("misc", $misc, $i);
							break;
						case "phdthesis":
							$this->htmlPublication("phdthesis", $phdthesis, $i);
							break;
						case "proceedings":
							$this->htmlPublication("proceedings", $proceedings, $i);
							break;
						case "techreport":
							$this->htmlPublication("techreport", $techreport, $i);
							break;
						case "unpublished":
							$this->htmlPublication("unpublished", $unpublished, $i);
							break;
						default:
							$this->htmlPublication("other", $other, $i);
							
					}
				}
            }
            $this->resultedHtml .= '</ul>';
            $this->resultedHtml .= '<center><small>Automatically generated from this <a href="'.$bibTexFile.'" target="_blank" >bibtex</a> using the <a target=_blank href="http://dmsl.github.com/smartbib/">Smartbib</a> project</small></center>';
        }
        
        function htmlPublication($type, $fields, $element) {
            global $delimiter; 
            global $sortbyTitle;
            $delimiter=", ";
            if ($this->lastType != $this->sortedItems['type'][$element]){
                $this->lastType = $this->sortedItems['type'][$element];
                $this->resultedHtml .= '<li class="'.$this->sortedItems['year'][$element].' '.$this->sortedItems['type'][$element].'"><h2>'.$this->getTitle($this->sortedItems['type'][$element]).'</h2></li>';
            }
           array_push($this->typeData, $this->sortedItems['type'][$element]);
           //echo $this->sortedItems['type'][$element]; 
 
          //  $this->resultedHtml .= '<li class="'.$this->sortedItems['year'][$element].' publication" title="'.$this->sortedItems['year'][$element].'">';        
           if (isset($this->sortedItems['award'][$element])) 
               $this->resultedHtml .= '<li class="'.$this->sortedItems['year'][$element].' award publication '.$this->sortedItems['type'][$element].'" title="'.$this->sortedItems['year'][$element].'">'; 
           else  
               $this->resultedHtml .= '<li class="'.$this->sortedItems['year'][$element].' publication '.$this->sortedItems['type'][$element].'" title="'.$this->sortedItems['year'][$element].'">';   
           
            $this->countTypes($element, $this->sortedItems['type'][$element]);   
            //array_push($this->typeData, $this->sorteditems['type'][$element]);   
            foreach($fields as $print) {
                if(isset($this->sortedItems[$print])){
                    if(isset($this->sortedItems[$print][$element])){
                         switch ($print) {
                            case "title":
                                $this->resultedHtml .= '<strong>"';
                                if(isset($this->sortedItems['durl'][$element])){ 
                                    $this->resultedHtml .= '<a href="'.$this->sortedItems['durl'][$element].'" class="publications-title" target="_blank">';
                                } 
                                $this->resultedHtml .= $this->sortedItems[$print][$element];
                                if (isset($this->sortedItems['durl'][$element])) {
                                    $this->resultedHtml .= '</a>';
                                }
                                $this->resultedHtml .= '"</strong>'.$delimiter.' ';
                                break;
                            case "booktitle":
                                if($this->sortedItems['type'][$element] == "editorial") {
                                    $this->resultedHtml .= "<b>".$this->sortedItems[$print][$element]."</b> ";
                                }
                                else {
                                    $this->resultedHtml .= "<b>".$this->sortedItems[$print][$element]."</b> ";
                                }
                                break;
                            case "journal":
                                $this->resultedHtml .= "<i><b>".$this->sortedItems[$print][$element]."</b></i> ";
                                break;
                            case "year":
                                $this->resultedHtml .= "<strong>".$this->sortedItems[$print][$element]."</strong>".".";
								array_push($this->yearData, $this->sortedItems[$print][$element]);
                                break;
                            case "numpages":
                                if($this->sortedItems[$print][$element]!="")
                                    $this->resultedHtml .= $this->sortedItems[$print][$element].$delimiter;
                            case "pages":
                                if($this->sortedItems[$print][$element]!="")
                                    $this->resultedHtml .= " pp. ".$this->sortedItems[$print][$element].$delimiter;
                                break;
                            case "series":
                                if(isset($this->sortedItems['infosite'][$element]))
                                    $this->resultedHtml .= "(<strong><u><a href='".$this->sortedItems['infosite'][$element]."' class='series-link' target='_blank'>".$this->sortedItems[$print][$element]."</a></u></strong>), ";
                                else 
                                    $this->resultedHtml .= "(<strong>".$this->sortedItems[$print][$element]."</strong>), ";
                                break;
                            case "isbn":
                                if($this->sortedItems[$print][$element]!="")
                                    $this->resultedHtml .= " ISBN: ".$this->sortedItems[$print][$element].$delimiter;
                                break;
                            case "volume":
                                if($this->sortedItems[$print][$element]!="")
                                    $this->resultedHtml .= " Vol. ".$this->sortedItems[$print][$element].$delimiter;
                                break;
                            case "number":
                                if($this->sortedItems[$print][$element]!="")
                                    $this->resultedHtml .= " Iss. ".$this->sortedItems[$print][$element].$delimiter;
                                break;
                            case "chapter":
                                if($this->sortedItems[$print][$element]!="")
                                    $this->resultedHtml .= " Chapter ".$this->sortedItems[$print][$element].$delimiter;
                                break;
                            case "author":
                                if($this->sortedItems[$print][$element]!="")
                                    $this->resultedHtml .= $this->sortedItems[$print][$element].", ";
                                break;
                            case "location":
                                if($this->sortedItems[$print][$element]!="")
                                    $this->resultedHtml .= $this->sortedItems[$print][$element]." ";
                                break;
                            case "award":
                                if($this->sortedItems[$print][$element]!="")
                                    $this->resultedHtml .= " <font color='red'><b>" . $this->sortedItems[$print][$element]."</b></font> ";
                                    array_push($this->awardData, $this->resultedHtml);
                                break;
                            default:
                                $this->resultedHtml .= $this->sortedItems[$print][$element].$delimiter;
                        }
                        //array_push($this->typeData, $this->resultedHtml);
                    }
                }
                else {
                    echo $print;	
                }
            }
            if (isset($this->sortedItems['raw'][$element])) {
                $this->resultedHtml .= '&nbsp;<a href="#bibtex-'.$element.'" title="Bibtex Citation" id="publink-'.$element.'"><i class="fa fa-bold">&nbsp;</i></a>';
		$this->resultedHtml .= '<div style="display:none"><div id="bibtex-'.$element.'"><pre>'.$this->sortedItems['raw'][$element].'</pre></div></div>';
                //$this->resultedHtml .= '<a class="publications-title" href="#bibtex-'.$element.'" class="fa fa-book" title="BibTex" id="publink-'.$element.'" href="#" title="BibTex Reference"></a>&nbsp;';
            }
            if (isset($this->sortedItems['durl'][$element])) {
                $this->resultedHtml .= '<a target="_blank" title="PDF" class="publications-title" href="'.$this->sortedItems['durl'][$element].'"><i class="fa fa-file-pdf-o">&nbsp;</i></a>';
            }
            if (isset($this->sortedItems['powerpoint'][$element])) {
                $this->resultedHtml .= '<a target="_blank" title="Powerpoint" class="publications-title" href="'.$this->sortedItems['powerpoint'][$element].'"><i class="fa fa-file-powerpoint-o">&nbsp;</i></a>';
            }
            if (isset($this->sortedItems['website'][$element])) {
                $this->resultedHtml .= '<a target="_blank" title="Related Website" class="publications-title" href="'.$this->sortedItems['website'][$element].'"><i class="fa fa-globe">&nbsp;</i></a>';
            }
            $this->resultedHtml .= '</li>';
        }
        
        function countTypes($iterator, $type) {
            $previous = array_slice($this->sortedItems['type'], 0, $iterator + 1, true);
            $counts = array_count_values($previous);
            $all = array_count_values($this->sortedItems['type']);
            
            $number = $all[$type] - $counts[$type] + 1;
            if($type == 'book') {
                $this->resultedHtml .=  "<strong>[B".$number."]</strong> ";
                
            }
            else {
                $this->resultedHtml .=  "<strong>[".ucfirst(substr($type, 0, 1))."".$number."]</strong> ";
            }
        }
		
		function printPublications() {
			//Print filters 
            echo '<ul id="publication-filter">';
            
            echo '<li><a href="#" class="btn btn-sm btn-success current" data-filter="*">All</a></li>';
            echo '<li><a href="#" class="btn btn-xs btn-danger current" data-filter=".award.">Awards</a></li>';
            //      for($i = 0; $i < count($this->awardData); $i++) {
            //       echo $this->awardData[$i]."<br>";
            //    }
            sort($this->typeData);
            array_unique ($this->typeData);
            for($i = 0; $i < count($this->typeData); $i++) {
               if (isset($this->typeData[$i]) && $this->typeData[$i] == "journal")
                 echo '<li><a href="#" class="btn btn-xs btn-info" data-filter=".'.$this->typeData[$i].'">Journals and Magazines</a></li>';
            }
            for($i = 0; $i < count($this->typeData); $i++) {
               if (isset($this->typeData[$i]) && $this->typeData[$i] == "conference")
                 echo '<li><a href="#" class="btn btn-xs btn-info" data-filter=".'.$this->typeData[$i].'">Conference Proceedings</a></li>';
            }
            for($i = 0; $i < count($this->typeData); $i++) {
               if (isset($this->typeData[$i]) && $this->typeData[$i] == "book")
                 echo '<li><a href="#" class="btn btn-xs btn-info" data-filter=".'.$this->typeData[$i].'">Book Chapters</a></li>';
            }
            for($i = 0; $i < count($this->typeData); $i++) {
               if (isset($this->typeData[$i]) && $this->typeData[$i] == "editorial")
                 echo '<li><a href="#" class="btn btn-xs btn-info" data-filter=".'.$this->typeData[$i].'">Editorials</a></li>';
            }
            for($i = 0; $i < count($this->typeData); $i++) {
               if (isset($this->typeData[$i]) && $this->typeData[$i] == "thesis")
                 echo '<li><a href="#" class="btn btn-xs btn-info" data-filter=".'.$this->typeData[$i].'">Theses</a></li>';
            }
            for($i = 0; $i < count($this->typeData); $i++) {
               if (isset($this->typeData[$i]) && $this->typeData[$i] == "gconferences") {
                 echo '<li><a href="#" class="btn btn-xs btn-info" data-filter=".'.$this->typeData[$i].'">Greek Conferences</a></li>';
               }
            }
            
            echo '<br><br>';
            for($i = 0; $i < count($this->yearData); $i++) {
                echo '<li><a href="#" class="btn btn-xs btn-primary" data-filter=".'.$this->yearData[$i].'">'.$this->yearData[$i].'</a></li>';
            }
            echo '</ul>';
			echo '<div style="clear:both;"></div>';
			echo $this->resultedHtml;
		}
		
        /**
         * @param array $array
         * @param string|int $by key/offset
         * @param array $order
         * @return array
         */
        function array_multisort_by_order(array $array, $by, array $order)
        {
            $max = max(array_map('count',$array));
            foreach($array as &$sub){
                $addin = array_diff_key(array_fill(0,$max,null),$sub);
                $sub = $addin + $sub;
                ksort($sub);
            }
            $order = array_flip($order);
            $params[] = $array[$by];
            foreach($params[0] as &$v) $v = $order[$v];
            foreach($array as &$v) $params[] = &$v; unset($v);
            call_user_func_array('array_multisort', $params);
            
            //Convert array
            for($i=0; $i < count($array['type']); $i++) {
                foreach($array as $key=> $value) {
                    $temp[$i][$key] = $value[$i];
                }
            }
            
            function cmp_year($a, $b) {
                if ($a['type'] == $b['type']) {
                    return ($a['year'] > $b['year']) ? -1 : 1;
                }
                else 
                    return 0;
            }
            
            usort($temp, 'cmp_year');
            
            //Convert array back
            for($i=0; $i < count($temp); $i++) {
                foreach($temp[$i] as $key=> $value) {
                    $temporary[$key][$i] = $value;
                }
            }
            
            print_r($temporary['year']);
            print_r($temporary['type']);
            
            $filter = create_function('$a','return !is_null($a);');
            foreach($temporary as &$sub) $sub = array_filter($sub,$filter);
            return $temporary;
        }
        
        function getTitle ($type) {
            global $sortby;
            global $sortbyTitle;
            
            $array_size = count($sortby);
            for($i = 0; $i < $array_size; $i++)
            {
                if( $sortby[$i] == $type){
                    return $sortbyTitle[$i];
                }
            }
            
        }
		
		function checkProject($element) {
			
			global $projects;
			
			if(isset($this->sortedItems['projects'][$element])) {
				$p = explode(" ", $this->sortedItems['projects'][$element]);
				foreach ($p as $project) {
					if(in_array($project, $projects))
						return true;
				}
			}
			return false;
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
