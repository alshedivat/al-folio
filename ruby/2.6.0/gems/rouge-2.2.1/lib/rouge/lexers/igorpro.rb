# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class IgorPro < RegexLexer
      tag 'igorpro'
      filenames '*.ipf'
      mimetypes 'text/x-igorpro'

      title "IgorPro"
      desc "WaveMetrics Igor Pro"

      def self.keywords
        @keywords ||= Set.new %w(
          structure endstructure
          threadsafe static
          macro proc window menu function end
          if else elseif endif switch strswitch endswitch
          break return continue
          for endfor do while
          case default
	  try catch endtry
          abortonrte
        )
      end

      def self.preprocessor
        @preprocessor ||= Set.new %w(
          pragma include
          define ifdef ifndef undef
          if elif else endif
        )
      end

      def self.igorDeclarations
        @igorDeclarations ||= Set.new %w(
          variable string wave strconstant constant
          nvar svar dfref funcref struct
          char uchar int16 uint16 int32 uint32 int64 uint64 float double
        )
      end

      def self.igorConstants
        @igorConstants ||= Set.new %w(
          nan inf
        )
      end

      def self.igorFunction
        @igorFunction ||= Set.new %w(
          axontelegraphsettimeoutms axontelegraphgettimeoutms
          axontelegraphgetdatanum axontelegraphagetdatanum
          axontelegraphgetdatastring axontelegraphagetdatastring
          axontelegraphgetdatastruct axontelegraphagetdatastruct hdf5datasetinfo
          hdf5attributeinfo hdf5typeinfo hdf5libraryinfo
          mpfxgausspeak mpfxlorenzianpeak mpfxvoigtpeak mpfxemgpeak mpfxexpconvexppeak
          abs acos acosh airya airyad airyb airybd
          alog area areaxy asin asinh atan atan2 atanh axisvalfrompixel besseli
          besselj besselk bessely beta betai binarysearch binarysearchinterp
          binomial binomialln binomialnoise cabs capturehistorystart ceil cequal
          char2num chebyshev chebyshevu checkname cmplx cmpstr conj contourz cos
          cosh cosintegral cot coth countobjects countobjectsdfr cpowi
          creationdate csc csch datafolderexists datafolderrefsequal
          datafolderrefstatus date2secs datetime datetojulian dawson defined
          deltax digamma dilogarithm dimdelta dimoffset dimsize ei enoise
          equalwaves erf erfc erfcw exists exp expint expintegrale1 expnoise
          factorial fakedata faverage faveragexy finddimlabel findlistitem floor
          fontsizeheight fontsizestringwidth fresnelcos fresnelsin gamma
          gammaeuler gammainc gammanoise gammln gammp gammq gauss gauss1d gauss2d
          gcd getbrowserline getdefaultfontsize getdefaultfontstyle getkeystate
          getrterror getrtlocation gizmoinfo gizmoscale gnoise grepstring hcsr
          hermite hermitegauss hyperg0f1 hyperg1f1 hyperg2f1 hypergnoise hypergpfq
          igorversion imag indextoscale integrate1d interp interp2d interp3d
          inverseerf inverseerfc itemsinlist jacobicn jacobisn laguerre laguerrea
          laguerregauss lambertw leftx legendrea limit ln log lognormalnoise
          lorentziannoise magsqr mandelbrotpoint marcumq matrixcondition matrixdet
          matrixdot matrixrank matrixtrace max mean median min mod moddate
          norm numberbykey numpnts numtype numvarordefault nvar_exists p2rect
          panelresolution paramisdefault pcsr pi pixelfromaxisval pnt2x
          poissonnoise poly poly2d polygonarea qcsr r2polar real rightx round
          sawtooth scaletoindex screenresolution sec sech selectnumber
          setenvironmentvariable sign sin sinc sinh sinintegral sphericalbessj
          sphericalbessjd sphericalbessy sphericalbessyd sphericalharmonics sqrt
          startmstimer statsbetacdf statsbetapdf statsbinomialcdf statsbinomialpdf
          statscauchycdf statscauchypdf statschicdf statschipdf statscmssdcdf
          statscorrelation statsdexpcdf statsdexppdf statserlangcdf statserlangpdf
          statserrorpdf statsevaluecdf statsevaluepdf statsexpcdf statsexppdf
          statsfcdf statsfpdf statsfriedmancdf statsgammacdf statsgammapdf
          statsgeometriccdf statsgeometricpdf statsgevcdf statsgevpdf
          statshypergcdf statshypergpdf statsinvbetacdf statsinvbinomialcdf
          statsinvcauchycdf statsinvchicdf statsinvcmssdcdf statsinvdexpcdf
          statsinvevaluecdf statsinvexpcdf statsinvfcdf statsinvfriedmancdf
          statsinvgammacdf statsinvgeometriccdf statsinvkuipercdf
          statsinvlogisticcdf statsinvlognormalcdf statsinvmaxwellcdf
          statsinvmoorecdf statsinvnbinomialcdf statsinvncchicdf statsinvncfcdf
          statsinvnormalcdf statsinvparetocdf statsinvpoissoncdf statsinvpowercdf
          statsinvqcdf statsinvqpcdf statsinvrayleighcdf statsinvrectangularcdf
          statsinvspearmancdf statsinvstudentcdf statsinvtopdowncdf
          statsinvtriangularcdf statsinvusquaredcdf statsinvvonmisescdf
          statsinvweibullcdf statskuipercdf statslogisticcdf statslogisticpdf
          statslognormalcdf statslognormalpdf statsmaxwellcdf statsmaxwellpdf
          statsmedian statsmoorecdf statsnbinomialcdf statsnbinomialpdf
          statsncchicdf statsncchipdf statsncfcdf statsncfpdf statsnctcdf
          statsnctpdf statsnormalcdf statsnormalpdf statsparetocdf statsparetopdf
          statspermute statspoissoncdf statspoissonpdf statspowercdf
          statspowernoise statspowerpdf statsqcdf statsqpcdf statsrayleighcdf
          statsrayleighpdf statsrectangularcdf statsrectangularpdf statsrunscdf
          statsspearmanrhocdf statsstudentcdf statsstudentpdf statstopdowncdf
          statstriangularcdf statstriangularpdf statstrimmedmean statsusquaredcdf
          statsvonmisescdf statsvonmisesnoise statsvonmisespdf statswaldcdf
          statswaldpdf statsweibullcdf statsweibullpdf stopmstimer str2num
          stringcrc stringmatch strlen strsearch studenta studentt sum svar_exists
          tagval tan tanh textencodingcode threadgroupcreate threadgrouprelease
          threadgroupwait threadprocessorcount threadreturnvalue ticks trunc
          unsetenvironmentvariable variance vcsr voigtfunc wavecrc wavedims
          waveexists wavemax wavemin waverefsequal wavetextencoding wavetype
          whichlistitem wintype wnoise x2pnt xcsr zcsr zerniker zeta addlistitem
          annotationinfo annotationlist axisinfo axislist base64_decode
          base64_encode capturehistory childwindowlist cleanupname contourinfo
          contournamelist controlnamelist converttextencoding csrinfo csrwave
          csrxwave ctablist datafolderdir date fetchurl fontlist funcrefinfo
          functioninfo functionlist functionpath getbrowserselection getdatafolder
          getdefaultfont getdimlabel getenvironmentvariable geterrmessage
          getformula getindependentmodulename getindexedobjname
          getindexedobjnamedfr getrterrmessage getrtlocinfo getrtstackinfo
          getscraptext getuserdata getwavesdatafolder greplist guideinfo
          guidenamelist hash igorinfo imageinfo imagenamelist
          independentmodulelist indexeddir indexedfile juliantodate layoutinfo
          listmatch lowerstr macrolist nameofwave normalizeunicode note num2char
          num2istr num2str operationlist padstring parsefilepath pathlist pictinfo
          pictlist possiblyquotename proceduretext removebykey removeending
          removefromlist removelistitem replacenumberbykey replacestring
          replacestringbykey secs2date secs2time selectstring sortlist
          specialcharacterinfo specialcharacterlist specialdirpath stringbykey
          stringfromlist stringlist strvarordefault tableinfo textencodingname
          textfile threadgroupgetdf time tracefrompixel traceinfo tracenamelist
          trimstring uniquename unpadstring upperstr urldecode urlencode
          variablelist waveinfo wavelist wavename waverefwavetolist waveunits
          winlist winname winrecreation wmfindwholeword xwavename
          contournametowaveref csrwaveref csrxwaveref imagenametowaveref
          listtotextwave listtowaverefwave newfreewave tagwaveref
          tracenametowaveref waverefindexed waverefindexeddfr xwavereffromtrace
          getdatafolderdfr getwavesdatafolderdfr newfreedatafolder
        )
      end

      def self.igorOperation
        @igorOperation ||= Set.new %w(
          abort addfifodata addfifovectdata addmovieaudio addmovieframe adoptfiles
          apmath append appendimage appendlayoutobject appendmatrixcontour
          appendtext appendtogizmo appendtograph appendtolayout appendtotable
          appendxyzcontour autopositionwindow backgroundinfo beep boundingball
          browseurl buildmenu button cd chart checkbox checkdisplayed choosecolor
          close closehelp closemovie closeproc colorscale colortab2wave
          concatenate controlbar controlinfo controlupdate
          convertglobalstringtextencoding convexhull convolve copyfile copyfolder
          copyscales correlate createaliasshortcut createbrowser cross
          ctrlbackground ctrlfifo ctrlnamedbackground cursor curvefit
          customcontrol cwt debugger debuggeroptions defaultfont
          defaultguicontrols defaultguifont defaulttextencoding defineguide
          delayupdate deleteannotations deletefile deletefolder deletepoints
          differentiate dir display displayhelptopic displayprocedure doalert
          doigormenu doupdate dowindow doxopidle dpss drawaction drawarc
          drawbezier drawline drawoval drawpict drawpoly drawrect drawrrect
          drawtext drawusershape dspdetrend dspperiodogram duplicate
          duplicatedatafolder dwt edgestats edit errorbars execute
          executescripttext experimentmodified exportgizmo extract
          fastgausstransform fastop fbinread fbinwrite fft fgetpos fifo2wave
          fifostatus filterfir filteriir findcontour findduplicates findlevel
          findlevels findpeak findpointsinpoly findroots findsequence findvalue
          fpclustering fprintf freadline fsetpos fstatus ftpcreatedirectory
          ftpdelete ftpdownload ftpupload funcfit funcfitmd gbloadwave getaxis
          getcamera getfilefolderinfo getgizmo getlastusermenuinfo getmarquee
          getmouse getselection getwindow graphnormal graphwavedraw graphwaveedit
          grep groupbox hanning hideigormenus hideinfo hideprocedures hidetools
          hilberttransform histogram ica ifft imageanalyzeparticles imageblend
          imageboundarytomask imageedgedetection imagefileinfo imagefilter
          imagefocus imagefromxyz imagegenerateroimask imageglcm
          imagehistmodification imagehistogram imageinterpolate imagelineprofile
          imageload imagemorphology imageregistration imageremovebackground
          imagerestore imagerotate imagesave imageseedfill imageskeleton3d
          imagesnake imagestats imagethreshold imagetransform imageunwrapphase
          imagewindow indexsort insertpoints integrate integrate2d integrateode
          interp3dpath interpolate2 interpolate3d jcamploadwave jointhistogram
          killbackground killcontrol killdatafolder killfifo killfreeaxis killpath
          killpicts killstrings killvariables killwaves killwindow kmeans label
          layout layoutpageaction layoutslideshow legend
          linearfeedbackshiftregister listbox loaddata loadpackagepreferences
          loadpict loadwave loess lombperiodogram make makeindex markperftesttime
          matrixconvolve matrixcorr matrixeigenv matrixfilter matrixgaussj
          matrixglm matrixinverse matrixlinearsolve matrixlinearsolvetd matrixlls
          matrixlubksub matrixlud matrixludtd matrixmultiply matrixop matrixschur
          matrixsolve matrixsvbksub matrixsvd matrixtranspose measurestyledtext
          mlloadwave modify modifybrowser modifycamera modifycontour modifycontrol
          modifycontrollist modifyfreeaxis modifygizmo modifygraph modifyimage
          modifylayout modifypanel modifytable modifywaterfall movedatafolder
          movefile movefolder movestring movesubwindow movevariable movewave
          movewindow multitaperpsd multithreadingcontrol neuralnetworkrun
          neuralnetworktrain newcamera newdatafolder newfifo newfifochan
          newfreeaxis newgizmo newimage newlayout newmovie newnotebook newpanel
          newpath newwaterfall note notebook notebookaction open openhelp
          opennotebook optimize parseoperationtemplate pathinfo pauseforuser
          pauseupdate pca playmovie playmovieaction playsound popupcontextualmenu
          popupmenu preferences primefactors print printf printgraphs printlayout
          printnotebook printsettings printtable project pulsestats putscraptext
          pwd quit ratiofromnumber redimension remove removecontour
          removefromgizmo removefromgraph removefromlayout removefromtable
          removeimage removelayoutobjects removepath rename renamedatafolder
          renamepath renamepict renamewindow reorderimages reordertraces
          replacetext replacewave resample resumeupdate reverse rotate save
          savedata saveexperiment savegraphcopy savenotebook
          savepackagepreferences savepict savetablecopy setactivesubwindow setaxis
          setbackground setdashpattern setdatafolder setdimlabel setdrawenv
          setdrawlayer setfilefolderinfo setformula setigorhook setigormenumode
          setigoroption setmarquee setprocesssleep setrandomseed setscale
          setvariable setwavelock setwavetextencoding setwindow showigormenus
          showinfo showtools silent sleep slider smooth smoothcustom sort
          sortcolumns soundinrecord soundinset soundinstartchart soundinstatus
          soundinstopchart soundloadwave soundsavewave sphericalinterpolate
          sphericaltriangulate splitstring splitwave sprintf sscanf stack
          stackwindows statsangulardistancetest statsanova1test statsanova2nrtest
          statsanova2rmtest statsanova2test statschitest
          statscircularcorrelationtest statscircularmeans statscircularmoments
          statscirculartwosampletest statscochrantest statscontingencytable
          statsdiptest statsdunnetttest statsfriedmantest statsftest
          statshodgesajnetest statsjbtest statskde statskendalltautest statskstest
          statskwtest statslinearcorrelationtest statslinearregression
          statsmulticorrelationtest statsnpmctest statsnpnominalsrtest
          statsquantiles statsrankcorrelationtest statsresample statssample
          statsscheffetest statsshapirowilktest statssigntest statssrtest
          statsttest statstukeytest statsvariancestest statswatsonusquaredtest
          statswatsonwilliamstest statswheelerwatsontest statswilcoxonranktest
          statswrcorrelationtest structget structput sumdimension sumseries
          tabcontrol tag textbox threadgroupputdf threadstart tile tilewindows
          titlebox tocommandline toolsgrid triangulate3d unwrap urlrequest
          valdisplay waveclear wavemeanstdv wavestats wavetransform wfprintf
        )
      end

      def self.hdf5Operation
        @hdf5Operation ||= Set.new %w(
          hdf5createfile hdf5openfile hdf5closefile hdf5creategroup hdf5opengroup
          hdf5listgroup hdf5closegroup hdf5listattributes hdf5attributeinfo hdf5datasetinfo
          hdf5loaddata hdf5loadimage hdf5loadgroup hdf5savedata hdf5saveimage hdf5savegroup
          hdf5typeinfo hdf5createlink hdf5unlinkobject hdf5libraryinfo
          hdf5dumpstate hdf5dump hdf5dumperrors
        )
      end

      def self.object_name
        /\b[a-z][a-z0-9_\.]*?\b/i
      end

      object = self.object_name
      noLineBreak = /(?:[ \t]|(?:\\\s*[\r\n]))+/
      operator = %r([\#$~!%^&*+=\|?:<>/-])
      punctuation = /[{}()\[\],.;]/
      number_float= /0x[a-f0-9]+/i
      number_hex  = /\d+\.\d+(e[\+\-]?\d+)?/
      number_int  = /[\d]+(?:_\d+)*/

      state :root do
        rule %r(//), Comment, :comments

        rule /#{object}/ do |m|
          if m[0].downcase =~ /function/
            token Keyword::Declaration
            push :parse_function
          elsif self.class.igorDeclarations.include? m[0].downcase
            token Keyword::Declaration
            push :parse_variables
          elsif self.class.keywords.include? m[0].downcase
            token Keyword
          elsif self.class.igorConstants.include? m[0].downcase
            token Keyword::Constant
          elsif self.class.igorFunction.include? m[0].downcase
            token Name::Builtin
          elsif self.class.igorOperation.include? m[0].downcase
            token Keyword::Reserved
            push :operationFlags
          elsif self.class.hdf5Operation.include? m[0].downcase
            token Keyword::Reserved
            push :operationFlags
          elsif m[0].downcase =~ /\b(v|s|w)_[a-z]+[a-z0-9]*/
            token Name::Constant
          else
            token Name
          end
        end

        mixin :preprocessor
        mixin :waveFlag

        mixin :characters
        mixin :numbers
        mixin :whitespace
      end

      state :preprocessor do
        rule %r((\#)(#{object})) do |m|
          if self.class.preprocessor.include? m[2].downcase
            token Comment::Preproc
          else
            token Punctuation, m[1] #i.e. ModuleFunctions
            token Name, m[2]
          end


        end
      end

      state :assignment do
        mixin :whitespace
        rule /\"/, Literal::String::Double, :string1 #punctuation for string
        mixin :string2
        rule /#{number_float}/, Literal::Number::Float, :pop!
        rule /#{number_int}/, Literal::Number::Integer, :pop!
        rule /[\(\[\{][^\)\]\}]+[\)\]\}]/, Generic, :pop!
        rule /[^\s\/\(]+/, Generic, :pop!
        rule(//) { pop! }
      end

      state :parse_variables do
        mixin :whitespace
        rule /[=]/, Punctuation, :assignment
        rule object, Name::Variable
        rule /[\[\]]/, Punctuation # optional variables in functions
        rule /[,]/, Punctuation, :parse_variables
        rule /\)/, Punctuation, :pop! # end of function
        rule %r([/][a-z]+)i, Keyword::Pseudo, :parse_variables
        rule(//) { pop! }
      end

      state :parse_function do
        rule %r([/][a-z]+)i, Keyword::Pseudo # only one flag
        mixin :whitespace
        rule object, Name::Function
        rule /[\(]/, Punctuation, :parse_variables
        rule(//) { pop! }
      end

      state :operationFlags do
        rule /#{noLineBreak}/, Text
        rule /[=]/, Punctuation, :assignment
        rule %r([/][a-z]+)i, Keyword::Pseudo, :operationFlags
        rule /(as)(\s*)(#{object})/i do
          groups Keyword::Type, Text, Name::Label
        end
        rule(//) { pop! }
      end

      # inline variable assignments (i.e. for Make) with strict syntax
      state :waveFlag do
        rule %r(
          (/(?:wave|X|Y))
          (\s*)(=)(\s*)
          (#{object})
          )ix do |m|
          token Keyword::Pseudo, m[1]
          token Text, m[2]
          token Punctuation, m[3]
          token Text, m[4]
          token Name::Variable, m[5]
        end
      end

      state :characters do
        rule /\s/, Text
        rule /#{operator}/, Operator
        rule /#{punctuation}/, Punctuation
        rule /\"/, Literal::String::Double, :string1 #punctuation for string
        mixin :string2
      end

      state :numbers do
        rule /#{number_float}/, Literal::Number::Float
        rule /#{number_hex}/, Literal::Number::Hex
        rule /#{number_int}/, Literal::Number::Integer
      end

      state :whitespace do
        rule /#{noLineBreak}/, Text
      end

      state :string1 do
        rule /%\w\b/, Literal::String::Other
        rule /\\\\/, Literal::String::Escape
        rule /\\\"/, Literal::String::Escape
        rule /\\/, Literal::String::Escape
        rule /[^"]/, Literal::String
        rule /\"/, Literal::String::Double, :pop! #punctuation for string
      end

      state :string2 do
        rule /\'[^']*\'/, Literal::String::Single
      end

      state :comments do
        rule %r{([/]\s*)([@]\w+\b)}i do
          # doxygen comments
          groups Comment, Comment::Special
        end
        rule /[^\r\n]/, Comment
        rule(//) { pop! }
      end
    end
  end
end
