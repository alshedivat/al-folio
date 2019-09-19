<?xml version="1.0" encoding="utf-8"?>
<style xmlns="http://purl.org/net/xbiblio/csl" class="in-text" version="1.0" demote-non-dropping-particle="sort-only" default-locale="en-US">
  <info>
    <title>Journal of the American Ceramic Society</title>
    <id>http://www.zotero.org/styles/journal-of-the-american-ceramic-society</id>
    <link href="http://www.zotero.org/styles/journal-of-the-american-ceramic-society" rel="self"/>
    <link href="http://www.zotero.org/styles/medical-physics" rel="template"/>
    <link href="http://onlinelibrary.wiley.com/journal/10.1111/%28ISSN%291551-2916/homepage/jace_author_submission_guidelines.htm#anchor56" rel="documentation"/>
    <author>
      <name>Sebastian Karcher</name>
    </author>
    <category citation-format="numeric"/>
    <category field="engineering"/>
    <issn>0002-7820</issn>
    <eissn>1551-2916</eissn>
    <updated>2015-01-17T11:30:12+00:00</updated>
    <rights license="http://creativecommons.org/licenses/by-sa/3.0/">This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 License</rights>
  </info>
  <macro name="author">
    <names variable="author">
      <name and="text" initialize-with="."/>
      <label form="short" prefix=" (" suffix=")"/>
      <et-al font-style="italic"/>
      <substitute>
        <names variable="editor"/>
        <names variable="translator"/>
      </substitute>
    </names>
  </macro>
  <macro name="editor">
    <names variable="editor">
      <label form="verb" prefix=" " suffix=" " text-case="capitalize-first"/>
      <name and="text" delimiter-precedes-last="never" initialize-with="."/>
    </names>
  </macro>
  <macro name="year-date">
    <choose>
      <if variable="issued">
        <date variable="issued">
          <date-part name="year"/>
        </date>
      </if>
      <else>
        <text term="no date" form="short"/>
      </else>
    </choose>
  </macro>
  <macro name="publisher">
    <group delimiter=", ">
      <text variable="publisher" form="long"/>
      <text variable="publisher-place" form="long"/>
      <text macro="year-date"/>
    </group>
  </macro>
  <macro name="edition">
    <choose>
      <if is-numeric="edition">
        <group delimiter=" ">
          <number variable="edition" form="ordinal"/>
          <text term="edition" form="short"/>
        </group>
      </if>
      <else>
        <text variable="edition"/>
      </else>
    </choose>
  </macro>
  <macro name="title">
    <choose>
      <if type="article-journal chapter paper-conference article-magazine thesis" match="any">
        <text variable="title" form="long" quotes="true"/>
      </if>
      <else>
        <text variable="title" form="long" font-style="italic"/>
      </else>
    </choose>
  </macro>
  <citation collapse="citation-number">
    <sort>
      <key variable="citation-number"/>
    </sort>
    <layout vertical-align="sup" delimiter=", ">
      <text variable="citation-number"/>
    </layout>
  </citation>
  <bibliography second-field-align="flush" entry-spacing="0" et-al-min="9" et-al-use-first="8" line-spacing="2">
    <layout suffix=".">
      <text variable="citation-number" vertical-align="sup" suffix=" "/>
      <text macro="author" suffix=", "/>
      <choose>
        <if type="bill book graphic legal_case legislation motion_picture report song" match="any">
          <group delimiter=". ">
            <group delimiter=", ">
              <text macro="title" font-style="italic"/>
              <text macro="edition"/>
            </group>
            <text macro="publisher"/>
          </group>
        </if>
        <else-if type="chapter paper-conference" match="any">
          <text macro="title" suffix="; "/>
          <group delimiter=" ">
            <label variable="page" form="short"/>
            <text variable="page"/>
          </group>
          <text term="in" suffix=" " prefix=" "/>
          <group delimiter=". ">
            <group delimiter=", ">
              <text variable="container-title" form="short" font-style="italic"/>
              <text macro="edition"/>
            </group>
            <text macro="editor"/>
            <text macro="publisher"/>
          </group>
        </else-if>
        <else-if type="patent">
          <group delimiter="; ">
            <text variable="title"/>
            <group delimiter=", ">
              <text variable="number" prefix=" "/>
              <text macro="year-date"/>
            </group>
          </group>
        </else-if>
        <else-if type="thesis">
          <group delimiter="; ">
            <text macro="title"/>
            <group delimiter=", ">
              <text variable="genre"/>
              <text variable="publisher"/>
              <text variable="publisher-place"/>
              <text macro="year-date"/>
            </group>
          </group>
        </else-if>
        <else>
          <group delimiter=", ">
            <text macro="title"/>
            <text variable="container-title" form="short" font-style="italic"/>
            <group delimiter=" ">
              <text variable="volume" font-weight="bold"/>
              <text variable="issue" prefix="[" suffix="]"/>
              <text variable="page"/>
              <text macro="year-date" prefix="(" suffix=")"/>
            </group>
          </group>
        </else>
      </choose>
    </layout>
  </bibliography>
</style>
