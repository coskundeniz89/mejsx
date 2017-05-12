# MeJsX Javascript Extension Functions
MeJsX is beeing developed for common javascript operations

### Functions:
#### 1. getCustomCssRulesOnElement(element)

This function is useful when you need to access CSS style rules applied by the author.
 - Excludes HTML elements' default CSS properties
 - Includes rules from external stylesheets
 - Includes rules from internal styles
 - Includes rules from `style` attribute
 - Returns the rules as this order:
     1. External stylesheets, load order into the document
     2. Internal styles, written order in the document
     3. Style attributes on the element
 
**Usage**
 > var element = document.getElementById('idOfElement');<br/>
 > var elementRules = MEJSX.getCustomCssRulesOnElement(element);
 >
 >// elementRules is an array of elementRule<br/><br/>
 >// elementRule has 3 properties:<br/><br/>
 >// elementRule.order =&gt; Ordering number of the rule <br/>
 >// elementRule.content =&gt; CSS content <br/>
 >// elementRule.media =&gt; Media query

![elementRule](https://github.com/mental-soft/mejsx/blob/master/readme-files/elementrule.jpg)

Example project on jsFiddle: [https://jsfiddle.net/er_han/39g2c838/](https://jsfiddle.net/er_han/39g2c838/)