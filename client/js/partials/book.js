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
output += "</span>.\n            </p>\n            <p>\n                Es un libro perteneciente a los géneros\n                <span class=\"highlight\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"genres"), env.opts.autoescape);
output += "</span>.\n            </p>\n        </div>\n        ";
;
}
output += "\n    </div>\n\n    ";
if(runtime.contextOrFrameLookup(context, frame, "detail")) {
output += "\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"status") == "FINISHED") {
output += "\n    <div class=\"book__rate\">\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"rate") == 0) {
output += "\n      <div class=\"rate\">\n        <p><span>Por favor, califiqueme!</span></p>\n        ";
frame = frame.push();
var t_3 = ["Genial","Muy interesante","Bueno","Podria ser peor","Malo"];
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("i", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n        <input type=\"radio\" id=\"star";
output += runtime.suppressValue(5 - runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0"), env.opts.autoescape);
output += "\" name=\"rate\" value=\"";
output += runtime.suppressValue(5 - runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0"), env.opts.autoescape);
output += "\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"rate") == (5 - runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0"))) {
output += " checked ";
;
}
output += " data-ref=\"rate";
output += runtime.suppressValue(5 - runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0"), env.opts.autoescape);
output += "\"/>\n        <label for=\"star";
output += runtime.suppressValue(5 - runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0"), env.opts.autoescape);
output += "\" title=\"";
output += runtime.suppressValue(t_4, env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(5 - runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0"), env.opts.autoescape);
output += " stars</label>\n        ";
;
}
}
frame = frame.pop();
output += "\n      </div>\n      ";
;
}
else {
output += "\n          <span name=\"rate\">Este libro ";
output += runtime.suppressValue(runtime.memberLookup((["es Genial","es Muy interesante","esta Bueno","Podria ser peor","es Malo"]),5 - runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "book")),"rate")), env.opts.autoescape);
output += "</span>\n      ";
;
}
output += "\n    </div>\n\n\n    ";
;
}
output += "\n\n    <div class=\"book__actions\">\n        ";
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