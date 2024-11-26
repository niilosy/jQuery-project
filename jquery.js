$(document).ready(function() {
    lataaTehtävät();
    näytäNapit();
    $("#draggable").draggable(); // jQuery UI function that makes the main h1 draggable
    $("#draggable").disableSelection();

});

// This function will store the tasks in localStorage
function tallennaTehtävät() {
    const tasks = [];
    $("#lista li").each(function() {
        const taskText = $(this).find("span").text();
        const isChecked = $(this).find("input[type='checkbox']").prop("checked");
        tasks.push({ text: taskText, checked: isChecked });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// This function will load the tasks from localStorage
function lataaTehtävät() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
        storedTasks.forEach(function(task) {
            lisääTehtävä(task.text, task.checked);
        });
    }
}

// This is more of a validating function though it's called lisää
function lisää() {
    event.preventDefault()
    const syöte = $("#syöte").val();
    if (syöte === ""){
        alert("Kenttä ei voi olla tyhjä")
        return
    }
    lisääTehtävä(syöte)
    $("#syöte").val("");
    tallennaTehtävät();
    näytäNapit();

}
// This will add the task to list
function lisääTehtävä(syöte, checked = false) {
    const li = $("<li>");
    const span = $("<span>");
    span.text(syöte);
    const checkbox = $("<input>", { type: "checkbox" });
    checkbox.prop("checked", checked);
    if (checked) {
        li.addClass("done");
    }
    const deletebutton = $("<button>", {
        text: "Poista",
        class: "deletebutton",
        click: function() {
            li.remove();
            tallennaTehtävät();
            näytäNapit();
        }
    });
    
    checkbox.on("change", function() {
        if (checkbox.prop("checked")) {
            li.addClass("done");
        } else {
            li.removeClass("done");
        }
        tallennaTehtävät();
    });

    li.append(checkbox, span, deletebutton);

    $("#lista").append(li);
    tallennaTehtävät();
}

// Clears the list
function tyhjennäLista() {
    $("#lista").empty();
    localStorage.removeItem("tasks");
    näytäNapit();
}

// Show all items
function näytäKaikki() {
    $("#lista li").show();
}

// Show only compeleted items
function näytäTehdyt() {
    $("#lista li").each(function() {
        if ($(this).hasClass("done")) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

// Show only not completed items
function näytäTekemättömät() {
    $("#lista li").each(function() {
        if ($(this).hasClass("done")) {
            $(this).hide();
        } else {
            $(this).show("fast");
        }
    });
}

// Show buttons if atleast 2 items
function näytäNapit() {
    const taskCount = $("#lista li").length;
    if (taskCount >= 2) {
        $("#napit").css("display", "flex");
    } else {
        $("#napit").hide("slow");
    }
}

// This deletes the placeholder onclick
function raivaa() {
    const syöte = $("#syöte");
    syöte.attr("placeholder", "");
}

// This brings back the placeholder onblur
function palauta() {
    const syöte = $("#syöte");
    syöte.attr("placeholder", "Mitä haluaisit lisätä?");
}