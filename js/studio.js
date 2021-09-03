var functions_mapping = {
    "isUnique": {
        "function_name": "isUnique",
        "column": true,
        "hint": true
    },
    "satisfies": {
        "function_name": "satisfies",
        "columnCondition": true,
        "constraintName": true,
        "assertion": true,
        "hint": true
    },
    "containsEmail": {
        "function_name": "containsEmail",
        "column": true,
        "assertion": true,
        "hint": true
    },
    "isComplete": {
        "function_name": "isComplete",
        "column": true,
        "hint": true
    }
};

function add_is_unique() {
    apply_template(functions_mapping.isUnique);
}

function add_satisfies() {
    apply_template(functions_mapping.satisfies);
}

function add_contains_email() {
    apply_template(functions_mapping.containsEmail);
}

function add_is_complete() {
    apply_template(functions_mapping.isComplete);
}

function remove_rule(rule) {
    $(rule).parent().parent().parent().remove();
    studio_parse();
}

function apply_template(render_data) {
    let template = $("#template_generic").html();
    Mustache.parse(template);
    let rendered = Mustache.render(template, {data: render_data});
    $('#rules').append(rendered);
    studio_parse();
}

function studio_parse() {
    let rules = [];

    $(".studio-function").each(function () {
        let function_name = $(this).data("function-name");
        let mapping = functions_mapping[function_name];
        let features_name_array = Object.keys(mapping);

        let attributes = {};

        for (let i = 0; i < features_name_array.length; i++) {
            if (features_name_array[i] !== "function_name") {
                let attr_element = $(this).find(`[data-arg-name=${features_name_array[i]}]`);
                let attr_name = attr_element.data("arg-name");
                attributes[attr_name] = attr_element.val();
            }
        }
        let rule = {"name": function_name, "parameters": attributes};
        rules.push(rule);
    });

    $("#dynamic-parser-code").text(JSON.stringify(rules, null, 4));
    highlight();
}

function highlight() {
    hljs.highlightElement(document.querySelector('code'));
}

window.addEventListener("readystatechange", function (event) {
    hljs.configure({ignoreUnescapedHTML: true});
    highlight();
});
