---
layout: post
title: PostgreSQL - PL/pgSQL UDF example
date: '2009-06-15T00:00:00+02:00'
tags:
- lpad
- pgsql
- postgresql
- udf
category: 'PostgreSQL'

---
Moin moin,

actually one of our customers was asking if I can help him out with creating some vouchers for the online shop we made for him. You can visit the shop here: <a href="http://www.fashionroom.biz" target="_blank">fashionroom.biz</a>. The shop is - for sure - based on a PostgreSQL database. We did include a voucher mechanism but he was printing vouchers with numbers from 0001 up to 2500. The shop system does create random voucher codes like AYXVFY so I told him (in a joke) that he has a nice job now to change the 2500 voucher codes ;-).

There are tow ways to create these vouchers. One would be to use PHP and fire 2500 INSERT querys into the database. Sure, as a prepared statement, it would be possible to avoid a load peak. But writing the script, transferring it to the server and so on &#8230; na! Annoying. So I decided to use a <em>user defined function</em> (UDF) written in PL/pgSQL. It&#8217;s quite easy but shows some features of udf&#8217;s in PL/pgSQL. Here it is:

<pre>
CREATE OR REPLACE FUNCTION create_voucher(int)
  RETURNS void AS
$BODY$

DECLARE
	count ALIAS FOR $1;
	_cnt int := 1;
	_serial int;

BEGIN
	SELECT max(vserial) INTO _serial FROM vouchers;
	_serial := _serial +1;

	WHILE _cnt &lt;= count LOOP
		INSERT INTO vouchers (vserial,created,vcode,title,percent) VALUES
		(_serial,NOW(),lpad(_cnt::varchar, 4, '0'),'30% voucher',30);
		_cnt := _cnt + 1;
	END LOOP;
END
$BODY$
  LANGUAGE 'plpgsql' VOLATILE;
</pre>

As I said, it&#8217;s quite easy.

The parameter in $1 is the max code number of the vouchers. vserial is a serial to put different vouchers together. It&#8217;s different to the id of the table which is serial (not shown here). So that&#8217;s the reason why I have to use the SELECT INTO query.
_cnt is just a counter used inbetween the while loop and is increased by 1 each turn. Quite nice is the usage of lpad(). The vcode column is of datatype varchar. Here I simply cast the _cnt variable to a varchar and give it to lpad(). lpad() is now creating strings like 0001, 0015, 0425 and 2500. It fills 0&#8217;s from left to right until the string has a length of 4. Yeah - perfect.

So that&#8217;s it. I think it&#8217;s much faster to use this instead of PHP.

Andreas
