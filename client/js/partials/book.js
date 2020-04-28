(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["book.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"card book ";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "detail")?"book--full":""), env.opts.autoescape);
output += "\">\n    <div class=\"book__cover\">\n        <img src=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"cover"), env.opts.autoescape);
output += "\" alt=\"book cover\" />\n    </div>\n\n    <div class=\"book__header\">\n        <p class=\"book__title\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"title"), env.opts.autoescape);
output += "</p>\n        <p class=\"book__author\">por ";
output += runtime.suppressValue(env.getFilter("join").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"authors"),", "), env.opts.autoescape);
output += "</p>\n    </div>\n    <div class=\"book__body\">\n        <p class=\"book__synopsis\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"synopsis"), env.opts.autoescape);
output += "</p>\n\n        ";
if(runtime.contextOrFrameLookup(context, frame, "detail")) {
output += "\n        <div class=\"book__extra-info\">\n            <p>\n                Se publicó en el año\n                <span class=\"highlight\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"year"), env.opts.autoescape);
output += "</span> por la editorial\n                <span class=\"highlight\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"publisher"), env.opts.autoescape);
output += "</span>.\n            </p>\n            <p>\n                La primera edición se realizo en\n                <span class=\"highlight\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"country"), env.opts.autoescape);
output += "</span>.\n            </p>\n            <p>\n                Es un libro perteneciente a los géneros\n                <span class=\"highlight\"></span>.\n            </p>\n        </div>\n        ";
;
}
output += "\n    </div>\n\n    ";
if(runtime.contextOrFrameLookup(context, frame, "detail")) {
output += "\n\n\n    <div class=\"book__actions\">\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"status") == "AVAILABLE") {
output += "\n        <button class=\"btn btn-primary\" data-ref=\"addToList\">\n            Empezar a leer\n        </button>\n        ";
;
}
output += " ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"status") == "READING") {
output += "\n        <button class=\"btn btn-warning\" data-ref=\"removeFromList\">\n            Dejar de leer\n        </button>\n        <button class=\"btn btn-success\" data-ref=\"addToFinish\">\n            Lo termine!\n        </button>\n        ";
;
}
output += " ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"status") == "FINISHED") {
output += "\n        <button class=\"btn btn-danger\" data-ref=\"removeFromFinish\">\n            Volver a leer\n        </button>\n        ";
;
}
output += "\n        <button class=\"btn btn-warning\"  onclick=\"location.href='/'\" >Atras</button>\n    </div>\n\n    ";
;
}
output += "\n</div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
