$(document).ready(function() {
    const mode_toggle = document.getElementById("light-toggle");

    mode_toggle.addEventListener("click", function() {
        const temp = sessionStorage.getItem("theme");
        toggleTheme(temp);
    });

    let toggleTheme = (theme) => {
        if (theme == "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }

    let setTheme = (theme) =>  {
        trans();
        if (theme) {
            document.documentElement.setAttribute("data-theme", theme)
        }
        else {
            document.documentElement.removeAttribute("data-theme");
        }
        sessionStorage.setItem("theme", theme);

        // store also in persistent storage if user allowed it
        if($.fn.ihavecookies && $.fn.ihavecookies.preference('preferences') === true) {
            localStorage.setItem("theme", theme);
        }
    };

    let trans = () => {
        document.documentElement.classList.add("transition");
        window.setTimeout(() => {
            document.documentElement.classList.remove("transition")
        }, 500)
    }
});
