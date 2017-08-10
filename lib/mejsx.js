var MEJSX = function () {

    Object.prototype.getName = function () {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((this).constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    };

    // Detect if the browser is Edge
    function isEDGE(){
        return /Edge\/\d./i.test(navigator.userAgent)
    }

    var getCustomCssRulesOnElement = function (elm) {
        var slice = Function.call.bind(Array.prototype.slice);

        var isCssMediaRule = function(cssRule) {
            if(isEDGE()) {
                return cssRule.getName() === 'CSSMediaRule';
            }
            return cssRule.type === cssRule.MEDIA_RULE;
        }

        var isCssStyleRule = function(cssRule) {
            if(isEDGE()) {
                return cssRule.getName() === 'CSSStyleRule';
            }
            return cssRule.type === cssRule.STYLE_RULE;
        }

        // Here we get the cssRules across all the stylesheets in one array
        var cssRules = slice(document.styleSheets).reduce(function (rules, styleSheet) {
            return rules.concat(slice(styleSheet.cssRules));
        }, []);

        var mediaRules = cssRules.filter(isCssMediaRule);

        cssRules = cssRules.filter(isCssStyleRule);

        cssRules = cssRules.concat(slice(mediaRules).reduce(function (rules, mediaRule) {
            return rules.concat(slice(mediaRule.cssRules));
        }, []));

        console.log(cssRules);

        // get only the css rules that matches that element
        var rulesOnElement = cssRules.filter(isElementMatchWithCssRule.bind(null, elm));
        var elementRules = [];
        var elementRule = function (order, content, media) {
            if (media === undefined || media == null || media == '') {
                media = 'all';
            }
            this.order = order;
            this.content = content;
            this.media = media;
        }
        if (rulesOnElement.length) {
            for (var i = 0; i < rulesOnElement.length; i++) {
                var e = rulesOnElement[i];
                var order = i;
                var content = e.cssText;
                var media = e.parentRule == null
                    ? e.parentStyleSheet == null
                        ? 'all'
                        : e.parentStyleSheet.media.mediaText
                    : e.parentRule.media.mediaText;

                var _elementRule = new elementRule(order, content, media);
                elementRules.push(_elementRule);
            }
        }

        if (elm.getAttribute('style')) {
            var _elementRule = new elementRule(rulesOnElement.length, 'style {' + elm.getAttribute('style') + '}')
            elementRules.push(_elementRule);
        }
        return elementRules;
    };

    var isElementMatchWithCssRule = function (element, cssRule) {

        var proto = Element.prototype;
        var matches = Function.call.bind(proto.matchesSelector ||
            proto.mozMatchesSelector || proto.webkitMatchesSelector ||
            proto.msMatchesSelector || proto.oMatchesSelector);
        console.log(matches);
        return matches(element, cssRule.selectorText);
    };

    return {
        getCustomCssRulesOnElement: function (element) {
            return getCustomCssRulesOnElement(element);
        }
    }

}()
