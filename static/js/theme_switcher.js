document.addEventListener("DOMContentLoaded", function(){
    const toggleButton = document.getElementById("theme-toggle")
    const themLink = document.getElementById("theme-style")

    const saveThem = localStorage.getItem("theme") || "light"
    
    if(saveThem === "dark"){
        themLink.href = THEME_DARK
        toggleButton.textContent = "Переключить тему"
    }else{
        themLink.href = THEME_LIGHT
        toggleButton.textContent = "Переключить тему"
    }

    toggleButton.addEventListener("click", function(){
        if(themLink.href.includes("light")){
            themLink.href = THEME_DARK
            toggleButton.textContent = "Переключить тему"
            localStorage.setItem("theme", "dark")
        }else{
            themLink.href = THEME_LIGHT
            toggleButton.textContent = "Переключить тему"
            localStorage.setItem("theme", "light")
        }
    })
})