---
layout: post
title: 'PostgreSQL: simple trigger for email'
date: '2009-06-05T00:00:00+02:00'
tags:
- lower()
- postgresql
- trigger
category: 'PostgreSQL'

---
Moin Moin,

I actually had a little usability problem with a customer using the online registration from <a href="http://www.e-unique.com" target="_blank">eUNIQUE</a>. The attendees have to login by giving a username and a password. In this case and to keep it as simple as possible, the email address is the username. Actually I did not realize, that people still write their email addresses in camle case. For example:

Andy.Wenk@gmail.com or Andy.wenk@gmail.com

These addresses are different for the authentication process. And that made problems for the attendees, because the people forgot in which version they saved their username. So I decided to avoid this by only allowing lower case written usernames.

It would be annoying to tell the customer &#8220;please correct your username (only lower case)&#8221;. That means the application has to deal with that. Do that with PHP? No, because there are more places in the application where the username is changable (only some - don&#8217;t worry ;-) ). So the easiest way is to use a trigger in PostgreSQL.

While receivieng the username, it will be changed to lowercase using the function lowercase(). It looks like this:

<pre>CREATE OR REPLACE FUNCTION user_lower_username()
  RETURNS "trigger" AS
$BODY$
BEGIN
	new.email := lower(new.email);
	new.username := lower(new.username);
	return new;
END
$BODY$
  LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER user_lower_username
  BEFORE INSERT OR UPDATE
  ON users
  FOR EACH ROW
  EXECUTE PROCEDURE user_lower_username();</pre>

Another advantage of using this trigger is the fact, that the attendees are not able to make a new account by simply writing their username in a different way (e.g Andy.wenk instead of andy.wenk). By the way - I also lower the email address as you can see in the function.

The only place we had to change the code was the part where we compare the username given by the user (while logging in) with the username in the database. We have to use the PHP function str_to_lower() to compare lowercase with lowercase.

Simple &#8230; isn&#8217;t it?

Andreas
