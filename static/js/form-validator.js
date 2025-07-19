document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById("user-form")

    form.addEventListener("submit", function(event){
        let isValid = true
        document.querySelectorAll(".error-message").forEach(el => el.textContent="")

        const fields = {
            first_name: "Имя должно содержать от 2 до 50 символов",
            last_name: "Фамилия должна содержать от 2 до 50 символов",
            gender: "Выберите пол",
            age: "Введите корректный возраст",
            email: "Введите корректную электронную почту",
            address: "Адрес должен содержать не более 100 символов",
            salary: "Введите корректную ЗП"
        }

        for(const [name, message] of Object.entries(fields)){
            const input = form[name]
            if(!input.checkValidity()){
                const errorDiv = form.querySelector(`[data-error-for="${name}"]`)
                errorDiv.textContent = message
                isValid = false
            }
        }

        if(!isValid){
            event.preventDefault()
        }
    })

    const phoneInput = document.getElementById("phone")
    if(phoneInput){
        IMask(phoneInput, {
            mask: '+{7} (000)-00-00'
        })
    }
})